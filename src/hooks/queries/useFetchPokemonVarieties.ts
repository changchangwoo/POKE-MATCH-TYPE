import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "../../api/api";
import { IPokeDex } from "../../models/pokemonData";
import { getFilterFixVarieties } from "../../utils/getFilterFixVarieties";

const useFetchPokemonVarieties = (
  no: string,
  name: string,
  pokeDexHash: Map<number, IPokeDex>
) => {
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
        const fetchVarietiesData = [...fetchDatas.varieties];
        const filterVarieties = getFilterFixVarieties(
          pokeDexHash,
          no,
          fetchVarietiesData
        );
        const varietiesData = {
          name: name,
          varieties: fetchVarietiesData,
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

/*
고정 변형의 위치를 우선적으로 구하기
(pokeDex의 번호, pokeAPI의 번호)
pokeAPI 번호는 만들어둔 getSpeciesTranslate 타입을 참고해서,
pokeDex 번호는 한글 텍스트를 분리하는 과정이 필요

pokeDex는 디폴트값이 이름으로가 있기 때문에 개수가 하나 더 적음
처음부터 고정 값을 그냥 다 없애버린 데이터 하나 분리
그럼 서로 폼 데이터만 남을 거 아님
그게 pokeAPI와 pokeDEX의 length가 일치한다면 폼 데이터도 추가



*/
