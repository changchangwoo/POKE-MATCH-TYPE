import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHomeMain from "@components/quizHome/QuizHomeMain";
import { loadSession, clearSession, finishSession } from "@hooks/useQuizSession";

const VALID_QUIZ_IDS = [1, 2, 3, 4];

const QuizPlayPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizId = Number(id);

  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" }))
  );
  const [progress, setProgress] = useState<number>(0);
  const [questionTypes, setQuestionTypes] = useState<number[]>([]);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
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
    setProgressArr(
      session.questions.map((q) => ({ step: q.status }))
    );
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
        e.returnValue = "퀴즈가 진행 중입니다. 페이지를 나가시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [progress]);

  if (!sessionLoaded) {
    return null;
  }

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
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

const contentWrapper = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export default QuizPlayPage;
