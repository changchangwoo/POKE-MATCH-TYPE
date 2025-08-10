import { useContext, useState } from "react";
import SelectType from "../SelectType";
import { checkedTypes, Types } from "../../models/pokemonData";
import { css } from "@emotion/react";
import { LanguageContext } from "../../utils/getInitialData";

interface QuizAnswerProps {
  questionArr: Types[];
  submitAnswer: (
    answerIdx: number,
    correctIdx: number,
    correctData: any
  ) => void;
  isNext: boolean;
  answerIdx: number;
}

export const QuizAnswer = ({
  questionArr,
  submitAnswer,
  isNext,
  answerIdx,
}: QuizAnswerProps) => {
  const [checkedType, setCheckedType] = useState<checkedTypes[]>([]);
  const { text } = useContext(LanguageContext);

  return (
    <>
      <div css={AnswerContainer}>
        <SelectType
          aria-label="Select Type"
          checkedType={checkedType}
          setCheckedType={setCheckedType}
          quizModeDatas={questionArr}
          answerIdx={answerIdx}
          isNext={isNext}
        />
      </div>
      <button
        aria-label="Submit Answer"
        onClick={() =>
          submitAnswer(checkedType[0].idx, answerIdx, questionArr[answerIdx])
        }
        css={submitBtn(isNext)}
      >
        {text.QUIZ.SUBMIT}
      </button>
    </>
  );
};

export const AnswerContainer = css`
  width: 100%;
`;

export const submitBtn = (isNext: boolean) => css`
  width: 30%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: ${isNext ? "var(--border)" : "var(--primary)"};
  cursor: pointer;
  color: var(--text);
  pointer-events: ${isNext ? "none" : "all"};

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

export default QuizAnswer;
