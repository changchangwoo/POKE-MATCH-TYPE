import { css } from "@emotion/react";

interface QuizReadyProps {
  onClickStartBtn: () => void;
}

const QuizReady = ({ onClickStartBtn }: QuizReadyProps) => {
  return (
    <>
      <h1>Ready</h1>
      <button css={quizStartBtn} onClick={onClickStartBtn}>
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
