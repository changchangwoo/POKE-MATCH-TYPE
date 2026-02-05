import { css } from "@emotion/react";

interface QuizProgress {
  totalAttempts: number;
  bestScore: number;
  averageScore: number;
  recentQuizzes: Array<{
    date: string;
    score: number;
    total: number;
  }>;
}

const QuizDashboard = () => {
  const mockProgress: QuizProgress = {
    totalAttempts: 12,
    bestScore: 8,
    averageScore: 6.5,
    recentQuizzes: [
      { date: "2024-02-05", score: 7, total: 10 },
      { date: "2024-02-03", score: 8, total: 10 },
      { date: "2024-02-01", score: 6, total: 10 },
      { date: "2024-01-30", score: 5, total: 10 },
    ],
  };

  return (
    <div css={dashboardContainer}>
      <h2 css={cardTitle}>학습 현황</h2>

      <div css={statsGrid}>
        <div css={statItem}>
          <span css={statLabel}>총 시도</span>
          <span css={statValue}>{mockProgress.totalAttempts}회</span>
        </div>
        <div css={statItem}>
          <span css={statLabel}>최고 점수</span>
          <span css={statValue}>
            {mockProgress.bestScore}
            <span css={statUnit}>/10</span>
          </span>
        </div>
        <div css={statItem}>
          <span css={statLabel}>평균 점수</span>
          <span css={statValue}>
            {mockProgress.averageScore.toFixed(1)}
            <span css={statUnit}>/10</span>
          </span>
        </div>
      </div>

      <div css={sectionDivider}>
        <h3 css={sectionTitle}>최근 퀴즈 결과</h3>
      </div>
      <div css={resultsList}>
        {mockProgress.recentQuizzes.map((quiz, index) => (
          <div key={index} css={resultItem}>
            <span css={resultDate}>{quiz.date}</span>
            <span css={resultScore(quiz.score >= 7)}>
              {quiz.score}/{quiz.total}
            </span>
          </div>
        ))}
      </div>

      <div css={sectionDivider}>
        <h3 css={sectionTitle}>학습 추이</h3>
      </div>
      <div css={chartPlaceholder}>
        <span css={placeholderText}>차트 영역</span>
        <span css={placeholderSubtext}>
          학습 데이터가 축적되면 여기에 차트가 표시됩니다
        </span>
      </div>
    </div>
  );
};

const dashboardContainer = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
`;

const cardTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const sectionDivider = css`
  border-top: 1px solid var(--border);
  padding-top: 15px;
  margin-top: 5px;
`;

const sectionTitle = css`
  font-size: var(--fontMedium);
  color: var(--text);
  margin: 0;
`;

const statsGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const statItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
`;

const statLabel = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
  text-align: center;
`;

const statValue = css`
  font-size: var(--fontExtra);
  font-weight: 700;
  color: var(--point);
`;

const statUnit = css`
  font-size: var(--fontMedium);
  font-weight: 400;
  color: var(--text);
  opacity: 0.6;
`;

const resultsList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const resultItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
`;

const resultDate = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
`;

const resultScore = (isGood: boolean) => css`
  font-size: var(--fontMedium);
  font-weight: 700;
  color: ${isGood ? "var(--type12)" : "var(--type14)"};
`;

const chartPlaceholder = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px dashed var(--border);
  border-radius: 6px;
  padding: 20px;
`;

const placeholderText = css`
  font-size: var(--fontMedium);
  font-weight: 600;
  color: var(--text);
  opacity: 0.5;
`;

const placeholderSubtext = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.4;
  text-align: center;
`;

export default QuizDashboard;
