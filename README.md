# 마이니치 니홍고 (Mainichi Nihongo) - React Frontend

매일 새로운 일본어와 만나는 시간! SpringBoot Thymeleaf에서 React + Vite로 마이그레이션된 프론트엔드 프로젝트입니다.

## 🌸 프로젝트 소개

마이니치 니홍고는 일본어 학습자를 위한 일일 학습 서비스입니다. 매일 이메일로 전달되는 일본어 학습 콘텐츠를 웹에서도 확인할 수 있습니다.

### 주요 기능
- 📅 매일 새로운 일본어 학습 콘텐츠
- 🗣️ TTS(Text-to-Speech) 기능
- 🗾 일본 문화와 방언 소개
- 💬 실전 회화 예시
- 📱 반응형 웹 디자인

## 🚀 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 (CSS Variables, Flexbox, Grid)
- **Fonts**: Noto Sans KR, Gaegu

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 페이지 헤더
│   ├── Footer.tsx      # 페이지 푸터
│   ├── JapaneseText.tsx # 일본어 텍스트 + TTS 버튼
│   ├── Alert.tsx       # 알림 메시지
│   └── Layout.tsx      # 레이아웃 래퍼
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx    # 메인 랜딩 페이지
│   ├── LearningPage.tsx # 학습 페이지
│   ├── DetailedLearningPage.tsx # 상세 학습 페이지
│   └── UnsubscribePage.tsx # 구독 취소 페이지
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── styles/             # 글로벌 스타일
│   └── global.css
└── utils/              # 유틸리티 함수 (향후 확장)
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 미리보기
```bash
npm run preview
```

## 📱 페이지 구성

### 1. 홈페이지 (`/`)
- 서비스 소개
- 구독 신청 폼
- 샘플 콘텐츠 미리보기 (탭 전환)
- 특징 및 통계

### 2. 학습 페이지 (`/learning/:date?`)
- 간단한 일본어 학습 콘텐츠
- 핵심 단어, 회화, 문화, 방언 섹션

### 3. 상세 학습 페이지 (`/detailed/:date?`)
- 더 자세한 학습 콘텐츠
- 섹션별 상세 정보

### 4. 구독 취소 페이지 (`/unsubscribe`)
- 구독 취소 폼

## 🎨 디자인 특징

- **그라데이션 배경**: 아름다운 그라데이션과 애니메이션 효과
- **카드 기반 레이아웃**: 깔끔한 카드 디자인
- **일본어 폰트**: 일본어 텍스트에 최적화된 표시
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **애니메이션**: 부드러운 전환 효과와 호버 애니메이션

## 🔧 API 연동

현재는 샘플 데이터를 사용하고 있으며, 실제 API 연동을 위해서는 다음 엔드포인트를 구현해야 합니다:

- `POST /api/subscribe` - 구독 신청
- `POST /api/unsubscribe` - 구독 취소
- `GET /api/tts/audio` - TTS 음성 생성
- `GET /api/content/:date` - 학습 콘텐츠 조회

## 📧 이메일 템플릿

이메일 발송은 기존 SpringBoot Thymeleaf 템플릿을 그대로 유지합니다:
- 이메일 클라이언트 호환성 보장
- 서버사이드 렌더링의 안정성
- 기존 이메일 발송 로직 유지

## 🌟 향후 계획

- [ ] PWA (Progressive Web App) 지원
- [ ] 다크 모드 지원
- [ ] 학습 진도 추적
- [ ] 즐겨찾기 기능
- [ ] 오프라인 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

🌸 **마이니치 니홍고**와 함께 매일 새로운 일본어를 만나보세요! 🌸