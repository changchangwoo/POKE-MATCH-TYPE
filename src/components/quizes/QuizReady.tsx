import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import quizReadyImg from "../../imgs/quiz_ready.jpg";
import { QUIZ } from "../../const/kor";

interface QuizReadyProps {
  setSection: Dispatch<SetStateAction<number>>;
}

const QuizReady = ({ setSection }: QuizReadyProps) => {
  return (
    <>
      <div css={quizReadyContainer}>
        <img src={quizReadyImg} css={quizReadyImgContainer}></img>
        <span>
          {QUIZ.READY.TITLE}
        </span>
        <ul css={quizReadyText}>
          <li>{QUIZ.READY.TITLE_SUB_1}</li>
          <li>{QUIZ.READY.TITLE_SUB_2}</li>
          <li>{QUIZ.READY.TITLE_SUB_3}</li>
        </ul>
        <button
          css={quizStartBtn}
          onClick={() => {
            setSection((prev) => prev + 1);
          }}
        >
          {QUIZ.READY.BTN}
        </button>
      </div>
    </>
  );
};

export default QuizReady;

export const quizReadyImgContainer = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  z-index: 1;
  border: 1px solid var(--border);
  object-fit: cover;
`;

export const quizReadyText = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: grey;
  background-color: var(--primary);
  font-size: var(--fontMedium);
`;

export const quizReadyContainer = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 400px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    text-align: center;
    line-height: 1.5;
    color: var(--text);
  }
`;

const quizStartBtn = css`
  width: 100px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--text);

  cursor: pointer;
  &:hover {
    transition: 0.2s;
    background-color: var(--border);
  }
`;
