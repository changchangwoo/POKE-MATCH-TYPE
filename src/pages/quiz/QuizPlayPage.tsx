import { css } from "@emotion/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "@services/getInitialData";
import QuizHomeMain from "@components/quizHome/QuizHomeMain";
import {
  loadSession,
  clearSession,
  finishSession,
} from "@hooks/useQuizSession";

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizPlayPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { text } = useContext(LanguageContext);
  const quizId = Number(id);

  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" })),
  );
  const [progress, setProgress] = useState<number>(0);
  const [questionTypes, setQuestionTypes] = useState<number[]>([]);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id || !VALID_QUIZ_IDS.includes(quizId)) {
      navigate("/quiz", { replace: true });
      return;
    }

    const session = loadSession();
    if (!session || session.quizId !== quizId) {
      navigate(`/quiz/${quizId}/intro`, { replace: true });
      return;
    }

    setProgress(session.progress);
    setQuestionTypes(session.questionTypes);
    setProgressArr(session.questions.map((q) => ({ step: q.status })));
    setSessionLoaded(true);
  }, []);

  const handleComplete = useCallback(() => {
    finishSession();
    navigate(`/quiz/${quizId}/result`, { replace: true });
  }, [navigate, quizId]);

  const handleExit = useCallback(() => {
    clearSession();
    navigate("/quiz");
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (progress < 10) {
        e.preventDefault();
        e.returnValue = text.QUIZ.PLAY.BEFOREUNLOAD;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [progress]);

  if (!sessionLoaded) {
    return null;
  }

  return (
    <div css={quizPageWrapper}>
      <div css={pageContainer}>
        <QuizHomeMain
          selectedQuiz={quizId}
          questionTypes={questionTypes}
          progress={progress}
          setProgress={setProgress}
          progressArr={progressArr}
          setProgressArr={setProgressArr}
          onComplete={handleComplete}
          onExit={handleExit}
        />
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
  align-items: flex-start;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export default QuizPlayPage;
