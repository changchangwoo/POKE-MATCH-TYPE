import { Dispatch, SetStateAction } from "react";

interface QuizType2_Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizType2_typeDescription = (setProgress: QuizType2_Props) => {
  return <>Type2</>;
};

export default QuizType2_typeDescription;
