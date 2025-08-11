import Search from "../components/search/Search";
import { useSearchParams } from "react-router-dom";
import pokedex from "../datas/pokedex.json";
import MatchMain from "../components/MatchMain";
import { GoogleAdsenseHorizontal } from "../components/googleAdd";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pokemonNames={pokedex}
      />
      <MatchMain
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <GoogleAdsenseHorizontal />
    </>
  );
};

export default Main;
