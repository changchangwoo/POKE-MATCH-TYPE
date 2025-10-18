import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import QuizIntroImg from "../../imgs/quiz_intro.webp";
import { quizReadyText } from "./QuizReady";
import { LanguageContext } from "../../utils/getInitialData";


interface QuizIntroProps {
  setSection: Dispatch<SetStateAction<number>>;
}

const QuizIntro = ({ setSection }: QuizIntroProps) => {
      const {text} = useContext(LanguageContext);
  return (
    <div css={QuizIntroContainer}>
      <img src={QuizIntroImg} css={QuizIntroImgContainer}></img>
      <div css={quizReadyText}>
        <span>
          {text.QUIZ.INTRO.TITLE_1}
          <br />
          {text.QUIZ.INTRO.TITLE_2}
          <br />
          {text.QUIZ.INTRO.TITLE_3}
          <br />
          <br />
          {text.QUIZ.INTRO.TITLE_4}
        </span>
      </div>
      <button
      aria-label="Start Quiz"
        css={quizStartBtn}
        onClick={() => {
          setSection((prev) => prev + 1);
        }}
      >
        {text.QUIZ.READY.BTN}
      </button>
    </div>
  );
};

export default QuizIntro;

export const QuizIntroImgContainer = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  z-index: 1;
  border: 1px solid var(--border);
  object-fit: cover;
`;

export const QuizIntroContainer = css`
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
