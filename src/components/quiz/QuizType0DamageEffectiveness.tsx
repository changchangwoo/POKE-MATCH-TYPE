import { css } from "@emotion/react";
import TypeBadge from "@components/commons/TypeBadge";
import { getTranslateType } from "@utils/getTranslateType";

import { imgBox, pokeTypes } from "@components/match/MatchCard";
import { useGetDetailPokemonForQuiz } from "@hooks/useGetDetailPokemonForQuiz";
import QuizAnswer from "./QuizAnswer";
import { useContext, useEffect } from "react";
import { LanguageContext } from "@services/getInitialData";
import { QuizType0Skeleton } from "@components/skeleton/QuizSkeleton";

interface QuizType0Props {
  submitAnswer: (
    answerIdx: number,
    correctIdx: number,
    correctData: any,
  ) => void;
  progress: number;
  isNext: boolean;
}

const QuizType0DamageEffectiveness = ({
  submitAnswer,
  progress,
  isNext,
}: QuizType0Props) => {
  const { language, text } = useContext(LanguageContext);

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
  const { questionArr, quizNum, groupResult, matchDatas, answerIdx } =
    useGetDetailPokemonForQuiz(progress, cachedData);

  // Save newly fetched data to session storage
  useEffect(() => {
    if (questionArr && questionArr.length > 0 && !cachedData) {
      const session = sessionStorage.getItem("quizSession");
      if (session) {
        const parsed = JSON.parse(session);
        parsed.questions[progress] = {
          ...parsed.questions[progress],
          questionData: {
            questionArr,
            answerIdx,
            matchDatas,
            groupResult,
            quizNum,
          },
        };
        sessionStorage.setItem("quizSession", JSON.stringify(parsed));
      }
    }
  }, [
    questionArr,
    answerIdx,
    matchDatas,
    groupResult,
    quizNum,
    cachedData,
    progress,
  ]);

  if (!questionArr || quizNum === undefined || !groupResult || !matchDatas) {
    return <QuizType0Skeleton />;
  }
  return (
    <>
      <h1 css={title}>
        {text.QUIZ.MAIN_1.TITLE_1}
        <br />
        <b>
          {text.QUIZ.MAIN_1.TITLE_2.replace(
            "{damageNum}",
            groupResult[quizNum].damage,
          )}
        </b>
      </h1>
      <div css={imgBox(matchDatas.types[0].no)}>
        <img src={matchDatas.imgs} alt={`Pokemon ${matchDatas.no}`} />
      </div>
      <div css={pokeTypes}>
        {matchDatas.types.map((type) => (
          <TypeBadge key={type.no} no={type.no}>
            {getTranslateType(type.name, language.type)}
          </TypeBadge>
        ))}
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

export default QuizType0DamageEffectiveness;

export const title = css`
  b {
  }
  text-align: center;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
