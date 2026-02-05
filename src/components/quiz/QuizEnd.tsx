import { quizReadyContainer } from "./QuizReady";
import quizSuccessImg from "@images/quiz/q1-clear.png";
import quizFailedImg from "@images/quiz/q1-fail.png";
import { quizIntroImgContainer } from "./QuizIntro";
import { Dispatch, SetStateAction, useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import { css } from "@emotion/react";

interface QuizEndProps {
  progressArr: { step: string }[];
    setSection: Dispatch<SetStateAction<number>>;
    setProgressArr: Dispatch<SetStateAction<{ step: string }[]>>;
  
}

const QuizEnd = ({ progressArr, setSection, setProgressArr }: QuizEndProps) => {
  const { text } = useContext(LanguageContext);

  const correctCount = progressArr.filter(
    (item) => item.step === "correct"
  ).length;
  const renderMessage = () => {
    if (correctCount >= 7) {
      return (
        <>
          {text.QUIZ.END.SUCCESS_1}
          <br />
          {text.QUIZ.END.SUCCESS_2}
        </>
      );
    } else
      return (
        <>
          {text.QUIZ.END.FAILD_1}
          <br />
          {text.QUIZ.END.FAILD_2}
        </>
      );
  };
  return (
    <div css={quizReadyContainer}>
      <span>
        {text.QUIZ.END.SYSTEM.replace(
          "{correctCount}",
          correctCount.toString()
        )}
      </span>

      <img
        src={correctCount >= 7 ? quizSuccessImg : quizFailedImg}
        css={quizIntroImgContainer}
      ></img>

      <span css={{ textAlign: "center" }}>{renderMessage()}</span>

      <button 
      aria-label="Retry Quiz"
      onClick={() => {
        setSection(2);
        setProgressArr(() =>
    new Array(10).fill(null).map(() => ({ step: "none" })))
      }} css={retryBtn}>
        {text.QUIZ.END.RETRY}
      </button>
    </div>
  );
};

const retryBtn = css`
  width: 30%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary);
  cursor: pointer;
  color: var(--text);
  pointer-events: all;

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

export default QuizEnd;
/*

*/
