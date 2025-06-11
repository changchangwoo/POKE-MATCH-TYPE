import { css } from "@emotion/react";
import { ReactNode } from "react";

interface TypeBadgeProps {
  no: number;
  children: ReactNode;
  quizMode?: boolean;
}

const TypeBadge = ({ no, children, quizMode }: TypeBadgeProps) => {
  return <div css={TypeBadgeStyle(no, quizMode)}>{children}</div>;
};

const TypeBadgeStyle = (no: number, quizMode?: boolean) => css`
  flex: 1;
  height: 25px;
  background-color: ${`var(--type${no})`};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  max-width: ${quizMode ? "80px" : "180px"};
  ${quizMode ? "min-width: 80px;" : ""};
`;
export default TypeBadge;
