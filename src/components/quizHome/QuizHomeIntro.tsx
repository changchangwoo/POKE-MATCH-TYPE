import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import q1Intro from "@images/quiz/q1-intro.webp";
import q2Intro from "@images/quiz/q2-intro.webp";
import q3Intro from "@images/quiz/q3-intro.webp";
import q4Intro from "@images/quiz/q4-intro.webp";

interface QuizHomeIntroProps {
  selectedQuiz: number;
  onStart: () => void;
}

const difficultyColors = {
  easy: "var(--type12)",
  medium: "var(--type13)",
  hard: "var(--type14)",
};

const QuizHomeIntro = ({ selectedQuiz, onStart }: QuizHomeIntroProps) => {
  const { text } = useContext(LanguageContext);
  const sel = text.QUIZ.SELECTION;
  const diff = text.QUIZ.DIFFICULTY;

  const difficultyLabels = {
    easy: diff.EASY,
    medium: diff.MEDIUM,
    hard: diff.HARD,
  };

  const quizData = [
    {
      id: 1,
      title: sel.Q1_TITLE,
      difficulty: "medium" as const,
      story: sel.Q1_INTRO_STORY,
      lore: sel.Q1_INTRO_LORE,
      image: q1Intro,
    },
    {
      id: 2,
      title: sel.Q2_TITLE,
      difficulty: "medium" as const,
      story: sel.Q2_INTRO_STORY,
      lore: sel.Q2_INTRO_LORE,
      image: q2Intro,
    },
    {
      id: 3,
      title: sel.Q3_TITLE,
      difficulty: "easy" as const,
      story: sel.Q3_INTRO_STORY,
      lore: sel.Q3_INTRO_LORE,
      image: q3Intro,
    },
    {
      id: 4,
      title: sel.Q4_TITLE,
      difficulty: "hard" as const,
      story: sel.Q4_INTRO_STORY,
      lore: sel.Q4_INTRO_LORE,
      image: q4Intro,
    },
  ];

  const currentQuiz = quizData.find((q) => q.id === selectedQuiz);

  if (!currentQuiz) {
    return <div>{text.QUIZ.INTRO.NOT_FOUND}</div>;
  }

  return (
    <div css={introContainer}>
      <img src={currentQuiz.image} css={introImage} alt={currentQuiz.title} />
      <div css={introText}>
        <div css={titleRow}>
          <h2 css={introTitle}>{currentQuiz.title}</h2>
          <span
            css={introDifficultyBadge(difficultyColors[currentQuiz.difficulty])}
          >
            {difficultyLabels[currentQuiz.difficulty]}
          </span>
        </div>
        <p css={introStory}>{currentQuiz.story}</p>
        <p css={introLore}>
          {(currentQuiz.lore as string).split("\n").map((line: string, i: number) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <button aria-label="Start Quiz" css={startButton} onClick={onStart}>
        {text.QUIZ.INTRO.START}
      </button>
    </div>
  );
};

const introContainer = css`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 400px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const introImage = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  border: 1px solid var(--border);
  object-fit: cover;
`;

const introText = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const titleRow = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const introTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const introDifficultyBadge = (color: string) => css`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--fontSmall);
  background-color: ${color};
  color: var(--background);
  white-space: nowrap;
`;

const introStory = css`
  font-size: var(--fontMedium);
  color: var(--point);
  margin: 0;
  line-height: 1.5;
  font-style: italic;
`;

const introLore = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.8;
  margin: 0;
  line-height: 1.7;
`;

const introDescription = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
  margin: 0;
  line-height: 1.5;
`;

const startButton = css`
  width: 120px;
  height: 45px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--text);
  font-size: var(--fontMedium);
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: var(--border);
  }
`;

export default QuizHomeIntro;
