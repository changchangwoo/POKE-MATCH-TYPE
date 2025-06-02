import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon, fetchDetailType } from "../../api/api";
import { MatchInfo } from "../../models/pokemonData";
import PokeDex from "../../datas/pokedex.json";
import { getDetailType, getGroupType } from "../../utils/getDetailType";

const useFetchDetailPokemonForQuiz = (name: string = "") => {
  return useQuery({
    queryKey: ["detailPokemonForQuiz"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
      const typeNo = matchDatas.types.map((type) => type.typeNo);
      const fetchDetailTypeData = await fetchDetailType(typeNo);
      const circulateTypeData = await getDetailType(fetchDetailTypeData);

      let groupResult = await getGroupType(circulateTypeData);
      return { groupResult, matchDatas };
    },
  });
};

export default useFetchDetailPokemonForQuiz;
