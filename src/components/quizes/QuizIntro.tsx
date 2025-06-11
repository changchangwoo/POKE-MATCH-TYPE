import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import QuizIntroImg from "../../imgs/quiz_intro.jpg";

interface QuizIntroProps {
  setSection: Dispatch<SetStateAction<number>>;
}

const QuizIntro = ({ setSection }: QuizIntroProps) => {
  return (
    <div css={QuizIntroContainer}>
      <img src={QuizIntroImg} css={QuizIntroImgContainer}></img>
      <span>
        이런! 피카츄가 숲에서 길을 잃었어요!
        <br />
        다행히도, 퀴즈를 풀면 무사히 빠져나갈 수 있어요.
        <br />
        피카츄를 도와주세요!
      </span>

      <button
        css={quizStartBtn}
        onClick={() => {
          setSection((prev) => prev + 1);
        }}
      >
        시작하기
      </button>
    </div>
  );
};

export default QuizIntro;

export const QuizIntroImgContainer = css`
  width: 100%;
  height: 250px;
  background-color: var(--border);
  border-radius: 10px;
  z-index: 1;
  border: 1px solid var(--border);
  object-fit: cover;
`;

export const QuizIntroContainer = css`
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
