import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRandomNum } from "../../utils/getRandomNum";

const questionArr = [
  [12, 10, 11, 12],
  [12, 4, 5, 12],
  [10, 6, 9, 10],
  [2, 3, 6, 2],
  [2, 14, 17, 2],
  [12, 7, 10, 11, 12],
  [10, 6, 5, 12, 10],
  [12, 3, 6, 5, 12],
  [10, 6, 2, 18, 9, 10],
  [12, 7, 10, 6, 2, 18, 4, 5, 12],
  [18, 10, 6, 2, 18],
  [6, 2, 14, 7, 6],
  [6, 12, 7, 6],
  [2, 18, 9, 2],
  [10, 5, 15, 10],
  [12, 3, 13, 12],
  [18, 4, 5, 11, 12, 10, 6, 2, 14, 17],
];

interface QuizType1_Props {
  submitAnswer: (answer: any, correct: any) => void;
}

const QuizType1_quizTypeInference = ({ submitAnswer }: QuizType1_Props) => {
  const [question, setQuestion] = useState<number[]>([]);
  const randQuiz = getRandomNum(questionArr.length);
  const randBlank = getRandomNum(questionArr[randQuiz].length);
  const answer = questionArr[randQuiz][randBlank];

  useEffect(() => {
    // setQuestion(randQuiz);
  }, []);
  return <>Type1</>;
};

export default QuizType1_quizTypeInference;

/*
  문제에서 랜덤 발췌
  퀴즈로써 Type을 씌우려면 타입 번호가 필요
*/
