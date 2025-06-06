/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface StepProgressProps {
  currentStep: number; // 0부터 시작한다고 가정
  progressArr : {step : string}[]
}

const StepProgress = ({ currentStep, progressArr }: StepProgressProps) => {
    console.log(progressArr)

    return (
    <div css={container}>
        <div>{currentStep} / {progressArr.length}</div>
        <div css={progressContainer}>
        {
            progressArr.map((progress, idx) => {
                return (
        <div
          key={idx}
          css={progressBox(progress.step)}
        />
                )

    })
        }
        </div>

    </div>
  );
};

export default StepProgress;

const container = css`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  flex-direction: column;
`;

const progressContainer = css`
    display: flex;
    gap: 10px;
    
`

const progressBox = (step: string) => css`
  width: 16px;
  height: 16px;
  border-radius: 25%;
  border: 1px solid var(--border);
  background-color: ${
    step === 'current' ? `grey` :
    step === 'correct' ? 'var(--type12)' :
    step === 'wrong' ? 'var(--type14)' :
    'white'
  };
  transition: background-color 0.3s;
`;

