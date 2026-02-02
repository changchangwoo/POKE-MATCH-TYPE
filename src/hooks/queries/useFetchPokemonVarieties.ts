import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "@api/api";
import { IPokeDex } from "@models/pokemonData";
import { getFilterFixVarieties } from "@services/getFilterFixVarieties";
import { TLanguageType } from "@models/settingData";

const useFetchPokemonVarieties = (
  no: string,
  name: string,
  pokeDexHash: Map<number, IPokeDex>,
  language: TLanguageType,
) => {
  return useQuery({
    queryKey: ["pokemonSpecies", no],
    queryFn: async () => {
      const fetchDatas = await fetchPokemonSpecies(no);
      const sessionDatas = sessionStorage.getItem("varieties");
      if (
        !sessionDatas ||
        sessionDatas === "{}" ||
        JSON.parse(sessionDatas).name !== name
      ) {
        const fetchVarietiesData = [...fetchDatas.varieties].map((item) => {
          const newItem = {
            ...item,
            is_visible: true,
          };
          return newItem;
        });
        const filterVarieties = getFilterFixVarieties(
          pokeDexHash,
          no,
          fetchVarietiesData,
          language
        );
        filterVarieties[0].pokemon.name = "default"
        const varietiesData = {
          name: name,
          varieties: fetchVarietiesData,
        };
        sessionStorage.setItem("varieties", JSON.stringify(varietiesData));
        return varietiesData;
      }
      return JSON.parse(sessionDatas);
    },
    enabled: !!no,
  });
};

export default useFetchPokemonVarieties;
