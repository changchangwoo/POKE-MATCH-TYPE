import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "../../api/api";

const useFetchPokemonSpacies = (no: string) => {
  return useQuery({
    queryKey: ["pokemonSpacies", no],
    queryFn: () => fetchPokemonSpecies(no),
    enabled: !!no,
  });
};

export default useFetchPokemonSpacies;
