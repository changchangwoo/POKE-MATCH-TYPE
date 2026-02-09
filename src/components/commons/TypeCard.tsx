import { css } from "@emotion/react";
import { Fragment, useContext } from "react";
import { Types } from "@models/pokemonData";
import TypeBadge from "./TypeBadge";
import { getTranslateType } from "@utils/getTranslateType";

import { DamageData } from "@services/getDetailType";
import useFetchDetailType from "@hooks/queries/useFetchDetailType";
import { LanguageContext } from "@services/getInitialData";

interface MatchCardProps {
  MatchTypes: Types[];
  selectedAbility: string;
  selectedTerastal_no: string;
}

export interface TypeRelations {
  damage: number;
  types: DamageData[];
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

  if (isLoading) {
    return (
      <div css={typeCardContainer}>
        <div css={loadingContainer}>
          <div css={skeletonTypeSection}>
            {[...Array(18)].map((_, badgeIndex) => (
              <div key={badgeIndex} css={[skeletonBadge, shimmer]} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!typeRelations || typeRelations.length <= 1) {
    return (
      <div css={typeCardContainer}>
        <div css={emptyState}>{text.MAIN.MATCH.TYPE_CARD_EMPTY}</div>
      </div>
    );
  }

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
  justify-content: center;
  gap: 10px;
`;

const emptyState = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: var(--type1);
  font-size: var(--fontMedium);
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

const loadingContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;


const skeletonTypeSection = css`
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

const skeletonBadge = css`
  height: 36px;
  background-color: var(--border);
  border-radius: 6px;
`;

const shimmer = css`
  @keyframes shimmer {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
  animation: shimmer 1.5s ease-in-out infinite;
`;

export default TypeCard;
