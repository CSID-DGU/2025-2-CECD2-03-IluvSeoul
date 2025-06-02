from flask import jsonify

from app.module.test.test_logic import TestLogic
from core.action.decorators import *


@action('test')
class TestAction:
    @action_method('', ['GET'])
    def test(self, request):
        data = request.select_all("SELECT * FROM _tag");
        request.update("UPDATE _tag SET `name`='test1' WHERE id=1")
        if data[0][1] == 'test':
            raise Exception('test')
        print(data)
        return jsonify({
            'data': TestLogic.proc()
        })
