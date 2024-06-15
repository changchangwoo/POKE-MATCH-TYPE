import { css } from "@emotion/react";
import { MatchInfo as IMatchInfo } from "../models/pokemonData";
import TypeCheckwithCharacter from "./commons/TypeCheckwithCharacter";
import { Dispatch, SetStateAction, useState } from "react";

interface MatchCardProps {
  MatchInfo: IMatchInfo;
  selectedAbility : string;
  setSelectedAbility : Dispatch<SetStateAction<string>>
}

const MatchCard = ({ MatchInfo, selectedAbility, setSelectedAbility }: MatchCardProps) => {

  return (
    <div css={matchCardContainer}>
      <h1>매치 포켓몬</h1>
      <div css={imgBox(MatchInfo.types[0].typeNo)}>
        <img src={MatchInfo.imgs} />
      </div>
      <h2>{MatchInfo.name}</h2>
      <TypeCheckwithCharacter
        types={MatchInfo.types}
        selectedAbility={selectedAbility}
        setSelectedAbility={setSelectedAbility}
      />
    </div>
  );
};

const matchCardContainer = css`
  width: 100%;
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
`;

const imgBox = (no: number) => css`
  width: 100%;
  height: 200px;
  background-color: ${`var(--type${no})`};
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border: 1px solid var(--border);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default MatchCard;
