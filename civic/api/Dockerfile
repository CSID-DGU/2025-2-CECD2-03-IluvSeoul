# Python 3.13.3 베이스 이미지 사용
FROM python:3.13.3-slim

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 업데이트 및 필요한 의존성 설치
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# requirements.txt 파일 복사
COPY requirements.txt .

# Python 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 프로젝트 파일 복사
COPY . .

# Flask 애플리케이션 실행을 위한 환경변수 설정
ENV FLASK_APP=app
ENV FLASK_ENV=production

# 포트 설정
EXPOSE 5000

# 애플리케이션 실행
CMD ["flask", "run", "--host=0.0.0.0"]