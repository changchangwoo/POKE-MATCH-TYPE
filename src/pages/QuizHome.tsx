import { css } from "@emotion/react";
import QuizDashboard from "@components/quizHome/QuizDashboard";
import QuizSelectionList from "@components/quizHome/QuizSelectionList";

const QuizHome = () => {
  return (
    <div css={quizHomeContainer}>
      <QuizDashboard />
      <QuizSelectionList />
    </div>
  );
};

const quizHomeContainer = css`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  > div:first-of-type {
    flex: 0 0 38%;
    min-width: 0;
  }

  > div:last-of-type {
    flex: 0 0 62%;
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div:first-of-type,
    > div:last-of-type {
      flex: 1;
      width: 100%;
    }
  }
`;

export default QuizHome;
