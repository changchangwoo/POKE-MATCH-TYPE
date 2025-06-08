import Search from "../components/search/Search";
import {  useSearchParams } from "react-router-dom";
import pokedex from "../datas/pokedex.json";
import MatchMain from "../components/MatchMain";


const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Search
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pokemonNames={pokedex}
      />
      <MatchMain searchParams={searchParams} setSearchParams={setSearchParams}/>

    </>
  );
};



export default Main;
