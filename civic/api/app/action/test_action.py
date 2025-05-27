from flask import jsonify

from app.module.test.test_logic import TestLogic
from core.action.annotation import *


@action('test')
class TestAction:
    @action_method('')
    def test(self):
        return jsonify({
            'data': TestLogic.proc()
        })
