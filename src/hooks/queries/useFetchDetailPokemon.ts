import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon } from "@api/api";
import { POKEMON_SPRITE_URL } from "@const/apiConfig";
import { MatchInfo } from "@models/pokemonData";
import { LanguageType } from "@models/settingData";

const useFetchDetailPokemon = (no: string, name: string, searchLanguage : LanguageType | "") => {
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
        imgs: `${POKEMON_SPRITE_URL}/${no}.png`,
        searchLanguage 
      };
      sessionStorage.setItem(
        location.pathname + "/matchDatas",
        JSON.stringify(matchDatas)
      );
      return matchDatas;
    },
    enabled: !!no,

  });
};

export default useFetchDetailPokemon;
