import { css } from "@emotion/react";
import TypeBadge from "../commons/TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { imgBox, matchCardContainer, pokeTypes } from "../MatchCard";
import { useGetDetailPokemonForQuiz } from "../../hooks/useGetDetailPokemonForQuiz";
import QuizAnswer from "./QuizAnswer";

interface QuizType0_Props {
  submitAnswer: (answer: any, correct: any) => void;
  progress: number;
}

const QuizType0_damageEffectiveness = ({ submitAnswer, progress }: QuizType0_Props) => {
  const { questionArr, quizNum, groupResult, matchDatas } =
    useGetDetailPokemonForQuiz(progress);


  if (!questionArr || !quizNum || !groupResult || !matchDatas) return null;
  return (
    <div css={matchCardContainer}>
      <h1 css={title}>
        해당 포켓몬을 공격했을 때,<br/>
        <b>{groupResult[quizNum].damage}배의 데미지를 줄 수 있는 타입</b>은?
      </h1>
      <div css={imgBox(matchDatas.types[0].no)}>
        <img
          src={matchDatas.imgs}
          loading="lazy"
          alt={`Pokemon ${matchDatas.no}`}
        />
      </div>
      <div css={pokeTypes}>
        {matchDatas.types.map((type) => (
          <TypeBadge key={uuidv4()} no={type.no}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
        <QuizAnswer questionArr={questionArr} submitAnswer={submitAnswer} />
    </div>
  );
};

export default QuizType0_damageEffectiveness;

export const title = css`
  b {
    font-weight: bold;
  }
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  
`;

