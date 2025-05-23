import { IPokeDex } from "../models/pokemonData";
import { getSpeciesTranslate } from "./getSpeciesTranslate";
// pokeDEX 우선 분리

const FILTER_POKEDEX_KOR = [
  "메가진화",
  "거다이맥스",
  "가라르",
  "알로라",
  "히스이",
  "팔데아",
  "호연",
  "신오",
  "하나",
  "칼로스",
];

const FILTER_VARIETIES = [
  "-mega(-|$)",
  "-gmax",
  "-galar",
  "-alola",
  "-hisui",
  "-paldea",
  "-hoenn",
  "-sinnoh",
  "-unova",
  "-kalos",
];

export const getFilterFixVarieties = (
  pokeDexHash: Map<number, IPokeDex>,
  no: string,
  fetchVarietiesData: any
) => {
  const pokeDexData = pokeDexHash.get(Number(no));
  const filterfetchVarieties = getFilterfetchVarieties(fetchVarietiesData);
  const filterPokeDexVarieties = getFilterPokeDexVarieties(pokeDexData);
  const originData = fetchVarietiesData;
  console.log("API 데이터꺼 :", filterfetchVarieties);
  console.log("POKEDEX꺼 :", filterPokeDexVarieties);
};

const getFilterfetchVarieties = (
  fetchVarietiesData: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[]
) => {
  const regexes = FILTER_VARIETIES.map((pattern) => new RegExp(pattern));
  const filterDatas: { idx: number; name: string }[] = [];

  fetchVarietiesData.forEach((element, idx) => {
    const name = element.pokemon.name;
    const isMatch = regexes.some((regex) => regex.test(name));
    if (!isMatch) {
      const korName = getSpeciesTranslate(name);
      filterDatas.push({ idx, name: korName });
    }
  });

  return filterDatas;
};

const getFilterPokeDexVarieties = (pokeDexData?: IPokeDex) => {
  if (!pokeDexData) return;
  const pokeDexVarieties = pokeDexData.varieties;
  const filterDatas: { idx: number; name: string }[] = [];
  if (pokeDexVarieties.length <= 0) filterDatas;
  pokeDexVarieties.forEach((pokedexData, idx) => {
    const match = pokedexData.match(/\(([^)]+)\)/);
    const matchResult = match ? match[1] : null;
    if (matchResult && !FILTER_POKEDEX_KOR.includes(matchResult)) {
      filterDatas.push({ idx: idx + 1, name: matchResult });
    }
  });
  return filterDatas;
};

/*
지금 고민하고 있는 부분
=> pokeAPI에서 변형타입의 경우 영어로만 제공하기 때문에, 다른 언어(한글)로 매핑할 수 있는 중간다리 로직이 필요
천천히,
지금 내가 직면한 상황은 pokeAPI에서 제공하는 varieties에 있는 불규칙한 이름인 폼 형태 값에 한글 번역을 넣으려고 함
pokeDEX에서 포켓몬 변형 타입을 전부 받아왔음
PokeDex Varieties에서 이름만 받아오고, 그 이름에 해당하는 인덱스 번호를 fetchVarieties에서 담는다
이름을 넣을 수 있는 유일한 방법 => 인덱스 번호 순서 맞추기 

pokedex, pokeapi 메가 진화, 거다이 맥스, 리전폼을 전부 제거
둘다 폼 데이터만 남음
이 때 두 배열의 개수가 일치한다 => 폼 데이터 전부 삽입
두 배열의 개수가 일치하지 않는다 => 그냥 X
=






*/
