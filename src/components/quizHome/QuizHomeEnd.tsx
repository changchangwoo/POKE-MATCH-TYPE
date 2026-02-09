import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import q1Clear from "@images/quiz/q1-clear.webp";
import q1Fail from "@images/quiz/q1-fail.webp";
import q2Clear from "@images/quiz/q2-clear.webp";
import q2Fail from "@images/quiz/q2-fail.webp";
import q3Clear from "@images/quiz/q3-clear.webp";
import q3Fail from "@images/quiz/q3-fail.webp";
import q4Clear from "@images/quiz/q4-clear.webp";
import q4Fail from "@images/quiz/q4-fail.webp";

interface QuizHomeEndProps {
  selectedQuiz: number;
  progressArr: { step: string }[];
  elapsedSeconds: number | null;
  onRetry: () => void;
  onSelectDifferent: () => void;
}

const QuizHomeEnd = ({
  selectedQuiz,
  progressArr,
  elapsedSeconds,
  onRetry,
  onSelectDifferent,
}: QuizHomeEndProps) => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.END;
  const correctCount = progressArr.filter(
    (item) => item.step === "correct",
  ).length;

  const resultImages = {
    clear: [q1Clear, q2Clear, q3Clear, q4Clear],
    fail: [q1Fail, q2Fail, q3Fail, q4Fail],
  };

  const isSuccess = correctCount >= 7;
  const resultImage = isSuccess
    ? resultImages.clear[selectedQuiz - 1]
    : resultImages.fail[selectedQuiz - 1];

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleRetry = () => {
    onRetry();
  };

  const handleSelectDifferentQuiz = () => {
    onSelectDifferent();
  };

  return (
    <div css={endContainer}>
      <div css={scoreSection}>
        <h2 css={scoreText}>
          {t.SCORE.replace("{correctCount}", String(correctCount))}
        </h2>
        {elapsedSeconds != null && (
          <span css={timeText}>
            {t.TIME.replace("{time}", formatTime(elapsedSeconds))}
          </span>
        )}
      </div>

      <img src={resultImage} css={resultImageStyle} alt="Quiz Result" />

      <div css={resultMessage}>
        {isSuccess ? (
          <>
            <p>{t.SUCCESS_1}</p>
            <p>{t.SUCCESS_2}</p>
          </>
        ) : (
          <>
            <p>{t.FAIL_1}</p>
            <p>{t.FAIL_2}</p>
          </>
        )}
      </div>

      <div css={buttonGroup}>
        <button aria-label="Retry Quiz" css={retryButton} onClick={handleRetry}>
          {t.RETRY}
        </button>
        <button
          aria-label="Select Different Quiz"
          css={selectButton}
          onClick={handleSelectDifferentQuiz}
        >
          {t.SELECT_DIFFERENT}
        </button>
      </div>
    </div>
  );
};

const endContainer = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 515px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const scoreSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const scoreText = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const timeText = css`
  font-size: var(--fontMedium);
  color: var(--point);
  font-variant-numeric: tabular-nums;
`;

const resultImageStyle = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  border: 1px solid var(--border);
  object-fit: cover;
`;

const resultMessage = css`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: var(--fontMedium);
    color: var(--text);
    margin: 0;
    line-height: 1.5;
  }
`;

const buttonGroup = css`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const retryButton = css`
  min-width: 140px;
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary);
  cursor: pointer;
  color: var(--text);
  font-size: var(--fontMedium);

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

const selectButton = css`
  min-width: 140px;
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--point);
  background: var(--background);
  cursor: pointer;
  color: var(--point);
  font-size: var(--fontMedium);

  &:hover {
    transition: all 0.2s;
    background-color: var(--point);
    color: var(--background);
  }
`;

export default QuizHomeEnd;
