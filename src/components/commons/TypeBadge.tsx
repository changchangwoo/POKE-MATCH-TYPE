import { css } from "@emotion/react";
import React, { ReactNode } from "react";

interface TypeBadgeProps {
  typeNo: number;
  children: ReactNode;
}

const TypeBadge = ({ typeNo, children }: TypeBadgeProps) => {
  return <div css={TypeBadgeStyle(typeNo)}>{children}</div>;
};

const TypeBadgeStyle = (typeNo: number) => css`
  flex: 1;
  height: 25px;
  background-color: ${`var(--type${typeNo})`};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
export default TypeBadge;
