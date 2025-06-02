from core.action.request import Request


class InquiryTag:
    def __init__(self, inquiry_id, tag_id):
        self.inquiry_id = inquiry_id
        self.tag_id = tag_id

    @staticmethod
    def insert(request: Request, it: 'InquiryTag'):
        request.insert("INSERT IGNORE INTO inquiry$tag (inquiry_id, tag_id) VALUES (%s, %s)", (it.inquiry_id, it.tag_id))

    @staticmethod
    def list(request: Request, inquiry_id: int) -> list['InquiryTag']:
        list = request.select_all("SELECT inquiry_id, tag_id FROM inquiry$tag WHERE inquiry_id=%s", (inquiry_id,))
        ret = []
        for (id, tag_id) in list:
            print(tag_id)
            ret.append(InquiryTag(inquiry_id, tag_id))
        return ret