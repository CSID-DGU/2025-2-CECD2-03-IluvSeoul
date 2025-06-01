import json

from app.module.gpt.gpt_main import GPTMain
from app.module.tag.data.tag import Tag

class TagProcResult:
    def __init__(self):
        self.what_tag = ''
        self.where_tag = ''
        self.how_tag = ''
        self.what_tag_int = 0
        self.where_tag_int = 0
        self.how_tag_int = 0

class TagMain:
    tag_data: dict
    tag_json = None
    @staticmethod
    def init(session):
        TagMain.tag_data = {
            0: {}, # what
            1: {}, # where
            2: {}, # how
            'what': {},  # what
            'where': {},  # where
            'how': {}  # how
        }
        type_to_int = {
            'what': 0,
            'where': 1,
            'how': 2
        }
        session.execute("SELECT id, `type`, `name` FROM _tag", ())
        tag_data: list = session.fetchall()
        for (id, type, name) in tag_data:
            ntype = type_to_int[type]
            TagMain.tag_data[type][name] = Tag(id, type, name)
            TagMain.tag_data[ntype][name] = Tag(id, type, name)

        session.execute("SELECT `value` FROM _json", ())
        TagMain.tag_json = json.loads(session.fetchone()[0])

    @staticmethod
    def proc(text) -> TagProcResult:
        what_tags = [tag for group in TagMain.tag_json[0]['tag_list'] for tag in group['list']]
        where_tags = [tag for group in TagMain.tag_json[1]['tag_list'] for tag in group['list']]
        how_tags = TagMain.tag_json[2]['tag_list']

        ##########
        ## get tag logic
        ##########
        prompt = f"""다음 민원 내용을 읽고 아래 태그 중에서 가장 적절한 항목을 각 항목별로 하나씩 골라줘. where는 민원이 발생한 장소, what은 문제 사항, how 처리 방법 요청이야. 태그를 붙일 땐 기관의 조직의 업무 내용을 확인하고 붙여봐. 내용에 해당하지 않으면 '기타'라고 해줘.
                민원 내용:\"\"\"{text}\"\"\"
                [Where] 중 택1:{where_tags}
                [What] 중 택1:{what_tags}
                [How] 중 택1:{how_tags}
                다음 형식으로 답해:
                Where: ...
                What: ...
                How: ...
                """

        result = GPTMain.proc(content=prompt)

        ret = TagProcResult()
        for line in result.split("\n"):
            if line.startswith("Where:"):
                ret.where_tag = line.replace("Where:", "").strip()
            elif line.startswith("What:"):
                ret.what_tag = line.replace("What:", "").strip()
            elif line.startswith("How:"):
                ret.how_tag = line.replace("How:", "").strip()

        ##########
        ## tag to int logic
        ##########
        where_tag_index = where_tags.index(ret.where_tag) if ret.where_tag in where_tags else -1
        what_tag_index = what_tags.index(ret.what_tag) if ret.what_tag in what_tags else -1
        how_tag_index = how_tags.index(ret.how_tag) if ret.how_tag in how_tags else -1

        ret.where_tag_int = 1 << where_tag_index if where_tag_index >= 0 else 0
        ret.what_tag_int = 1 << what_tag_index if what_tag_index >= 0 else 0
        ret.how_tag_int = 1 << how_tag_index if how_tag_index >= 0 else 0

        return ret