import { Dispatch, SetStateAction } from "react";

interface QuizType1_Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizType1_quizTypeInference = (setProgress: QuizType1_Props) => {
  return <>Type1</>;
};

export default QuizType1_quizTypeInference;
