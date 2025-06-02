# 기본 이미지로 Node.js 22.14 사용
FROM node:22.14-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 프로덕션용 빌드
RUN npm run build

# Vite를 위한 포트 설정
EXPOSE 5173

# 개발 서버 실행
CMD ["npm", "run", "serve"]