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

export type TSpecises = "메가진화" | "거다이맥스" | "기본형" | 
"가라르" |
"알로라" |
"히스이" |
"팔데아" |
"호연" |
"신오" |
"하나" |
"칼로스"