import os
import importlib
import importlib.util
from flask import Flask
from core.setting import Setting
from core.action.annotation.action import ActionRegistry


class HttpServer:
    def __init__(self):
        self.app = Flask(__name__)
        # Register action routes dynamically
        self.__load_actions()
        self._register_routes()

    def __load_actions(self):
        action_dir = os.path.join(os.getcwd(), 'app', 'action')

        if not os.path.exists(action_dir):
            raise RuntimeError(f"action_load_failed")

        import sys
        if os.getcwd() not in sys.path:
            sys.path.insert(0, os.getcwd())

        for filename in os.listdir(action_dir):
            if filename.endswith('.py'):
                module_name = f"app.action.{filename[:-3]}"
                try:
                    importlib.import_module(module_name)
                except Exception as e:
                    raise e

    def _register_routes(self):
        actions = ActionRegistry.get_actions()

        for route, config in actions.items():
            self.app.add_url_rule(
                route,
                view_func=config['handler'],
                methods=config['methods']
            )

    def run(self):
        host = Setting.get('server.host', '0.0.0.0')
        port = Setting.get('server.port', 8000)
        self.app.run(host=host, port=int(port), debug=not Setting.is_live)