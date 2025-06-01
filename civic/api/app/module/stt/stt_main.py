import json

import requests


class STTMain:
    url: str
    headers: dict[str, str]
    params: dict[str, str]

    @staticmethod
    def init():
        STTMain.url = "https://clovaspeech-gw.ncloud.com/external/v1/11508/187f49a7bd5739c48d2d608bff99a38ee5464387214d715ecd48ede7f16124ad/recognizer/upload"
        STTMain.headers = {
            "X-CLOVASPEECH-API-KEY": "610954bcc970440f9c28080785ed1348",
            "Accept": "application/json"
        }
        STTMain.params = {
            "language": "ko-KR",
            "completion": "sync",
            "diarization": {"enable": False},
            "fullText": True,
            "wordAlignment": False
        }

    @staticmethod
    def proc(audio_path: str):
        try:
            files = {
                'media': ('audio.wav', open(audio_path, 'rb'), 'audio/wav'),
                'params': (None, json.dumps(STTMain.params), 'application/json')
            }

            response = requests.post(STTMain.url, headers=STTMain.headers, files=files)
        finally:
            files['media'][1].close()

        if response.status_code != 200:
            raise Exception(f"STT_fail_code:{response.status_code}_{response.text}")

        print(response.status_code, response.json().get("text"))
        result = response.json()
        full_text = result.get("text", "")

        if not full_text:
            raise Exception("STT_empty_text")

        return full_text