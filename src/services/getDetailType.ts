import defaultTypesData from "@data/defaultTypes.json";

export interface DamageData {
  no: number;
  name: string;
  damage: number;
}

export interface DamageRelations {
  key: string;
  types: {
    name: string;
    url: string;
  }[];
}

export const getDetailType = (typeData: DamageRelations[]) => {
  const initialTypes: DamageData[] = JSON.parse(
    JSON.stringify(defaultTypesData)
  );

  const getCirculType = (
    updateTypes: DamageData[],
    damageRelations: DamageRelations[]
  ) => {
    return updateTypes.map((type) => {
      let multiplier = 1;

      for (const relation of damageRelations) {
        const matchingType = relation.types.find((el) => el.name === type.name);
        if (matchingType) {
          switch (relation.key) {
            case "doubleDamage":
              multiplier *= 2;
              break;
            case "halfDamage":
              multiplier *= 0.5;
              break;
            case "noDamage":
              multiplier = 0;
              break;
          }
        }
      }

      return {
        ...type,
        damage: type.damage * multiplier
      };
    });
  };

  const allDamageRelations = typeData.flat();
  const updatedTypes = getCirculType(initialTypes, allDamageRelations);
  return updatedTypes;
};

export const getGroupType = (types: DamageData[]) => {
  const grouped = types.reduce((acc, type) => {
    if (!acc[type.damage]) {
      acc[type.damage] = [];
    }
    acc[type.damage].push(type);
    return acc;
  }, {} as Record<number, DamageData[]>);

  const groupedArray = Object.keys(grouped).map((damage) => ({
    damage: Number(damage),
    types: grouped[Number(damage)],
  }));

  return groupedArray.sort((a, b) => b.damage - a.damage);
};
