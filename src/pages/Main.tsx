import { useSearchParams } from "react-router-dom";
import KakaoAdfitBanner from "../ads/KakaoAdfitBanner";
import MatchMain from "../components/MatchMain";
import Search from "../components/search/Search";
import pokedex from "../datas/pokedex.json";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pokemonNames={pokedex}
      />
      <KakaoAdfitBanner />
      <MatchMain
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export default Main;
