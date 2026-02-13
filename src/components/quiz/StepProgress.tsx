import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";

interface StepProgressProps {
  currentStep: number;
  progressArr: { step: string }[];
  setProgress?: Dispatch<SetStateAction<number>>;
}

const StepProgress = ({
  currentStep,
  progressArr,
  setProgress,
}: StepProgressProps) => {
  const handleProgressClick = (index: number) => {
    if (!setProgress) return;

    const questionStatus = progressArr[index].step;
    // Allow clicking on answered questions or current question
    if (
      questionStatus === "correct" ||
      questionStatus === "wrong" ||
      questionStatus === "current" ||
      index === currentStep
    ) {
      setProgress(index);
    }
  };

  return (
    <div css={container}>
      {/* <span css={countText}>
        {currentStep+1} / {progressArr.length}
      </span> */}
      <div css={progressContainer}>
        {progressArr.map((progress, idx) => {
          const isClickable =
            setProgress &&
            (progress.step === "correct" ||
              progress.step === "wrong" ||
              progress.step === "current" ||
              idx === currentStep);
          return (
            <div
              key={idx}
              css={progressBox(progress.step, isClickable || false)}
              onClick={() => handleProgressClick(idx)}
              role={isClickable ? "button" : undefined}
              aria-label={
                isClickable
                  ? `Question ${idx + 1} (${
                      progress.step === "correct"
                        ? "correct"
                        : progress.step === "wrong"
                          ? "incorrect"
                          : progress.step === "current"
                            ? "current"
                            : "unanswered"
                    })`
                  : `Question ${idx + 1}`
              }
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isClickable && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleProgressClick(idx);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;

const container = css`
  flex: 1;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-width: 0;
  color: var(--text);
`;

const progressContainer = css`
  display: flex;
  gap: 10px;
  min-height: 26px;
  align-items: center;
  contain: layout;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const progressBox = (step: string, isClickable: boolean) => css`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 25%;
  border: ${step === "current" ? "2px" : "1px"} solid var(--border);
  background-color: ${step === "current"
    ? `grey`
    : step === "correct"
      ? "var(--type12)"
      : step === "wrong"
        ? "var(--type14)"
        : "var(--background)"};
  transition: all 0.3s;
  cursor: ${isClickable ? "pointer" : "default"};
  will-change: ${isClickable || step === "current" ? "transform" : "auto"};
  transform: ${step === "current" ? "scale(1.3)" : "scale(1)"};
  box-shadow: ${step === "current" ? "0 0 8px rgba(0, 0, 0, 0.2)" : "none"};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${isClickable &&
  `
    &:hover {
      transform: scale(1.3);
      border-width: 2px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }

    &:focus {
      outline: 2px solid var(--point);
      outline-offset: 2px;
    }
  `}
`;
