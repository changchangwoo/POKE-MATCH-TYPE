import { css } from "@emotion/react";
import q1Intro from "@images/quiz/q1-intro.webp";
import q2Intro from "@images/quiz/q2-intro.jpeg";
import q3Intro from "@images/quiz/q3-intro.jpeg";
import q4Intro from "@images/quiz/q4-intro.jpeg";

interface QuizHomeIntroProps {
  selectedQuiz: number;
  onStart: () => void;
}

const QuizHomeIntro = ({ selectedQuiz, onStart }: QuizHomeIntroProps) => {
  const quizData = [
    {
      id: 1,
      title: "타입 종합 퀴즈",
      story: "숲 속에서 길을 잃은 피카츄를 도와 안전한 길을 찾아주세요!",
      description: "포켓몬 타입 상성을 종합적으로 테스트하는 퀴즈",
      image: q1Intro,
    },
    {
      id: 2,
      title: "피해량 맞추기",
      story: "이상해씨와 함께 맛있는 요리를 완성해 보세요!",
      description: "타입 공격에 대한 피해량을 맞추는 퀴즈",
      image: q2Intro,
    },
    {
      id: 3,
      title: "부등호 방향 맞추기",
      story: "소방관 꼬부기와 함께 침착하게 불을 진압하세요!",
      description: "두 타입의 상성을 비교하여 부등호 방향을 맞추는 퀴즈",
      image: q3Intro,
    },
    {
      id: 4,
      title: "타입 배수 구하기",
      story: "파이리 산타가 들키지 않고 선물을 전달할 수 있도록 도와주세요!",
      description: "주어진 포켓몬에 가하는 타입 배수를 구하는 퀴즈",
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
        <h2 css={introTitle}>{currentQuiz.title}</h2>
        <p css={introStory}>{currentQuiz.story}</p>
        <p css={introDescription}>{currentQuiz.description}</p>
      </div>
      <button
        aria-label="Start Quiz"
        css={startButton}
        onClick={onStart}
      >
        시작하기
      </button>
    </div>
  );
};

const introContainer = css`
  width: 100%;
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

const introTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
  font-weight: bold;
`;

const introStory = css`
  font-size: var(--fontMedium);
  color: var(--point);
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
  font-style: italic;
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
