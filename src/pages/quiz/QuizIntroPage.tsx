import { css } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHomeIntro from "@components/quizHome/QuizHomeIntro";
import RankingList from "@components/quiz/RankingList";

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizIntroPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizId = Number(id);

  if (!id || !VALID_QUIZ_IDS.includes(quizId)) {
    navigate("/quiz", { replace: true });
    return null;
  }

  const handleStart = () => {
    navigate(`/quiz/${quizId}/play`);
  };

  return (
    <div css={quizPageWrapper}>
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <QuizHomeIntro selectedQuiz={quizId} onStart={handleStart} />
        </div>
        <div css={rightWrapper}>
          <RankingList />
        </div>
      </div>
    </div>
  );
};

const quizPageWrapper = css`
  width: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: auto;
    align-items: flex-start;
  }
`;

const pageContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 10px;
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
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export default QuizIntroPage;
