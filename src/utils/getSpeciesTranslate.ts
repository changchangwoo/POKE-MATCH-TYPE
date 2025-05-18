import { TSpecises } from "../models/pokemonData";

export const getSpeciesTranslate = (name : string): TSpecises => {
  if (/-mega(-|$)/.test(name)) return "메가진화";
  if (/-gmax$/.test(name)) return "거다이맥스";
  if (/-galar$/.test(name)) return "가라르";
  if (/-alola$/.test(name)) return "알로라";
  if (/-hisui$/.test(name)) return "히스이";
  if (/-paldea$/.test(name)) return "팔데아";
  if (/-hoenn$/.test(name)) return "호연";
  if (/-sinnoh$/.test(name)) return "신오";
  if (/-unova$/.test(name)) return "하나";
  if (/-kalos$/.test(name)) return "칼로스";
  return "기본형";
  };