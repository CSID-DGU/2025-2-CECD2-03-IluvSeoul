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
            TagMain.init(request.cursor)

        elif rtype == 'department':
            DepartmentMain.init(request.cursor)

        return jsonify({
            'data': 'reload'
        })