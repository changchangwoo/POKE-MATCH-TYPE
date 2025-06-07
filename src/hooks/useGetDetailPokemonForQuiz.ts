import { useEffect, useState } from "react";
import PokeDex from "../datas/pokedex.json";
import { fetchDetailPokemon, fetchDetailType } from "../api/api";
import { MatchInfo, Types } from "../models/pokemonData";
import {
  getDetailType,
  getGroupType,
  IDamageData,
} from "../utils/getDetailType";
import { getRandomNum } from "../utils/getRandomNum";

export const useGetDetailPokemonForQuiz = (progress : number) => {
  const [groupResult, setGroupResult] =
    useState<{ damage: number; types: IDamageData[] }[]>();
  const [matchDatas, setMatchDatas] = useState<MatchInfo>();
  const [questionArr, setQuetstionArr] = useState<Types[]>([]);
  const [quizNum, setQuizNum] = useState<number>(0);

  useEffect(() => {
    console.log("useEffect 동작 확인")
    let isCancelled = false;
    const useFetchDetailPokemonQuiz = async (name: string = "") => {
      const lastNum = PokeDex[PokeDex.length - 1].no;
      const randomNum = Math.floor(Math.random() * lastNum);
      const fetchDatas = await fetchDetailPokemon(String(randomNum));
      const matchDatas: MatchInfo = {
        name,
        types: fetchDatas.types.map((typeInfo: any) => {
          if (typeInfo.type.url) {
            const match = typeInfo.type.url.match(/\/(\d+)\/$/);
            const typeNo = match ? match[1] : null;
            return {
              no: typeNo ? Number(typeNo) : null,
              name: typeInfo.type.name,
            };
          } else {
            return { no: null, name: typeInfo.type.name };
          }
        }),
        no: Number(randomNum),
        imgs: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNum}.png`,
      };
      const typeNo = matchDatas.types.map((type) => type.no);
      const fetchDetailTypeData = await fetchDetailType(typeNo);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);

      let groupResult = await getGroupType(circulateTypeData);
      const quiz0_dataGroupResult = groupResult;
      if (!quiz0_dataGroupResult) return;
      const quizNum = getRandomNum(groupResult.length);

      const answerSet = new Set<string>();
      const result: Types[] = [];

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
      if(isCancelled) return
      setGroupResult(groupResult);
      setMatchDatas(matchDatas);
      setQuizNum(quizNum);
      setQuetstionArr(result);
    };

    useFetchDetailPokemonQuiz();

    return () => {
      isCancelled = true;
    }
  }, [progress]);

  return {
    questionArr,
    quizNum,
    groupResult,
    matchDatas,
  };
};
