import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import TypeCard from "@components/commons/TypeCard";
import MatchCard from "./MatchCard";
import useFetchDetailPokemon from "@hooks/queries/useFetchDetailPokemon";
import useFetchPokemonVarieties from "@hooks/queries/useFetchPokemonVarieties";
import useMatchSession from "@hooks/useMatchSession";
import pokedex from "@data/pokedex.json";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageContext } from "@services/getInitialData";
import { LanguageType } from "@models/settingData";
import { MatchMainSkeleton } from "@components/skeleton/MatchMainSkeleton";

interface MatchMainProps {
  searchParams: URLSearchParams;
  selectedAbility: string;
  selectedTerastal: { value: string; no: string };
  setSearchParams: SetURLSearchParams;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const pokedexHash = new Map();
pokedex.forEach((item) => {
  item.name.kor = item.name.kor.replace(/\s*\(.*?\)\s*/g, "").trim();
  pokedexHash.set(item.no, item);
});

const MatchMain = ({
  setSearchParams,
  searchParams,
  selectedAbility,
  selectedTerastal,
  setSelectedAbility,
  setSelectedTerastal,
}: MatchMainProps) => {
  const { language } = useContext(LanguageContext);

  const name = searchParams.get("name");
  const no = searchParams.get("no");
  const varietiesIdx = searchParams.get("varietiesIdx");
  const searchLanguage = searchParams.get("searchLanguage") as LanguageType;

  const {
    data: matchInfo,
    error: detailDataError,
    isLoading: detailDataLoading,
  } = useFetchDetailPokemon(no || "", name || "", searchLanguage || "");
  const { data: varietiesData, isLoading: varietiesDataLoading } =
    useFetchPokemonVarieties(no || "", name || "", pokedexHash, language.type);

  useMatchSession(setSearchParams, setSelectedAbility, setSelectedTerastal);

  if (detailDataLoading || varietiesDataLoading) {
    return <MatchMainSkeleton />;
  }
  if (detailDataError) return null;

  return (
    <div css={mainContainer}>
      {matchInfo && (
        <MatchCard
          MatchInfo={matchInfo}
          selectedAbility={selectedAbility}
          selectedTerastal={selectedTerastal.value}
          setSelectedAbility={setSelectedAbility}
          setSelectedTerastal={setSelectedTerastal}
          setSearchParams={setSearchParams}
          varietiesData={varietiesData}
          varietiesIdx={varietiesIdx}
        />
      )}
      {matchInfo && (
        <TypeCard
          MatchTypes={matchInfo.types}
          selectedAbility={selectedAbility}
          selectedTerastal_no={selectedTerastal.no}
        />
      )}
    </div>
  );
};

export const mainContainer = css`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

export default MatchMain;
