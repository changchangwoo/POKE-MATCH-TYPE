import { css } from "@emotion/react";

interface QuizOption {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
  isFeatured?: boolean;
}

interface QuizSelectionCardProps {
  quiz: QuizOption;
  isFeatured?: boolean;
  onSelect: (quizId: string) => void;
}

const QuizSelectionCard = ({
  quiz,
  isFeatured = false,
  onSelect,
}: QuizSelectionCardProps) => {
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
      css={cardContainer(isFeatured)}
      onClick={() => onSelect(quiz.id)}
      aria-label={`Start ${quiz.title}`}
    >
      <div css={cardHeader}>
        <h3 css={cardTitle(isFeatured)}>{quiz.title}</h3>
        <span css={difficultyBadge(difficultyColors[quiz.difficulty])}>
          {difficultyLabels[quiz.difficulty]}
        </span>
      </div>

      <p css={cardDescription}>{quiz.description}</p>

      <div css={cardFooter}>
        <span css={questionCountText}>문제 수: {quiz.questionCount}개</span>
        {isFeatured && <span css={featuredBadge}>추천</span>}
      </div>
    </button>
  );
};

const cardContainer = (isFeatured: boolean) => css`
  width: 100%;
  padding: ${isFeatured ? "24px" : "20px"};
  border: ${isFeatured
    ? "2px solid var(--point)"
    : "1px solid var(--border)"};
  background-color: var(--background);
  border-radius: 8px;
  cursor: pointer;
  min-height: ${isFeatured ? "160px" : "130px"};
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--point);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    min-height: 44px;
    padding: 16px;
  }
`;

const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const cardTitle = (isFeatured: boolean) => css`
  font-size: ${isFeatured ? "var(--fontLarge)" : "var(--fontMedium)"};
  font-weight: 700;
  color: var(--text);
  margin: 0;
  flex: 1;
`;

const difficultyBadge = (color: string) => css`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--fontSmall);
  font-weight: 600;
  background-color: ${color};
  color: var(--background);
  white-space: nowrap;
`;

const cardDescription = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.8;
  margin: 0;
  line-height: 1.5;
  flex: 1;
`;

const cardFooter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const questionCountText = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
`;

const featuredBadge = css`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: var(--fontSmall);
  font-weight: 600;
  background-color: var(--point);
  color: var(--background);
`;

export default QuizSelectionCard;
