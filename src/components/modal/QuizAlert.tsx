import { css } from "@emotion/react";
import QuizCorrrectImg from "@images/quiz_correct.webp";
import QuizIncorrectImg from "@images/quiz_incorrect.webp";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@services/getInitialData";

interface QuizAlertProps {
  quizType: "correct" | "incorrect";
  answerText: string;
}

const QuizAlert = ({ quizType, answerText }: QuizAlertProps) => {
  const [visible, setVisible] = useState(true);
  const { text } = useContext(LanguageContext);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div css={QuizAlertContainer(quizType === "correct")}>
      <div className="quizAlertContents">
        <img
          src={quizType === "correct" ? QuizCorrrectImg : QuizIncorrectImg}
        ></img>
      </div>
      <div className="quizAlertText">
        {quizType === "correct" ? (
          <span>{text.QUIZ.ALERT.SUCCESS}</span>
        ) : (
          <span>{text.QUIZ.ALERT.FAILED}</span>
        )}
        <span>
          {text.QUIZ.ALERT.MESSAGE.replace("{answerText}", answerText)}
        </span>
      </div>
    </div>
  );
};

const QuizAlertContainer = (isCorrect: boolean) => css`
  animation: fadeOut 3s forwards;
  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0px;
  top: 0px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  .quizAlertText {
    width: 80%;
    max-width: 400px;
    background-color: var(--primary);
    border: ${isCorrect
      ? "2px solid var(--type12)"
      : "2px solid var(--type14)"};
    border-radius: 10px;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    flex-direction: column;
    gap: 5px;
  }

  .quizAlertContents {
    width: 80%;
    height: 35vh;
    background-color: var(--primary);
    border: ${isCorrect
      ? "2px solid var(--type12)"
      : "2px solid var(--type14)"};
    border-radius: 10px;
    max-width: 400px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;

    &::after {
      content: "${isCorrect ? "O" : "X"}";
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--background);
      color: ${isCorrect ? "var(--type12)" : "var(--type14)"};
      font-size: 1.2rem;
      padding: 4px 12px;
      border-radius: 4px;
      border: ${isCorrect
        ? "1px solid var(--type12)"
        : "1px solid var(--type14)"};
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 1px solid var(--border);
      box-sizing: border-box;
      object-fit: cover;
    }
  }
`;

export default QuizAlert;
