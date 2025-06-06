import {useEffect, useState } from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";
import { getRandomNum } from "../../utils/getRandomNum";
import StepProgress from "./StepProgress";

const QuizMain = () => {
  const [progress, setProgress] = useState<number>(0);
  const [quizType, setQuizType] = useState<number>(0);
  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" }))
  );

  const submitAnswer = (answer: any, correct: any) => {
    if (answer === correct) {
      alert(`정답입니다! `);
      console.log('프로그레스', progress)
      setProgressArr(
        progressArr.map((item, idx) =>
          idx === progress ? { step: "correct" } : item
        )
      );
    } else {
      alert("틀렸습니다! 정답은 " + correct + "입니다.");
            console.log('프로그레스', progress)

      setProgressArr(
        progressArr.map((item, idx) =>
          idx === progress ? { step: "wrong" } : item
        )
      );
    }
    console.log(progressArr);
    setProgress((prev) => prev + 1);
  };

  useEffect(() => {
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: "current" } : item
      )
    );
    const curQuizType = getRandomNum(3);
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
    </>
  );
};

export default QuizMain;
 