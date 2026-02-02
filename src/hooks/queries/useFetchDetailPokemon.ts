import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon } from "@api/api";
import { MatchInfo } from "@models/pokemonData";
import { TLanguageType } from "@models/settingData";
import { DEFAULT_MATCH_DATA } from "@const/initial_const";

const useFetchDetailPokemon = (no: string, name: string, searchLanguage : TLanguageType | "") => {
  return useQuery({
    queryKey: ["detailPokemon", no],
    queryFn: async () => {
      const fetchDatas = await fetchDetailPokemon(no);
      const matchDatas: MatchInfo = {
        name,
        types: fetchDatas.types.map((typeInfo: any) => {
          if (typeInfo.type.url) {
            const match = typeInfo.type.url.match(/\/(\d+)\/$/);
            const no = match ? match[1] : null;
            return {
              no: no ? Number(no) : null,
              name: typeInfo.type.name,
            };
          } else {
            return { no: null, name: typeInfo.type.name };
          }
        }),
        no: Number(no),
        imgs: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no}.png`,
        searchLanguage 
      };
      sessionStorage.setItem(
        location.pathname + "/matchDatas",
        JSON.stringify(matchDatas)
      );
      return matchDatas;
    },
    enabled: !!no,
      initialData: no === "" ? DEFAULT_MATCH_DATA : undefined,

  });
};

export default useFetchDetailPokemon;
