from flask import Flask
from core.setting import Setting

class HttpServer:
    app: Flask = None

    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['DEBUG'] = not Setting.is_live

    def run(self):
        host = Setting.get('server.host', '0.0.0.0')
        port = int(Setting.get('server.port', 8000))
        self.app.run(host=host, port=port, debug=self.app.config['DEBUG'])