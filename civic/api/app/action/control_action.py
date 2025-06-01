from flask import jsonify

from app.module.department.department_main import DepartmentMain
from app.module.tag.tag_main import TagMain
from core.action.decorators import action, action_method


@action('control')
class ControlAction:
    @action_method('reload', ['GET'])
    def reload(self, request):
        rtype = request.args['type']
        if rtype == 'tag':
            request.cursor.execute("TRUNCATE TABLE _tag")
            what_tags = [tag for group in TagMain.tag_json[0]['tag_list'] for tag in group['list']]
            where_tags = [tag for group in TagMain.tag_json[1]['tag_list'] for tag in group['list']]
            how_tags = TagMain.tag_json[2]['tag_list']

            for (type, list) in [('what', what_tags), ('where', where_tags), ('how', how_tags)]:
                for index, tag in enumerate(list):
                    request.insert("INSERT INTO _tag (`type`, `key`, `name`) "
                                   "VALUES (%s, %s, %s)", (type, index + 1, tag))
        elif rtype == 'department':
            request.cursor.execute("TRUNCATE TABLE _department")
            for index, dept in enumerate(DepartmentMain.department_json):
                request.insert("INSERT INTO _department (id, `name`) "
                               "VALUES (%s, %s)", (index + 1, dept["과"]))

        return jsonify({
            'data': 'reload'
        })