import { css } from "@emotion/react";
import { MatchInfo as IMatchInfo } from "../../models/pokemonData";
import { uniqueId } from "lodash";
import { getKoreanType } from "../../utils/getKoreanType";
import { useGetType } from "../../hooks/useGetType";

interface MatchCardProps {
  MatchInfo : IMatchInfo;
}

const MatchCard = ({MatchInfo} : MatchCardProps) => {
  const typeNos = MatchInfo.types.map(type => type.typeNo);
  const typeDetails = useGetType(typeNos);

  return (
    <div css={matchCardContainer}>
      <h1>매치 포켓몬</h1>
      <div css={imgBox(MatchInfo.types[0].typeNo)} >
        <img src={MatchInfo.imgs}/>
      </div>
      <h2>{MatchInfo.name}</h2>
      <div css={pokeTypes}>
        {
          MatchInfo.types.map((type : any) => (
            <div key={uniqueId()} css={pokeType(type.typeNo)}>{getKoreanType(type.name)}</div>
          ))
        }
      </div>
      <select defaultValue="특성을 선택해주세요">
        <option value="value1">Option 1</option>
        <option value="value2">Option 2</option>
      </select>
    </div>
  );
};

const matchCardContainer = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  select {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    height: 25px;
    padding: 5px;
    box-sizing: border-box;
  }
`;

const imgBox = (no : number) =>css`
  width: 100%;
  height: 200px;
  background-color: ${`var(--type${no})`};
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border : 1px solid var(--border);
  img {
    width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지가 비율을 유지하면서 잘리지 않도록 설정 */
  }
`;

const pokeTypes = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #ffffff;

`;

const pokeType = (no : number) => css`
  flex: 1;
  height: 25px;
  background-color: ${`var(--type${no})`};
  border : 1px solid var(--border);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80px;
`;

export default MatchCard;
