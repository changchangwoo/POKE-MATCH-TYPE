import { quizReadyContainer } from "./QuizReady";
import quizSuccessImg from "../../imgs/quiz_success.png";
import quizFailedImg from "../../imgs/quiz_failed.jpg";
import { QuizIntroImgContainer } from "./QuizIntro";
import { QUIZ } from "../../const/kor";

interface QuizEndProps {
  progressArr: { step: string }[];
}

const QuizEnd = ({ progressArr }: QuizEndProps) => {
  const correctCount = progressArr.filter(
    (item) => item.step === "correct"
  ).length;
  const renderMessage = () => {
    if (correctCount === 10) {
    } else if (correctCount >= 7) {
      return (
        <>
          {QUIZ.END.SUCCESS_1}
          <br />
          {QUIZ.END.SUCCESS_2}
        </>
      );
    } else
      return (
        <>
          {QUIZ.END.FAILD_1}
          <br />
          {QUIZ.END.FAILD_2}
        </>
      );
  };
  return (
    <div css={quizReadyContainer}>
      <span>{QUIZ.END.SYSTEM.replace("{correctCount}", correctCount.toString())}
      </span>

      <img
        src={correctCount >= 7 ? quizSuccessImg : quizFailedImg}
        css={QuizIntroImgContainer}
      ></img>

      <span css={{ textAlign: "center" }}>{renderMessage()}</span>
    </div>
  );
};

export default QuizEnd;
/*

*/
