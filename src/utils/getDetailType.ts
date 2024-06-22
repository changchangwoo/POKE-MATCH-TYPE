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

export const getDetailType = async (typeData : IDamageRelations[]) => {
  if(typeData.length === 0) console.log('hello')
  const initialTypes: IDamageData[] = JSON.parse(
    JSON.stringify(defaultTypesData)
  );

  const fetchAllDetails = async () => {
    const detailResponses = await Promise.all(typeData);
    const allDamageRelations = detailResponses.flat();
    await getCirculType(initialTypes, allDamageRelations);
    return initialTypes;
  };

  const getCirculType = async (
    updateTypes: IDamageData[],
    damageRelations: IDamageRelations[]
  ) => {
    for (let relation of damageRelations) {
      relation.types.forEach((element) => {
        const typeToUpdate = updateTypes.find(
          (type) => type.name === element.name
        );
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
