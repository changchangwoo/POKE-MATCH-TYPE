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
      <div css={leftWrapper}>
        <QuizDashboard />
      </div>
      <div css={contentWrapper}>
        <QuizSelectionList onSelect={handleQuizSelect} />
      </div>
    </div>
  );
};

const pageContainer = css`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  max-height: 615px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 10px;
    max-height: none;
  }
`;

const leftWrapper = css`
  flex: 0 0 45%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const contentWrapper = css`
  flex: 0 0 55%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export default QuizSelectPage;
