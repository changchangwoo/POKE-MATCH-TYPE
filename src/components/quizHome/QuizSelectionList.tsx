import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import QuizSelectionCard from "./QuizSelectionCard";

const QuizSelectionList = () => {
  const navigate = useNavigate();

  const quizOptions = [
    {
      id: "featured",
      title: "종합 타입 상성 퀴즈",
      description: "포켓몬 타입 상성을 종합적으로 테스트해보세요!",
      difficulty: "medium" as const,
      questionCount: 10,
      isFeatured: true,
    },
    {
      id: "type0",
      title: "데미지 배율 퀴즈",
      description: "특정 배율의 데미지를 가하는 타입을 찾는 퀴즈",
      difficulty: "easy" as const,
      questionCount: 10,
    },
    {
      id: "type1",
      title: "타입 추론 퀴즈",
      description: "특정 타입에 효과적인 공격 타입을 추론하는 퀴즈",
      difficulty: "medium" as const,
      questionCount: 10,
    },
    {
      id: "type2",
      title: "복합 타입 피해량 퀴즈",
      description: "복합 타입 포켓몬에 대한 피해량을 계산하는 퀴즈",
      difficulty: "hard" as const,
      questionCount: 10,
    },
    {
      id: "type3",
      title: "약점 찾기 퀴즈",
      description: "특정 타입의 약점을 모두 찾아내는 퀴즈",
      difficulty: "easy" as const,
      questionCount: 8,
    },
    {
      id: "type4",
      title: "저항 타입 퀴즈",
      description: "특정 타입에 저항을 가진 타입을 찾는 퀴즈",
      difficulty: "medium" as const,
      questionCount: 8,
    },
  ];

  const handleQuizSelect = (quizId: string) => {
    navigate("/quiz/play");
  };

  const featuredQuiz = quizOptions.find((quiz) => quiz.isFeatured);
  const regularQuizzes = quizOptions.filter((quiz) => !quiz.isFeatured);

  return (
    <div css={selectionListContainer}>
      {featuredQuiz && (
        <div css={featuredSection}>
          <QuizSelectionCard
            quiz={featuredQuiz}
            isFeatured
            onSelect={handleQuizSelect}
          />
        </div>
      )}

      <div css={regularSection}>
        {regularQuizzes.map((quiz) => (
          <QuizSelectionCard
            key={quiz.id}
            quiz={quiz}
            onSelect={handleQuizSelect}
          />
        ))}
      </div>
    </div>
  );
};

const selectionListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const featuredSection = css`
  display: flex;
  flex-direction: column;
`;

const regularSection = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default QuizSelectionList;
