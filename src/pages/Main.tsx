import { css } from "@emotion/react";
import Search from "../components/search/Search";
import MatchCard from "../components/MatchCard";
import TypeCard from "../components/commons/TypeCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDetailPokemon } from "../api/api";
import { MatchInfo as IMatchInfo } from "../models/pokemonData";

const Main = () => {
  const [selectedAbility, setSelectedAbility] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [matchInfo, setMatchInfo] = useState<IMatchInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const name = searchParams.get("name");
      const no = searchParams.get("no");
      if (no && name) {
        try {
          const detailData = await fetchDetailPokemon(no);
          if (detailData && detailData.types) {
            setMatchInfo({
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
            });
          }
        } catch (error) {
          console.error("Failed to fetch Pokemon details:", error);
        }
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <Search searchParams={searchParams} setSearchParams={setSearchParams} />
      <div css={MainContainer}>
        {matchInfo && <MatchCard MatchInfo={matchInfo} selectedAbility={selectedAbility} setSelectedAbility={setSelectedAbility}/>}
        {matchInfo && <TypeCard MatchTypes={matchInfo.types} selectedAbility={selectedAbility}/>}
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
