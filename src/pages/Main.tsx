import { css } from "@emotion/react";
import Search from "../components/search/Search";
import MatchCard from "../components/MatchCard";
import TypeCard from "../components/commons/TypeCard";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useFetchDetailPokemon from "../hooks/queries/useFetchDetailPokemon";
import useFetchPokemonVarieties from "../hooks/queries/useFetchPokemonVarieties";

const Main = () => {
  const location = useLocation();
  const [selectedAbility, setSelectedAbility] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const no = searchParams.get("no");
  const varietiesIdx = searchParams.get("varietiesIdx");
  const { data: matchInfo, error : detailDataError, isLoading: detailDataLoading } = useFetchDetailPokemon(no || "", name || "");
  const { data: varietiesData, error : varietiesDataError, isLoading: varietiesDataLoading} = useFetchPokemonVarieties(no || "", name || "");

  useEffect(() => {
    const getSessionMatchDatas = localStorage.getItem(location.pathname + "/matchDatas");
    const getSessionTypeCheck = localStorage.getItem(location.pathname + "/typecheck");
    if (getSessionMatchDatas) setSearchParams(JSON.parse(getSessionMatchDatas));
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);


  if(detailDataLoading || varietiesDataLoading) return null;
  if(detailDataError) return null;


  return (
    <>
      <Search searchParams={searchParams} setSearchParams={setSearchParams} />
      <div css={MainContainer}>
        {matchInfo && <MatchCard MatchInfo={matchInfo} selectedAbility={selectedAbility} setSelectedAbility={setSelectedAbility}
        setSearchParams={setSearchParams} varietiesData={varietiesData} varietiesIdx={varietiesIdx} />}
        {matchInfo && <TypeCard MatchTypes={matchInfo.types} selectedAbility={selectedAbility} />}
      </div>
    </>
  );
};

const MainContainer = css`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

export default Main;
