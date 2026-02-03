# Voice Prompter 실행 가이드

## 개발 모드 실행

### 중요: 기존 프로세스 종료
`npm run electron:dev`를 실행하기 전에 **반드시** 기존 `npm run dev`를 종료하세요!

```bash
# 1. 기존 npm run dev 종료 (Ctrl+C)

# 2. Electron 개발 모드 실행
npm run electron:dev
```

이 명령어는 Vite 개발 서버와 Electron을 동시에 시작합니다.

## 빌드 및 배포

### Windows Portable 버전 (권장)
```bash
npm run electron:build
```

결과물: `release/Voice Prompter 1.0.0.exe` (설치 불필요, 바로 실행 가능)

### 설치 프로그램 버전
```bash
npm run electron:build:installer
```

**주의**: Windows에서 관리자 권한 또는 개발자 모드가 필요할 수 있습니다.

## 문제 해결

### 포트 충돌
- 5173 포트가 사용 중이면 기존 프로세스를 종료하세요
- `netstat -ano | findstr :5173` 로 포트 사용 확인

### 빌드 실패 (심볼릭 링크 오류)
- Portable 버전 사용: `npm run electron:build`
- 또는 Windows 개발자 모드 활성화:
  1. 설정 → 개발자용 → 개발자 모드 ON

### 검은 화면
- DevTools 확인 (자동으로 열림)
- 콘솔에 "Loading URL: http://localhost:5173" 확인
