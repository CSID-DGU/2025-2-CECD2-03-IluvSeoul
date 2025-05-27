from core.setting import Setting

if __name__ == '__main__':
    from core.server.http_server import HttpServer

    # init
    Setting.init('dev')

    # server run
    server = HttpServer()
    server.run()