import axios from "axios";
import { RANKING_MODE, RANKING_API_BASE_URL } from "@const/apiConfig";
import {
  RankingResponse,
  RankingSubmitRequest,
  RankingSubmitResponse,
} from "@models/rankingData";
import { mockRankingData } from "@data/mockRanking";

export const fetchQuizRanking = async (
  quizId: number,
): Promise<RankingResponse> => {
  if (RANKING_MODE === "dummy") {
    return Promise.resolve(
      mockRankingData[quizId] ?? { data: [], totalCount: 0 },
    );
  }

  const response = await axios.get<RankingResponse>(
    `${RANKING_API_BASE_URL}/api/quiz/${quizId}/ranking`,
  );
  return response.data;
};

export const submitQuizRanking = async (
  quizId: number,
  body: RankingSubmitRequest,
): Promise<RankingSubmitResponse> => {
  if (RANKING_MODE === "dummy") {
    return Promise.resolve({
      rank: Math.floor(Math.random() * 10) + 1,
      recordedAt: new Date().toISOString(),
    });
  }

  const response = await axios.post<RankingSubmitResponse>(
    `${RANKING_API_BASE_URL}/api/quiz/${quizId}/ranking`,
    body,
  );
  return response.data;
};
