from MinwonClass import Minwon_STT, Minwon_Tagging  # 클래스가 들어있는 파일 이름 (예: your_module.py)
import os

def main():
    # STT 객체 생성 및 실행
    stt = Minwon_STT(minwon_ID="001")
    audio_path = "./record_out(1).wav"  # 같은 디렉토리에 있는 파일 기준

    try:
        text = stt.doSTT(audio_path, client_secret="610954bcc970440f9c28080785ed1348")
        print("🟢 STT 결과:")
        print(text)
    except Exception as e:
        print("🔴 STT 오류:", e)
        return

    # GPT 태깅 실행
    tagger = Minwon_Tagging(minwon_ID="001")
    tagger.setString(text)

    try:
        tagger.setStringTag()
        tagger.setIntTag()
    except Exception as e:
        print("🔴 GPT 태깅 오류:", e)
        return

    # 결과 출력
    print("\n🏷️ 태그 결과:")
    print("📍 Where:", tagger.getWhereTag())
    print("📌 What:", tagger.getWhatTag())
    print("⚙️ How:", tagger.getHowTag())

if __name__ == "__main__":
    main()
