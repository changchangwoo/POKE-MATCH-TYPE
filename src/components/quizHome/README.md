# QuizHome 컴포넌트 가이드

## 개요

퀴즈 메인 페이지(랜딩 페이지)를 구성하는 컴포넌트들입니다.
- **경로**: `/quiz` (새로운 퀴즈 랜딩 페이지)
- **기존 퀴즈 플로우**: `/quiz/play` (QuizReady → QuizIntro → QuizMain → QuizEnd)
- **레이아웃**: 데스크톱(좌우 38%/62%) ↔ 모바일(상하 스택)

작업일: 2024-02-05

---

## 파일 구조

```
src/components/quizHome/
├── QuizDashboard.tsx          # 좌측 대시보드 (학습 현황, 최근 결과, 차트)
├── QuizSelectionList.tsx      # 우측 퀴즈 선택 리스트
├── QuizSelectionCard.tsx      # 개별 퀴즈 카드 컴포넌트
├── index.ts                   # Barrel export
└── README.md                  # 이 파일
```

```
src/pages/
└── QuizHome.tsx               # 메인 페이지 (두 영역을 결합)
```

---

## 컴포넌트 상세

### 1. QuizHome.tsx (페이지)

**위치**: `src/pages/QuizHome.tsx`

**역할**: 퀴즈 랜딩 페이지의 메인 컨테이너

**구조**:
```
QuizHome
├── QuizDashboard (좌측 38%)
└── QuizSelectionList (우측 62%)
```

**레이아웃 패턴**:
- **데스크톱** (>768px): Flex row, 38%/62% 비율
- **모바일** (≤768px): Flex column, 100% width
- **Gap**: 20px

**참조 패턴**: `src/pages/Type.tsx` (lines 75-94)의 two-column 레이아웃

---

### 2. QuizDashboard.tsx

**위치**: `src/components/quizHome/QuizDashboard.tsx`

**역할**: 사용자의 퀴즈 학습 현황을 보여주는 대시보드

**구성 요소**:

#### 2.1. 학습 현황 카드
- 3칸 그리드 레이아웃
- **총 시도**: 전체 퀴즈 시도 횟수
- **최고 점수**: 역대 최고 점수 (x/10)
- **평균 점수**: 평균 점수 (x.x/10)
- 색상: `var(--point)` (강조 색상)

#### 2.2. 최근 퀴즈 결과 카드
- 최근 4개의 퀴즈 결과 리스트
- 각 항목: 날짜 + 점수
- 점수 색상:
  - 7점 이상: `var(--type12)` (초록)
  - 7점 미만: `var(--type14)` (빨강)

#### 2.3. 학습 추이 카드 (차트 placeholder)
- 향후 차트 라이브러리 통합 예정 공간
- **모바일에서 숨김** (`display: none`)
- 점선 테두리로 placeholder 표시

**반응형 동작**:
- **데스크톱**: `position: sticky`, `top: 80px` (네비게이션 아래 고정)
- **모바일**: `position: static` (일반 흐름)

**Mock 데이터 구조**:
```typescript
interface QuizProgress {
  totalAttempts: number;
  bestScore: number;
  averageScore: number;
  recentQuizzes: Array<{
    date: string;      // "YYYY-MM-DD" 형식
    score: number;     // 맞춘 개수
    total: number;     // 전체 문제 수
  }>;
}
```

**향후 작업**:
- localStorage 연동 (키: `quizProgress` 권장)
- QuizEnd 컴포넌트에서 완료 시 데이터 저장
- 차트 라이브러리 통합 (recharts 추천)

---

### 3. QuizSelectionList.tsx

**위치**: `src/components/quizHome/QuizSelectionList.tsx`

**역할**: 사용 가능한 퀴즈 옵션 목록 표시 및 선택 처리

**구성 요소**:
- **섹션 타이틀**: "퀴즈 선택"
- **Featured 퀴즈**: 추천 퀴즈 (상단 강조)
- **일반 퀴즈들**: 5개의 일반 퀴즈 카드

**퀴즈 옵션 데이터 구조**:
```typescript
{
  id: string;                          // 고유 식별자
  title: string;                       // 퀴즈 제목
  description: string;                 // 퀴즈 설명
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;               // 문제 수
  isFeatured?: boolean;                // 추천 여부
}
```

**현재 포함된 퀴즈**:
1. **종합 타입 상성 퀴즈** (Featured, 보통, 10문제)
2. 데미지 배율 퀴즈 (쉬움, 10문제)
3. 타입 추론 퀴즈 (보통, 10문제)
4. 복합 타입 피해량 퀴즈 (어려움, 10문제)
5. 약점 찾기 퀴즈 (쉬움, 8문제)
6. 저항 타입 퀴즈 (보통, 8문제)

**동작**:
- 카드 클릭 시 `navigate("/quiz/play")` 호출
- 기존 Quiz 컴포넌트 플로우로 진입

**향후 작업**:
- 퀴즈 ID를 URL 파라미터로 전달 (`/quiz/play?type=featured`)
- Quiz 컴포넌트에서 퀴즈 타입에 따른 문제 생성 로직
- 퀴즈 옵션을 별도 상수 파일로 분리
- 필터/검색 기능 추가

---

### 4. QuizSelectionCard.tsx

**위치**: `src/components/quizHome/QuizSelectionCard.tsx`

**역할**: 개별 퀴즈 옵션을 표시하는 클릭 가능한 카드

**Props**:
```typescript
interface QuizSelectionCardProps {
  quiz: QuizOption;
  isFeatured?: boolean;
  onSelect: (quizId: string) => void;
}
```

**구성 요소**:

#### 4.1. 카드 헤더
- **제목**: Featured일 때 더 큰 폰트 (`--fontLarge` vs `--fontMedium`)
- **난이도 배지**:
  - 쉬움: `var(--type12)` (초록)
  - 보통: `var(--type13)` (노랑)
  - 어려움: `var(--type14)` (빨강)

#### 4.2. 설명
- 퀴즈 내용 설명 텍스트
- 약간 투명도 적용 (opacity: 0.8)

#### 4.3. 카드 푸터
- **문제 수**: "문제 수: X개" 표시
- **추천 배지**: Featured일 때만 표시, `var(--point)` 색상

**스타일 특징**:
- Featured 카드:
  - 더 큰 padding (24px vs 20px)
  - 더 큰 min-height (160px vs 130px)
  - 2px border with `--point` 색상
- 일반 카드:
  - 1px border with `--border` 색상

**인터랙션**:
- **Hover**: 위로 2px 이동 (`translateY(-2px)`)
- **Hover**: 그림자 추가 (`box-shadow`)
- **Hover**: Border 색상 변경 (`--point`)
- **Active**: 원래 위치로 복귀
- **모바일**: 최소 터치 영역 44px 보장

**참조 패턴**:
- Button styling: `src/components/commons/SelectType.tsx` (lines 182-195)
- Card container: `src/components/match/MatchCard.tsx`

---

## 반응형 디자인

### 브레이크포인트: 768px

### 데스크톱 (>768px)
```
┌────────────────┬─────────────────────────┐
│  Dashboard     │  Selection List         │
│  (38%, sticky) │  (62%)                  │
│                │                         │
│  ┌──────────┐  │  ┌──────────────────┐  │
│  │학습 현황 │  │  │Featured Quiz     │  │
│  └──────────┘  │  └──────────────────┘  │
│  ┌──────────┐  │  ┌──────────────────┐  │
│  │최근 결과 │  │  │Regular Quiz 1    │  │
│  └──────────┘  │  └──────────────────┘  │
│  ┌──────────┐  │  ┌──────────────────┐  │
│  │학습 추이 │  │  │Regular Quiz 2    │  │
│  └──────────┘  │  └──────────────────┘  │
└────────────────┴─────────────────────────┘
```

### 모바일 (≤768px)
```
┌─────────────────┐
│  Dashboard      │
│  ┌───────────┐  │
│  │학습 현황  │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │최근 결과  │  │
│  └───────────┘  │
│  (차트 숨김)    │
├─────────────────┤
│  Selection List │
│  ┌───────────┐  │
│  │Featured   │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │Quiz 1     │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │Quiz 2     │  │
│  └───────────┘  │
└─────────────────┘
```

---

## 스타일 시스템

### 사용된 CSS 변수

**색상**:
- `--background`: 카드 배경
- `--border`: 카드 테두리
- `--text`: 기본 텍스트
- `--point`: 강조 색상 (Featured, 통계)
- `--type12`: 초록 (쉬움, 좋은 점수)
- `--type13`: 노랑 (보통)
- `--type14`: 빨강 (어려움, 나쁜 점수)

**폰트 크기**:
- `--fontTitle`: 섹션 타이틀
- `--fontExtra`: 큰 숫자 (통계)
- `--fontLarge`: Featured 카드 제목
- `--fontMedium`: 일반 텍스트, 카드 제목
- `--fontSmall`: 작은 텍스트, 배지, 부가정보

**출처**: `src/styles/globalStyles.ts`

---

## 라우팅 변경사항

### App.tsx 수정 내용

**변경 전**:
```typescript
<Route path="/quiz" element={<Quiz />} />
```

**변경 후**:
```typescript
<Route path="/quiz" element={<QuizHome />} />
<Route path="/quiz/play" element={<Quiz />} />
```

**라우팅 구조**:
- `/quiz` → QuizHome (새 랜딩 페이지)
- `/quiz/play` → Quiz (기존 플로우: Ready → Intro → Main → End)

---

## 데이터 연동 계획

### localStorage 구조 (권장)

**키**: `pokemonQuizProgress`

**값 예시**:
```json
{
  "totalAttempts": 12,
  "bestScore": 8,
  "averageScore": 6.5,
  "recentQuizzes": [
    {
      "date": "2024-02-05",
      "quizId": "featured",
      "score": 7,
      "total": 10,
      "timestamp": 1707123600000
    }
  ],
  "quizHistory": {
    "featured": {
      "attempts": 3,
      "bestScore": 8,
      "lastPlayed": "2024-02-05"
    }
  }
}
```

### 연동 작업 순서

1. **QuizDashboard 수정**:
   - localStorage에서 데이터 로드
   - 데이터 없을 시 초기값 표시

2. **QuizEnd 컴포넌트 수정**:
   - 퀴즈 완료 시 결과를 localStorage에 저장
   - totalAttempts 증가
   - recentQuizzes 배열에 추가 (최신 10개 유지)
   - bestScore, averageScore 업데이트

3. **QuizSelectionList 확장**:
   - 각 퀴즈별 시도 횟수, 최고 점수 표시
   - "새로운 퀴즈" 배지 추가

---

## 참조한 기존 파일

### 레이아웃 패턴
- `src/pages/Type.tsx:75-94` - Two-column flex layout
- `src/components/match/MatchMain.tsx` - Responsive column pattern

### 카드 스타일
- `src/components/match/MatchCard.tsx:79-112` - Card container
- `src/components/commons/TypeCard.tsx:104-114` - Grid layout

### 버튼/인터랙션
- `src/components/commons/SelectType.tsx:182-195` - Button styling
- `src/components/quiz/QuizReady.tsx:88-101` - Quiz button pattern

### 테마/스타일
- `src/styles/globalStyles.ts` - CSS 변수, 테마 정의

---

## 향후 개선사항

### 단기 (다음 스프린트)
1. **localStorage 연동**: 실제 퀴즈 데이터 저장/로드
2. **퀴즈 타입 전달**: URL 파라미터로 선택된 퀴즈 타입 전달
3. **다국어화**: 한글 텍스트를 `const/language_text.ts`로 이동

### 중기
4. **차트 통합**: recharts로 학습 추이 시각화
5. **퀴즈 히스토리 모달**: 상세 결과 확인 기능
6. **필터링**: 난이도별, 완료/미완료 필터

### 장기
7. **퀴즈 타입 확장**: 더 많은 퀴즈 변형 추가
8. **성취 시스템**: 배지, 스트릭, 목표 설정
9. **통계 페이지**: 상세한 학습 분석 및 리포트

---

## 테스트 체크리스트

### 레이아웃
- [ ] 데스크톱에서 38%/62% 비율 확인
- [ ] 모바일에서 세로 스택 확인
- [ ] Gap 20px 적용 확인

### 반응형
- [ ] 768px 브레이크포인트 동작
- [ ] Dashboard sticky 동작 (데스크톱 O, 모바일 X)
- [ ] 차트 카드 모바일 숨김 확인

### 인터랙션
- [ ] 퀴즈 카드 클릭 → `/quiz/play` 이동
- [ ] Featured 카드 시각적 강조
- [ ] 호버 효과 (translateY, shadow, border)
- [ ] 모바일 터치 영역 44px 이상

### 스타일
- [ ] Light/Dark 모드 테마 적용
- [ ] 난이도별 색상 적용 (type12, type13, type14)
- [ ] 점수별 색상 (7점 이상 초록, 미만 빨강)

---

## 문제 해결 가이드

### 문제: 차트 카드가 모바일에서 보임
**해결**: QuizDashboard.tsx의 `visualizationCard` 스타일에 `@media (max-width: 768px) { display: none; }` 확인

### 문제: Dashboard가 sticky 되지 않음
**해결**:
1. 부모 컨테이너에 `overflow: hidden` 없는지 확인
2. `top` 값이 네비게이션 높이와 맞는지 확인 (현재 80px)

### 문제: 카드 클릭이 안 됨
**해결**: QuizSelectionCard가 `<button>` 요소인지 확인, CSS `pointer-events` 체크

### 문제: 테마 색상이 안 나옴
**해결**:
1. `Global styles={globalStyles(theme.type)}` App.tsx에 적용 확인
2. CSS 변수명 오타 확인 (`var(--point)` 등)

---

## 추가 참고사항

### 컴포넌트 명명 규칙
- **Page 컴포넌트**: PascalCase, 단수형 (QuizHome)
- **UI 컴포넌트**: PascalCase, 역할 명시 (QuizDashboard, QuizSelectionCard)
- **Styled 요소**: camelCase (cardContainer, statsGrid)

### 파일 구조 규칙
- Pages: `src/pages/`
- 재사용 컴포넌트: `src/components/{도메인}/`
- Barrel export: 각 도메인 폴더에 `index.ts`

### 스타일 규칙
- Emotion CSS-in-JS 사용
- CSS 변수 우선 사용 (하드코딩 최소화)
- 모바일 퍼스트 아님, 데스크톱 기준 + @media로 모바일 오버라이드

---

## 마지막 업데이트

- **날짜**: 2024-02-05
- **작성자**: Claude Code Agent
- **버전**: 1.0.0
- **관련 이슈**: 퀴즈 메인 페이지 레이아웃 설계
