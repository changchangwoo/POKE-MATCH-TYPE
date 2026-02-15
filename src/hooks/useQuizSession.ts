export interface QuizSession {
  quizId: number;
  progress: number;
  startTime: string;
  endTime: string | null;
  elapsedSeconds: number | null;
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
      matchDatas?: any;
      groupResult?: any;
      quizNum?: number;
      randQuiz?: number;
      randBlank?: number;
      attacker?: any;
      defender?: any[];
      answer?: any;
    };
  }>;
}

const SESSION_KEY = "quizSession";

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

export const initSession = (quizId: number): QuizSession => {
  const types = quizId === 1 ? generateBalancedTypeSequence() : [];

  const newSession: QuizSession = {
    quizId,
    progress: 0,
    startTime: new Date().toISOString(),
    endTime: null,
    elapsedSeconds: null,
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

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  return newSession;
};

export const loadSession = (): QuizSession | null => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const finishSession = (): number => {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (session) {
    const parsed: QuizSession = JSON.parse(session);
    const now = new Date();
    const start = new Date(parsed.startTime);
    const elapsedSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

    parsed.endTime = now.toISOString();
    parsed.elapsedSeconds = elapsedSeconds;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
    return elapsedSeconds;
  }
  return 0;
};

export const updateSessionProgress = (progress: number): void => {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (session) {
    const parsed = JSON.parse(session);
    parsed.progress = progress;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
  }
};

// --- 랭킹 제출 완료 플래그 (sessionStorage) ---

const SUBMITTED_KEY = "quizRankingSubmitted";

export const markSubmitted = (quizId: number): void => {
  sessionStorage.setItem(`${SUBMITTED_KEY}_${quizId}`, "true");
};

export const isAlreadySubmitted = (quizId: number): boolean => {
  return sessionStorage.getItem(`${SUBMITTED_KEY}_${quizId}`) === "true";
};

// --- 스탬프 (localStorage) ---

export interface QuizStamp {
  best: number;
  time: number;
}

export type QuizStamps = Record<string, QuizStamp>;

const STAMP_KEY = "quizStamps";

export const loadStamps = (): QuizStamps => {
  try {
    const stored = localStorage.getItem(STAMP_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const saveStamp = (quizId: number, score: number, time: number): void => {
  const stamps = loadStamps();
  const key = String(quizId);
  const existing = stamps[key];

  if (!existing || score > existing.best || (score === existing.best && time < existing.time)) {
    stamps[key] = { best: score, time };
    localStorage.setItem(STAMP_KEY, JSON.stringify(stamps));
  }
};
