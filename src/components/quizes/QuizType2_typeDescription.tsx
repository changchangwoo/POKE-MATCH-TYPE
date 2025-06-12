import { useEffect, useState } from "react";
import { fetchDetailType } from "../../api/api";
import { getRandomNum } from "../../utils/getRandomNum";
import defaultTypes from "../../datas/defaultTypes.json";
import { getDetailType, getGroupType } from "../../utils/getDetailType";
import { matchCardContainer } from "../MatchCard";
import { Types } from "../../models/pokemonData";
import { title } from "./QuizType0_damageEffectiveness";
import { css } from "@emotion/react";
import { getKoreanType } from "../../utils/getKoreanType";
import TypeBadge from "../commons/TypeBadge";
import { submitBtn } from "./QuizAnswer";
import { v4 as uuidv4 } from "uuid";

interface QuizType2_Props {
  submitAnswer: (answer: any, correct: any) => void;
}

const QuizType2_typeDescription = ({ submitAnswer }: QuizType2_Props) => {
  const [attacker, setAttacker] = useState<Types>();
  const [defender, setDefender] = useState<Types[]>([]);
  const [questionArr, setQuestionArr] = useState<number[]>([]);
  const [checkedAnswer, setCheckedAnswer] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number>(0);
  useEffect(() => {
    const fetchDetailTypeQuiz = async () => {
      const randomTypes: number[] = [];
      while (true) {
        let randomTypeNum = getRandomNum(defaultTypes.length - 1);
        if (!randomTypes.includes(randomTypeNum))
          randomTypes.push(defaultTypes[randomTypeNum].no);
        if (randomTypes.length === 2) break;
      }
      const fetchDatas = await fetchDetailType(randomTypes);
      const circulateTypeData = await getDetailType(fetchDatas);
      let groupResult = await getGroupType(circulateTypeData);

      let randomIndex = getRandomNum(groupResult.length);
      setAnswer(groupResult[randomIndex].damage);
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
  }, []);
  if (!attacker || !defender) return;
  return (
    <div css={matchCardContainer}>
      <h1 css={title}>
        <div>
          <b>{getKoreanType(attacker.name)}타입 공격</b>에 대한 <br />
          <b>
            {getKoreanType(defender[0].name)}/{getKoreanType(defender[1].name)}{" "}
            타입
          </b>
          의 피해량은?
        </div>
      </h1>
      <div css={quizContainer}>
        <div css={quizTypeContainer} data-name="공격">
          <TypeBadge no={attacker.no}>{getKoreanType(attacker.name)}</TypeBadge>
        </div>
        <div css={quizTypeContainer} data-name="방어">
          <>
            {defender.map((type, idx) => {
              return (
                <TypeBadge no={type.no} key={idx}>
                  {getKoreanType(type.name)}
                </TypeBadge>
              );
            })}
          </>
        </div>
      </div>
      <div css={selectDamageContainer}>
        {questionArr.map((damage) => {
          const isChecked = checkedAnswer === damage;
          return (
            <button
              key={uuidv4()}
              onClick={() => setCheckedAnswer(damage)}
              data-name={damage}
              css={answerButton(isChecked)}
            >
              {damage}배의 피해를 입힌다.
            </button>
          );
        })}
      </div>

      <button
        onClick={() => submitAnswer(checkedAnswer, answer)}
        css={submitBtn}
      >
        정답 제출
      </button>
    </div>
  );
};

export default QuizType2_typeDescription;

const selectDamageContainer = css`
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
`;

const answerButton = (isChecked: boolean) => css`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  color: var(--text);
  cursor: pointer;
  border: 1px solid var(--border);
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
    position: absolute; /* 핵심: flex의 영향에서 탈출 */
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
