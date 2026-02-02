import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import TypeCard from "@components/commons/TypeCard";
import MatchCard from "./MatchCard";
import useFetchDetailPokemon from "@hooks/queries/useFetchDetailPokemon";
import useFetchPokemonVarieties from "@hooks/queries/useFetchPokemonVarieties";
import pokedex from "@datas/pokedex.json";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageContext } from "@services/getInitialData";
import { TLanguageType } from "@models/settingData";
import { MatchMain_Skeleton } from "@components/skeleton/MatchMain_Skeleton";

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
  const searchLanguage = searchParams.get("searchLanguage") as TLanguageType;

  const {
    data: matchInfo,
    error: detailDataError,
    isLoading: detailDataLoading,
  } = useFetchDetailPokemon(no || "", name || "", searchLanguage || "");
  const {
    data: varietiesData,
    isLoading: varietiesDataLoading,
  } = useFetchPokemonVarieties(
    no || "",
    name || "",
    pokedexHash,
    language.type
  );

  useEffect(() => {
    const getSessionMatchDatas = sessionStorage.getItem(
      location.pathname + "/matchDatas"
    );
    const getSessionTypeCheck = sessionStorage.getItem(
      location.pathname + "/typecheck"
    );
    const getSessionVarietiesIdx = sessionStorage.getItem(
      location.pathname + "/varietiesIdx"
    );
    const getSessionTerastal = sessionStorage.getItem(
      location.pathname + "/terastal"
    );

    if (getSessionMatchDatas) {
      const parseMatchDatas = JSON.parse(getSessionMatchDatas);
      const parsedVarietiesIdx = getSessionVarietiesIdx
        ? JSON.parse(getSessionVarietiesIdx)
        : "0";
      setSearchParams({
        ...parseMatchDatas,
        varietiesIdx: parsedVarietiesIdx.varietiesIdx,
      });
    }

    if (getSessionTerastal) {
      const parseSesstionTerastal = JSON.parse(getSessionTerastal);
      setSelectedTerastal(parseSesstionTerastal);
    }
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);

  if (detailDataLoading || varietiesDataLoading) {
    return <MatchMain_Skeleton />;
  }
  if (detailDataError) return null;

  return (
    <div css={MainContainer}>
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

export const MainContainer = css`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

export default MatchMain;
