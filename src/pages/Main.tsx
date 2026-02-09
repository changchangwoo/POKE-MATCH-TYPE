import { useSearchParams } from "react-router-dom";
import MatchMain from "@components/match/MatchMain";
import Search from "@components/search/Search";
import pokedex from "@data/pokedex.json";
import { useState } from "react";
import { css } from "@emotion/react";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAbility, setSelectedAbility] = useState<string>("");
  const [selectedTerastal, setSelectedTerastal] = useState<{
    value: string;
    no: string;
  }>({
    value: "",
    no: "",
  });
  return (
    <div css={mainContainer}>
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setSelectedAbility={setSelectedAbility}
        setSelectedTerastal={setSelectedTerastal}
        pokemonNames={pokedex}
      />
      <MatchMain
        searchParams={searchParams}
        selectedAbility={selectedAbility}
        selectedTerastal={selectedTerastal}
        setSearchParams={setSearchParams}
        setSelectedAbility={setSelectedAbility}
        setSelectedTerastal={setSelectedTerastal}
      />
    </div>
  );
};

const mainContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export default Main;
