import { css } from "@emotion/react";

const QuizDashboard = () => {
  const stampData = [
    { id: 1, label: "종합", best: 8, time: 95 },
    { id: 2, label: "피해량", best: null, time: null },
    { id: 3, label: "부등호", best: 10, time: 42 },
    { id: 4, label: "배수", best: 7, time: 128 },
  ];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div css={container}>
      <div css={introCard}>
        <h2 css={introTitle}>내 타입 지식, 실전에서 통할까?</h2>
        <p css={introDesc}>
          포켓몬 배틀의 승패는 <strong>타입 상성</strong>이 좌우해요!
        </p>
        <ul css={introList}>
          <li>포켓몬들이 도움을 기다리고 있어요👀</li>
          <li>
            총 <strong>10번의 선택</strong>, 과연 맞힐 수 있을까요?
          </li>
          <li>4가지 퀴즈 유형 중 골라서 도전!</li>
          <li>
            7문제 이상 맞히면 <strong>타입 트레이너 합격 🎉</strong>
          </li>
        </ul>
      </div>

      <div css={stampCard}>
        <div css={stampRow}>
          {stampData.map((stamp) => (
            <div key={stamp.id} css={stampBox(stamp.best !== null)}>
              <span css={stampLabel}>{stamp.label}</span>
              {stamp.best !== null ? (
                <>
                  <span css={stampScore(stamp.best >= 7)}>{stamp.best}/10</span>
                  <span css={stampBadge(stamp.best >= 7)}>
                    {stamp.best >= 7 ? "CLEAR" : "FAIL"}
                  </span>
                  {stamp.time !== null && (
                    <span css={stampTime}>{formatTime(stamp.time)}</span>
                  )}
                </>
              ) : (
                <span css={stampEmpty}>---</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const introCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  flex: 8;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
`;

const introTitle = css`
  font-size: var(--fontExtra);
  color: var(--point);
  margin: 0;

  @media (max-width: 768px) {
    font-size: var(--fontLarge);
  }
`;

const introDesc = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: var(--fontMedium);
  }
`;

const introList = css`
  justify-content: center;
  text-align: center;
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    font-size: var(--fontMedium);
    color: var(--text);
    line-height: 1.6;
    opacity: 0.85;

    @media (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }

  strong {
    color: var(--point);
  }
`;

const stampCard = css`
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
`;

const stampRow = css`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const stampBox = (hasRecord: boolean) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background-color: var(--background);
  opacity: ${hasRecord ? 1 : 0.5};

  @media (max-width: 768px) {
    padding: 10px 6px;
  }
`;

const stampLabel = css`
  font-size: var(--fontMedium);
  color: var(--text);

  @media (max-width: 768px) {
    font-size: var(--fontSmall);
  }
`;

const stampScore = (isGood: boolean) => css`
  font-size: var(--fontExtra);
  color: ${isGood ? "var(--type12)" : "var(--type14)"};

  @media (max-width: 768px) {
    font-size: var(--fontLarge);
  }
`;

const stampBadge = (isGood: boolean) => css`
  font-size: var(--fontSmall);
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${isGood ? "var(--type12)" : "var(--type14)"};
  color: white;

  @media (max-width: 768px) {
    font-size: var(--fontExtraSmall);
  }
`;

const stampTime = css`
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.6;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    font-size: var(--fontExtraSmall);
  }
`;

const stampEmpty = css`
  font-size: var(--fontExtra);
  color: var(--text);
  opacity: 0.3;

  @media (max-width: 768px) {
    font-size: var(--fontLarge);
  }
`;

export default QuizDashboard;
