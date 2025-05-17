import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "../../api/api";

const useFetchPokemonSpecies = (no: string) => {
  return useQuery({
    queryKey: ["pokemonSpecies", no],
    queryFn: () => fetchPokemonSpecies(no) || null,
    enabled: !!no,
  });
};

export default useFetchPokemonSpecies;
