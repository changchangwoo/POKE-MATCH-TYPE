import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import QuizType0_damageEffectiveness from "./QuizType0_damageEffectiveness";
import QuizType1_quizTypeInference from "./QuizType1_quizTypeInference";
import QuizType2_typeDescription from "./QuizType2_typeDescription";
import { getRandomNum } from "../../utils/getRandomNum";
import StepProgress from "./StepProgress";
import QuizAlert from "../modal/QuizAlert";
import { getTranslateType } from "../../utils/getTranslateType";
import { matchCardContainer } from "../MatchCard";
import { css } from "@emotion/react";
import { LanguageContext } from "../../utils/getInitialData";

interface QuizMainProps {
  setSection: Dispatch<SetStateAction<number>>;
  setProgressArr: Dispatch<SetStateAction<{ step: string }[]>>;
  progressArr: { step: string }[];
}
const QuizMain = ({
  setSection,
  progressArr,
  setProgressArr,
}: QuizMainProps) => {
  const { language, text } = useContext(LanguageContext);
  const [progress, setProgress] = useState<number>(0);
  const [quizType, setQuizType] = useState<number>(getRandomNum(3));
  const [alertType, setAlertType] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [answerText, setAnswerText] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(false);

  const submitAnswer = (
    answerIdx: number,
    correctIdx: number,
    correctData: any
  ) => {
    const isCorrect = answerIdx === correctIdx;
    if (correctData.name) setAnswerText(getTranslateType(correctData.name, language.type));
    else if (correctData.damage) setAnswerText(`${correctData.damage}x`);

    setAlertType(isCorrect ? "correct" : "incorrect");
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: isCorrect ? "correct" : "wrong" } : item
      )
    );
    setIsNext(true);
  };

  const handleNextButton = () => {
    setQuizType(getRandomNum(3));
    setAlertType(null);
    setProgress((prev) => prev + 1);
    setIsNext((prev) => !prev);
  };

  useEffect(() => {
    if (progress >= 10) {
      setSection((prev) => prev + 1);
      return;
    }
    setProgressArr(
      progressArr.map((item, idx) =>
        idx === progress ? { step: "current" } : item
      )
    );
  }, [progress]);

  return (
    <>
      <StepProgress
        currentStep={progress}
        progressArr={progressArr}
      ></StepProgress>
      <div css={matchCardContainer}>
        {(() => {
          switch (quizType) {
            case 0:
              return (
                <QuizType0_damageEffectiveness
                  key={progress}
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            case 1:
              return (
                <QuizType1_quizTypeInference
                  key={progress}
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            case 2:
              return (
                <QuizType2_typeDescription
                  key={progress}
                  submitAnswer={submitAnswer}
                  progress={progress}
                  isNext={isNext}
                />
              );
            default:
              return <div>{text.QUIZ.ERROR}</div>;
          }
        })()}
        {isNext && (
        
          <button
            aria-label="Next Question"
            css={nextButton} onClick={handleNextButton}>
            {text.QUIZ.NEXT}
          </button>
        )}
      </div>
      {alertType && <QuizAlert quizType={alertType} answerText={answerText} />}
    </>
  );
};

const nextButton = css`
  position: relative;
  background-color: var(--background);
  border: 1px solid var(--border);
  color: var(--text);
  height: 30px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30%;

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

export default QuizMain;
