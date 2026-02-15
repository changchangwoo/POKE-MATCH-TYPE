import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuizRanking } from "@api/rankingApi";
import { RankingSubmitRequest } from "@models/rankingData";

const useSubmitQuizRanking = (quizId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RankingSubmitRequest) => submitQuizRanking(quizId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizRanking", quizId] });
    },
  });
};

export default useSubmitQuizRanking;
