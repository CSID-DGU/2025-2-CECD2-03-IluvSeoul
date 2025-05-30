from app.module.file import FileManager
from core.action.action_control import ActionControl
from core.control.db import DB
from core.setting import Setting

if __name__ == '__main__':
    from core.server.http_server import HttpServer

    # init
    Setting.init('dev')
    DB.init()
    FileManager.init()

    # server run
    server = HttpServer()
    HttpServer.app = server.app

    ActionControl.init()

    server.run()