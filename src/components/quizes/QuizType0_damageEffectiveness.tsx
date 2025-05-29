import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import useFetchDetailPokemonForQuiz from "../../hooks/queries/useFetchDetailPokemonForQuiz";
import TypeBadge from "../commons/TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { imgBox, matchCardContainer, pokeTypes } from "../MatchCard";

interface QuizType0_Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizType0_damageEffectiveness = (setProgress: QuizType0_Props) => {
  const {
    data: quiz0_data,
    error: quiz0_dataError,
    isLoading: quiz0_dataLoading,
  } = useFetchDetailPokemonForQuiz();

  const quizNum = useMemo(() => {
    if (!quiz0_data?.groupResult?.length) return null;
    return Math.floor(Math.random() * quiz0_data.groupResult.length);
  }, [quiz0_data?.groupResult]);

  useEffect(() => {
    console.log(quizNum);
  });

  if (!quiz0_data || quiz0_dataLoading || !quizNum) return null;

  return (
    <div css={matchCardContainer}>
      <h1 css={title}>
        해당 포켓몬을 공격했을 때,
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
    </div>
  );
};

export default QuizType0_damageEffectiveness;

const title = css`
  b {
    font-weight: bold;
  }
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
