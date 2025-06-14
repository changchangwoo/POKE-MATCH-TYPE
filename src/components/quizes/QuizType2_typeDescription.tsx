import { useContext, useEffect, useState } from "react";
import { fetchDetailType } from "../../api/api";
import { getRandomNum } from "../../utils/getRandomNum";
import defaultTypes from "../../datas/defaultTypes.json";
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { Types } from "../../models/pokemonData";
import { title } from "./QuizType0_damageEffectiveness";
import { css } from "@emotion/react";
import { getTranslateType } from "../../utils/getTranslateType";
import TypeBadge from "../commons/TypeBadge";
import { submitBtn } from "./QuizAnswer";
import { v4 as uuidv4 } from "uuid";
import { LanguageContext } from "../../utils/getInitialData";


interface QuizType2_Props {
  submitAnswer: (answerIdx: number, correctIdx: number, correctData : any) => void;
  progress: number;
  isNext: boolean;
}

const QuizType2_typeDescription = ({
  submitAnswer,
  progress,
  isNext,
}: QuizType2_Props) => {
      const {language, text} = useContext(LanguageContext);
  const [attacker, setAttacker] = useState<Types>();
  const [defender, setDefender] = useState<Types[]>([]);
  const [questionArr, setQuestionArr] = useState<number[]>([]);
  const [checkedAnswer, setCheckedAnswer] = useState<{
    damage : number;
    idx : number 
   }>(
    {
      damage : 0,
      idx : -1
    }
   );
  const [answerIdx, setAnswerIdx] = useState<number>(0);
  const [answer, setAnswer] = useState<any>(null);
  useEffect(() => {
    const fetchDetailTypeQuiz = async () => {
      const randomTypes: number[] = [];
      while (true) {
        let randomTypeNum = getRandomNum(defaultTypes.length - 1);
        if (!randomTypes.includes(defaultTypes[randomTypeNum].no))
          randomTypes.push(defaultTypes[randomTypeNum].no);
        if (randomTypes.length === 2) break;
      }
      const fetchDatas = await fetchDetailType(randomTypes);
      const circulateTypeData = await getDetailType(fetchDatas);
      let groupResult = await getGroupType(circulateTypeData);

      let randomIndex = getRandomNum(groupResult.length);
      setAnswer(groupResult[randomIndex]);
      setAnswerIdx(randomIndex);
      let questionArr: number[] = [];
      groupResult.forEach((result) => {
        questionArr.push(result.damage);
      });
      let randomNum = getRandomNum(groupResult[randomIndex].types.length);
      let attacker = {
        name: groupResult[randomIndex].types[randomNum].name,
        no: groupResult[randomIndex].types[randomNum].no,
      };
      let defender = randomTypes.map((no) => {
        return {
          name: defaultTypes[no - 1].name,
          no: defaultTypes[no - 1].no,
        };
      });
      setAttacker(attacker);
      setDefender(defender);
      setQuestionArr(questionArr);
    };
    fetchDetailTypeQuiz();
  }, [progress]);
  if (!attacker || !defender) return;
  return (
    <>
      <h1 css={title}>
        <div>
          {getTranslateType(attacker.name, language.type)}{text.QUIZ.MAIN_3.TITLE_1}<br />
            {getTranslateType(defender[0].name, language.type)}/{getTranslateType(defender[1].name, language.type)}{" "}
            {text.QUIZ.MAIN_3.TITLE_2}
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
              key={uuidv4()}
              onClick={() => setCheckedAnswer({damage, idx})}
              data-name={damage}
              css={answerButton(isChecked, (isNext && answerIdx === idx))}
            >
              {damage}{text.QUIZ.MAIN_3.DESCRIPTION}
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

export default QuizType2_typeDescription;

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
