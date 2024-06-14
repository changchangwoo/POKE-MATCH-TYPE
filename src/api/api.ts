import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const API = async (url: string) => {
  try {
    const response = await axios.get(baseURL + url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchDetailPokemon = async (no : string) => {
  return API(`pokemon/${no}/`);
};

export const fetchDetailType = async (no : string) => {
  return API(`type/${no}/`);

}
