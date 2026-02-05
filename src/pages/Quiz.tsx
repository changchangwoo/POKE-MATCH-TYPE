import { css } from "@emotion/react";
import { useContext, useState } from "react";
import QuizEnd from "@components/quiz/QuizEnd";
import QuizIntro from "@components/quiz/QuizIntro";
import QuizMain from "@components/quiz/QuizMain";
import QuizReady from "@components/quiz/QuizReady";
import RankingList from "@components/quiz/RankingList";
import { LanguageContext } from "@services/getInitialData";

const Quiz = () => {
  const { text } = useContext(LanguageContext);
  const [section, setSection] = useState<number>(0);
  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" })),
  );

  return (
    <div css={quizPageContainer}>
      <div css={quizContentWrapper}>
        <div css={quizContainer}>
          {/* <h1>{text.QUIZ.TITLE}</h1> */}
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
      </div>

      <div css={rankingWrapper}>
        <RankingList />
      </div>
    </div>
  );
};

const quizPageContainer = css`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const quizContentWrapper = css`
  flex: 0 0 65%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const rankingWrapper = css`
  flex: 0 0 35%;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

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
