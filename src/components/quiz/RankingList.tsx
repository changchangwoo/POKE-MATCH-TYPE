import { css } from "@emotion/react";

interface RankingItem {
  rank: number;
  username: string;
  score: number;
  date: string;
}

const RankingList = () => {
  const mockRankings: RankingItem[] = [
    { rank: 1, username: "피카츄마스터", score: 10, date: "2024-02-05" },
    { rank: 2, username: "이상해씨", score: 9, date: "2024-02-04" },
    { rank: 3, username: "꼬부기킹", score: 9, date: "2024-02-03" },
    { rank: 4, username: "파이리덕후", score: 8, date: "2024-02-05" },
    { rank: 5, username: "뮤츠킬러", score: 8, date: "2024-02-02" },
    { rank: 6, username: "망나뇽러버", score: 8, date: "2024-02-01" },
    { rank: 7, username: "잠만보123", score: 7, date: "2024-02-04" },
    { rank: 8, username: "갸라도스", score: 7, date: "2024-01-31" },
    { rank: 9, username: "라프라스팬", score: 7, date: "2024-01-30" },
    { rank: 10, username: "포켓몬박사", score: 6, date: "2024-02-05" },
  ];

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
    return `${rank}위`;
  };

  return (
    <div css={rankingContainer}>
      <div css={rankingHeader}>
        <h2 css={rankingTitle}>명예의 전당</h2>
        <span css={rankingSubtitle}>최고 점수 순위</span>
      </div>

      <div css={rankingList}>
        {mockRankings.map((item) => (
          <div key={item.rank} css={rankingItem(item.rank)}>
            <div css={rankBadge(item.rank)}>
              <span css={getRankBadgeStyle(item.rank)}>
                {getRankIcon(item.rank)}
              </span>
            </div>

            <div css={rankingInfo}>
              <span css={username}>{item.username}</span>
              <span css={rankDate}>{item.date}</span>
            </div>

            <div css={scoreDisplay}>
              <span css={scoreValue}>{item.score}</span>
              <span css={scoreMax}>/10</span>
            </div>
          </div>
        ))}
      </div>

      <div css={rankingFooter}>
        <span css={footerText}>
          내 최고 기록: <strong>8점</strong> (15위)
        </span>
      </div>
    </div>
  );
};

const rankingContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  position: sticky;
  top: 80px;
  align-self: flex-start;

  @media (max-width: 768px) {
    position: static;
  }
`;

const rankingHeader = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
`;

const rankingTitle = css`
  font-size: var(--fontLarge);
  font-weight: 700;
  color: var(--text);
  margin: 0;
`;

const rankingSubtitle = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.7;
`;

const rankingList = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  flex: 1;
  max-height: 400px;
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
  font-weight: 700;
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

const username = css`
  font-size: var(--fontSmall);
  font-weight: 600;
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
  align-items: baseline;
  gap: 2px;
`;

const scoreValue = css`
  font-size: var(--fontLarge);
  font-weight: 700;
  color: var(--point);
`;

const scoreMax = css`
  font-size: var(--fontSmall);
  font-weight: 400;
  color: var(--text);
  opacity: 0.6;
`;

const rankingFooter = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
`;

const footerText = css`
  font-size: var(--fontSmall);
  color: var(--text);
  text-align: center;

  strong {
    color: var(--point);
    font-weight: 700;
  }
`;

export default RankingList;
