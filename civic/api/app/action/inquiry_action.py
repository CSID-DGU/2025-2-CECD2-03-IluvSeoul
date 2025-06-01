from flask import jsonify

from app.module.inquiry.inquiry_logic import InquiryLogic
from core.action.decorators import *


@action('inquiry')
class InquiryAction:
    @action_method('upload/demo')
    def upload(self, request):
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
    def upload2(self, request):
        tagger = InquiryLogic.inquiry_receive(request)

        return jsonify({
            'what': tagger.what_tag,
            'where': tagger.where_tag,
            'how': tagger.how_tag,
            'what_int': tagger.what_tag_int,
            'where_int': tagger.where_tag_int,
            'how_int': tagger.how_tag_int
        })