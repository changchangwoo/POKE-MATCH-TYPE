import { css } from "@emotion/react";

import abilities from "../../datas/pokemonAbilityData.json";
import { Dispatch, SetStateAction, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../utils/getInitialData";

interface TypeCheckProps {
  selectedAbility: string;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
}

const SelectAbility = ({
  selectedAbility,
  setSelectedAbility,
}: TypeCheckProps) => {
  const location = useLocation();
  const { language, text } = useContext(LanguageContext);

  const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedAbility(selectedValue);
    let currentPath = location.pathname + "/typecheck";
    sessionStorage.setItem(currentPath, selectedValue);
  };

  return (
    <>
      <div css={SelectAbilityContainer}>
        <h1>{text.MATCH.SELECT_ABILITY.TITLE}</h1>

        <select value={selectedAbility} onChange={handleAbilityChange}
        aria-label="Select Ability">
          {abilities.map((ability) => (
            <option key={ability.value} value={ability.value}>
              {ability.label[language.type]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export const SelectAbilityContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  h1 {
    text-align: center;
    color: var(--text);
  }

  select {
    margin: auto;
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    height: 30px;
    padding: 5px;
    padding-left: 17px;
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

export default SelectAbility;
