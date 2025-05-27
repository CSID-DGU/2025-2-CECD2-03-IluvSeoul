from flask import request as flask_request
class Request:
    def __init__(self):
        self.json = flask_request.get_json(silent=True) or {}
        self.args = flask_request.args.to_dict()
        # TODO db transaction