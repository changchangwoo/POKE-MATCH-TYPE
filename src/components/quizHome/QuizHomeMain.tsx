import { css } from "@emotion/react";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import QuizType0DamageEffectiveness from "@components/quiz/QuizType0DamageEffectiveness";
import QuizType1TypeInference from "@components/quiz/QuizType1TypeInference";
import QuizType2TypeDescription from "@components/quiz/QuizType2TypeDescription";
import QuizAlert from "@components/modal/QuizAlert";
import { getTranslateType } from "@utils/getTranslateType";
import { LanguageContext } from "@services/getInitialData";
import StepProgress from "@components/quiz/StepProgress";
import { loadSession } from "@hooks/useQuizSession";

interface QuizHomeMainProps {
  selectedQuiz: number;
  questionTypes: number[];
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  progressArr: { step: string }[];
  setProgressArr: Dispatch<SetStateAction<{ step: string }[]>>;
  onComplete: () => void;
  onExit: () => void;
}

const QuizHomeMain = ({
  selectedQuiz,
  questionTypes,
  progress,
  setProgress,
  progressArr,
  setProgressArr,
  onComplete,
  onExit,
}: QuizHomeMainProps) => {
  const { language, text } = useContext(LanguageContext);
  const [alertType, setAlertType] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [answerText, setAnswerText] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const session = loadSession();
    const startTime = session
      ? new Date(session.startTime).getTime()
      : Date.now();

    const tick = () => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    };
    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const getQuizTypeForQuestion = (
    quizId: number,
    questionIndex: number,
    typeSequence: number[],
  ): number => {
    if (quizId === 1) {
      return typeSequence[questionIndex];
    }
    return quizId - 2;
  };

  const currentQuizType = getQuizTypeForQuestion(
    selectedQuiz,
    progress,
    questionTypes,
  );

  const submitAnswer = (
    answerIdx: number,
    correctIdx: number,
    correctData: any,
  ) => {
    const isCorrect = answerIdx === correctIdx;
    if (correctData.name)
      setAnswerText(getTranslateType(correctData.name, language.type));
    else if (correctData.damage) setAnswerText(`${correctData.damage}x`);

    setAlertType(isCorrect ? "correct" : "incorrect");
    setProgressArr((prev) =>
      prev.map((item, idx) =>
        idx === progress ? { step: isCorrect ? "correct" : "wrong" } : item,
      ),
    );
    setIsNext(true);

    // Update session storage
    const session = sessionStorage.getItem("quizSession");
    if (session) {
      const parsed = JSON.parse(session);
      parsed.questions[progress] = {
        ...parsed.questions[progress],
        status: isCorrect ? "correct" : "wrong",
        answer: answerIdx,
        correctAnswer: correctData,
        viewed: true,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem("quizSession", JSON.stringify(parsed));
    }
  };

  const handleNextButton = () => {
    setAlertType(null);
    setProgress((prev) => prev + 1);
    setIsNext(false);
  };

  const handleExitQuiz = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    sessionStorage.removeItem("quizSession");
    onExit();
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  useEffect(() => {
    if (progress >= 10) {
      onComplete();
      return;
    }

    const currentStatus = progressArr[progress]?.step;

    if (currentStatus === "correct" || currentStatus === "wrong") {
      setIsNext(true);

      const session = sessionStorage.getItem("quizSession");
      if (session) {
        const parsed = JSON.parse(session);
        const questionData = parsed.questions[progress];
        if (questionData && questionData.correctAnswer) {
          if (questionData.correctAnswer.name) {
            setAnswerText(
              getTranslateType(questionData.correctAnswer.name, language.type),
            );
          } else if (questionData.correctAnswer.damage) {
            setAnswerText(`${questionData.correctAnswer.damage}x`);
          }
        }
      }
    } else {
      setAlertType(null);
      setIsNext(false);
      setProgressArr((prev) =>
        prev.map((item, idx) => {
          if (idx === progress) return { step: "current" };
          if (item.step === "current") return { step: "none" };
          return item;
        }),
      );
    }

    const session = sessionStorage.getItem("quizSession");
    if (session) {
      const parsed = JSON.parse(session);
      parsed.progress = progress;
      sessionStorage.setItem("quizSession", JSON.stringify(parsed));
    }
  }, [progress, onComplete, language.type]);

  return (
    <div css={quizMainContainer}>
      <div css={controlBar}>
        <div css={topRow}>
          <span css={timerDisplay}>{formatTime(elapsedSeconds)}</span>
          <StepProgress
            currentStep={progress}
            progressArr={progressArr}
            setProgress={setProgress}
          />
          <button
            css={exitButton}
            onClick={handleExitQuiz}
            aria-label="Exit Quiz"
          >
            {text.QUIZ?.EXIT || "나가기"}
          </button>
        </div>
        <div css={progressRow}>
          <StepProgress
            currentStep={progress}
            progressArr={progressArr}
            setProgress={setProgress}
          />
        </div>
      </div>
      <div css={quizCardContainer}>
        {progress >= 10 ? null : (() => {
          switch (currentQuizType) {
            case 0:
              return (
                <QuizType0DamageEffectiveness
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            case 1:
              return (
                <QuizType1TypeInference
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            case 2:
              return (
                <QuizType2TypeDescription
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            default:
              return <div>{text.QUIZ.ERROR}</div>;
          }
        })()}
      </div>
      {isNext && (
        <div css={bottomActionsContainer}>
          {alertType && (
            <QuizAlert quizType={alertType} answerText={answerText} />
          )}
          <button
            aria-label="Next Question"
            css={nextButton}
            onClick={handleNextButton}
          >
            {text.QUIZ.NEXT}
          </button>
        </div>
      )}
      {showExitConfirm && (
        <div css={modalOverlay}>
          <div css={modalContent}>
            <h2 css={modalTitle}>퀴즈를 종료하시겠습니까?</h2>
            <p css={modalMessage}>현재까지의 진행 상황이 저장되지 않습니다.</p>
            <div css={modalButtons}>
              <button css={modalButton(false)} onClick={cancelExit}>
                계속하기
              </button>
              <button css={modalButton(true)} onClick={confirmExit}>
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const quizMainContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 800px;
  margin-top: 20px;
`;

const controlBar = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const topRow = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    & > div {
      display: none;
    }
  }
`;

const progressRow = css`
  display: none;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const timerDisplay = css`
  font-size: var(--fontMedium);
  color: var(--point);
  font-variant-numeric: tabular-nums;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--background);

  @media (max-width: 600px) {
    font-size: var(--fontSmall);
    padding: 6px 12px;
  }
`;

const quizCardContainer = css`
  h1,
  h2 {
    color: var(--text);
  }
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  min-height: 300px;

  @media (max-width: 768px) {
    min-height: 250px;
  }
`;

const exitButton = css`
  background-color: var(--background);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: var(--fontSmall);
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background-color: var(--type10);
    color: white;
    border-color: var(--type10);
  }

  @media (max-width: 600px) {
    font-size: var(--fontExtraSmall);
    padding: 6px 12px;
  }
`;

const bottomActionsContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const nextButton = css`
  position: relative;
  background-color: var(--background);
  border: 1px solid var(--border);
  color: var(--text);
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 30px;
  min-width: 120px;

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContent = css`
  background-color: var(--background);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const modalTitle = css`
  color: var(--text);
  font-size: var(--fontLarge);
  margin: 0 0 15px 0;
  text-align: center;
`;

const modalMessage = css`
  color: var(--text);
  font-size: var(--fontMedium);
  margin: 0 0 25px 0;
  text-align: center;
  opacity: 0.8;
`;

const modalButtons = css`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const modalButton = (isDanger: boolean) => css`
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background-color: ${isDanger ? "var(--type10)" : "var(--background)"};
  color: ${isDanger ? "white" : "var(--text)"};
  cursor: pointer;
  font-size: var(--fontMedium);
  transition: all 0.2s;
  min-width: 100px;

  &:hover {
    ${isDanger
      ? `
        background-color: var(--type14);
        border-color: var(--type14);
      `
      : `
        background-color: var(--border);
      `}
  }
`;

export default QuizHomeMain;
