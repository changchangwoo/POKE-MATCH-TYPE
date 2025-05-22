import { css } from "@emotion/react";
import { MatchInfo as IMatchInfo } from "../models/pokemonData";
import { Dispatch, SetStateAction } from "react";
import { SetURLSearchParams } from "react-router-dom";
import TypeBadge from "./commons/TypeBadge";
import { getKoreanType } from "../utils/getKoreanType";
import SelectAbility from "./commons/SelectAbility";
import { v4 as uuidv4 } from "uuid";
import SpeciesButtons from "./SpeciesButtons";



interface MatchCardProps {
  MatchInfo: IMatchInfo;
  selectedAbility : string;
  varietiesData : any;
  varietiesIdx : string | null;
  setSelectedAbility : Dispatch<SetStateAction<string>>
  setSearchParams: SetURLSearchParams;

} 

const MatchCard = ({ MatchInfo, selectedAbility, varietiesData, varietiesIdx,  setSelectedAbility, setSearchParams}: MatchCardProps) => {
  return (
    <div css={matchCardContainer}>
      <h1>매치 포켓몬</h1>
      <div css={imgBox(MatchInfo.types[0].typeNo)}> 
        <img src={MatchInfo.imgs} loading="lazy" alt={`Pokemon ${MatchInfo.no}`}/>
      </div>
      <h2>{MatchInfo.name}</h2>
      <div css={pokeTypes}>
        {MatchInfo.types.map((type) => (
          <TypeBadge key={uuidv4()} typeNo={type.typeNo}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
      {
        varietiesData && <SpeciesButtons varietiesData={varietiesData} setSearchParams={setSearchParams}
        name={MatchInfo.name}
        varietiesIdx={varietiesIdx}/>
      }
      <SelectAbility
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

const pokeTypes = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 60%;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin: auto;
  margin-bottom: 10px;
`;



export default MatchCard;
