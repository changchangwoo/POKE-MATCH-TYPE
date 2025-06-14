import { TLanguageType } from "../models/settingData";

type PokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow"
  | string; 

const typeMapping: Record<TLanguageType, Record<PokemonType, string>> = {
  kor: {
    normal: "노말",
    fighting: "격투",
    flying: "비행",
    poison: "독",
    ground: "땅",
    rock: "바위",
    bug: "벌레",
    ghost: "고스트",
    steel: "강철",
    fire: "불꽃",
    water: "물",
    grass: "풀",
    electric: "전기",
    psychic: "에스퍼",
    ice: "얼음",
    dragon: "드래곤",
    dark: "악",
    fairy: "페어리",
    unknown: "???",
    shadow: "다크",
  },
  eng: {
    normal: "Normal",
    fighting: "Fighting",
    flying: "Flying",
    poison: "Poison",
    ground: "Ground",
    rock: "Rock",
    bug: "Bug",
    ghost: "Ghost",
    steel: "Steel",
    fire: "Fire",
    water: "Water",
    grass: "Grass",
    electric: "Electric",
    psychic: "Psychic",
    ice: "Ice",
    dragon: "Dragon",
    dark: "Dark",
    fairy: "Fairy",
    unknown: "Unknown",
    shadow: "Shadow",
  }
};

export const getTranslateType = (
  englishType: PokemonType,
  language: TLanguageType
): string => {
  return typeMapping[language]?.[englishType] ?? "알 수 없음";
};
