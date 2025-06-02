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
    def proc(model = 'gpt-4', content = '') -> str:
        response = GPTMain.client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": content}]
        )
        return response.choices[0].message.content.strip()