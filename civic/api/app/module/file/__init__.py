from datetime import datetime
import os

from werkzeug.utils import secure_filename

from core.action.request import Request

class FileManager:
    __folder = None

    @staticmethod
    def init():
        FileManager.__folder = os.path.join(os.getcwd(), 'uploads')
        if not os.path.exists(FileManager.__folder):
            os.makedirs(FileManager.__folder)

    @staticmethod
    def save(req: Request, file_name: str = None):
        if not req.files:
            raise RuntimeError('invalid_file')

        file = next(iter(req.files.values()), None)
        original_filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        name, ext = os.path.splitext(original_filename)
        filename = f"{name}_{timestamp}{ext}"

        file_path = os.path.join(FileManager.__folder, filename)

        file.save(file_path)

