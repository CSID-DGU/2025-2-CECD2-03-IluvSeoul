from app.module.tag.data.tag import Tag

class TagMain:
    tag_id_map: dict[int, str] = None
    tag_name_map: dict[str, int] = None
    tag_list: list[Tag] = None
    @staticmethod
    def init(session):
        session.execute("SELECT id, `name` FROM _tag", ())
        tag_list: list = session.fetchall()
        TagMain.tag_id_map = {}
        TagMain.tag_name_map = {}
        TagMain.tag_list = []
        for (id, name) in tag_list:
            TagMain.tag_id_map[id] = name
            TagMain.tag_name_map[name] = id
            TagMain.tag_list.append(Tag(id, name))

    #
    # @staticmethod
    # def proc(text) -> dict[TagEnum, TagProcResult]:
    #     what_tags = [tag for group in TagMain.tag_json[0]['tag_list'] for tag in group['list']]
    #     where_tags = [tag for group in TagMain.tag_json[1]['tag_list'] for tag in group['list']]
    #     how_tags = TagMain.tag_json[2]['tag_list']
    #
    #     ##########
    #     ## get tag logic
    #     ##########
    #     prompt = f"""다음 민원 내용을 읽고 아래 태그 중에서 가장 적절한 항목을 각 항목별로 하나씩 골라줘. where는 민원이 발생한 장소, what은 문제 사항, how 처리 방법 요청이야. 태그를 붙일 땐 기관의 조직의 업무 내용을 확인하고 붙여봐. 내용에 해당하지 않으면 '기타'라고 해줘.
    #             민원 내용:\"\"\"{text}\"\"\"
    #             [Where] 중 택1:{where_tags}
    #             [What] 중 택1:{what_tags}
    #             [How] 중 택1:{how_tags}
    #             다음 형식으로 답해:
    #             Where: ...
    #             What: ...
    #             How: ...
    #             """
    #
    #     result = GPTMain.proc(content=prompt)
    #
    #     for line in result.split("\n"):
    #         if line.startswith("Where:"):
    #             where_tag = line.replace("Where:", "").strip()
    #         elif line.startswith("What:"):
    #             what_tag = line.replace("What:", "").strip()
    #         elif line.startswith("How:"):
    #             how_tag = line.replace("How:", "").strip()
    #
    #     ##########
    #     ## tag to int logic
    #     ##########
    #     where_tag_index = where_tags.index(where_tag) if where_tag in where_tags else -1
    #     what_tag_index = what_tags.index(what_tag) if what_tag in what_tags else -1
    #     how_tag_index = how_tags.index(how_tag) if how_tag in how_tags else -1
    #
    #     where_tag_int = 1 << where_tag_index if where_tag_index >= 0 else 0
    #     what_tag_int = 1 << what_tag_index if what_tag_index >= 0 else 0
    #     how_tag_int = 1 << how_tag_index if how_tag_index >= 0 else 0
    #
    #     return {
    #         TagEnum.what: TagProcResult(what_tag, what_tag_index + 1, what_tag_int),
    #         TagEnum.where: TagProcResult(where_tag, where_tag_index + 1, where_tag_int),
    #         TagEnum.how: TagProcResult(how_tag, how_tag_index + 1, how_tag_int),
    #     }