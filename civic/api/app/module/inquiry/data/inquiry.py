from core.action.request import Request


class Inquiry:
    def __init__(self):
        self.id = 0
        self.department_id = 0
        self.inquiry_message = None

    @staticmethod
    def get(request: Request, inquiry_id) -> 'Inquiry' or None:
        inquiry = request.select_one("SELECT id, department_id, inquiry_message FROM inquiry WHERE id=%s", (inquiry_id,))
        if inquiry is None:
            return None

        ret = Inquiry()
        ret.id = inquiry[0]
        ret.department_id = inquiry[1]
        ret.inquiry_message = inquiry[2]
        return ret

    def to_dict(self) -> dict[str, object]:
        return {
            "민원내용": self.inquiry_message,
        }
