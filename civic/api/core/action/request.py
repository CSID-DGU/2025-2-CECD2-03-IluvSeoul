from flask import request as flask_request
from mysql.connector import pooling

from core.control.db import DB


class Request:
    def __init__(self):
        self.json = flask_request.get_json(silent=True) or {}
        self.args = flask_request.args.to_dict()
        self.files = flask_request.files
        self.form = flask_request.form

        self.conn = DB.get_connection()
        self.cursor = self.conn.cursor()

    def load_cursor(self):
        if self.cursor is None:
            self.cursor = self.conn.cursor()
        return self.cursor

    # Query methods
    def select_one(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())
        return self.cursor.fetchone()

    def select_all(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())
        return self.cursor.fetchall()

    def insert(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())
        return self.cursor.lastrowid

    def update(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())

    def delete(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())

    def count(self, sql: str, params=None):
        self.load_cursor()
        self.cursor.execute(sql, params or ())
        row = self.cursor.fetchone()
        return list(row.values())[0] if row else 0

    def commit(self):
        try:
            self.conn.commit()
        finally:
            self.close()

    def rollback(self):
        try:
            self.conn.rollback()
        finally:
            self.close()

    def close(self):
        """Close cursor and connection."""
        try:
            self.cursor.close()
        except:
            pass
        try:
            self.conn.close()
        except:
            pass