import { css } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";
import { MatchInfo as IMatchInfo, Types } from "../../models/pokemonData";
import TypeBadge from "./TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { IDamageData, getDetailType, getGroupType } from "../../utils/getDetailType";
import { getAddAbility } from "../../utils/getAddAbility";

interface MatchCardProps {
  MatchTypes: Types[];
  selectedAbility? : string;
}

export interface ITypeRelations {
  damage: number;
  types: IDamageData[];
}

const TypeCard = ({ MatchTypes, selectedAbility }: MatchCardProps) => {
  const typeNo = MatchTypes.map((type) => type.typeNo);
  const [typeRelations, setTypeRelations] = useState<ITypeRelations[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await getDetailType(typeNo);
      if(selectedAbility && selectedAbility !== "") {
        getAddAbility(result, selectedAbility);
      }
      let groupResult = await getGroupType(result);
      setTypeRelations(groupResult);
    };
    fetchData();
  }, [MatchTypes, selectedAbility]);

  if (typeRelations.length > 1) {
    return (
      <div css={typeCardContainer}>
        {typeRelations.map((type) => (
          <Fragment key={uuidv4()}>
            <div css={title}>데미지 x {type.damage}</div>
            <div css={typeSection}>
              {type.types.map((item) => (
                <TypeBadge key={uuidv4()} typeNo={item.no}>
                  {getKoreanType(item.name)}
                </TypeBadge>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    );
  }
};

const typeCardContainer = css`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  gap: 10px;
`;

const title = css`
  margin-top: 10px;
`;
const typeSection = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
`;

export default TypeCard;
