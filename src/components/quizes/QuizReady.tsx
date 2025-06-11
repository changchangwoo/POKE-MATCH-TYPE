import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import quizReadyImg from "../../imgs/quiz_ready.jpg";

interface QuizReadyProps {
  setSection: Dispatch<SetStateAction<number>>;
}

const QuizReady = ({ setSection }: QuizReadyProps) => {
  return (
    <>
      <div css={quizReadyContainer}>
        <img src={quizReadyImg} css={quizReadyImgContainer}></img>
        <span>
          퀴즈를 통해 <br />내 타입 이해도를 확인해보세요!
        </span>
        <ul css={quizReadyText}>
          <li>총 10문제로 구성되어있습니다.</li>
          <li>중도 이탈 시 진행 초기화됩니다.</li>
          <li>퀴즈 유형과 문제는 랜덤입니다.</li>
        </ul>
        <button
          css={quizStartBtn}
          onClick={() => {
            setSection((prev) => prev + 1);
          }}
        >
          시작하기
        </button>
      </div>
    </>
  );
};

export default QuizReady;

export const quizReadyImgContainer = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  z-index: 1;
  border: 1px solid var(--border);
  object-fit: cover;
`;

const quizReadyText = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: grey;
  background-color: var(--background);
`;

export const quizReadyContainer = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 400px;
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    text-align: center;
    line-height: 1.5;
    color: var(--text);
  }
`;

const quizStartBtn = css`
  width: 100px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background-color: var(--background);
  color: var(--text);

  cursor: pointer;
  &:hover {
    transition: 0.2s;
    background-color: var(--border);
  }
`;
