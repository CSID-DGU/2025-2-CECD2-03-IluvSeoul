from mysql.connector import pooling
from core.setting import Setting

class DB:
    _pool: pooling.MySQLConnectionPool = None

    @staticmethod
    def init():
        DB._pool = pooling.MySQLConnectionPool(
            pool_name='pool',
            pool_size=Setting.get('db.main.pool', 10),
            pool_reset_session=True,
            host=Setting.get('db.main.host', 'localhost'),
            port=Setting.get('db.main.port', 3306),
            database=Setting.get('db.main.database', 'main'),
            user=Setting.get('db.main.username', 'root'),
            password=Setting.get('db.main.password', '')
        )

    @staticmethod
    def get_connection() -> pooling.PooledMySQLConnection:
        return DB._pool.get_connection()

    @staticmethod
    def get_transaction_connection() -> pooling.PooledMySQLConnection:
        conn = DB.get_connection()
        conn.autocommit(False)
        return conn

    @staticmethod
    def close_connection(conn: pooling.PooledMySQLConnection):
        conn.close()

    @staticmethod
    def commit(conn: pooling.PooledMySQLConnection):
        conn.commit()

    @staticmethod
    def rollback(conn: pooling.PooledMySQLConnection):
        conn.rollback()
