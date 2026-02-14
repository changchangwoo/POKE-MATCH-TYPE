import { RankingResponse } from "@models/rankingData";

const mockQuiz1: RankingResponse = {
  data: [
    { rank: 1, username: "타입장인", score: 10, timeSeconds: 32, recordedAt: "2024-02-03T09:12:00Z" },
    { rank: 2, username: "피카츄마스터", score: 10, timeSeconds: 38, recordedAt: "2024-02-05T14:30:00Z" },
    { rank: 3, username: "상성의신", score: 10, timeSeconds: 41, recordedAt: "2024-02-01T08:45:00Z" },
    { rank: 4, username: "이상해씨", score: 9, timeSeconds: 45, recordedAt: "2024-02-05T11:20:00Z" },
    { rank: 5, username: "꼬부기킹", score: 9, timeSeconds: 52, recordedAt: "2024-02-03T16:55:00Z" },
    { rank: 6, username: "루기아팬", score: 9, timeSeconds: 58, recordedAt: "2024-02-02T13:10:00Z" },
    { rank: 7, username: "파이리덕후", score: 8, timeSeconds: 61, recordedAt: "2024-02-05T07:30:00Z" },
    { rank: 8, username: "뮤츠킬러", score: 8, timeSeconds: 74, recordedAt: "2024-02-04T19:40:00Z" },
    { rank: 9, username: "망나뇽러버", score: 8, timeSeconds: 88, recordedAt: "2024-02-01T22:15:00Z" },
    { rank: 10, username: "잠만보123", score: 7, timeSeconds: 95, recordedAt: "2024-02-04T10:05:00Z" },
  ],
  totalCount: 10,
};

const mockQuiz2: RankingResponse = {
  data: [
    { rank: 1, username: "데미지왕", score: 10, timeSeconds: 28, recordedAt: "2024-02-04T10:00:00Z" },
    { rank: 2, username: "타입장인", score: 10, timeSeconds: 35, recordedAt: "2024-02-03T15:20:00Z" },
    { rank: 3, username: "리자몽팬", score: 9, timeSeconds: 42, recordedAt: "2024-02-05T09:30:00Z" },
    { rank: 4, username: "전기쥐", score: 9, timeSeconds: 50, recordedAt: "2024-02-02T18:45:00Z" },
    { rank: 5, username: "물대포", score: 8, timeSeconds: 55, recordedAt: "2024-02-01T12:00:00Z" },
    { rank: 6, username: "풀베기", score: 8, timeSeconds: 63, recordedAt: "2024-02-04T20:30:00Z" },
    { rank: 7, username: "불꽃펀치", score: 7, timeSeconds: 70, recordedAt: "2024-02-03T07:15:00Z" },
    { rank: 8, username: "냉동빔", score: 7, timeSeconds: 78, recordedAt: "2024-02-05T16:40:00Z" },
    { rank: 9, username: "지진술사", score: 6, timeSeconds: 85, recordedAt: "2024-02-02T11:55:00Z" },
    { rank: 10, username: "사이코키네", score: 6, timeSeconds: 92, recordedAt: "2024-02-01T14:20:00Z" },
  ],
  totalCount: 10,
};

const mockQuiz3: RankingResponse = {
  data: [
    { rank: 1, username: "부등호달인", score: 10, timeSeconds: 30, recordedAt: "2024-02-05T08:00:00Z" },
    { rank: 2, username: "비교왕", score: 10, timeSeconds: 36, recordedAt: "2024-02-04T12:30:00Z" },
    { rank: 3, username: "상성박사", score: 10, timeSeconds: 44, recordedAt: "2024-02-02T17:15:00Z" },
    { rank: 4, username: "타입매니아", score: 9, timeSeconds: 48, recordedAt: "2024-02-03T09:45:00Z" },
    { rank: 5, username: "포켓몬고수", score: 9, timeSeconds: 56, recordedAt: "2024-02-01T20:00:00Z" },
    { rank: 6, username: "번개킹", score: 8, timeSeconds: 64, recordedAt: "2024-02-05T13:20:00Z" },
    { rank: 7, username: "얼음여왕", score: 8, timeSeconds: 72, recordedAt: "2024-02-04T06:30:00Z" },
    { rank: 8, username: "바위솔져", score: 7, timeSeconds: 80, recordedAt: "2024-02-03T19:50:00Z" },
    { rank: 9, username: "독침봉", score: 7, timeSeconds: 90, recordedAt: "2024-02-02T08:10:00Z" },
    { rank: 10, username: "드래곤마스터", score: 6, timeSeconds: 98, recordedAt: "2024-02-01T15:40:00Z" },
  ],
  totalCount: 10,
};

const mockQuiz4: RankingResponse = {
  data: [
    { rank: 1, username: "배수천재", score: 10, timeSeconds: 25, recordedAt: "2024-02-03T11:00:00Z" },
    { rank: 2, username: "계산기", score: 10, timeSeconds: 33, recordedAt: "2024-02-05T07:20:00Z" },
    { rank: 3, username: "수학의신", score: 10, timeSeconds: 40, recordedAt: "2024-02-01T16:45:00Z" },
    { rank: 4, username: "타입계산왕", score: 9, timeSeconds: 47, recordedAt: "2024-02-04T14:30:00Z" },
    { rank: 5, username: "배율마스터", score: 9, timeSeconds: 54, recordedAt: "2024-02-02T10:15:00Z" },
    { rank: 6, username: "효과만점", score: 8, timeSeconds: 62, recordedAt: "2024-02-05T18:00:00Z" },
    { rank: 7, username: "반감술사", score: 8, timeSeconds: 71, recordedAt: "2024-02-03T21:30:00Z" },
    { rank: 8, username: "무효화왕", score: 7, timeSeconds: 79, recordedAt: "2024-02-04T05:45:00Z" },
    { rank: 9, username: "2배데미지", score: 7, timeSeconds: 87, recordedAt: "2024-02-02T13:20:00Z" },
    { rank: 10, username: "4배약점", score: 6, timeSeconds: 96, recordedAt: "2024-02-01T09:00:00Z" },
  ],
  totalCount: 10,
};

export const mockRankingData: Record<number, RankingResponse> = {
  1: mockQuiz1,
  2: mockQuiz2,
  3: mockQuiz3,
  4: mockQuiz4,
};
