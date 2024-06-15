import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import SelectType from "../components/SelectType";
import { Types } from "../models/pokemonData";
import TypeCheckwithCharacter from "../components/commons/TypeCheckwithCharacter";
import TypeCard from "../components/commons/TypeCard";

const Match = () => {
  const [checkedType, setCheckedType] = useState<Types[]>([]);
  const [selectedAbility, setSelectedAbility] = useState("");

  return (
    <div css={matchContainer}>
      <SelectType checkedType={checkedType} setCheckedType={setCheckedType} />
      <TypeCheckwithCharacter
        types={checkedType}
        selectedAbility={selectedAbility}
        setSelectedAbility={setSelectedAbility}
      />
      <TypeCard MatchTypes={checkedType} selectedAbility={selectedAbility} />
    </div>
  );
};

const matchContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;
export default Match;
