import { useQuery } from "@tanstack/react-query";
import { fetchQuizRanking } from "@api/rankingApi";
import { RankingItem } from "@models/rankingData";

const VALID_QUIZ_IDS = [1, 2, 3, 4];
const MAX_RANKING_ITEMS = 100;

const useFetchQuizRanking = (quizId: number) => {
  return useQuery({
    queryKey: ["quizRanking", quizId],
    queryFn: async () => {
      const response = await fetchQuizRanking(quizId);

      const items: RankingItem[] = response.data
        .filter(
          (entry) =>
            entry.username != null &&
            entry.score != null &&
            entry.timeSeconds != null
        )
        .slice(0, MAX_RANKING_ITEMS)
        .map((entry, index) => ({
          rank: entry.rank ?? index + 1,
          username: entry.username,
          score: entry.score,
          time: entry.timeSeconds,
          date: entry.recordedAt
            ? entry.recordedAt.split("T")[0]
            : "-",
        }));

      return items;
    },
    staleTime: 60_000,
    enabled: VALID_QUIZ_IDS.includes(quizId),
  });
};

export default useFetchQuizRanking;
