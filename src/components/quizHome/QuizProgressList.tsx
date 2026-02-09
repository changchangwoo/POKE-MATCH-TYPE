import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import StepProgress from "@components/quiz/StepProgress";

interface QuizProgressListProps {
  progressArr: { step: string }[];
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizProgressList = ({
  progressArr,
  progress,
  setProgress,
}: QuizProgressListProps) => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.PROGRESS;

  const handleQuestionClick = (index: number) => {
    const questionStatus = progressArr[index].step;
    if (
      questionStatus === "correct" ||
      questionStatus === "wrong" ||
      index === progress
    ) {
      setProgress(index);
    }
  };

  return (
    <div css={progressListContainer}>
      <StepProgress currentStep={progress} progressArr={progressArr} />
      <h3 css={progressListTitle}>{t.TITLE}</h3>
      <div css={progressList}>
        {progressArr.map((item, index) => (
          <button
            key={index}
            css={progressItem(
              item.step,
              index === progress,
              item.step === "correct" ||
                item.step === "wrong" ||
                index === progress,
            )}
            onClick={() => handleQuestionClick(index)}
            aria-label={`Question ${index + 1}`}
            disabled={
              item.step !== "correct" &&
              item.step !== "wrong" &&
              index !== progress
            }
          >
            <span css={questionNumber}>{t.QUESTION.replace("{0}", String(index + 1))}</span>
            <span css={questionStatus(item.step)}>
              {item.step === "correct"
                ? "✓"
                : item.step === "wrong"
                  ? "✗"
                  : item.step === "current"
                    ? "→"
                    : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const progressListContainer = css`
  width: 100%;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--border);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--point);
    border-radius: 4px;
  }
`;

const progressListTitle = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const progressList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--border);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--point);
    border-radius: 4px;
  }
`;

const progressItem = (
  step: string,
  isCurrent: boolean,
  isClickable: boolean,
) => css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid
    ${step === "correct"
      ? "var(--type12)"
      : step === "wrong"
        ? "var(--type10)"
        : isCurrent
          ? "var(--point)"
          : "var(--border)"};
  border-radius: 8px;
  background-color: ${isCurrent ? "var(--border)" : "var(--background)"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${isClickable ? "pointer" : "not-allowed"};
  opacity: ${isClickable ? 1 : 0.5};
  transition: all 0.2s ease;

  &:hover {
    ${isClickable &&
    `
      transform: translateX(4px);
      background-color: var(--border);
    `}
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const questionNumber = css`
  font-size: var(--fontMedium);
  color: var(--text);
`;

const questionStatus = (step: string) => css`
  font-size: var(--fontLarge);
  color: ${step === "correct"
    ? "var(--type12)"
    : step === "wrong"
      ? "var(--type10)"
      : step === "current"
        ? "var(--point)"
        : "var(--text)"};
`;

export default QuizProgressList;
