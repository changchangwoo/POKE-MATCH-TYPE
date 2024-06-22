import { Types } from "../../models/pokemonData";
import { css } from "@emotion/react";
import { getKoreanType } from "../../utils/getKoreanType";
import TypeBadge from "./TypeBadge";
import { v4 as uuidv4 } from "uuid";
import abilities from "../../datas/pokemonAbilityData.json"
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";


interface TypeCheckProps {
  types: Types[];
  selectedAbility : string;
  setSelectedAbility : Dispatch<SetStateAction<string>>
}

const TypeCheckwithCharacter = ({ types, selectedAbility, setSelectedAbility}: TypeCheckProps) => {
  const location = useLocation();

  const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedAbility(selectedValue);
    let currentPath = location.pathname + "/typecheck"
    localStorage.setItem(currentPath, selectedValue);
  };

  return (
    <div css={TypeCheckwithCharacterContainer}>
      <div css={pokeTypes}>
        {types.map((type) => (
          <TypeBadge key={uuidv4()} typeNo={type.typeNo}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
      <select
        value={selectedAbility}
        onChange={handleAbilityChange}
      >
        {abilities.map((ability) => (
          <option key={uuidv4()} value={ability.value}>
            {ability.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const TypeCheckwithCharacterContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  select {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    font-size: var(--fontMedium);

    select:hover {
            background-color: var(--primary);
        }

  
  option {
    text-align: center;
    font-size: var(--fontMedium);
  }

  
  option:hover {
            background-color: var(--primary);
        }
  }
`;

const pokeTypes = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 60%;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin: auto;
`;

export default TypeCheckwithCharacter;
