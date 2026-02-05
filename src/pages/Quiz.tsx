import { css } from "@emotion/react";
import { useContext, useState } from "react";
import QuizEnd from "@components/quiz/QuizEnd";
import QuizIntro from "@components/quiz/QuizIntro";
import QuizMain from "@components/quiz/QuizMain";
import QuizReady from "@components/quiz/QuizReady";
import { LanguageContext } from "@services/getInitialData";

const Quiz = () => {
  const { text } = useContext(LanguageContext);
  const [section, setSection] = useState<number>(0);
  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" })),
  );

  return (
    <>
      <div css={quizContainer}>
        <h1>{text.QUIZ.TITLE}</h1>
        {(() => {
          switch (section) {
            case 0:
              return <QuizReady setSection={setSection} />;
            case 1:
              return <QuizIntro setSection={setSection} />;
            case 2:
              return (
                <QuizMain
                  setSection={setSection}
                  progressArr={progressArr}
                  setProgressArr={setProgressArr}
                />
              );
            case 3:
              return (
                <QuizEnd
                  progressArr={progressArr}
                  setSection={setSection}
                  setProgressArr={setProgressArr}
                />
              );
            default:
              return <div>{text.QUIZ.ERROR}</div>;
          }
        })()}
      </div>
    </>
  );
};

const quizContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 10px;
  h1 {
    color: var(--text);
  }
`;

export default Quiz;
