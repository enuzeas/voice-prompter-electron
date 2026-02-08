# Cloudflare Pages 배포 가이드

Voice Prompter를 Cloudflare Pages에 배포하는 방법입니다.

## 방법 1: Git 리포지토리 연결 (권장)

### 1. Git 리포지토리에 코드 푸시

```bash
cd voice-prompter-electron

# Git 초기화 (이미 있다면 생략)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Voice Prompter Web"

# GitHub/GitLab 리포지토리 연결
git remote add origin https://github.com/your-username/voice-prompter.git
git push -u origin main
```

### 2. Cloudflare Pages 대시보드에서 연결

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 접속
2. **Workers & Pages** → **Create application** 클릭
3. **Pages** 탭 선택
4. **Connect to Git** 클릭
5. GitHub 또는 GitLab 계정 연결
6. 리포지토리 선택

### 3. 빌드 설정

Cloudflare Pages는 자동으로 React/Vite 프로젝트를 감지합니다:

| 설정 | 값 |
|-------|-----|
| **Framework preset** | Vite |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### 4. 배포

- **Save and Deploy** 클릭
- 첫 배포는 1-2분 소요
- 배포 완료 후 `https://your-project.pages.dev` URL 제공

## 방법 2: Wrangler CLI 사용

### 1. Wrangler 설치

```bash
npm install -g wrangler
```

### 2. Cloudflare 로그인

```bash
wrangler login
```

### 3. 프로젝트 빌드

```bash
cd voice-prompter-electron
npm run build
```

### 4. 배포

```bash
# dist 디렉토리 배포
wrangler pages deploy dist
```

## 환경 변수 (필요 없음)

이 프로젝트는 클라이언트 사이드에서만 실행되므로 환경 변수가 필요하지 않습니다.

## HTTPS 자동 제공

Cloudflare Pages는 **자동으로 HTTPS**를 제공하므로:
- 음성 인식 API가 정상 작동합니다
- 추가 설정이 필요 없습니다
- 무료 SSL 인증서 포함

## 커스텀 도메인 설정

### 1. 도메인 추가

1. Cloudflare Pages 대시보드에서 프로젝트 선택
2. **Custom domains** → **Set up a custom domain** 클릭
3. 도메인 입력 (예: `prompter.yourdomain.com`)

### 2. DNS 설정

Cloudflare는 자동으로 DNS 레코드를 생성합니다:
- 이미 도메인이 Cloudflare에 있는 경우: 자동 설정
- 외부 도메인: 제공된 DNS 레코드 추가

## 프리뷰 배포

모든 Pull Request마다 자동으로 프리뷰 URL이 생성됩니다:
```
https://your-project.pages.dev/pr/123/
```

## CI/CD 설정

### `.github/workflows/cloudflare-pages.yml` 생성

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: voice-prompter
          directory: dist
```

## 성능 최적화

Cloudflare Pages는 자동으로 다음을 제공합니다:
- **전역 CDN**: 전 세계 300+ 데이터센터
- **자동 압축**: Brotli/Gzip
- **HTTP/3**: 빠른 로딩
- **이미지 최적화**: WebP 자동 변환

## 트러블슈팅

### 마이크 권한 문제

**증상**: 음성 인식이 작동하지 않음

**해결**:
1. 브라우저 설정에서 마이크 권한 확인
2. HTTPS로 접속 확인 (Cloudflare는 자동 제공)
3. Chrome/Edge 사용 권장

### 빌드 실패

**증상**: 배포 시 빌드 오류

**해결**:
```bash
# 로컬에서 빌드 테스트
npm run build

# Node.js 버전 확인
node --version  # 18+ 권장

# 캐시 클리어
rm -rf node_modules package-lock.json
npm install
```

### 404 오류

**증상**: 페이지를 찾을 수 없음

**해결**:
1. **Build output directory**가 `dist`로 설정되어 있는지 확인
2. `dist/index.html` 파일이 존재하는지 확인
3. 루트 경로에 `_redirects` 파일 확인

### 프레젠테이션 모드 팝업 차단

**증상**: 프레젠테이션 창이 열리지 않음

**해결**:
1. 브라우저 팝업 차단기 설정 확인
2. `https://your-domain.pages.dev`를 허용 사이트에 추가
3. 팝업 허용 후 다시 시도

## 모니터링

### Cloudflare Analytics

1. Pages 대시보드에서 **Analytics** 탭 선택
2. 방문자 수, 페이지 뷰, 대역폭 확인
3. 무료로 제공됨

### Real User Monitoring (RUM)

```html
<!-- index.html에 추가 -->
<script
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "YOUR_TOKEN"}'
  defer>
</script>
```

## 비용

| 플랜 | 비용 | 제한 |
|-------|------|------|
| **Free** | $0 | 무제한 대역폭, 500 빌드/월 |
| **Pro** | $20/월 | 무제한 빌드, 우선순위 지원 |

## 비교: Cloudflare vs 다른 플랫폼

| 기능 | Cloudflare | Vercel | Netlify |
|-------|-----------|---------|---------|
| **무료 대역폭** | 무제한 | 100GB/월 | 100GB/월 |
| **빌드 수 (무료)** | 500/월 | 무제한 | 300/월 |
| **전역 CDN** | 300+ 위치 | 100+ 위치 | 70+ 위치 |
| **HTTP/3** | ✅ | ✅ | ✅ |
| **이미지 최적화** | ✅ | ✅ | ✅ |
| **커스텀 도메인** | 무제한 | 무제한 | 무제한 |

## 추가 리소스

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 문서](https://developers.cloudflare.com/workers/wrangler/)
- [Vite on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site)

## 요약

Cloudflare Pages에 Voice Prompter를 배포하는 것은 매우 간단합니다:

1. Git 리포지토리에 코드 푸시
2. Cloudflare Pages에 연결
3. 자동 빌드 및 배포

**장점**:
- 무제한 대역폭 (무료)
- 전역 CDN
- 자동 HTTPS
- 빠른 배포
- 프리뷰 URL 자동 생성
