import { css } from "@emotion/react";

const QuizDashboard = () => {
  const stampData = [
    { id: 1, label: "종합", best: 8 },
    { id: 2, label: "피해량", best: null },
    { id: 3, label: "부등호", best: 10 },
    { id: 4, label: "배수", best: 7 },
  ];

  return (
    <div css={container}>
      <div css={introCard}>
        <h2 css={introTitle}>내 타입 지식, 실전에서 통할까?</h2>
        <p css={introDesc}>
          포켓몬 배틀의 승패는 <strong>타입 상성</strong>에서 갈립니다.
        </p>
        <ul css={introList}>
          <li>위험에 빠진 포켓몬들을 도와 타입 선택을 내려보세요</li>
          <li>
            총 <strong>10번의 선택</strong>이 당신을 기다립니다
          </li>
          <li>4가지 퀴즈 유형 중 하나를 골라 도전</li>
          <li>
            7문제 이상 정답이면 <strong>타입 트레이너 합격</strong>
          </li>
          <li>당신의 판단 속도도 함께 기록됩니다</li>
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
  font-size: var(--fontLarge);
  font-weight: 700;
  color: var(--point);
  margin: 0;
`;

const introDesc = css`
  font-size: var(--fontMedium);
  color: var(--text);
  margin: 0;
  line-height: 1.5;
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
    font-size: var(--fontSmall);
    color: var(--text);
    line-height: 1.6;
    opacity: 0.85;
  }

  strong {
    color: var(--point);
    font-weight: 600;
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
  font-size: var(--fontSmall);
  font-weight: 600;
  color: var(--text);
`;

const stampScore = (isGood: boolean) => css`
  font-size: var(--fontLarge);
  font-weight: 700;
  color: ${isGood ? "var(--type12)" : "var(--type14)"};
`;

const stampBadge = (isGood: boolean) => css`
  font-size: var(--fontExtraSmall);
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${isGood ? "var(--type12)" : "var(--type14)"};
  color: white;
`;

const stampEmpty = css`
  font-size: var(--fontLarge);
  font-weight: 700;
  color: var(--text);
  opacity: 0.3;
`;

export default QuizDashboard;
