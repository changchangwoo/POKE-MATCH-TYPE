import React, { useEffect, useState } from "react";
import { fetchDetailType } from "../api/api";
import defaultTypesData from "../../src/datas/defaultTypes.json";

const typeRelations = [
  "double_damage_from",
  "half_damage_from",
  "no_damage_from",
];

interface DamageGroup {
  no: number;
  name: string;
  damage: number;
}

export const useGetType = (searchTypes: number[], searchParams : URLSearchParams) => {
  const [pokemonType, setPokemonType] = useState<DamageGroup[]>(defaultTypesData)

  const getDetailType = async (no: string) => {
    const response = await fetchDetailType(no);
    const damageRelations = response.damage_relations;
    const updatedTypes = [...pokemonType];
    for (let relation of typeRelations) {
      if (damageRelations[relation].length > 0) {
        damageRelations[relation].forEach((element: any) => {
          const typeToUpdate = updatedTypes.find(
            (type) => type.name === element.name
          );
          if (typeToUpdate) {
            switch (relation) {
              case typeRelations[0]:
                typeToUpdate.damage *= 2;
                break;
              case typeRelations[1]:
                typeToUpdate.damage *= 0.5;
                break;
              case typeRelations[2]:
                typeToUpdate.damage *= 0;
                break;
              default:
                break;
            }
          }
        });
      }
    }
    setPokemonType(updatedTypes);
  };

  const groupTypes = (types: DamageGroup[]) => {
    const grouped = types.reduce((acc, type) => {
      if (!acc[type.damage]) {
        acc[type.damage] = [];
      }
      acc[type.damage].push(type);
      return acc;
    }, {} as Record<number, DamageGroup[]>);

    return Object.keys(grouped).map(damage => ({
      damage: Number(damage),
      types: grouped[Number(damage)],
    }));
  };
  
  useEffect(() => {
    searchTypes.forEach((type) => {
      getDetailType(type.toString());
    });    
  }, [searchParams]);

  return groupTypes(pokemonType).sort((a,b) => b.damage - a.damage);
};
