import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";
import { getRandomNum } from "../../utils/getRandomNum";
import StepProgress from "./StepProgress";
import QuizAlert from "../modal/QuizAlert";
import { getKoreanType } from "../../utils/getKoreanType";
import { matchCardContainer } from "../MatchCard";
import { css } from "@emotion/react";

interface QuizMainProps {
  setSection: Dispatch<SetStateAction<number>>;
  setProgressArr: Dispatch<SetStateAction<{ step: string }[]>>;
  progressArr: { step: string }[];
}
const QuizMain = ({
  setSection,
  progressArr,
  setProgressArr,
}: QuizMainProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [quizType, setQuizType] = useState<number>(getRandomNum(3));
  const [alertType, setAlertType] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [answerText, setAnswerText] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(true)

  const submitAnswer = (answer: any, correct: any) => {
    const isCorrect = answer === correct;
    if (Number(correct) === correct) setAnswerText(`${correct}배`);
    else setAnswerText(`${getKoreanType(correct)} 타입`);
    setAlertType(isCorrect ? "correct" : "incorrect");
    setTimeout(() => setAlertType(null), 3000);
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: isCorrect ? "correct" : "wrong" } : item
      )
    );
    setTimeout(() => {
    setQuizType(getRandomNum(3));
      setAlertType(null);
      setProgress((prev) => prev + 1);
    }, 3000)
  };

  const handleNextButton = () => {

  }

  useEffect(() => {
    if (progress >= 10) {
      setSection((prev) => prev + 1);
      return;
    }
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: "current" } : item
      )
    );
  }, [progress]);

  return (
    <>
      <StepProgress
        currentStep={progress}
        progressArr={progressArr}
      ></StepProgress>
      <div css={matchCardContainer}>
      {(() => {
        switch (quizType) {
          case 0:
            return (
              <QuizType0_damageEffectiveness
                key={progress}
                submitAnswer={submitAnswer}
                progress={progress}
              />
            );
          case 1:
            return (
              <QuizType1_quizTypeInference
                key={progress}
                submitAnswer={submitAnswer}
                progress={progress}
              />
            );
          case 2:
            return (
              <QuizType2_typeDescription
                key={progress}
                submitAnswer={submitAnswer}
                progress={progress}

              />
            );
          default:
            return <div>에러 페이지</div>;
        }
      })()}
      {isNext && <button css={nextButton}>다음 문제</button>}
      </div>
      {alertType && <QuizAlert quizType={alertType} answerText={answerText} />}
    </>
  );
};

const nextButton = css`
    position: relative;
    background-color: var(--background);
    border: 1px solid var(--border);
    color: var(--text);
    height: 30px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;  
    cursor: pointer;
    width: 30%;

      &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`


export default QuizMain;
