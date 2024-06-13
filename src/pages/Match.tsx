import { css } from "@emotion/react";
import React, { useEffect } from "react";
import SelectType from "../components/SelectType";
import TypeCard from "../components/commons/TypeCard";

const Match = () => {
  return (
    <div css={matchContainer}>
      <SelectType />
      <TypeCard/>
    </div>
  );
};

const matchContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default Match;
