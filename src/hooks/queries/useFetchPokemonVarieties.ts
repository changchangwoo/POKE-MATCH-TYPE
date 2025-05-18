import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "../../api/api";

const useFetchPokemonVarieties = (no: string, name: string) => {
  return useQuery({
    queryKey: ["pokemonSpecies", no],
    queryFn: async () => {
      const fetchDatas = await fetchPokemonSpecies(no);
      const sessionDatas = localStorage.getItem("varieties");
      if (
        !sessionDatas ||
        sessionDatas === "{}" ||
        JSON.parse(sessionDatas).name !== name
      ) {
        const varietiesData = {
          name: name,
          varieties: [
            ...fetchDatas.varieties,
          ],
        };
        localStorage.setItem("varieties", JSON.stringify(varietiesData));
        return varietiesData;
      }
      return JSON.parse(sessionDatas);
    },
    enabled: !!no,
  });
};

export default useFetchPokemonVarieties;
