import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHomeEnd from "@components/quizHome/QuizHomeEnd";
import RankingList from "@components/quiz/RankingList";
import { loadSession, clearSession } from "@hooks/useQuizSession";

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizId = Number(id);

  const [progressArr, setProgressArr] = useState<{ step: string }[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState<number | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    if (!id || !VALID_QUIZ_IDS.includes(quizId)) {
      navigate("/quiz", { replace: true });
      return;
    }

    const session = loadSession();
    if (!session || session.quizId !== quizId) {
      navigate("/quiz", { replace: true });
      return;
    }

    setProgressArr(session.questions.map((q) => ({ step: q.status })));
    setElapsedSeconds(session.elapsedSeconds);
    setSessionLoaded(true);
  }, []);

  const handleRetry = () => {
    clearSession();
    navigate(`/quiz/${quizId}/intro`);
  };

  const handleSelectDifferent = () => {
    clearSession();
    navigate("/quiz");
  };

  if (!sessionLoaded) {
    return null;
  }

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <QuizHomeEnd
          selectedQuiz={quizId}
          progressArr={progressArr}
          elapsedSeconds={elapsedSeconds}
          onRetry={handleRetry}
          onSelectDifferent={handleSelectDifferent}
        />
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

export default QuizResultPage;
