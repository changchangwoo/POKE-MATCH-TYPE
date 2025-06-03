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


interface QuizType2_Props {
  submitAnswer: (answer: any, correct: any) => void;
}


const QuizType2_typeDescription = ({ submitAnswer }: QuizType2_Props) => {
  const [attacker, setAttacker] = useState<Types>()
  const [defender, setDefender] = useState<Types[]>([])
  useEffect(() => {
    const fetchDetailTypeQuiz = async () => {
      const randomTypes:number[] = []
      while(true) {
        let randomTypeNum = getRandomNum(defaultTypes.length-1)
        if(!randomTypes.includes(randomTypeNum)) randomTypes.push(defaultTypes[randomTypeNum].no)
        if(randomTypes.length === 2) break;
      }
      const fetchDatas = await fetchDetailType(randomTypes);
      const circulateTypeData = await getDetailType(fetchDatas);
      let groupResult = await getGroupType(circulateTypeData);
      
      let randomIndex = getRandomNum(groupResult.length)
      let answer = groupResult[randomIndex].damage
      let questionArr : string[] = []
      groupResult.forEach(result => {
        questionArr.push(`${result.damage}의 피해를 입힌다`);
      });
      let randomNum = getRandomNum(groupResult[randomIndex].types.length);
      let attacker = {
        name : groupResult[randomIndex].types[randomNum].name,
        no : groupResult[randomIndex].types[randomNum].no
        
      }
      let defender = randomTypes.map((no) => {
      return {
        name : defaultTypes[no-1].name,
        no : defaultTypes[no-1].no
      } 
      })
      setAttacker(attacker)
      setDefender(defender)
    }
    fetchDetailTypeQuiz();

  }, [])
  if(!attacker || !defender) return
  return (<div css={matchCardContainer}>
          <h1 css={title}>
    {
    getKoreanType(attacker.name)}타입이 {
      getKoreanType(defender[0].name)}/{getKoreanType(defender[1].name)}
      타입을 공격하면 어떤 피해를 입힐까요?
          </h1>
          <div css={quizContainer}>

          </div>

  </div>);
};

export default QuizType2_typeDescription;

const quizContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;


`
/*
타입을 랜덤으로 

*/