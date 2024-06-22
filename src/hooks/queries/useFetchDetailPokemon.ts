import { useQuery } from "@tanstack/react-query";
import { fetchDetailPokemon } from "../../api/api";

const useFetchDetailPokemon = (no: string) => {
  return useQuery({
    queryKey: ["detailPokemon", no],
    queryFn: () => fetchDetailPokemon(no),
    enabled: !!no,
  });
};

export default useFetchDetailPokemon;
