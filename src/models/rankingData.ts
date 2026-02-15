export interface RankingEntry {
  rank: number;
  username: string;
  score: number;
  timeSeconds: number;
  recordedAt: string;
}

export interface RankingResponse {
  data: RankingEntry[];
  totalCount: number;
}

export interface RankingItem {
  rank: number;
  username: string;
  score: number;
  time: number;
  date: string;
}

export interface RankingSubmitRequest {
  username: string;
  score: number;
  timeSeconds: number;
}

export interface RankingSubmitResponse {
  rank: number;
  recordedAt: string;
}
