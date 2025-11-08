from openai import OpenAI

from core.setting import Setting


class GPTMain:
    client = None

    @staticmethod
    def init():
        GPTMain.client = OpenAI(
            api_key=Setting.get('gpt.key')
        )

    @staticmethod
    def proc(system: str, user: str, model='gpt-4', max_retries: int = 3) -> dict[str, object]:
        import json, time
        messages = [{"role": "system", "content": system}, {"role": "user", "content": user}]
        last_err = None
        for attempt in range(1, max_retries + 1):
            try:
                try:
                    comp = GPTMain.client.chat.completions.create(
                        model=model, temperature=0.1, messages=messages,
                        response_format={"type": "json_object"}
                    )
                    txt = comp.choices[0].message.content.strip()
                    return json.loads(txt)
                except Exception as e1:
                    last_err = e1
                    comp = GPTMain.client.chat.completions.create(
                        model=model, temperature=0.1, messages=messages
                    )
                    txt = comp.choices[0].message.content.strip().strip("`").strip()
                    if txt.lower().startswith("json"):
                        txt = txt[4:].strip()
                    if not txt.startswith("{"):
                        first = txt.find("{")
                        last = txt.rfind("}")
                        if first != -1 and last != -1 and last > first:
                            txt = txt[first:last + 1]
                    return json.loads(txt)
            except Exception as e:
                last_err = e
                time.sleep(1.2 * (2 ** (attempt - 1)))
        raise RuntimeError(f"GPT 호출 실패: {last_err}")
