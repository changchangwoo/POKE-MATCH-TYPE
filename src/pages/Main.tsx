import { useSearchParams } from "react-router-dom";
import MatchMain from "@components/match/MatchMain";
import Search from "@components/search/Search";
import pokedex from "@data/pokedex.json";
import { useState } from "react";

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
    <>
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
    </>
  );
};

export default Main;
