import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import { loadStamps } from "@hooks/useQuizSession";

const QuizDashboard = () => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.DASHBOARD;
  const stamps = loadStamps();
  const stampData = [
    {
      id: 1,
      label: t.STAMP_LABEL_1,
      best: stamps["1"]?.best ?? null,
      time: stamps["1"]?.time ?? null,
    },
    {
      id: 2,
      label: t.STAMP_LABEL_2,
      best: stamps["2"]?.best ?? null,
      time: stamps["2"]?.time ?? null,
    },
    {
      id: 3,
      label: t.STAMP_LABEL_3,
      best: stamps["3"]?.best ?? null,
      time: stamps["3"]?.time ?? null,
    },
    {
      id: 4,
      label: t.STAMP_LABEL_4,
      best: stamps["4"]?.best ?? null,
      time: stamps["4"]?.time ?? null,
    },
  ];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div css={container}>
      <div css={introCard}>
        <h2 css={introTitle}>{t.TITLE}</h2>
        <p css={introDesc}>
          {t.DESC.split("{0}")[0]}
          <strong>{t.DESC_STRONG}</strong>
          {t.DESC.split("{0}")[1]}
        </p>
        <ul css={introList}>
          <li>{t.LIST_1}</li>
          <li>
            {t.LIST_2.split("{0}")[0]}
            <strong>{t.LIST_2_STRONG}</strong>
            {t.LIST_2.split("{0}")[1]}
          </li>
          <li>{t.LIST_3}</li>
          <li>
            {t.LIST_4.split("{0}")[0]}
            <strong>{t.LIST_4_STRONG}</strong>
            {t.LIST_4.split("{0}")[1]}
          </li>
        </ul>
      </div>

      <div css={stampCard}>
        <p css={stampHint}>{t.STAMP_HINT}</p>
        <div css={stampRow}>
          {stampData.map((stamp) => (
            <div key={stamp.id} css={stampBox(stamp.best !== null)}>
              <span css={stampLabel}>{stamp.label}</span>
              {stamp.best !== null ? (
                <>
                  <span css={stampScore(stamp.best >= 7)}>{stamp.best}/10</span>
                  <span css={stampBadge(stamp.best >= 7)}>
                    {stamp.best >= 7 ? t.STAMP_CLEAR : t.STAMP_FAIL}
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
  text-align: center;
`;

const introTitle = css`
  font-size: var(--fontExtra);
  color: var(--point);
  margin: 0;
  text-align: center;

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

const stampHint = css`
  margin: 0 0 10px 0;
  font-size: var(--fontSmall);
  color: var(--text);
  opacity: 0.5;
  text-align: center;

  @media (max-width: 768px) {
    font-size: var(--fontExtraSmall);
  }
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
