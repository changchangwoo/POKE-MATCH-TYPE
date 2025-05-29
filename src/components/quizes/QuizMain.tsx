import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";

const QuizMain = () => {
  const [progress, setProgress] = useState<number>(0);
  const [quizType, setQuizType] = useState<number>(0);

  useEffect(() => {
    // const curQuizType = Math.floor(Math.random() * 3);
    const curQuizType = 0;
    setQuizType(curQuizType);
  }, [progress]);

  return (
    <>
      <div css={progressContainer}>{progress}</div>
      <h1>Main</h1>
      {(() => {
        switch (quizType) {
          case 0:
            return <QuizType0_damageEffectiveness setProgress={setProgress} />;
          case 1:
            return <QuizType1_quizTypeInference setProgress={setProgress} />;
          case 2:
            return <QuizType2_typeDescription setProgress={setProgress} />;
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
