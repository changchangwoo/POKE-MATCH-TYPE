import { quizReadyContainer } from "./QuizReady";
import quizSuccessImg from "../../imgs/quiz_success.png";
import quizFailedImg from "../../imgs/quiz_failed.jpg";
import { QuizIntroImgContainer } from "./QuizIntro";

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
          피카츄가 무사히 숲 속을 빠져나왔어요!
          <br />
          트레이너로서 기본 소양이 출중한데요?
        </>
      );
    } else
      return (
        <>
          도통 숲 속을 빠져나올 길이 안보이네요.
          <br />
          다시 한번 피카츄를 도와볼까요?
        </>
      );
  };
  return (
    <div css={quizReadyContainer}>
      <span>
        총 10문제 중에서,
        <br />✨ {correctCount}문제 맞추셨습니다!✨
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
