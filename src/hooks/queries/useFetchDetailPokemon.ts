import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon } from "../../api/api";
import { MatchInfo } from "../../models/pokemonData";

const useFetchDetailPokemon = (no: string, name : string) => {
  return useQuery({
    queryKey: ["detailPokemon", no],
    queryFn: async () => {
      const fetchDatas = await fetchDetailPokemon(no)
      const matchDatas : MatchInfo = {
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
      }
      localStorage.setItem(location.pathname + "/matchDatas", JSON.stringify(matchDatas));
      return matchDatas
   
    },
    enabled: !!no,
  });
};

export default useFetchDetailPokemon;
