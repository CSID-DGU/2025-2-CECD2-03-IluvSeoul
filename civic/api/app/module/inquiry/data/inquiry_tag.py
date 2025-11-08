from core.action.request import Request


class InquiryTag:
    def __init__(self, inquiry_id: int, tag_id: int):
        self.inquiry_id = inquiry_id
        self.tag_id = tag_id

    @staticmethod
    def insert(request: Request, it: list['InquiryTag']):
        if not it:
            return
        values = [(item.inquiry_id, item.tag_id) for item in it]
        request.insert_many(f"INSERT IGNORE INTO inquiry$tag (inquiry_id, tag_id) VALUES (%s, %s)", values)

    @staticmethod
    def list(request: Request, inquiry_id: int) -> list['InquiryTag']:
        list = request.select_all("SELECT inquiry_id, tag_id FROM inquiry$tag WHERE inquiry_id=%s", (inquiry_id,))
        ret = []
        for (id, tag_id) in list:
            print(tag_id)
            ret.append(InquiryTag(inquiry_id, tag_id))
        return ret

    @staticmethod
    def delete(request: Request, inquiry_id: int):
        request.delete("DELETE FROM inquiry$tag WHERE inquiry_id=%s", (inquiry_id,))
        