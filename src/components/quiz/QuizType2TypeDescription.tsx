import { useContext, useState, useEffect } from "react";
import { useFetchQuizType2 } from "@hooks/queries/useFetchQuizType2";
import { title } from "./QuizType0DamageEffectiveness";
import { css } from "@emotion/react";
import { getTranslateType } from "@utils/getTranslateType";
import TypeBadge from "@components/commons/TypeBadge";
import { submitBtn } from "./QuizAnswer";

import { LanguageContext } from "@services/getInitialData";


interface QuizType2Props {
  submitAnswer: (answerIdx: number, correctIdx: number, correctData : any) => void;
  progress: number;
  isNext: boolean;
}

const QuizType2TypeDescription = ({
  submitAnswer,
  progress,
  isNext,
}: QuizType2Props) => {
  const {language, text} = useContext(LanguageContext);

  // Check session storage for cached question data
  const getCachedQuestionData = () => {
    const session = sessionStorage.getItem("quizSession");
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.questions[progress]?.questionData;
    }
    return null;
  };

  const cachedData = getCachedQuestionData();

  // Fetch question data, using cached data if available
  const { attacker, defender, questionArr, answerIdx, answer } = useFetchQuizType2(progress, cachedData);

  // Save newly fetched data to session storage
  useEffect(() => {
    if (questionArr && questionArr.length > 0 && attacker && defender && !cachedData) {
      const session = sessionStorage.getItem("quizSession");
      if (session) {
        const parsed = JSON.parse(session);
        parsed.questions[progress] = {
          ...parsed.questions[progress],
          questionData: {
            questionArr,
            answerIdx,
            attacker,
            defender,
            answer,
          },
        };
        sessionStorage.setItem("quizSession", JSON.stringify(parsed));
      }
    }
  }, [questionArr, answerIdx, attacker, defender, answer, cachedData, progress]);

  const [checkedAnswer, setCheckedAnswer] = useState<{
    damage : number;
    idx : number
   }>(
    {
      damage : 0,
      idx : -1
    }
   );

  useEffect(() => {
    setCheckedAnswer({ damage: 0, idx: -1 });
  }, [progress]);
  if (!attacker || !defender) return null;
  return (
    <>
      <h1 css={title}>
        <div>
          {text.QUIZ.MAIN_3.TITLE_1.replace(
            "{type1}",
            getTranslateType(attacker.name, language.type)
          )}<br />
          {text.QUIZ.MAIN_3.TITLE_2.replace(
            "{type2}/{type3}",
            getTranslateType(defender[0].name, language.type)+"/"+getTranslateType(defender[1].name, language.type)
          )}

    </div>
      </h1>
      <div css={quizContainer}>
        <div css={quizTypeContainer} data-name={text.QUIZ.MAIN_3.DATA_NAME_ATTACK}>
          <TypeBadge no={attacker.no}>{getTranslateType(attacker.name, language.type)}</TypeBadge>
        </div>
        <div css={quizTypeContainer} data-name={text.QUIZ.MAIN_3.DATA_NAME_DEFENSE}>
          <>
            {defender.map((type, idx) => {
              return (
                <TypeBadge no={type.no} key={idx}>
                  {getTranslateType(type.name, language.type)}
                </TypeBadge>
              );
            })}
          </>
        </div>
      </div>
      <div css={selectDamageContainer(isNext)}>
        {questionArr.map((damage, idx) => {
          const isChecked = checkedAnswer.idx === idx;
          return (
            <button
              key={idx}
              onClick={() => setCheckedAnswer({damage, idx})}
              data-name={damage}
              css={answerButton(isChecked, (isNext && answerIdx === idx))}
              aria-label={`Select Damage ${damage}`}
            >
              {text.QUIZ.MAIN_3.DESCRIPTION.replace(
                "{damage}",damage
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => submitAnswer(checkedAnswer.idx, answerIdx, answer)}
        css={submitBtn(isNext)}
      >
        {text.QUIZ.SUBMIT}
      </button>
    </>
  );
};

export default QuizType2TypeDescription;

const selectDamageContainer = (isNext : boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border);
  background-color: var(--primary);
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: var(--text);
  pointer-events: ${isNext ? "none" : "all"};
`;

const answerButton = (isChecked: boolean, isAnswer : boolean | undefined) => css`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  color: var(--text);
  cursor: pointer;
  border: ${isAnswer ? `2px solid var(--highlight)`:`1px solid var(--border)`};
  background-color: ${isChecked ? `var(--border)` : "var(--background)"};
`;

const quizContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const quizTypeContainer = css`
  position: relative;
  width: 100%;
  max-width: 200px;
  border: 1px solid var(--border);
  height: 120px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: var(--text);
  background-color: var(--primary);

  &::before {
    content: attr(data-name);
    position: absolute; 
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
