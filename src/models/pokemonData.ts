import { LanguageType } from "./settingData";

export interface MatchInfo {
  no: number;
  name: string;
  types: Types[];
  imgs: string;
  searchLanguage: LanguageType | "";
}

export interface Types {
  no: number;
  name: string;
}

export interface CheckedType {
  no: number;
  name: string;
  idx: number;
}

export interface PokeDex {
  no: number;
  name: Record<LanguageType, string>;
  varieties: Record<LanguageType, string[]>;
}

export type Species =
  | "메가진화"
  | "거다이맥스"
  | "기본형"
  | "가라르"
  | "알로라"
  | "히스이"
  | "팔데아"
  | "호연"
  | "신오"
  | "하나"
  | "칼로스";
