import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

interface QuizReadyProps {
  setSection:Dispatch<SetStateAction<number>>;
}

const QuizReady = ({ setSection }: QuizReadyProps) => {
  return (
    <>
      <h1>Ready</h1>
      <button css={quizStartBtn} onClick={() => {
        setSection((prev) => prev + 1)}
      }>
        start
      </button>
    </>
  );
};

export default QuizReady;

const quizStartBtn = css`
  width: 100px;
  height: 30px;
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    background-color: var(--primary);
  }
`;
