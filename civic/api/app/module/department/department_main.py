import json

from app.module.tag.data.tag import Tag
from app.module.tag.data.tag_enum import TagEnum


class DepartmentMain:
    department_json = None
    department_id_map: dict[int, str] = {}
    department_name_map: dict[str, int] = {}

    @staticmethod
    def init(session):
        session.execute("SELECT `value` FROM _json WHERE `key`='department_tag'", ())
        DepartmentMain.department_json = json.loads(session.fetchone()[0])
        session.execute("SELECT id, `name` FROM _department", ())
        department_list: list = session.fetchall()
        for (id, name) in department_list:
            DepartmentMain.department_id_map[id] = name
            DepartmentMain.department_name_map[name] = id


    @staticmethod
    def proc(session, inquiry_tag_map: dict[str, list[Tag]]) -> int:
        best_score = -1
        best_department = None

        print(inquiry_tag_map)
        what_tag = inquiry_tag_map[TagEnum.what.name][0]
        where_tag = inquiry_tag_map[TagEnum.where.name][0]
        how_tag = inquiry_tag_map[TagEnum.how.name][0]
        for dept in DepartmentMain.department_json:
            score = 0
            if what_tag in dept["what"]:
                score += 2
            if where_tag in dept["where"]:
                score += 1
            if how_tag in dept["how"]:
                score += 0.5

            if score > best_score:
                best_score = score
                best_department = dept["과"]

        if best_department:
            print(best_department)
            return DepartmentMain.department_name_map[best_department]
        else:
            return 0