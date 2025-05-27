from flask import jsonify

from app.module.test.test_logic import TestLogic
from core.action.decorators import *


@action('test')
class TestAction:
    @action_method('', ['GET'])
    def test(self, request):
        return jsonify({
            'data': TestLogic.proc()
        })
