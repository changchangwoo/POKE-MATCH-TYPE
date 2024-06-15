import { css } from "@emotion/react";
import React, { Fragment, useEffect, useState } from "react";
import { MatchInfo as IMatchInfo } from "../../models/pokemonData";
import { useGetType } from "../../hooks/useGetType";
import TypeBadge from "./TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from 'uuid';
import { IDamageData, getDetailType } from "../../utils/getDetailType";

interface MatchCardProps {
  MatchInfo: IMatchInfo;
}

interface ITypeRelations {
  damage: number; 
  types: IDamageData[];
}

const TypeCard = ({ MatchInfo }: MatchCardProps) => {
  const typeNo = MatchInfo.types.map((type) => type.typeNo);
  const [typeRelations, setTypeRelations] = useState<ITypeRelations[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDetailType(typeNo);
      setTypeRelations(result)
    };
    fetchData();
  }, [MatchInfo]);

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
