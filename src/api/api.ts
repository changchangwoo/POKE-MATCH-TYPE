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

export const fetchDetailPokemon = async (no: string) => {
  return API(`pokemon/${no}/`);
};

export const fetchDetailType = async (numbers: number[]) => {
  const damageRelations = [];
  for (let no of numbers) {
    try {
      const typeDatas = await API(`type/${no}/`);
      damageRelations.push({
        key: "doubleDamage",
        types: typeDatas.damage_relations.double_damage_from,
      });
      damageRelations.push({
        key: "halfDamage",
        types: typeDatas.damage_relations.half_damage_from,
      });
      damageRelations.push({
        key: "noDamage",
        types: typeDatas.damage_relations.no_damage_from,
      });
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  }
  return damageRelations;
};
