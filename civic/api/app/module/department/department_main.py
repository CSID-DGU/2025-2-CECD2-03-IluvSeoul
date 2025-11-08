import json

from app.module.tag.data.tag import Tag


class DepartmentMain:
    department_id_map: dict[int, str] = None
    department_name_map: dict[str, int] = None

    department_tag_map: dict[int, list[int]] = None
    tag_department_map: dict[int, int] = None

    @staticmethod
    def init(session):
        session.execute("SELECT id, `name` FROM _department", ())
        department_list: list = session.fetchall()
        DepartmentMain.department_id_map = {}
        DepartmentMain.department_name_map = {}
        for (id, name) in department_list:
            DepartmentMain.department_id_map[id] = name
            DepartmentMain.department_name_map[name] = id

        session.execute("SELECT department_id, tag_id FROM _department_tag", ())
        department_tag_list: list = session.fetchall()
        DepartmentMain.department_tag_map = {}
        DepartmentMain.tag_department_map = {}
        for (department_id, tag_id) in department_tag_list:
            if department_id not in DepartmentMain.department_tag_map:
                DepartmentMain.department_tag_map[department_id] = []
            DepartmentMain.department_tag_map[department_id].append(tag_id)

            if tag_id not in DepartmentMain.tag_department_map:
                DepartmentMain.tag_department_map[tag_id] = department_id
