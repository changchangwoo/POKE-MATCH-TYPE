import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import QuizSelectionCard from "./QuizSelectionCard";
import q1Intro from "@images/quiz/q1-intro.webp";
import q2Intro from "@images/quiz/q2-intro.webp";
import q3Intro from "@images/quiz/q3-intro.webp";
import q4Intro from "@images/quiz/q4-intro.webp";

interface QuizSelectionListProps {
  onSelect: (quizId: number) => void;
}

const QuizSelectionList = ({ onSelect }: QuizSelectionListProps) => {
  const { text } = useContext(LanguageContext);
  const sel = text.QUIZ.SELECTION;

  const quizOptions = [
    {
      id: 1,
      title: sel.Q1_TITLE,
      story: sel.Q1_CARD_STORY,
      description: sel.Q1_CARD_DESC,
      difficulty: "medium" as const,
      image: q1Intro,
    },
    {
      id: 2,
      title: sel.Q2_TITLE,
      story: sel.Q2_CARD_STORY,
      description: sel.Q2_CARD_DESC,
      difficulty: "medium" as const,
      image: q2Intro,
    },
    {
      id: 3,
      title: sel.Q3_TITLE,
      story: sel.Q3_CARD_STORY,
      description: sel.Q3_CARD_DESC,
      difficulty: "easy" as const,
      image: q3Intro,
    },
    {
      id: 4,
      title: sel.Q4_TITLE,
      story: sel.Q4_CARD_STORY,
      description: sel.Q4_CARD_DESC,
      difficulty: "hard" as const,
      image: q4Intro,
    },
  ];

  return (
    <div css={selectionListContainer}>
      {quizOptions.map((quiz) => (
        <QuizSelectionCard key={quiz.id} quiz={quiz} onSelect={onSelect} />
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
