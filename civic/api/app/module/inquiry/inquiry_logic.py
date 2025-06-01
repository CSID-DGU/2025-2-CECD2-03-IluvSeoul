from app.module.file import FileManager
from app.module.inquiry.data.inquiry import Inquiry
from app.module.inquiry.data.inquiry_message import InquiryMessage
from app.module.stt.stt_main import STTMain
from app.module.tag.tag_main import TagMain


class InquiryLogic:
    @staticmethod
    def inquiry_receive(request):
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

        Inquiry.update(request, inquiry)

        return tagger