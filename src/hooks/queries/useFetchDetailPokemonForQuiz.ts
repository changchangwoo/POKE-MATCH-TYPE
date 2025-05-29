import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon } from "../../api/api";
import { MatchInfo } from "../../models/pokemonData";
import PokeDex from "../../datas/pokedex.json";

const useFetchDetailPokemonForQuiz = (name: string = "") => {
  return useQuery({
    queryKey: ["detailPokemonForQuiz"],
    queryFn: async () => {
      const lastNum = PokeDex[PokeDex.length - 1].no;
      const no = Math.floor(Math.random() * lastNum);
      const fetchDatas = await fetchDetailPokemon(String(no));
      const matchDatas: MatchInfo = {
        name,
        types: fetchDatas.types.map((typeInfo: any) => {
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

      return matchDatas;
    },
  });
};

export default useFetchDetailPokemonForQuiz;
