import { css } from "@emotion/react";
import { MatchInfo as IMatchInfo } from "../models/pokemonData";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { SetURLSearchParams } from "react-router-dom";
import TypeBadge from "./commons/TypeBadge";
import { getTranslateType } from "../utils/getTranslateType";
import SelectAbility from "./commons/SelectAbility";
import { v4 as uuidv4 } from "uuid";
import SpeciesButtons from "./SpeciesButtons";
import { LanguageContext } from "../utils/getInitialData";
import pokedex from "../datas/pokedex.json";
import { TLanguageType } from "../models/settingData";
import SelectTerastal from "./commons/SelectTerastal";

interface MatchCardProps {
  MatchInfo: IMatchInfo;
  selectedAbility: string;
  selectedTerastal: string;
  varietiesData: any;
  varietiesIdx: string | null;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<string>>;
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
  const { language, text } = useContext(LanguageContext);
  const [name, setName] = useState<string>(MatchInfo.name);
  const searchLanguage = MatchInfo.searchLanguage;
  const searchName = MatchInfo.name;

  useEffect(() => {
    const pokedexItem = pokedex.filter(
      (item) => item.name[searchLanguage as TLanguageType] === searchName
    );
    setName(pokedexItem[0].name[language.type]);
  }, [language, MatchInfo]);

  return (
    <div css={matchCardContainer}>
      <h1>{text.MAIN.MATCH.MATCH_CARD_TITLE}</h1>
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
          <TypeBadge key={uuidv4()} no={type.no}>
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
      <SelectAbility
        selectedAbility={selectedAbility}
        setSelectedAbility={setSelectedAbility}
      />
      <SelectTerastal
        selectedTerastal={selectedTerastal}
        setSelectedTerastal={setSelectedTerastal}
      />
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
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 450px;
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
  margin: auto;
  margin-bottom: 10px;
`;

export default MatchCard;
