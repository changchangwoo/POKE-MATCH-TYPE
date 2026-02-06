import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import QuizDashboard from "@components/quizHome/QuizDashboard";
import QuizSelectionList from "@components/quizHome/QuizSelectionList";
import QuizHomeIntro from "@components/quizHome/QuizHomeIntro";
import QuizHomeMain from "@components/quizHome/QuizHomeMain";
import QuizHomeEnd from "@components/quizHome/QuizHomeEnd";
import RankingList from "@components/quiz/RankingList";

interface QuizSession {
  quizId: number;
  progress: number;
  startTime: string;
  questionTypes: number[];
  questions: Array<{
    index: number;
    type: number;
    status: "none" | "current" | "correct" | "wrong";
    answer: any | null;
    correctAnswer: any | null;
    viewed: boolean;
    timestamp: string;
    questionData?: {
      questionArr: any[];
      answerIdx: number;
      // QuizType0 specific
      matchDatas?: any;
      groupResult?: any;
      quizNum?: number;
      // QuizType1 specific
      randQuiz?: number;
      randBlank?: number;
      // QuizType2 specific
      attacker?: any;
      defender?: any[];
      answer?: any;
    };
  }>;
}

const QuizHome = () => {
  const [section, setSection] = useState<number>(0);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [progressArr, setProgressArr] = useState<{ step: string }[]>(() =>
    new Array(10).fill(null).map(() => ({ step: "none" }))
  );
  const [progress, setProgress] = useState<number>(0);
  const [questionTypes, setQuestionTypes] = useState<number[]>([]);

  // Session storage helpers
  const saveSession = (data: QuizSession) => {
    sessionStorage.setItem("quizSession", JSON.stringify(data));
  };

  const loadSession = (): QuizSession | null => {
    try {
      const stored = sessionStorage.getItem("quizSession");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // Generate balanced type sequence for Quiz 1
  const generateBalancedTypeSequence = (): number[] => {
    const sequence = [0, 0, 0, 1, 1, 1, 2, 2, 2];
    const randomType = Math.floor(Math.random() * 3);
    sequence.push(randomType);

    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }

    return sequence;
  };

  // Handle quiz selection
  const handleQuizSelect = (quizId: number) => {
    setSelectedQuiz(quizId);
    const types = quizId === 1 ? generateBalancedTypeSequence() : [];
    setQuestionTypes(types);
    setProgressArr(new Array(10).fill(null).map(() => ({ step: "none" })));
    setProgress(0);

    // Initialize session
    const newSession: QuizSession = {
      quizId,
      progress: 0,
      startTime: new Date().toISOString(),
      questionTypes: types,
      questions: new Array(10).fill(null).map((_, idx) => ({
        index: idx,
        type: types.length > 0 ? types[idx] : quizId - 2,
        status: "none",
        answer: null,
        correctAnswer: null,
        viewed: false,
        timestamp: "",
        questionData: undefined,
      })),
    };
    saveSession(newSession);

    setSection(1);
  };

  // Load session on mount
  useEffect(() => {
    const session = loadSession();
    if (session && session.progress < 10) {
      setSelectedQuiz(session.quizId);
      setProgress(session.progress);
      setQuestionTypes(session.questionTypes);
      setProgressArr(
        session.questions.map((q) => ({ step: q.status }))
      );
      setSection(2);
    }
  }, []);

  // Warn on page unload during quiz
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (section === 2 && progress < 10) {
        e.preventDefault();
        e.returnValue = "퀴즈가 진행 중입니다. 페이지를 나가시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [section, progress]);

  return (
    <div css={quizHomeContainer(section)}>
      <div css={quizContentWrapper(section)}>
        {(() => {
          switch (section) {
            case 0:
              return <QuizSelectionList onSelect={handleQuizSelect} />;
            case 1:
              return selectedQuiz ? (
                <QuizHomeIntro
                  selectedQuiz={selectedQuiz}
                  setSection={setSection}
                />
              ) : (
                <div>퀴즈를 선택해주세요</div>
              );
            case 2:
              return selectedQuiz ? (
                <QuizHomeMain
                  selectedQuiz={selectedQuiz}
                  questionTypes={questionTypes}
                  progress={progress}
                  setProgress={setProgress}
                  progressArr={progressArr}
                  setProgressArr={setProgressArr}
                  setSection={setSection}
                />
              ) : (
                <div>퀴즈를 선택해주세요</div>
              );
            case 3:
              return selectedQuiz ? (
                <QuizHomeEnd
                  selectedQuiz={selectedQuiz}
                  progressArr={progressArr}
                  setSection={setSection}
                  setSelectedQuiz={setSelectedQuiz}
                  setProgress={setProgress}
                  setProgressArr={setProgressArr}
                  setQuestionTypes={setQuestionTypes}
                />
              ) : (
                <div>퀴즈를 선택해주세요</div>
              );
            default:
              return <div>오류가 발생했습니다</div>;
          }
        })()}
      </div>
      {section !== 2 && (
        <div css={quizRightWrapper}>
          {section === 0 && <QuizDashboard />}
          {(section === 1 || section === 3) && <RankingList />}
        </div>
      )}
    </div>
  );
};

const quizHomeContainer = (section: number) => css`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  ${section === 2 &&
  `
    max-width: 800px;
    margin: 0 auto;
  `}

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: ${section === 2 ? '0' : '20px'};
    height: auto;
  }
`;

const quizContentWrapper = (section: number) => css`
  flex: ${section === 2 ? '1' : '0 0 65%'};
  min-width: 0;
  display: flex;
  flex-direction: column;
  width: ${section === 2 ? '100%' : 'auto'};

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const quizRightWrapper = css`
  flex: 0 0 35%;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export default QuizHome;
