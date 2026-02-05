import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import QuizSelectionCard from "./QuizSelectionCard";
import q1Intro from "@images/quiz/q1-intro.webp";
import q2Intro from "@images/quiz/q2-intro.jpeg";
import q3Intro from "@images/quiz/q3-intro.jpeg";
import q4Intro from "@images/quiz/q4-intro.jpeg";

const QuizSelectionList = () => {
  const navigate = useNavigate();

  const quizOptions = [
    {
      id: "q1",
      title: "타입 종합 퀴즈",
      story: "숲 속에서 길을 잃은 피카츄를 도와 안전한 길을 찾아주세요!",
      description: "포켓몬 타입 상성을 종합적으로 테스트하는 퀴즈",
      difficulty: "medium" as const,

      image: q1Intro,
    },
    {
      id: "q2",
      title: "피해량 맞추기",

      story: "이상해씨와 함께 맛있는 요리를 완성해 보세요!",
      description: "타입 공격에 대한 피해량을 맞추는 퀴즈",

      difficulty: "hard" as const,

      image: q2Intro,
    },
    {
      id: "q3",
      title: "부등호 방향 맞추기",
      story: "소방관 꼬부기와 함께 침착하게 불을 진압하세요!",
      description: "두 타입의 상성을 비교하여 부등호 방향을 맞추는 퀴즈",
      difficulty: "easy" as const,

      image: q3Intro,
    },
    {
      id: "q4",
      title: "타입 배수 구하기",

      story: "파이리 산타가 들키지 않고 선물을 전달할 수 있도록 도와주세요!",
      description: "주어진 포켓몬에 가하는 타입 배수를 구하는 퀴즈",

      difficulty: "medium" as const,

      image: q4Intro,
    },
  ];

  const handleQuizSelect = (_quizId: string) => {
    navigate("/quiz/play");
  };

  return (
    <div css={selectionListContainer}>
      {quizOptions.map((quiz) => (
        <QuizSelectionCard
          key={quiz.id}
          quiz={quiz}
          onSelect={handleQuizSelect}
        />
      ))}
    </div>
  );
};

const selectionListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export default QuizSelectionList;
