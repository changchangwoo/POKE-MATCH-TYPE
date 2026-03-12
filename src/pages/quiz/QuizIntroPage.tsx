import { css } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHomeIntro from "@components/quizHome/QuizHomeIntro";
import RankingList from "@components/quiz/RankingList";
import { initSession } from "@hooks/useQuizSession";

import q1Success from "@images/quiz/q1-success.webp";
import q1Miss from "@images/quiz/q1-miss.webp";
import q1Clear from "@images/quiz/q1-clear.webp";
import q1Fail from "@images/quiz/q1-fail.webp";
import q2Success from "@images/quiz/q2-success.webp";
import q2Miss from "@images/quiz/q2-miss.webp";
import q2Clear from "@images/quiz/q2-clear.webp";
import q2Fail from "@images/quiz/q2-fail.webp";
import q3Success from "@images/quiz/q3-success.webp";
import q3Miss from "@images/quiz/q3-miss.webp";
import q3Clear from "@images/quiz/q3-clear.webp";
import q3Fail from "@images/quiz/q3-fail.webp";
import q4Success from "@images/quiz/q4-success.webp";
import q4Miss from "@images/quiz/q4-miss.webp";
import q4Clear from "@images/quiz/q4-clear.webp";
import q4Fail from "@images/quiz/q4-fail.webp";

const quizImages: Record<number, string[]> = {
  1: [q1Success, q1Miss, q1Clear, q1Fail],
  2: [q2Success, q2Miss, q2Clear, q2Fail],
  3: [q3Success, q3Miss, q3Clear, q3Fail],
  4: [q4Success, q4Miss, q4Clear, q4Fail],
};

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizIntroPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizId = Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id || !VALID_QUIZ_IDS.includes(quizId)) {
      navigate("/quiz", { replace: true });
    }
  }, [id, quizId, navigate]);

  useEffect(() => {
    const images = quizImages[quizId];
    if (images) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [quizId]);

  const handleStart = () => {
    initSession(quizId);
    navigate(`/quiz/${quizId}/play`);
  };

  if (!id || !VALID_QUIZ_IDS.includes(quizId)) {
    return null;
  }

  return (
    <div css={quizPageWrapper}>
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <QuizHomeIntro selectedQuiz={quizId} onStart={handleStart} />
        </div>
        <div css={rightWrapper}>
          <RankingList quizId={quizId} />
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
  max-height: 516px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    max-height: none;
    width: 100%;
  }
`;

const rightWrapper = css`
  flex: 0 0 35%;
  min-width: 0;
  max-height: 516px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    max-height: none;
    width: 100%;
  }
`;

export default QuizIntroPage;
