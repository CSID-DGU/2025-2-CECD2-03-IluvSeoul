import json

from app.module.department.department_main import DepartmentMain
from app.module.gpt.gpt_main import GPTMain
from app.module.inquiry.data.inquiry import Inquiry
from app.module.inquiry.data.inquiry_suggest_department import InquirySuggestDepartment
from app.module.inquiry.data.inquiry_tag import InquiryTag
from app.module.tag.tag_main import TagMain
from core.action.request import Request

SYSTEM_PROMPT = """당신은 한국어 민원 텍스트에 간결한 '단일 태그 목록'을 부여합니다.
규칙(엄격):
- 반드시 제공된 허용 태그 목록에서만 선택(새 표현 금지)
- 출력은 {"tag_ids":[...]} JSON 한 줄만
- 각 항목 1~6개
"""

def build_user_prompt(item: dict[str, object]) -> str:
    numbered = [f"{t.name}" for t in TagMain.tag_list]
    content = {
        "민원내용": item.get("민원내용",""),
        "답변내용": item.get("답변내용",""),
        "담당부서": item.get("담당부서",""),
        "허용_태그_리스트": numbered
    }
    return json.dumps(content, ensure_ascii=False, indent=2)

class InquiryLogic:
    @staticmethod
    def process(request: Request, inquiry_id: int):
        inquiry = Inquiry.get(request, inquiry_id)
        if not inquiry:
            return None

        InquirySuggestDepartment.delete(request, inquiry_id)
        InquiryTag.delete(request, inquiry_id)

        user_prompt = build_user_prompt(inquiry.to_dict())
        data = GPTMain.proc(SYSTEM_PROMPT, user_prompt)

        tags: list[int] = []
        tag_ids = data.get("tag_ids")
        if isinstance(tag_ids, list) and all(isinstance(x, str) for x in tag_ids):
            for i in tag_ids:
                if TagMain.tag_name_map.get(i) is not None:
                    tags.append(TagMain.tag_name_map[i])

        tag_id_list = list(set(tags))

        department_counter: dict[int, int] = {}
        for tag_id in tag_id_list:
            dpt = DepartmentMain.tag_department_map[tag_id]
            if dpt not in department_counter:
                department_counter[dpt] = 0
            department_counter[dpt] += 1


        sorted_departments = sorted(department_counter.items(), key=lambda x: (-x[1], DepartmentMain.department_id_map.get(x[0], 10**9)))
        InquirySuggestDepartment.insert(request, [InquirySuggestDepartment(inquiry_id, k) for (k, v) in sorted_departments])
        InquiryTag.insert(request, [InquiryTag(inquiry_id, t) for t in tag_id_list])
        return None

    # @staticmethod
    # def inquiry_receive(request: Request):
    #     audio_path = FileManager.save(request)
    #
    #     inquiry = Inquiry.new(request)
    #
    #     ##########
    #     ## stt logic
    #     ##########
    #     try:
    #         text = STTMain.proc(audio_path)
    #         print("🟢 STT 결과:", text)
    #
    #         inquiry.message_id = inquiry.message_id + 1
    #         im = InquiryMessage(inquiry.id, inquiry.message_id, 1)
    #         im.summary = InquiryLogic.get_summary(text)
    #         im.content = text
    #         InquiryMessage.insert(request, im)
    #     except Exception as e:
    #         print("🔴 STT 오류:", e)
    #         return None
    #
    #     ##########
    #     ## tag logic
    #     ##########
    #     try:
    #         tagger = TagMain.proc(text)
    #     except Exception as e:
    #         print("🔴 GPT 태깅 오류:", e)
    #         return None
    #
    #     resMap = {}
    #     for tk, tv in tagger.items():
    #         if tv.index == -1:
    #             continue
    #         ti = TagMain.tag_key_value_map[tk][tv.index].id
    #         InquiryTag.insert(request, InquiryTag(inquiry.id, ti))
    #         resMap[tk.name] = {
    #             'value': tv.value,
    #             'int_value': tv.int_value,
    #         }
    #
    #     # TODO 제목 처리
    #     inquiry.title = InquiryLogic.get_title(text)
    #
    #     Inquiry.update(request, inquiry)
    #
    #     return inquiry, resMap
    #
    # @staticmethod
    # def inquiry_department(request: Request, inquiry_id: int) -> str or None:
    #     inquiry = Inquiry.get(request, inquiry_id)
    #     if not inquiry:
    #         return None
    #
    #     itl = InquiryTag.list(request, inquiry_id)
    #     data: dict[str, list[Tag]] = {}
    #     for it in itl:
    #         tag = TagMain.tag_id_map[it.tag_id]
    #         if tag.type not in data:
    #             data[tag.type] = []
    #         data[tag.type].append(tag)
    #
    #     inquiry.department_id = DepartmentMain.proc(request, data)
    #     Inquiry.update(request, inquiry)
    #     return DepartmentMain.department_id_map[inquiry.department_id]

    # @staticmethod
    # def get_title(text: str):
    #     result = GPTMain.proc(content=f"""{text}\n이 글을 1줄(10자 이내)로 요약한 것 만들어줘\n양식은 아래와 같아\n[1줄]\n내용""")
    #     return result.split('\n')[1]
    #
    # @staticmethod
    # def get_summary(text: str):
    #     result = GPTMain.proc(content=f"""{text}\n이 글을 3줄 이내로 요약한 것 만들어줘\n양식은 아래와 같아\n[3줄]\n내용""")
    #     return "\n".join(result.split('\n')[1:])
