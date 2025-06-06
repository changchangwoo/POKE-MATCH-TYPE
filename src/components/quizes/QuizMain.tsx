import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";
import { getRandomNum } from "../../utils/getRandomNum";

const QuizMain = () => {
  const [progress, setProgress] = useState<number>(0);
  const [quizType, setQuizType] = useState<number>(0);

  const submitAnswer = useCallback((answer: any, correct: any) => {
    console.log(answer, correct)
    if (answer === correct) {
      alert("정답입니다!");
    } else {
      alert("틀렸습니다! 정답은 " + correct + "입니다.");
    }
    setProgress((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const curQuizType = getRandomNum(3);
    console.log("현재 퀴즈 유형: ", curQuizType);
    setQuizType(curQuizType);
  }, [progress]);

  return (
    <>
      <div css={progressContainer}>{progress}</div>
      <h1>Main</h1>
      {(() => {
        switch (quizType) {
          case 0:
            return (
              <QuizType0_damageEffectiveness
                key={progress}
                submitAnswer={submitAnswer}
              />
            );
          case 1:
            return (
              <QuizType1_quizTypeInference
                key={progress}
                submitAnswer={submitAnswer}
              />
            );
          case 2:
            return (
              <QuizType2_typeDescription
                key={progress}
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

const progressContainer = css`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default QuizMain;
