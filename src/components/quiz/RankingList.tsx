import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";

interface RankingItem {
  rank: number;
  username: string;
  score: number;
  time: number;
  date: string;
}

const mockWeekly: RankingItem[] = [
  { rank: 1, username: "타입장인", score: 10, time: 32, date: "2024-02-03" },
  {
    rank: 2,
    username: "피카츄마스터",
    score: 10,
    time: 38,
    date: "2024-02-05",
  },
  { rank: 3, username: "상성의신", score: 10, time: 41, date: "2024-02-01" },
  { rank: 4, username: "이상해씨", score: 9, time: 45, date: "2024-02-05" },
  { rank: 5, username: "꼬부기킹", score: 9, time: 52, date: "2024-02-03" },
  { rank: 6, username: "루기아팬", score: 9, time: 58, date: "2024-02-02" },
  { rank: 7, username: "파이리덕후", score: 8, time: 61, date: "2024-02-05" },
  { rank: 8, username: "뮤츠킬러", score: 8, time: 74, date: "2024-02-04" },
  { rank: 9, username: "망나뇽러버", score: 8, time: 88, date: "2024-02-01" },
  { rank: 10, username: "잠만보123", score: 7, time: 95, date: "2024-02-04" },
];

const RankingList = () => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.RANKING;
  const rankings = mockWeekly;

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

  return (
    <div css={rankingOuter}>
      <div css={overlay}>
        <span css={overlayText}>{t.OVERLAY}</span>
      </div>
      <div css={rankingContainer}>
        <div css={rankingHeader}>
          <h2 css={rankingTitle}>{t.TITLE}</h2>
          <span css={resetNotice}>{t.RESET_NOTICE}</span>
        </div>

        <div css={rankingListWrapper}>
          <div css={rankingListStyle}>
          {rankings.map((item) => (
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
                <div css={scoreRow}>
                  <span css={scoreValue}>{item.score}</span>
                  <span css={scoreMax}>/10</span>
                </div>
                <span css={timeDisplay}>{formatTime(item.time)}</span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const rankingOuter = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

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
  gap: 8px;
  padding: 16px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
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

const overlay = css`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const overlayText = css`
  color: white;
  font-size: var(--fontLarge);
  font-weight: bold;
`;

const rankingListStyle = css`
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
