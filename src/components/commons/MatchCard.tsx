import { css } from "@emotion/react";
import React from "react";

const MatchCard = () => {
  return (
    <div css={matchCardContainer}>
      <h1>매치 포켓몬</h1>
      <div css={imgBox}></div>
      <h2>루기아</h2>
      <div css={pokeTypes}>
        <div css={pokeType}></div>
        <div css={pokeType}></div>
      </div>
      <select defaultValue="특성을 선택해주세요">
        <option value="value1">Option 1</option>
        <option value="value2">Option 2</option>
      </select>
    </div>
  );
};

const matchCardContainer = css`
  width: 60vw;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  select {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    height: 25px;
    padding: 5px;
    box-sizing: border-box;
  }
`;

const imgBox = css`
  width: 100%;
  height: 140px;
  background-color: var(--border);
  border-radius: 8px;
`;

const pokeTypes = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 100%;
`;

const pokeType = css`
  flex: 1;
  height: 25px;
  background-color: var(--grass);
  border-radius: 4px;
`;

export default MatchCard;
