import { css } from "@emotion/react";
import { MatchInfo } from "@models/pokemonData";
import { Dispatch, SetStateAction, useContext } from "react";
import { SetURLSearchParams } from "react-router-dom";
import TypeBadge from "@components/commons/TypeBadge";
import { getTranslateType } from "@utils/getTranslateType";
import SelectAbility from "@components/commons/SelectAbility";

import SpeciesButtons from "./SpeciesButtons";
import { LanguageContext } from "@services/getInitialData";
import usePokemonName from "@hooks/usePokemonName";
import SelectTerastal from "@components/commons/SelectTerastal";

interface MatchCardProps {
  MatchInfo: MatchInfo;
  selectedAbility: string;
  selectedTerastal: string;
  varietiesData: any;
  varietiesIdx: string | null;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
  setSearchParams: SetURLSearchParams;
}

const MatchCard = ({
  MatchInfo,
  selectedAbility,
  selectedTerastal,
  varietiesData,
  varietiesIdx,
  setSelectedAbility,
  setSelectedTerastal,
  setSearchParams,
}: MatchCardProps) => {
  const { language } = useContext(LanguageContext);
  const name = usePokemonName(MatchInfo);
  const searchLanguage = MatchInfo.searchLanguage;

  return (
    <div css={matchCardContainer}>
      <div css={imgBox(MatchInfo.types[0].no)}>
        <img
          src={MatchInfo.imgs}
          loading="lazy"
          alt={`Pokemon ${MatchInfo.no}`}
        />
      </div>
      <h2>{name}</h2>
      <div css={pokeTypes}>
        {MatchInfo.types.map((type) => (
          <TypeBadge key={type.no} no={type.no}>
            {getTranslateType(type.name, language.type)}
          </TypeBadge>
        ))}
      </div>
      {varietiesData && (
        <SpeciesButtons
          varietiesData={varietiesData}
          setSearchParams={setSearchParams}
          name={MatchInfo.name}
          varietiesIdx={varietiesIdx}
          searchLanguage={searchLanguage}
        />
      )}
      <div className="addBox">
        <SelectAbility
          selectedAbility={selectedAbility}
          setSelectedAbility={setSelectedAbility}
        />
        <SelectTerastal
          selectedTerastal={selectedTerastal}
          setSelectedTerastal={setSelectedTerastal}
        />
      </div>
    </div>
  );
};

export const matchCardContainer = css`
  h1,
  h2 {
    color: var(--text);
  }
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  min-height: 510px;

  .addBox {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: auto;
  }

  @media (max-width: 768px) {
    min-height: auto;

    .addBox {
      margin-top: 0;
    }
  }
`;

export const imgBox = (no: number) => css`
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

export const pokeTypes = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 60%;
  justify-content: center;
  align-items: center;
  color: var(--background);
  margin-bottom: 10px;
`;

export default MatchCard;
