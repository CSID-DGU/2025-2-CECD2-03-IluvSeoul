class Inquiry:
    def __init__(self):
        self.id = 0
        self.title = None
        self.department_id = 0
        self.message_id = 0
        self.resolved = False

    @staticmethod
    def new(request):
        inquiry = Inquiry()
        inquiry.id = request.insert("INSERT INTO inquiry (id, title, department_id, message_id, resolved) "
                       "VALUES (DEFAULT, %s, %s, %s, %s)", (inquiry.title, inquiry.department_id, inquiry.message_id, inquiry.resolved))
        return inquiry

    @staticmethod
    def update(request, inquiry: 'Inquiry'):
        request.insert("UPDATE inquiry SET title=%s, department_id=%s, message_id=%s, resolved=%s WHERE id=%s", (inquiry.title, inquiry.department_id, inquiry.message_id, inquiry.resolved, inquiry.id))