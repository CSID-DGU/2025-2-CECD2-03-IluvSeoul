from flask import jsonify

from app.module.inquiry.inquiry_logic import InquiryLogic
from core.action.decorators import *
from core.action.request import Request


@action('inquiry')
class InquiryAction:
    @action_method('upload/demo')
    def upload_demo(self, request: Request):
        return '''
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>업로드</title>
        </head>
        <body>
          <h1>업로드</h1>
          <form id="uploadForm" action="/seoul/inquiry/upload" method="post" enctype="multipart/form-data">
            <label for="fileInput">업로드할 파일 선택:</label>
            <input type="file" id="fileInput" name="file" accept="*/*" required />
            <button type="submit">업로드</button>
          </form>
        </body>
        </html>
        '''

    @action_method('upload', ['POST'])
    def upload(self, request: Request):
        (inquiry, tagger) = InquiryLogic.inquiry_receive(request)

        return jsonify({
            'inquiry': inquiry.id,
            'tagger': tagger
        })

    @action_method('after_process')
    def after_process(self, request: Request):
        inquiry_id = int(request.args['inquiry_id'])
        return InquiryLogic.inquiry_department(request, inquiry_id)
