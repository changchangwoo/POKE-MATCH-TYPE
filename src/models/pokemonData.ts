export interface MatchInfo {
    no: number;
    name : string;
    types : Types[]
    imgs : string;
}

export interface Types {
    typeNo : number;
    name : string;
}

export type TSpecises = "메가진화" | "거다이맥스" | "기본형"