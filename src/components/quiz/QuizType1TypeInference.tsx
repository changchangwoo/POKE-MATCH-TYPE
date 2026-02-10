import React, { useContext, useEffect, useState } from "react";
import { getRandomNum, getShuffleArr } from "@utils/getRandomNum";
import { isValidForBlank } from "@utils/quizType1Validator";
import { css } from "@emotion/react";
import TypeBadge from "@components/commons/TypeBadge";

import { getTranslateType } from "@utils/getTranslateType";
import quizType1_data from "@data/quizType1Data.json";
import { Types } from "@models/pokemonData";
import defaultTypes from "@data/defaultTypes.json";
import QuizAnswer from "./QuizAnswer";
import { title } from "./QuizType0DamageEffectiveness";
import { LanguageContext } from "@services/getInitialData";


interface QuizType1Props {
  submitAnswer: (answerIdx: number, correctIdx: number, correctData : any) => void;
  progress: number;
  isNext: boolean;
}

const QuizType1TypeInference = ({
  submitAnswer,
  progress,
  isNext,
}: QuizType1Props) => {
      const {language, text} = useContext(LanguageContext);
  const [questionArr, setQuetstionArr] = useState<Types[]>([]);
  const [answerIdx, setAnswerIdx] = useState<number>(0);
  const [randQuiz, setRandQuiz] = useState<number>(0);
  const [randBlank, setRandBlank] = useState<any>(null);

  useEffect(() => {
    // Check session storage for cached question data
    const session = sessionStorage.getItem("quizSession");
    if (session) {
      const parsed = JSON.parse(session);
      const cachedData = parsed.questions[progress]?.questionData;

      // If cached data exists, restore it
      if (cachedData && cachedData.questionArr) {
        setQuetstionArr(cachedData.questionArr);
        setAnswerIdx(cachedData.answerIdx);
        setRandQuiz(cachedData.randQuiz);
        setRandBlank(cachedData.randBlank);
        return; // Early return, don't generate new data
      }
    }

    // Generate new data only if no cache exists
    const randQuiz = getRandomNum(quizType1_data.length);
    let randBlank = 0;
    while (
      randBlank === 0 ||
      randBlank === quizType1_data[randQuiz].length - 1
    ) {
      randBlank = getRandomNum(quizType1_data[randQuiz].length);
    }
    const answer = quizType1_data[randQuiz][randBlank];
    const answerSet = new Set<string>();
    const result: Types[] = [];
    result.push(answer);
    answerSet.add(answer.name);
    const correct = result[0];
    let attempts = 0;
    while (result.length < 6) {
      if (attempts > 300) break;
      attempts++;

      const randTypeNum = getRandomNum(defaultTypes.length);
      const candidate = defaultTypes[randTypeNum];

      if (answerSet.has(candidate.name)) continue;
      if (isValidForBlank(candidate.name, quizType1_data[randQuiz], randBlank)) continue;

      result.push({ no: candidate.no, name: candidate.name });
      answerSet.add(candidate.name);
    }
    const shuffleResult = getShuffleArr(result);
    const answerIdx = shuffleResult.findIndex((item) => item.no === correct.no)
    setAnswerIdx(answerIdx);
    setRandQuiz(randQuiz)
    setRandBlank(randBlank)
    setQuetstionArr(shuffleResult);

    // Save to session storage
    const session2 = sessionStorage.getItem("quizSession");
    if (session2) {
      const parsed = JSON.parse(session2);
      parsed.questions[progress] = {
        ...parsed.questions[progress],
        questionData: {
          questionArr: shuffleResult,
          answerIdx,
          randQuiz,
          randBlank,
        },
      };
      sessionStorage.setItem("quizSession", JSON.stringify(parsed));
    }
  }, [progress]);
  return (
    <>
      <h1 css={title}>
        <div>
          <div css={inlineTypeBadgeWrapper}>
            <TypeBadge no={100} quizMode={true}>
              ?
            </TypeBadge>
          </div>
          {text.QUIZ.MAIN_2.TITLE}
        </div>
      </h1>
      <div css={questionContainer}>
        <div css={badgeContainer}>
          {quizType1_data[randQuiz].map((type, idx) => (
            <React.Fragment key={idx}>
              {idx === randBlank ? (
                <TypeBadge no={100} quizMode={true}>
                  ?
                </TypeBadge>
              ) : (
                <TypeBadge no={type.no} quizMode={true}>
                  {getTranslateType(type.name, language.type)}
                </TypeBadge>
              )}
              <h2 css={arrowText(idx === quizType1_data[randQuiz].length - 1)}>
                {"<"}
              </h2>
            </React.Fragment>
          ))}
        </div>
      </div>
      <QuizAnswer
        questionArr={questionArr}
        submitAnswer={submitAnswer}
        isNext={isNext}
        answerIdx={answerIdx}
      />
    </>
  );
};

const questionContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background-color: var(--primary);
  padding: 20px;
  box-sizing: border-box;
`;

const badgeContainer = css`
  @media screen and (min-width: 600px) {
    width: 500px;
  }
  @media screen and (min-width: 800px) {
    width: 700px;
  }
  width: 800px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const inlineTypeBadgeWrapper = css`
  display: inline-block;
  margin-right: 5px;
`;

const arrowText = (isLast: boolean) => css`
  color: ${isLast ? "transparent" : "var(--text)"};
`;

export default QuizType1TypeInference;
