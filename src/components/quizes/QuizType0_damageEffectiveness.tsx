import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import useFetchDetailPokemonForQuiz from "../../hooks/queries/useFetchDetailPokemonForQuiz";
import TypeBadge from "../commons/TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { imgBox, matchCardContainer, pokeTypes } from "../MatchCard";
import { IDamageData } from "../../utils/getDetailType";
import SelectType from "../SelectType";
import { Types } from "../../models/pokemonData";

interface QuizType0_Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizType0_damageEffectiveness = (setProgress: QuizType0_Props) => {
  const {
    data: quiz0_data,
    error: quiz0_dataError,
    isLoading: quiz0_dataLoading,
  } = useFetchDetailPokemonForQuiz();

  const getRandomNum = (max : number) => {
    return Math.floor(Math.random() * max);
  }

  const submitAnswer = () => {
    console.log(checkedType);
    if(checkedType[0].name === answerArr[0].name) {
      alert("정답입니다!");
    } else {
      alert("틀렸습니다! 정답은 " + answerArr[0].name + "입니다.");
    }
  }

  const [answerArr , setAnswerArr] = useState<IDamageData[]>([]);
  const [quizNum, setQuizNum] = useState<number>(0);
const [checkedType, setCheckedType] = useState<Types[]>([]);

console.log(checkedType)

useEffect(() => {
    const quiz0_dataGroupResult = quiz0_data?.groupResult;
    if (!quiz0_dataGroupResult) return;
    const quizNum = getRandomNum(quiz0_data.groupResult.length)

  const answerSet = new Set<string>();
  const result: IDamageData[] = [];
  

  while (true) {
    const randTypeNum = getRandomNum(quiz0_dataGroupResult[quizNum].types.length);
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

    setQuizNum(quizNum);
  setAnswerArr(result);
}, [quiz0_data]);

  if (!quiz0_data || !answerArr || !quizNum) return null;
  return (
    <div css={matchCardContainer}>
      <h1 css={title}>
        해당 포켓몬을 공격했을 때,&nbsp; 
        <b>
           {quiz0_data.groupResult[quizNum].damage}배의 데미지를 줄 수 있는 타입
        </b>
        을 선택하세요
      </h1>
      <div css={imgBox(quiz0_data.matchDatas.types[0].typeNo)}>
        <img
          src={quiz0_data.matchDatas.imgs}
          loading="lazy"
          alt={`Pokemon ${quiz0_data.matchDatas.no}`}
        />
      </div>
      <div css={pokeTypes}>
        {quiz0_data.matchDatas.types.map((type) => (
          <TypeBadge key={uuidv4()} typeNo={type.typeNo}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
      <div css={typeSection}>
      <SelectType checkedType={checkedType} setCheckedType={setCheckedType}
      quizModeDatas={answerArr} />
        </div>
        <button 
        onClick={submitAnswer}
        css={submitBtn}
        >
          정답 제출
        </button>
    </div>
  );
};

export default QuizType0_damageEffectiveness;

const title = css`
  b {
    font-weight: bold;
  }
`;

const submitBtn = css`
    width: 30%;
    /* background-color: orange; */
    height: 45px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--primary);
    cursor: pointer;


    &:hover {
      transition: all 0.2s;
      background-color: var(--border);
    }
`

const typeSection = css`
width: 80%;

`;

/*
  문제 유형1. 해당 포켓몬에게 공격했을 때,
  - 4배의 데미지를 줄 수 있는
  - 2배의 데미지를 줄 수 있는
  - 1배의 데미지를 줄 수 있는
  - 0배의 데미지를 줄 수 있는
  타입을 선택하세요.

  타입에 대한 정답을 미리 구한다음,
  그 정답지에 대해서 타입을 산출하자
  메인에서는 이걸 전부 버튼으로 만들었지만,
  여기서 랜덤으로 발췌한 타입 6개만 버튼 만들기




*/
