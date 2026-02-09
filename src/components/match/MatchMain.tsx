import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import TypeCard from "@components/commons/TypeCard";
import MatchCard from "./MatchCard";
import useFetchDetailPokemon from "@hooks/queries/useFetchDetailPokemon";
import useFetchPokemonVarieties from "@hooks/queries/useFetchPokemonVarieties";
import useMatchSession from "@hooks/useMatchSession";
import useMatchInitialData from "@hooks/useMatchInitialData";
import pokedex from "@data/pokedex.json";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageContext } from "@services/getInitialData";
import { MatchMainSkeleton } from "@components/skeleton/MatchMainSkeleton";

interface MatchMainProps {
  searchParams: URLSearchParams;
  selectedAbility: string;
  selectedTerastal: { value: string; no: string };
  setSearchParams: SetURLSearchParams;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const pokedexHash = new Map(
  pokedex.map((item) => [
    item.no,
    {
      ...item,
      name: {
        ...item.name,
        kor: item.name.kor.replace(/\s*\(.*?\)\s*/g, "").trim()
      }
    }
  ])
);

const MatchMain = ({
  setSearchParams,
  searchParams,
  selectedAbility,
  selectedTerastal,
  setSelectedAbility,
  setSelectedTerastal,
}: MatchMainProps) => {
  const { language } = useContext(LanguageContext);

  const initialData = useMatchInitialData({
    searchParams,
    currentLanguage: language.type,
  });

  const {
    data: matchInfo,
    error: detailDataError,
    isLoading: detailDataLoading,
  } = useFetchDetailPokemon(initialData.no, initialData.name, initialData.searchLanguage);
  const { data: varietiesData, isLoading: varietiesDataLoading } =
    useFetchPokemonVarieties(initialData.no, initialData.name, pokedexHash, language.type);

  useMatchSession(setSelectedAbility, setSelectedTerastal);

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
          varietiesIdx={initialData.varietiesIdx}
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
  align-items: stretch;
  gap: 20px;
  overflow: hidden;

  > div {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default MatchMain;
