import { useEffect, useState } from "react";
import PokeDex from "../datas/pokedex.json";
import { fetchDetailPokemon, fetchDetailType } from "../api/api";
import { MatchInfo } from "../models/pokemonData";
import {
  getDetailType,
  getGroupType,
  IDamageData,
} from "../utils/getDetailType";
import { getRandomNum } from "../utils/getRandomNum";

export const useGetDetailPokemonForQuiz = () => {
  const [groupResult, setGroupResult] =
    useState<{ damage: number; types: IDamageData[] }[]>();
  const [matchDatas, setMatchDatas] = useState<MatchInfo>();
  const [questionArr, setQuetstionArr] = useState<IDamageData[]>([]);
  const [quizNum, setQuizNum] = useState<number>(0);

  useEffect(() => {
    const useFetchDetailPokemonQuiz = async (name: string = "") => {
      const lastNum = PokeDex[PokeDex.length - 1].no;
      const no = Math.floor(Math.random() * lastNum);
      const fetchDatas = await fetchDetailPokemon(String(no));
      const matchDatas: MatchInfo = {
        name,
        types: fetchDatas.types.map((typeInfo: any) => {
          if (typeInfo.type.url) {
            const match = typeInfo.type.url.match(/\/(\d+)\/$/);
            const typeNo = match ? match[1] : null;
            return {
              typeNo: typeNo ? Number(typeNo) : null,
              name: typeInfo.type.name,
            };
          } else {
            return { typeNo: null, name: typeInfo.type.name };
          }
        }),
        no: Number(no),
        imgs: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no}.png`,
      };
      const typeNo = matchDatas.types.map((type) => type.typeNo);
      const fetchDetailTypeData = await fetchDetailType(typeNo);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);

      let groupResult = await getGroupType(circulateTypeData);
      const quiz0_dataGroupResult = groupResult;
      if (!quiz0_dataGroupResult) return;
      const quizNum = getRandomNum(groupResult.length);

      const answerSet = new Set<string>();
      const result: IDamageData[] = [];

      while (true) {
        const randTypeNum = getRandomNum(
          quiz0_dataGroupResult[quizNum].types.length
        );
        const candidate = quiz0_dataGroupResult[quizNum].types[randTypeNum];
        if (!answerSet.has(candidate.name)) {
          result.push(candidate);
          answerSet.add(candidate.name);
          break;
        }
      }

      while (result.length < 6) {
        let randGroupNum = getRandomNum(quiz0_dataGroupResult.length);
        if (randGroupNum === quizNum) continue;

        const types = quiz0_dataGroupResult[randGroupNum].types;
        const randTypeNum = getRandomNum(types.length);
        const candidate = types[randTypeNum];

        if (!answerSet.has(candidate.name)) {
          result.push(candidate);
          answerSet.add(candidate.name);
        }
      }
      setGroupResult(groupResult);
      setMatchDatas(matchDatas);
      setQuizNum(quizNum);
      setQuetstionArr(result);
    };

    useFetchDetailPokemonQuiz();
  }, []);

  return {
    questionArr,
    quizNum,
    groupResult,
    matchDatas,
  };
};
