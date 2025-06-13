import { useState } from "react";
import SelectType from "../SelectType";
import { Types } from "../../models/pokemonData";
import { css } from "@emotion/react";

interface QuizAnswerProps {
  questionArr: Types[];
  submitAnswer: (answer: string, correct: string) => void;
  isNext: boolean;
  answerIdx : number;
}

export const QuizAnswer = ({ questionArr, submitAnswer, isNext, answerIdx }: QuizAnswerProps) => {
  const [checkedType, setCheckedType] = useState<Types[]>([]);

  return (
    <>
      <div css={AnswerContainer}>
        <SelectType
          checkedType={checkedType}
          setCheckedType={setCheckedType}
          quizModeDatas={questionArr}
          answerIdx={answerIdx}
          isNext={isNext}
        />
      </div>
      <button
        onClick={() => submitAnswer(checkedType[0]?.name, questionArr[0].name)}
        css={submitBtn(isNext)}
      >
        정답 제출
      </button>
    </>
  );
};

export const AnswerContainer = css`
  width: 100%;
`;

export const submitBtn = (isNext : boolean) => css`
  width: 30%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary);
  cursor: pointer;
  color: var(--text);
  pointer-events: ${isNext ? "none" : "all"};

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

export default QuizAnswer;
