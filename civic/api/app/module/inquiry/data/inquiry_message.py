from core.action.request import Request


class InquiryMessage:
    inquiry_id: int
    message_id: int
    sender_type: str
    sender_id: int
    summary: str
    content: str

    def __init__(self, inquiry_id, message_id, sender_id):
        self.inquiry_id = inquiry_id
        self.message_id = message_id
        self.sender_type = 'requester'
        self.sender_id = sender_id
        self.summary = ''
        self.content = ''

    @staticmethod
    def insert(request: Request, im: 'InquiryMessage'):
        request.insert("INSERT INTO inquiry$message (inquiry_id, message_id, sender_type, sender_id, summary, content) "
                       "VALUES (%s, %s, %s, %s, %s, %s)", (im.inquiry_id, im.message_id, im.sender_type, im.sender_id, im.summary, im.content))