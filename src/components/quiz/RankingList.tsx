import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import { useFetchQuizRanking } from "@hooks/queries";

interface RankingListProps {
  quizId: number;
}

const RankingList = ({ quizId }: RankingListProps) => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.RANKING;
  const { data: rankings, isLoading, isError, refetch } = useFetchQuizRanking(quizId);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return rankBadgeGold;
    if (rank === 2) return rankBadgeSilver;
    if (rank === 3) return rankBadgeBronze;
    return rankBadgeDefault;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}${t.RANK_SUFFIX}`;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div css={statusContainer}>
          <div css={spinner} />
        </div>
      );
    }

    if (isError) {
      return (
        <div css={statusContainer}>
          <span css={statusText}>{t.ERROR}</span>
          <button css={retryButton} onClick={() => refetch()}>
            {t.RETRY}
          </button>
        </div>
      );
    }

    if (!rankings || rankings.length === 0) {
      return (
        <div css={statusContainer}>
          <span css={statusText}>{t.EMPTY}</span>
        </div>
      );
    }

    return (
      <div css={rankingListStyle}>
        {rankings.map((item) => (
          <div key={item.rank} css={rankingItem(item.rank)}>
            <div css={rankBadge(item.rank)}>
              <span css={getRankBadgeStyle(item.rank)}>
                {getRankIcon(item.rank)}
              </span>
            </div>

            <div css={rankingInfo}>
              <span css={usernameStyle}>{item.username}</span>
              <span css={rankDate}>{item.date}</span>
            </div>

            <div css={scoreDisplay}>
              <div css={scoreRow}>
                <span css={scoreValue}>{item.score}</span>
                <span css={scoreMax}>/10</span>
              </div>
              <span css={timeDisplay}>{formatTime(item.time)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div css={rankingOuter}>
      <div css={rankingContainer}>
        <div css={rankingHeader}>
          <h2 css={rankingTitle}>{t.TITLE}</h2>
          <span css={resetNotice}>{t.RESET_NOTICE}</span>
        </div>
        <div css={rankingListWrapper}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const rankingOuter = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const rankingContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: sticky;
  top: 80px;
  align-self: flex-start;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    position: static;
  }
`;

const rankingHeader = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  text-align: center;
`;

const rankingTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const resetNotice = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.5;
`;

const rankingListWrapper = css`
  flex: 1;
`;

const statusContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 12px;
  flex: 1;
`;

const statusText = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
  text-align: center;
`;

const retryButton = css`
  padding: 8px 20px;
  font-size: var(--fontSmall);
  color: var(--background);
  background-color: var(--point);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const spinner = css`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--point);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const rankingListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 12px 12px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--point);
  }
`;

const rankingItem = (rank: number) => css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.2s ease;

  ${rank <= 3 &&
  `
    border: 2px solid ${
      rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32"
    };
    background: linear-gradient(to right, var(--background) 0%, ${
      rank === 1
        ? "rgba(255, 215, 0, 0.05)"
        : rank === 2
          ? "rgba(192, 192, 192, 0.05)"
          : "rgba(205, 127, 50, 0.05)"
    } 100%);
  `}

  &:hover {
    transform: translateX(4px);
    border-color: var(--point);
  }
`;

const rankBadge = (rank: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${rank <= 3 ? "transparent" : "var(--background)"};
  border: ${rank <= 3 ? "none" : "1px solid var(--border)"};
`;

const rankBadgeGold = css`
  font-size: 22px;
`;

const rankBadgeSilver = css`
  font-size: 22px;
`;

const rankBadgeBronze = css`
  font-size: 22px;
`;

const rankBadgeDefault = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
`;

const rankingInfo = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const usernameStyle = css`
  font-size: var(--fontSmall);
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const rankDate = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.5;
`;

const scoreDisplay = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const scoreRow = css`
  display: flex;
  align-items: baseline;
  gap: 2px;
`;

const scoreValue = css`
  font-size: var(--fontLarge);
  color: var(--point);
`;

const scoreMax = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.6;
`;

const timeDisplay = css`
  font-size: var(--fontExtraSmall);
  color: var(--text);
  opacity: 0.5;
  font-variant-numeric: tabular-nums;
`;

export default RankingList;
