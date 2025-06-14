import { css } from "@emotion/react";
import TypeBadge from "../commons/TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { imgBox, pokeTypes } from "../MatchCard";
import { useGetDetailPokemonForQuiz } from "../../hooks/useGetDetailPokemonForQuiz";
import QuizAnswer from "./QuizAnswer";
import { QUIZ } from "../../const/kor";

interface QuizType0_Props {
  submitAnswer: (answerIdx: number, correctIdx: number, correctData : any) => void;
  progress: number;
  isNext: boolean;
}

const QuizType0_damageEffectiveness = ({
  submitAnswer,
  progress,
  isNext
}: QuizType0_Props) => {
  const { questionArr, quizNum, groupResult, matchDatas, answerIdx } =
    useGetDetailPokemonForQuiz(progress);
  if (!questionArr || quizNum === undefined || !groupResult || !matchDatas) {
    return null;
  }
  return (
    <>
      <h1 css={title}>
        {QUIZ.MAIN_1.TITLE_1}
        <br />
        <b>{groupResult[quizNum].damage}{QUIZ.MAIN_1.TITLE_2}</b>
      </h1>
      <div css={imgBox(matchDatas.types[0].no)}>
        <img src={matchDatas.imgs} alt={`Pokemon ${matchDatas.no}`} />
      </div>
      <div css={pokeTypes}>
        {
        matchDatas.types.map((type) => (
          <TypeBadge key={uuidv4()} no={type.no}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
      <QuizAnswer questionArr={questionArr} submitAnswer={submitAnswer} isNext={isNext} answerIdx={answerIdx} />
    </>
  );
};

export default QuizType0_damageEffectiveness;

export const title = css`
  b {
    font-weight: bold;
  }
  text-align: center;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
