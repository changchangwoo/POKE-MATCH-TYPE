import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHomeEnd from "@components/quizHome/QuizHomeEnd";
import RankingList from "@components/quiz/RankingList";
import SubmitModal from "@components/quiz/SubmitModal";
import { loadSession, clearSession, saveStamp, isAlreadySubmitted, markSubmitted } from "@hooks/useQuizSession";

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizId = Number(id);

  const [progressArr, setProgressArr] = useState<{ step: string }[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState<number | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDismissed, setIsModalDismissed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    const count = session.questions.filter((q) => q.status === "correct").length;
    setCorrectCount(count);
    if (session.elapsedSeconds !== null) {
      saveStamp(quizId, count, session.elapsedSeconds);
    }

    if (count >= 7 && session.elapsedSeconds !== null && !isAlreadySubmitted(quizId)) {
      setIsModalOpen(true);
    }

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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalDismissed(true);
  };

  const handleSubmitSuccess = () => {
    markSubmitted(quizId);
  };

  if (!sessionLoaded) {
    return null;
  }

  return (
    <div css={quizPageWrapper}>
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
          <RankingList quizId={quizId} />
        </div>
      </div>
      {!isModalDismissed && elapsedSeconds !== null && (
        <SubmitModal
          quizId={quizId}
          score={correctCount}
          timeSeconds={elapsedSeconds}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
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

export default QuizResultPage;
