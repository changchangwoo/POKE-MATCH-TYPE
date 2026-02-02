import defaultTypesData from "../../src/datas/defaultTypes.json";

export interface IDamageData {
  no: number;
  name: string;
  damage: number;
}

export interface IDamageRelations {
  key: string;
  types: {
    name: string;
    url: string;
  }[];
}

export const getDetailType = async (typeData: IDamageRelations[]) => {
  const initialTypes: IDamageData[] = JSON.parse(
    JSON.stringify(defaultTypesData)
  );

  const getCirculType = (
    updateTypes: IDamageData[],
    damageRelations: IDamageRelations[]
  ) => {
    const typeMap = new Map<string, IDamageData>();
    for (const type of updateTypes) {
      typeMap.set(type.name, type);
    }

    for (const relation of damageRelations) {
      relation.types.forEach((element) => {
        const typeToUpdate = typeMap.get(element.name);
        if (typeToUpdate) {
          switch (relation.key) {
            case "doubleDamage":
              typeToUpdate.damage *= 2;
              break;
            case "halfDamage":
              typeToUpdate.damage *= 0.5;
              break;
            case "noDamage":
              typeToUpdate.damage *= 0;
              break;
          }
        }
      });
    }
  };

  const fetchAllDetails = async () => {
    const detailResponses = await Promise.all(typeData);
    const allDamageRelations = detailResponses.flat();
    getCirculType(initialTypes, allDamageRelations);
    return initialTypes;
  };
  const detailTypes = await fetchAllDetails();
  return detailTypes;
};

export const getGroupType = async (types: IDamageData[]) => {
  const grouped = types.reduce((acc, type) => {
    if (!acc[type.damage]) {
      acc[type.damage] = [];
    }
    acc[type.damage].push(type);
    return acc;
  }, {} as Record<number, IDamageData[]>);

  const groupedArray = Object.keys(grouped).map((damage) => ({
    damage: Number(damage),
    types: grouped[Number(damage)],
  }));

  return groupedArray.sort((a, b) => b.damage - a.damage);
};
