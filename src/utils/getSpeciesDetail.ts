import { TSpecises } from "../models/pokemonData";

export const getSpeciesDetail = (name : string): TSpecises => {
    if (/-mega(-|$)/.test(name)) return "메가진화";
    if (/-gmax$/.test(name)) return "거다이맥스";
    return "기본형";
  };