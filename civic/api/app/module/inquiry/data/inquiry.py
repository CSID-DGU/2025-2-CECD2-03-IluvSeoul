from core.action.request import Request


class Inquiry:
    def __init__(self):
        self.id = 0
        self.title = None
        self.department_id = 0
        self.message_id = 0
        self.resolved = False

    @staticmethod
    def get(request: Request, inquiry_id) -> 'Inquiry' or None:
        inquiry = request.select_one("SELECT id, title, department_id, message_id, resolved FROM inquiry WHERE id=%s", (inquiry_id,))
        if inquiry is None:
            return None

        ret = Inquiry()
        ret.id = inquiry[0]
        ret.title = inquiry[1]
        ret.department_id = inquiry[2]
        ret.message_id = inquiry[3]
        ret.resolved = inquiry[4]
        return ret

    @staticmethod
    def new(request):
        inquiry = Inquiry()
        inquiry.id = request.insert("INSERT INTO inquiry (id, title, department_id, message_id, resolved) "
                       "VALUES (DEFAULT, %s, %s, %s, %s)", (inquiry.title, inquiry.department_id, inquiry.message_id, inquiry.resolved))
        return inquiry

    @staticmethod
    def update(request, inquiry: 'Inquiry'):
        request.insert("UPDATE inquiry SET title=%s, department_id=%s, message_id=%s, resolved=%s WHERE id=%s", (inquiry.title, inquiry.department_id, inquiry.message_id, inquiry.resolved, inquiry.id))