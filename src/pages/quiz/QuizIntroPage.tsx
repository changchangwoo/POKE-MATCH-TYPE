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
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <QuizHomeIntro selectedQuiz={quizId} onStart={handleStart} />
      </div>
      <div css={rightWrapper}>
        <RankingList />
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

export default QuizIntroPage;
