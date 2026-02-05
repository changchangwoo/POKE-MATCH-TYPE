# Quiz 페이지 레이아웃 변경 가이드

## 개요

Quiz 페이지(`/quiz/play`)의 레이아웃을 변경하여 좌우 분할 구조로 개편했습니다.
- **좌측 (65%)**: 퀴즈 콘텐츠 (QuizReady, QuizIntro, QuizMain, QuizEnd)
- **우측 (35%)**: 랭킹 리스트 (명예의 전당)
- **반응형**: 데스크톱(좌우) → 모바일(상하)

작업일: 2024-02-05

---

## 변경된 파일

### 1. 신규 파일
- `src/components/quiz/RankingList.tsx` - 랭킹 리스트 컴포넌트

### 2. 수정된 파일
- `src/pages/Quiz.tsx` - Two-column 레이아웃 적용
- `src/components/quiz/index.ts` - RankingList export 추가

---

## 레이아웃 구조

### Quiz.tsx (페이지)

```
Quiz Page
├── QuizContentWrapper (좌측 65%)
│   └── QuizContainer
│       ├── Title (h1)
│       └── Dynamic Content (section에 따라)
│           ├── QuizReady (section 0)
│           ├── QuizIntro (section 1)
│           ├── QuizMain (section 2)
│           └── QuizEnd (section 3)
│
└── RankingWrapper (우측 35%)
    └── RankingList
```

### 레이아웃 비율
- **데스크톱**: 65% (퀴즈) / 35% (랭킹)
- **모바일**: 100% (퀴즈) / 100% (랭킹), 상하 스택

### 브레이크포인트
- **768px**: 데스크톱 ↔ 모바일 전환

---

## RankingList 컴포넌트

### 위치
`src/components/quiz/RankingList.tsx`

### 역할
- 퀴즈 최고 점수 순위 표시
- 실시간 랭킹 정보 제공 (현재는 더미 데이터)
- 사용자의 현재 순위 표시

### 구성 요소

#### 3.1. 헤더
- **제목**: "명예의 전당"
- **부제**: "최고 점수 순위"

#### 3.2. 랭킹 리스트
- 상위 10명 표시
- 각 항목 구성:
  - **순위 배지**: 1~3위는 메달 이모지 (🥇🥈🥉)
  - **사용자명**: 닉네임
  - **날짜**: 기록 달성일 (YYYY-MM-DD)
  - **점수**: X/10 형식

#### 3.3. 스타일 특징
- **1위**: 금색 테두리 (#FFD700), 그라데이션 배경
- **2위**: 은색 테두리 (#C0C0C0), 그라데이션 배경
- **3위**: 동메달 테두리 (#CD7F32), 그라데이션 배경
- **4위 이하**: 기본 테두리, 호버 시 우측 이동 효과

#### 3.4. 푸터
- 현재 사용자의 최고 기록 표시
- 예: "내 최고 기록: 8점 (15위)"

### 반응형 동작
- **데스크톱**: `position: sticky`, `top: 80px` (스크롤 시 상단 고정)
- **모바일**: `position: static` (일반 흐름)

### 스크롤
- 최대 높이: 600px
- 내용이 넘치면 세로 스크롤
- 커스텀 스크롤바 스타일 적용

---

## 더미 데이터 구조

### RankingItem Interface

```typescript
interface RankingItem {
  rank: number;        // 순위 (1~10)
  username: string;    // 사용자명
  score: number;       // 점수 (0~10)
  date: string;        // 날짜 (YYYY-MM-DD)
}
```

### 현재 더미 데이터

```typescript
const mockRankings: RankingItem[] = [
  { rank: 1, username: "피카츄마스터", score: 10, date: "2024-02-05" },
  { rank: 2, username: "이상해씨", score: 9, date: "2024-02-04" },
  { rank: 3, username: "꼬부기킹", score: 9, date: "2024-02-03" },
  { rank: 4, username: "파이리덕후", score: 8, date: "2024-02-05" },
  { rank: 5, username: "뮤츠킬러", score: 8, date: "2024-02-02" },
  { rank: 6, username: "망나뇽러버", score: 8, date: "2024-02-01" },
  { rank: 7, username: "잠만보123", score: 7, date: "2024-02-04" },
  { rank: 8, username: "갸라도스", score: 7, date: "2024-01-31" },
  { rank: 9, username: "라프라스팬", score: 7, date: "2024-01-30" },
  { rank: 10, username: "포켓몬박사", score: 6, date: "2024-02-05" },
];
```

---

## 스타일 시스템

### 사용된 CSS 변수

**색상**:
- `--background`: 카드 배경
- `--border`: 테두리
- `--text`: 기본 텍스트
- `--point`: 강조 색상 (점수, 호버)

**메달 색상**:
- 금메달: `#FFD700`
- 은메달: `#C0C0C0`
- 동메달: `#CD7F32`

**폰트 크기**:
- `--fontTitle`: 헤더 제목
- `--fontExtra`: 점수 (큰 숫자)
- `--fontMedium`: 사용자명, 순위
- `--fontSmall`: 날짜, 푸터 텍스트

---

## 반응형 레이아웃

### 데스크톱 (>768px)

```
┌──────────────────────────────┬──────────────────┐
│  Quiz Content (65%)          │  Ranking (35%)   │
│                              │  (Sticky)        │
│  ┌────────────────────────┐  │  ┌────────────┐  │
│  │ Quiz Title             │  │  │명예의 전당 │  │
│  └────────────────────────┘  │  └────────────┘  │
│  ┌────────────────────────┐  │  ┌────────────┐  │
│  │ QuizReady/Intro/Main   │  │  │🥇 피카츄   │  │
│  │                        │  │  │🥈 이상해씨 │  │
│  │                        │  │  │🥉 꼬부기   │  │
│  │                        │  │  │ 4. 파이리  │  │
│  │                        │  │  │ ...        │  │
│  └────────────────────────┘  │  └────────────┘  │
│                              │  ┌────────────┐  │
│                              │  │내 최고기록 │  │
│                              │  └────────────┘  │
└──────────────────────────────┴──────────────────┘
```

### 모바일 (≤768px)

```
┌─────────────────────┐
│  Quiz Content       │
│  ┌───────────────┐  │
│  │ Quiz Title    │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Quiz Content  │  │
│  │               │  │
│  └───────────────┘  │
├─────────────────────┤
│  Ranking            │
│  ┌───────────────┐  │
│  │명예의 전당    │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │🥇 피카츄마스터│  │
│  │🥈 이상해씨    │  │
│  │🥉 꼬부기킹    │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │내 최고 기록   │  │
│  └───────────────┘  │
└─────────────────────┘
```

---

## 향후 작업 계획

### 단기 (우선순위 높음)

1. **API 연동**
   - 실제 랭킹 데이터 가져오기
   - 실시간 업데이트 (WebSocket or Polling)

2. **사용자 인증**
   - 사용자 닉네임 입력/저장
   - 내 순위 하이라이트 표시

3. **점수 저장**
   - QuizEnd에서 점수 제출
   - localStorage 또는 서버에 저장

### 중기

4. **랭킹 필터**
   - 기간별 랭킹 (오늘, 이번 주, 전체)
   - 퀴즈 타입별 랭킹

5. **애니메이션**
   - 순위 변동 애니메이션
   - 신규 진입 강조 효과

6. **상세 정보**
   - 랭킹 항목 클릭 시 상세 정보 모달
   - 문제별 정답률 표시

### 장기

7. **리더보드 확장**
   - 친구 랭킹
   - 지역별 랭킹
   - 연령대별 랭킹

8. **공유 기능**
   - SNS 공유 버튼
   - 순위 스크린샷 생성

9. **보상 시스템**
   - 상위 랭커 배지
   - 주간/월간 챔피언

---

## 데이터 연동 가이드

### localStorage 구조 (임시 솔루션)

**키**: `pokemonQuizRanking`

```json
{
  "myBestScore": 8,
  "myRank": 15,
  "myUsername": "트레이너123",
  "rankings": [
    {
      "rank": 1,
      "username": "피카츄마스터",
      "score": 10,
      "date": "2024-02-05",
      "timestamp": 1707123600000
    }
  ]
}
```

### API 엔드포인트 (서버 솔루션)

```
GET  /api/rankings?limit=10&period=all
POST /api/rankings (점수 제출)
GET  /api/rankings/me (내 순위 조회)
```

**Response 예시**:
```json
{
  "rankings": [
    {
      "rank": 1,
      "userId": "user123",
      "username": "피카츄마스터",
      "score": 10,
      "date": "2024-02-05T12:00:00Z"
    }
  ],
  "myRank": {
    "rank": 15,
    "score": 8
  }
}
```

---

## 스타일 커스터마이징

### 메달 색상 변경

```typescript
// RankingList.tsx 내부
const getRankBadgeStyle = (rank: number) => {
  if (rank === 1) return rankBadgeGold;    // 금색
  if (rank === 2) return rankBadgeSilver;  // 은색
  if (rank === 3) return rankBadgeBronze;  // 동색
  return rankBadgeDefault;
};
```

### 랭킹 항목 수 변경

```typescript
// 10명 → N명으로 변경
const mockRankings: RankingItem[] = [
  // ... 원하는 수만큼 추가
];
```

### 스크롤 높이 조정

```typescript
// rankingList 스타일에서
max-height: 600px; // 원하는 높이로 변경
```

---

## 문제 해결 가이드

### 문제: 랭킹 리스트가 sticky 되지 않음
**해결**:
1. 부모 컨테이너에 `overflow: hidden` 없는지 확인
2. `top` 값이 네비게이션 높이와 맞는지 확인 (현재 80px)

### 문제: 모바일에서 랭킹이 보이지 않음
**해결**: `@media (max-width: 768px)` 쿼리에서 `display: none`이 없는지 확인

### 문제: 스크롤바가 보이지 않음
**해결**: 브라우저별 스크롤바 스타일 확인 (Webkit, Firefox 등)

### 문제: 메달 이모지가 깨짐
**해결**: 폰트가 이모지를 지원하는지 확인, 또는 이미지로 대체

---

## 테스트 체크리스트

### 레이아웃
- [ ] 데스크톱에서 65%/35% 비율 확인
- [ ] 모바일에서 상하 스택 확인
- [ ] 퀴즈 내용과 랭킹 사이 20px gap 확인

### 반응형
- [ ] 768px 브레이크포인트 동작
- [ ] 랭킹 sticky 동작 (데스크톱 O, 모바일 X)
- [ ] 모바일에서 스크롤 동작 확인

### 랭킹 리스트
- [ ] 상위 10명 표시
- [ ] 1~3위 메달 표시
- [ ] 호버 효과 (우측 이동, 테두리 색상)
- [ ] 스크롤 동작 (600px 초과 시)

### 스타일
- [ ] 메달 색상 (금/은/동) 적용
- [ ] 점수 색상 (`--point`) 적용
- [ ] 푸터에 내 최고 기록 표시

---

## 참조 파일

### 레이아웃 패턴
- `src/pages/QuizHome.tsx` - Two-column 레이아웃 참조
- `src/pages/Type.tsx` - Sticky 사이드바 패턴

### 스타일 참조
- `src/components/quizHome/QuizDashboard.tsx` - 카드 스타일
- `src/components/match/MatchCard.tsx` - 호버 효과

---

## 마지막 업데이트

- **날짜**: 2024-02-05
- **작성자**: Claude Code Agent
- **버전**: 1.0.0
- **관련 페이지**: `/quiz/play`
