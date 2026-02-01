import { useQuery } from "@tanstack/react-query";
import { fetchDetailType } from "../../api/api";
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { generateQuizType2Question, generateRandomTypeNos } from "../../utils/generateQuiz";

export const useFetchQuizType2 = (progress: number) => {
  const query = useQuery({
    queryKey: ["quizType2", progress],
    queryFn: async () => {
      const randomTypes = generateRandomTypeNos();
      const fetchDatas = await fetchDetailType(randomTypes);
      const circulateTypeData = await getDetailType(fetchDatas);
      const groupResult = await getGroupType(circulateTypeData);

      const quiz = generateQuizType2Question(groupResult, randomTypes);
      if (!quiz) throw new Error("Failed to generate quiz");

      return quiz;
    },
    staleTime: Infinity,
    gcTime: 0,
    retry: 2,
  });

  return {
    attacker: query.data?.attacker,
    defender: query.data?.defender ?? [],
    questionArr: query.data?.questionArr ?? [],
    answerIdx: query.data?.answerIdx ?? 0,
    answer: query.data?.answer ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
