import { css } from "@emotion/react";
import { Fragment, useContext } from "react";
import { Types } from "@models/pokemonData";
import TypeBadge from "./TypeBadge";
import { getTranslateType } from "@utils/getTranslateType";

import { IDamageData } from "@services/getDetailType";
import useFetchDetailType from "@hooks/queries/useFetchDetailType";
import { LanguageContext } from "@services/getInitialData";

interface MatchCardProps {
  MatchTypes: Types[];
  selectedAbility: string;
  selectedTerastal_no: string;
}

export interface ITypeRelations {
  damage: number;
  types: IDamageData[];
}

const TypeCard = ({
  MatchTypes,
  selectedAbility,
  selectedTerastal_no,
}: MatchCardProps) => {
  const { language, text } = useContext(LanguageContext);

  const no = MatchTypes.map((type) => type.no);
  const {
    data: typeRelations,
    isLoading,
  } = useFetchDetailType(no, selectedAbility, selectedTerastal_no);

  if (!typeRelations) return;
  if (isLoading) return <div>{text.MAIN.LOADING}</div>;

  if (typeRelations.length > 1) {
    return (
      <div css={typeCardContainer}>
        {typeRelations.map((type) => (
          <Fragment key={type.damage}>
            <div css={title}>
              {text.MAIN.MATCH.TYPE_CARD_DAMAGE} x {type.damage}
            </div>
            <div css={typeSection}>
              {type.types.map((item) => (
                <TypeBadge key={item.no} no={item.no}>
                  {getTranslateType(item.name, language.type)}
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
  background-color: var(--background);
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
  color: var(--text);
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
