import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import TypeCard from "./commons/TypeCard";
import MatchCard from "./MatchCard";
import useFetchDetailPokemon from "../hooks/queries/useFetchDetailPokemon";
import useFetchPokemonVarieties from "../hooks/queries/useFetchPokemonVarieties";
import pokedex from "../datas/pokedex.json";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageContext } from "../utils/getInitialData";
import { TLanguageType } from "../models/settingData";
import { MatchMain_Skeleton } from "./skeleton/MatchMain_Skeleton";

interface MatchMainProps {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

  const pokedexHash = new Map();
  pokedex.map((item) => {
  item.name.kor = item.name.kor.replace(/\s*\(.*?\)\s*/g, "").trim();
  pokedexHash.set(item.no, item);
});

const MatchMain = ({ setSearchParams, searchParams }: MatchMainProps) => {
  const { language } = useContext(LanguageContext);
  const [selectedAbility, setSelectedAbility] = useState("");

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
    error: varietiesDataError,
    isLoading: varietiesDataLoading,
  } = useFetchPokemonVarieties(no || "", name || "", pokedexHash, language.type);

  console.log(varietiesDataError)

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
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);

  if (detailDataLoading || varietiesDataLoading) {
  // if (true) {
    return (<MatchMain_Skeleton/>)
  }
  if (detailDataError) return null;

  return (
    <div css={MainContainer}>
      {matchInfo && (
        <MatchCard
        MatchInfo={matchInfo}
          selectedAbility={selectedAbility}
          setSelectedAbility={setSelectedAbility}
          setSearchParams={setSearchParams}
          varietiesData={varietiesData}
          varietiesIdx={varietiesIdx}
        />
      )}
      {matchInfo && (
        <TypeCard
          MatchTypes={matchInfo.types}
          selectedAbility={selectedAbility}
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
