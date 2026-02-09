import { css } from "@emotion/react";

interface QuizOption {
  id: number;
  title: string;
  description: string;
  story: string;
  difficulty: "easy" | "medium" | "hard";
  image?: string;
}

interface QuizSelectionCardProps {
  quiz: QuizOption;
  onSelect: (quizId: number) => void;
}

const QuizSelectionCard = ({ quiz, onSelect }: QuizSelectionCardProps) => {
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

  return (
    <button
      css={cardContainer}
      onClick={() => onSelect(quiz.id)}
      aria-label={`Start ${quiz.title}`}
    >
      <div css={cardContent}>
        {quiz.image && (
          <div css={imageWrapper}>
            <img src={quiz.image} alt={quiz.title} css={cardImage} />
          </div>
        )}

        <div css={cardInfo}>
          <div css={cardHeader}>
            <h3 css={cardTitle}>{quiz.title}</h3>
            <span css={difficultyBadge(difficultyColors[quiz.difficulty])}>
              {difficultyLabels[quiz.difficulty]}
            </span>
          </div>

          <p css={cardStory}>{quiz.story}</p>
          <p css={cardDescription}>{quiz.description}</p>
        </div>
      </div>
    </button>
  );
};

const cardContainer = css`
  width: 100%;
  padding: 20px;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--point);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

const cardContent = css`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const imageWrapper = css`
  flex-shrink: 0;
  max-width: 140px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 120px;
    height: 100px;
  }
`;

const cardImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const cardInfo = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  @media (max-width: 768px) {
    padding-bottom: 28px;
  }
`;

const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const cardTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
  flex: 1;
`;

const difficultyBadge = (color: string) => css`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--fontSmall);
  background-color: ${color};
  color: var(--background);
  white-space: nowrap;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const cardStory = css`
  font-size: var(--fontSmall);
  color: var(--point);
  margin: 0;
  line-height: 1.4;
  font-style: italic;
`;

const cardDescription = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
  margin: 0;
  line-height: 1.4;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default QuizSelectionCard;
