import { css } from "@emotion/react";
import Search from "../components/search/Search";
import MatchCard from "../components/MatchCard";
import TypeCard from "../components/commons/TypeCard";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MatchInfo as IMatchInfo } from "../models/pokemonData";
import useFetchDetailPokemon from "../hooks/queries/useFetchDetailPokemon";

const Main = () => {
  const location = useLocation();
  const [selectedAbility, setSelectedAbility] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [matchInfo, setMatchInfo] = useState<IMatchInfo>();
  const name = searchParams.get("name");
  const no = searchParams.get("no");
  const { data: detailData } = useFetchDetailPokemon(no || "");

  useEffect(() => {
    const getSessionMatchDatas = localStorage.getItem(location.pathname + "/matchDatas");
    const getSessionTypeCheck = localStorage.getItem(location.pathname + "/typecheck");
    if (getSessionMatchDatas) setSearchParams(JSON.parse(getSessionMatchDatas));
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (no && name && detailData) {
        try {
          console.log(detailData);
          if (detailData && detailData.types) {
            const matchDatas = {
              name,
              types: detailData.types.map((typeInfo: any) => {
                if (typeInfo.type.url) {
                  const match = typeInfo.type.url.match(/\/(\d+)\/$/);
                  const typeNo = match ? match[1] : null;
                  return {
                    typeNo: typeNo ? Number(typeNo) : null,
                    name: typeInfo.type.name,
                  };
                } else {
                  return { typeNo: null, name: typeInfo.type.name };
                }
              }),
              no: Number(no),
              imgs: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no}.png`,
            };
            localStorage.setItem(location.pathname + "/matchDatas", JSON.stringify(matchDatas));
            setMatchInfo(matchDatas);
          }
        } catch (error) {
          console.error("Failed to fetch Pokemon details:", error);
        }
      }
    };
    fetchData();
  }, [detailData]);

  return (
    <>
      <Search searchParams={searchParams} setSearchParams={setSearchParams} />
      <div css={MainContainer}>
        {matchInfo && <MatchCard MatchInfo={matchInfo} selectedAbility={selectedAbility} setSelectedAbility={setSelectedAbility} />}
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
