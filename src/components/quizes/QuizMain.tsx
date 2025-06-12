import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";
import { getRandomNum } from "../../utils/getRandomNum";
import StepProgress from "./StepProgress";
import QuizAlert from "../modal/QuizAlert";

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
  const [quizType, setQuizType] = useState<number>(0);
  const [alertType, setAlertType] = useState<"correct" | "incorrect" | null>(
    null
  );

  const submitAnswer = (answer: any, correct: any) => {
    const isCorrect = answer === correct;

    setAlertType(isCorrect ? "correct" : "incorrect");
    setTimeout(() => setAlertType(null), 3000);
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: isCorrect ? "correct" : "wrong" } : item
      )
    );

    setProgress((prev) => prev + 1);
  };

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
    const curQuizType = 2;
    setQuizType(curQuizType);
  }, [progress]);

  return (
    <>
      <StepProgress
        currentStep={progress}
        progressArr={progressArr}
      ></StepProgress>
      {(() => {
        switch (quizType) {
          case 0:
            return (
              <QuizType0_damageEffectiveness
                key={`${quizType}-${progress}`}
                submitAnswer={submitAnswer}
                progress={progress}
              />
            );
          case 1:
            return (
              <QuizType1_quizTypeInference
                key={`${quizType}-${progress}`}
                submitAnswer={submitAnswer}
              />
            );
          case 2:
            return (
              <QuizType2_typeDescription
                key={`${quizType}-${progress}`}
                submitAnswer={submitAnswer}
              />
            );
          default:
            return <div>에러 페이지</div>;
        }
      })()}
      {alertType && <QuizAlert quizType={alertType} />}
    </>
  );
};

export default QuizMain;
