import axios from "axios";
import { RANKING_MODE, RANKING_API_BASE_URL } from "@const/apiConfig";
import { RankingResponse } from "@models/rankingData";
import { mockRankingData } from "@data/mockRanking";

export const fetchQuizRanking = async (quizId: number): Promise<RankingResponse> => {
  if (RANKING_MODE === "dummy") {
    return Promise.resolve(
      mockRankingData[quizId] ?? { data: [], totalCount: 0 }
    );
  }

  const response = await axios.get<RankingResponse>(
    `${RANKING_API_BASE_URL}/api/quiz/${quizId}/ranking`
  );
  return response.data;
};
