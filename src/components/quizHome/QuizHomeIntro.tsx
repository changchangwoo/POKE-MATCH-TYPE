import { css } from "@emotion/react";
import q1Intro from "@images/quiz/q1-intro.webp";
import q2Intro from "@images/quiz/q2-intro.jpeg";
import q3Intro from "@images/quiz/q3-intro.jpeg";
import q4Intro from "@images/quiz/q4-intro.jpeg";

interface QuizHomeIntroProps {
  selectedQuiz: number;
  onStart: () => void;
}

const difficultyColors = {
  easy: "var(--type12)",
  medium: "var(--type13)",
  hard: "var(--type14)",
};

const difficultyLabels = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

const QuizHomeIntro = ({ selectedQuiz, onStart }: QuizHomeIntroProps) => {
  const quizData = [
    {
      id: 1,
      title: "타입 종합 퀴즈",
      difficulty: "medium" as const,
      story: "숲 속에서 길을 잃은 피카츄를 도와 안전한 길을 찾아주세요!",
      lore: "깊은 숲 속에서 길을 잃은 피카츄가 도움을 요청하고 있어요. \n 각 타입의 강점과 약점을 정확히 꿰뚫고 피카츄를 무사히 집까지 데려다주세요!",
      image: q1Intro,
    },
    {
      id: 2,
      title: "피해량 맞추기",
      difficulty: "hard" as const,
      story: "이상해씨와 함께 맛있는 요리를 완성해 보세요!",
      lore: "이상해씨의 특별한 요리 대회가 열렸어요! \n타입 공격의 피해량을 정확히 판단해 이상해씨와 요리를 완성해주세요!",
      image: q2Intro,
    },
    {
      id: 3,
      title: "부등호 방향 맞추기",
      difficulty: "easy" as const,
      story: "소방관 꼬부기와 함께 침착하게 불을 진압하세요!",
      lore: "마을에 화재가 발생했어요! 소방관 꼬부기가 출동했습니다. \n두 타입의 상성을 비교하고 올바른 부등호 방향을 선택해서 꼬부기의 진화 작전을 도와주세요!",
      image: q3Intro,
    },
    {
      id: 4,
      title: "타입 배수 구하기",
      difficulty: "medium" as const,
      story: "파이리 산타가 들키지 않고 선물을 전달할 수 있도록 도와주세요!",
      lore: "크리스마스 이브, 파이리 산타가 포켓몬 마을에 선물을 배달하고 있어요. \n정확한 배수를 계산해야 들키지 않고 선물을 전달할 수 있답니다!",
      image: q4Intro,
    },
  ];

  const currentQuiz = quizData.find((q) => q.id === selectedQuiz);

  if (!currentQuiz) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
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
        <p css={introLore}>{currentQuiz.lore}</p>
      </div>
      <button aria-label="Start Quiz" css={startButton} onClick={onStart}>
        시작하기
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
  font-weight: bold;
`;

const introDifficultyBadge = (color: string) => css`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--fontSmall);
  font-weight: 600;
  background-color: ${color};
  color: var(--background);
  white-space: nowrap;
`;

const introStory = css`
  font-size: var(--fontMedium);
  color: var(--point);
  font-weight: 500;
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
