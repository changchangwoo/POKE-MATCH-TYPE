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

const FILTER_EXTRA = [
  "pikachu-galar",
  "pikachu-alola",
  "pikachu-hisui",
  "pikachu-paldea",
  "pikachu-hoenn",
  "pikachu-sinnoh",
  "pikachu-unova",
  "pikachu-kalos",
];

export const getFilterFixVarieties = (
  pokeDexHash: Map<number, IPokeDex>,
  no: string,
  fetchVarietiesData: any
) => {
  const pokeDexData = pokeDexHash.get(Number(no));
  const cloneFetchVarietiesData = JSON.parse(
    JSON.stringify(fetchVarietiesData)
  );
  const filterfetchVarieties = getFilterfetchVarieties(cloneFetchVarietiesData);
  const filterPokeDexVarieties = getFilterPokeDexVarieties(pokeDexData);
  const originData = fetchVarietiesData;
  // 두 배열의 개수가 일치하는 경우
  if (filterPokeDexVarieties?.length === filterfetchVarieties.length - 1) {
    filterPokeDexVarieties.forEach((el) => {
      originData[el.idx].pokemon.name = el.name;
    });
  }
  // 두 배열의 개수가 일치하지 않는 경우 (= 모든 폼 데이터 삭제)
  // 값이 지워지면서 배열 값이 변경 => idx의 의미가 없어짐
  // 값은 전부 그대로 유지하면서 isVisibile만 false로 변경경
  else {
    filterfetchVarieties.forEach((el) => {
      if (el.idx === 0) return; // 기본형은 제외
      originData[el.idx].is_visible = false;
    });
  }

  return originData;
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
  const regexesExtra = FILTER_EXTRA.map((pattern) => new RegExp(pattern));
  const filterDatas: { idx: number; name: string }[] = [];
  fetchVarietiesData.forEach((element, idx) => {
    const name = element.pokemon.name;
    const isMatch = regexes.some((regex) => regex.test(name));
    const isExtra = regexesExtra.some((regex) => regex.test(name));
    if (isExtra) {
      filterDatas.push({ idx, name: "removeData" });
      return;
    }
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
  if (pokeDexVarieties.length <= 0) return filterDatas;
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
피카츄 같은 경우는 일반 폼에서도 리전폼 데이터가 들어가있음 => 추가적인 분리 과정 필요
메가진화여도 메가진화 X, Y가 있는 경우가 있음 => 메가 진화 2개이상 일 경우 값 분리 필요

아니 뭔데 도대체 이렇게 할 게 많냐
*/
