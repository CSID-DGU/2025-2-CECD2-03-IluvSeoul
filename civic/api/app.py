from core.action.action_control import ActionControl
from core.setting import Setting

if __name__ == '__main__':
    from core.server.http_server import HttpServer

    # init
    Setting.init('dev')

    # server run
    server = HttpServer()
    HttpServer.app = server.app
    ActionControl.init()
    server.run()