from core.action.request import Request


class InquirySuggestDepartment:
    def __init__(self, inquiry_id, suggest_department_id):
        self.inquiry_id = inquiry_id
        self.suggest_department_id = suggest_department_id

    @staticmethod
    def insert(request: Request, it: list['InquirySuggestDepartment']):
        if not it:
            return
        params = []
        for i, item in enumerate(it):
            params.append((item.inquiry_id, item.suggest_department_id, i))
        query = f"INSERT IGNORE INTO inquiry$suggest_department (inquiry_id, suggest_department_id, `order`) VALUES (%s, %s, %s)"
        request.insert_many(query, params)

    @staticmethod
    def list(request: Request, inquiry_id: int) -> list['InquirySuggestDepartment']:
        s_list = request.select_all("SELECT inquiry_id, suggest_department_id FROM inquiry$suggest_department WHERE inquiry_id=%s", (inquiry_id,))
        ret = []
        for (inquiry_id, suggest_department_id) in s_list:
            ret.append(InquirySuggestDepartment(inquiry_id, suggest_department_id))
        return ret

    @staticmethod
    def delete(request: Request, inquiry_id: int):
        request.delete("DELETE FROM inquiry$suggest_department WHERE inquiry_id=%s", (inquiry_id,))