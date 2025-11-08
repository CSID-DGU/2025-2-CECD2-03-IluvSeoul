from app.module.department.department_main import DepartmentMain
from app.module.file import FileManager
from app.module.gpt.gpt_main import GPTMain
from app.module.tag.tag_main import TagMain
from core.action.action_control import ActionControl
from core.control.db import DB
from core.setting import Setting

if __name__ == '__main__':
    from core.server.http_server import HttpServer

    ##########
    ## system init
    ##########
    Setting.init('dev')
    DB.init()
    FileManager.init()

    ##########
    ## server init
    ##########
    server = HttpServer()
    HttpServer.app = server.app

    ##########
    ## route init
    ##########
    ActionControl.init()

    ##########
    ## data init
    ##########
    conn = DB.get_connection()
    session = conn.cursor()
    GPTMain.init()
    # STTMain.init()
    TagMain.init(session)
    DepartmentMain.init(session)
    DB.close_connection(conn)

    ##########
    ## start server
    ##########
    server.run()