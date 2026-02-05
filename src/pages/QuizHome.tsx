import { css } from "@emotion/react";
import QuizDashboard from "@components/quizHome/QuizDashboard";
import QuizSelectionList from "@components/quizHome/QuizSelectionList";

const QuizHome = () => {
  return (
    <div css={quizHomeContainer}>
      <QuizSelectionList />
      <QuizDashboard />
    </div>
  );
};

const quizHomeContainer = css`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: stretch;

  > div:first-of-type {
    flex: 0 0 65%;
    min-width: 0;
  }

  > div:last-of-type {
    flex: 0 0 35%;
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
