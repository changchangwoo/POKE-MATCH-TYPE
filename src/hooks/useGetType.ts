import { useEffect, useState } from "react";
import { fetchDetailType } from "../api/api";
import defaultTypesData from "../../src/datas/defaultTypes.json";
import { initial } from "lodash";

interface IDamageData {
  no: number;
  name: string;
  damage: number;
}

interface IDamageRelations {
  key : string;
  types : [{
    name : string;
    url : string;
  }]
}

/* fetch를 반복문을 통해서 넣을수가 없다 애초에
비동기기때문에 이렇게하면 그냥 십창난다
그러니까 로직을 아예 다 분리를 해야한다
mathinfo를 통해서 데이터를 패칭해오는 로직 자체를 하나 만들고
그 로직을 지금처럼 경감 계산한 타입 배열로 만드느거 하나 만들고
그 배열을 그룹화해서 보내는것 총 세가지가 분리되어야한다

*/
export const useGetType = (searchTypes: number[], renderTrigger: boolean) => {
  const [pokemonType, setPokemonType] = useState<IDamageData[]>([]);

  useEffect(()=>{
    const initialTypes = JSON.parse(JSON.stringify(defaultTypesData));
    const fetchDetail = async () => {
      const response = await fetchDetailType(searchTypes);
      console.log(response);
      await getDetailType(initialTypes, response);
      const groupTypes = await getGroupType(initialTypes)
      console.log(initialTypes)
      console.log(groupTypes)
    }
    fetchDetail();
  }, [])

  const getDetailType = async (updateTypes : IDamageData[], damageRelations : IDamageRelations[] ) => {
    for (let relation of damageRelations) {
      relation.types.forEach((element) => {
         const typeToUpdate = updateTypes.find((type) => type.name === element.name);
         if(typeToUpdate) {
         switch(relation.key) {
          case 'doubleDamage' :
            typeToUpdate.damage *= 2;
            break;
          case 'halfDamage' :
            typeToUpdate.damage *= 0.5;
            break;
          case 'noDamage' :
            typeToUpdate.damage *= 0;
            break;
         }
        }
      });
    }
  }

  const getGroupType = async (types: IDamageData[]) => {
    const grouped = types.reduce((acc, type) => {
      if (!acc[type.damage]) {
        acc[type.damage] = [];
      }
      acc[type.damage].push(type);
      return acc;
    }, {} as Record<number, IDamageData[]>);

    const groupedArray = Object.keys(grouped).map(damage => ({
      damage: Number(damage),
      types: grouped[Number(damage)],
    }));

    return groupedArray;
  };


    return pokemonType;
};
