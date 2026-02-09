import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import QuizDashboard from "@components/quizHome/QuizDashboard";
import QuizSelectionList from "@components/quizHome/QuizSelectionList";
import { initSession } from "@hooks/useQuizSession";

const QuizSelectPage = () => {
  const navigate = useNavigate();

  const handleQuizSelect = (quizId: number) => {
    initSession(quizId);
    navigate(`/quiz/${quizId}/intro`);
  };

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <QuizSelectionList onSelect={handleQuizSelect} />
      </div>
      <div css={rightWrapper}>
        <QuizDashboard />
      </div>
    </div>
  );
};

const pageContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 20px;
    height: auto;
  }
`;

const contentWrapper = css`
  flex: 0 0 65%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const rightWrapper = css`
  flex: 0 0 35%;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export default QuizSelectPage;
