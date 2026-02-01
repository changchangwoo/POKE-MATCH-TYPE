import { useQuery } from "@tanstack/react-query";
import PokeDex from "../datas/pokedex.json";
import { fetchDetailPokemon, fetchDetailType } from "../api/api";
import {
  getDetailType,
  getGroupType,
} from "../utils/getDetailType";
import { buildMatchInfo, generateQuizType0Question } from "../utils/generateQuiz";

export const useGetDetailPokemonForQuiz = (progress: number) => {
  const query = useQuery({
    queryKey: ["quizType0", progress],
    queryFn: async () => {
      const lastNum = PokeDex[PokeDex.length - 1].no;
      const randomNum = Math.floor(Math.random() * lastNum);
      const fetchDatas = await fetchDetailPokemon(String(randomNum));
      if (!fetchDatas) throw new Error("Pokemon not found");

      const matchDatas = buildMatchInfo(fetchDatas, randomNum);
      const typeNo = matchDatas.types.map((type) => type.no);
      const fetchDetailTypeData = await fetchDetailType(typeNo);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);
      const groupResult = await getGroupType(circulateTypeData);

      const quiz = generateQuizType0Question(groupResult);
      if (!quiz) throw new Error("Failed to generate quiz");

      return { matchDatas, groupResult, ...quiz };
    },
    staleTime: Infinity,
    gcTime: 0,
    retry: 2,
  });

  return {
    questionArr: query.data?.questionArr ?? [],
    quizNum: query.data?.quizNum ?? 0,
    groupResult: query.data?.groupResult,
    matchDatas: query.data?.matchDatas,
    answerIdx: query.data?.answerIdx ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
