import { css } from "@emotion/react";
import { Fragment } from "react";
import { Types } from "../../models/pokemonData";
import TypeBadge from "./TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { IDamageData } from "../../utils/getDetailType";
import useFetchDetailType from "../../hooks/queries/useFetchDetailType";

interface MatchCardProps {
  MatchTypes: Types[];
  selectedAbility?: string;
}

export interface ITypeRelations {
  damage: number;
  types: IDamageData[];
}

const TypeCard = ({ MatchTypes, selectedAbility }: MatchCardProps) => {
  const no = MatchTypes.map((type) => type.no);
  const {
    data: typeRelations,
    isLoading,
    isError,
  } = useFetchDetailType(no, selectedAbility);

  if (!typeRelations) return;
  if (isLoading) return <div>로딩 중...</div>;

  if (typeRelations.length > 1) {
    return (
      <div css={typeCardContainer}>
        {typeRelations.map((type) => (
          <Fragment key={uuidv4()}>
            <div css={title}>데미지 x {type.damage}</div>
            <div css={typeSection}>
              {type.types.map((item) => (
                <TypeBadge key={uuidv4()} no={item.no}>
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  grid-gap: 5px;
`;

export default TypeCard;
