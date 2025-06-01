import os.path

import requests
import json

from abc import ABC, abstractmethod
from openai import OpenAI

client = OpenAI(api_key="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")


class Minwon(ABC):
    def __init__(self, minwon_ID):
        self.minwon_ID=minwon_ID
    
    def getMinwonID(self):
        return self.minwon_ID



class Minwon_Tagging(Minwon):
    def setString(self, full_text):
        self.full_text = full_text

    def setStringTag(self, request):
        output = request.select_one("SELECT * FROM _json", ())

        tag_data = json.loads(output[0])
        where_tags = [tag for group in tag_data[1]['tag_list'] for tag in group['list']]
        what_tags = [tag for group in tag_data[0]['tag_list'] for tag in group['list']]
        how_tags = tag_data[2]['tag_list']

        prompt = f"""다음 민원 내용을 읽고 아래 태그 중에서 가장 적절한 항목을 각 항목별로 하나씩 골라줘. where는 민원이 발생한 장소, what은 문제 사항, how 처리 방법 요청이야. 태그를 붙일 땐 기관의 조직의 업무 내용을 확인하고 붙여봐. 내용에 해당하지 않으면 '기타'라고 해줘.
        민원 내용:\"\"\"{self.full_text}\"\"\"
        [Where] 중 택1:{where_tags}
        [What] 중 택1:{what_tags}
        [How] 중 택1:{how_tags}
        다음 형식으로 답해:
        Where: ...
        What: ...
        How: ...
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        result = response.choices[0].message.content.strip()

        for line in result.split("\n"):
            if line.startswith("Where:"):
                self.where_tag = line.replace("Where:", "").strip()
            elif line.startswith("What:"):
                self.what_tag = line.replace("What:", "").strip()
            elif line.startswith("How:"):
                self.how_tag = line.replace("How:", "").strip()

    def setIntTag(self, request):
        output = request.select_one("SELECT * FROM _json", ())

        tag_data = json.loads(output[0])

        where_tags = [tag for group in tag_data[1]['tag_list'] for tag in group['list']]
        what_tags = [tag for group in tag_data[0]['tag_list'] for tag in group['list']]
        how_tags = tag_data[2]['tag_list']


        self.where_tag_index = where_tags.index(self.where_tag) if self.where_tag in where_tags else -1
        self.what_tag_index = what_tags.index(self.what_tag) if self.what_tag in what_tags else -1
        self.how_tag_index = how_tags.index(self.how_tag) if self.how_tag in how_tags else -1

        self.where_tag_int = 1 << self.where_tag_index if self.where_tag_index >= 0 else 0
        self.what_tag_int = 1 << self.what_tag_index if self.what_tag_index >= 0 else 0
        self.how_tag_int = 1 << self.how_tag_index if self.how_tag_index >= 0 else 0


    def getTagSummary(self):
        return {
            "Where": self.where_tag,
            "What": self.what_tag,
            "How": self.how_tag,
            "Where_bit": bin(self.where_tag_int),
            "What_bit": bin(self.what_tag_int),
            "How_bit": bin(self.how_tag_int)
        }

    def getWhereTag(self):
        return self.where_tag

    def getWhatTag(self):
        return self.what_tag

    def getHowTag(self):
        return self.how_tag

    def getIntTag(self):
        return {
            'what': self.what_tag_int,
            'where': self.where_tag_int,
            'how': self.how_tag_int,
        }
