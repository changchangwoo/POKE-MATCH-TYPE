import { quizReadyContainer, quizReadyImgContainer } from "./QuizReady";

interface QuizEndProps {
  progressArr: { step: string }[];
}

const QuizEnd = ({ progressArr }: QuizEndProps) => {
  const correctCount = progressArr.filter(
    (item) => item.step === "correct"
  ).length;
  const renderMessage = () => {
    if (correctCount === 10) {
      return (
        <>
          전부 맞추다니...
          <br />
          설마 오박사님이세요?😮
        </>
      );
    } else if (correctCount >= 7) {
      return (
        <>
          좋아요!
          <br />
          타입에 대한 이해도가 높은 트레이너입니다!🙂
        </>
      );
    } else if (correctCount >= 4) {
      return (
        <>
          나쁘지는 않지만,
          <br /> 트레이너 길은 더 험합니다🤔
          <br />
        </>
      );
    } else {
      return (
        <>
          포켓몬... 타입... <br />
          그것은 아직 먼 이야기🥲
          <br />
        </>
      );
    }
  };
  return (
    <div css={quizReadyContainer}>
      <span>
        총 10문제 중에서,
        <br />✨ {correctCount}문제 맞추셨습니다!✨
      </span>

      <div css={quizReadyImgContainer}></div>
      <span css={{ textAlign: "center" }}>{renderMessage()}</span>
    </div>
  );
};

export default QuizEnd;
/*

*/
