import React, { useEffect, useState } from "react";
import { getRandomNum } from "../../utils/getRandomNum";
import { matchCardContainer } from "../MatchCard";
import { css } from "@emotion/react";
import TypeBadge from "../commons/TypeBadge";
import { v4 as uuidv4 } from "uuid";
import { getKoreanType } from "../../utils/getKoreanType";
import quizType1_data from "../../datas/quizType1Data.json";

interface QuizType1_Props {
  submitAnswer: (answer: any, correct: any) => void;
}

const randQuiz = getRandomNum(quizType1_data.length);
const randBlank = getRandomNum(quizType1_data[randQuiz].length);
const answer = quizType1_data[randQuiz][randBlank];

const QuizType1_quizTypeInference = ({ submitAnswer }: QuizType1_Props) => {
  const [questionArr, setQuetstionArr] = useState([]);

  useEffect(() => {
    // setQuestion(randQuiz);
  }, []);
return (
  <div css={matchCardContainer}>
    <h1 css={title}>
      <div style={{display: "inline-block"}}>
      <TypeBadge no={100} quizMode={true}>?</TypeBadge>
      </div>에 들어갈 타입을 고르세요
    </h1>
    <div css={questionContainer}>
      <div css={badgeContainer}>
        {quizType1_data[randQuiz].map((type, idx) => (
          <React.Fragment key={uuidv4()}>
            {idx === randBlank ? (
              <TypeBadge no={100} quizMode={true}>?</TypeBadge>
            ) : (
              <TypeBadge no={type.no} quizMode={true}>
                {getKoreanType(type.name)}
              </TypeBadge>
            )}
            <h2
              style={{
                color:
                  idx === quizType1_data[randQuiz].length - 1
                    ? "transparent"
                    : "black",
              }}
            >
              {">"}
            </h2>
          </React.Fragment>
        ))}
      </div>
    </div>
    
  </div>
);
};

const questionContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background-color: var(--primary);
  padding: 20px;
  box-sizing: border-box;
`

const title = css`
display: flex;
align-items: center;
gap: 10px;
  
`

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
  
`
export default QuizType1_quizTypeInference;

/*
  문제에서 랜덤 발췌
  퀴즈로 Type을 씌우려면 타입 번호가 필요
  랜덤 퀴즈 안, 랜덤 블랭크가 정답
  정답 생성 로직


*/
