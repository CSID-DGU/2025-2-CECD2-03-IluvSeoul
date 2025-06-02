from app.module.department.department_main import DepartmentMain
from app.module.file import FileManager
from app.module.inquiry.data.inquiry import Inquiry
from app.module.inquiry.data.inquiry_message import InquiryMessage
from app.module.inquiry.data.inquiry_tag import InquiryTag
from app.module.stt.stt_main import STTMain
from app.module.tag.data.tag import Tag
from app.module.tag.data.tag_enum import TagEnum
from app.module.tag.tag_main import TagMain
from core.action.request import Request


class InquiryLogic:
    @staticmethod
    def inquiry_receive(request: Request):
        audio_path = FileManager.save(request)

        inquiry = Inquiry.new(request)

        ##########
        ## stt logic
        ##########
        try:
            text = STTMain.proc(audio_path)
            print("🟢 STT 결과:", text)

            inquiry.message_id = inquiry.message_id + 1
            im = InquiryMessage(inquiry.id, inquiry.message_id, 1)
            im.summary = text
            im.content = text
            InquiryMessage.insert(request, im)
        except Exception as e:
            print("🔴 STT 오류:", e)
            return None

        ##########
        ## tag logic
        ##########
        try:
            tagger = TagMain.proc(text)
        except Exception as e:
            print("🔴 GPT 태깅 오류:", e)
            return None

        resMap = {}
        for tk, tv in tagger.items():
            if tv.index == -1:
                continue
            ti = TagMain.tag_key_value_map[tk][tv.index].id
            InquiryTag.insert(request, InquiryTag(inquiry.id, ti))
            resMap[tk.name] = {
                'value': tv.value,
                'int_value': tv.int_value,
            }

        # TODO 제목 처리
        inquiry.title = str(text)[:30] + '...'

        Inquiry.update(request, inquiry)

        return inquiry, resMap

    @staticmethod
    def inquiry_department(request: Request, inquiry_id: int) -> str or None:
        inquiry = Inquiry.get(request, inquiry_id)
        if not inquiry:
            return None

        itl = InquiryTag.list(request, inquiry_id)
        data: dict[str, list[Tag]] = {}
        for it in itl:
            tag = TagMain.tag_id_map[it.tag_id]
            if tag.type not in data:
                data[tag.type] = []
            data[tag.type].append(tag)

        inquiry.department_id = DepartmentMain.proc(request, data)
        Inquiry.update(request, inquiry)
        return DepartmentMain.department_id_map[inquiry.department_id]