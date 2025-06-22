import { MatchInfo } from "../models/pokemonData";

export const DEFAULT_MATCH_DATA: MatchInfo = {
  name: "리자몽",
  no: 6,
  searchLanguage: "kor",
  types: [
    { no: 10, name: "fire" },
    { no: 3, name: "flying" },
  ],
  imgs: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
};