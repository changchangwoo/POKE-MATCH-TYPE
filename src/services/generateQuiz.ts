import { MatchInfo, Types } from "@models/pokemonData";
import { DamageData } from "./getDetailType";
import { getRandomNum, getShuffleArr } from "@utils/getRandomNum";
import defaultTypes from "@data/defaultTypes.json";

type GroupResult = { damage: number; types: DamageData[] }[];

export interface QuizType0Result {
  quizNum: number;
  questionArr: Types[];
  answerIdx: number;
}

export const generateQuizType0Question = (
  groupResult: GroupResult,
): QuizType0Result | null => {
  if (!groupResult || groupResult.length === 0) return null;

  const quizNum = getRandomNum(groupResult.length);
  const answerSet = new Set<string>();
  const result: Types[] = [];

  const randTypeNum = getRandomNum(groupResult[quizNum].types.length);
  const correct = groupResult[quizNum].types[randTypeNum];
  result.push(correct);
  answerSet.add(correct.name);

  let attempts = 0;
  while (result.length < 6) {
    if (attempts > 300) break;
    attempts++;

    const randGroupNum = getRandomNum(groupResult.length);
    if (randGroupNum === quizNum) continue;

    const types = groupResult[randGroupNum].types;
    const randIdx = getRandomNum(types.length);
    const candidate = types[randIdx];

    if (!answerSet.has(candidate.name)) {
      result.push(candidate);
      answerSet.add(candidate.name);
    }
  }

  const shuffled = getShuffleArr(result);
  return {
    quizNum,
    questionArr: shuffled,
    answerIdx: shuffled.findIndex((item: Types) => item.no === correct.no),
  };
};

export interface QuizType2Result {
  attacker: Types;
  defender: Types[];
  questionArr: number[];
  answerIdx: number;
  answer: { damage: number; types: DamageData[] };
}

export const generateQuizType2Question = (
  groupResult: GroupResult,
  randomTypes: number[],
): QuizType2Result | null => {
  if (!groupResult || groupResult.length === 0) return null;

  const randomIndex = getRandomNum(groupResult.length);
  const questionArr = groupResult.map((r) => r.damage);
  const randomNum = getRandomNum(groupResult[randomIndex].types.length);

  const attacker = {
    name: groupResult[randomIndex].types[randomNum].name,
    no: groupResult[randomIndex].types[randomNum].no,
  };

  const defender = randomTypes.map((no) => ({
    name: defaultTypes[no - 1].name,
    no: defaultTypes[no - 1].no,
  }));

  return {
    attacker,
    defender,
    questionArr,
    answerIdx: randomIndex,
    answer: groupResult[randomIndex],
  };
};

export const generateRandomTypeNos = (): number[] => {
  const randomTypes: number[] = [];
  while (randomTypes.length < 2) {
    const randomTypeNum = getRandomNum(defaultTypes.length);
    if (!randomTypes.includes(defaultTypes[randomTypeNum].no)) {
      randomTypes.push(defaultTypes[randomTypeNum].no);
    }
  }
  return randomTypes;
};

export const buildMatchInfo = (
  fetchDatas: any,
  randomNum: number,
  name: string = "",
): MatchInfo => {
  return {
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
    searchLanguage: "",
  };
};
