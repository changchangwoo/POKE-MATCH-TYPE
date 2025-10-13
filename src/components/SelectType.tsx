import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import defaultTypesData from "../../src/datas/defaultTypes.json";
import { getTranslateType } from "../utils/getTranslateType";
import { v4 as uuidv4 } from "uuid";
import { checkedTypes } from "../models/pokemonData";
import { LanguageContext } from "../utils/getInitialData";
import SelectAbility from "./commons/SelectAbility";
import SelectTerastal from "./commons/SelectTerastal";

interface SelectTypeProps {
  checkedType: checkedTypes[];
  selectedAbility: string;
  selectedTerastal: { value: string; no: string };
  setCheckedType: Dispatch<SetStateAction<checkedTypes[]>>;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const SelectType = ({
  checkedType,
  setCheckedType,
  selectedAbility,
  selectedTerastal,
  setSelectedAbility,
  setSelectedTerastal,
}: SelectTypeProps) => {
  const { language, text } = useContext(LanguageContext);

  const handleSelect = (type: any, idx: number) => {
    const isAlreadyChecked = checkedType.some(
      (checked) => checked.no === type.no
    );
    if (isAlreadyChecked) {
      setCheckedType(checkedType.filter((checked) => checked.no !== type.no));
    } else {
      if (checkedType.length >= 2) return;
      setCheckedType([...checkedType, { no: type.no, name: type.name, idx }]);
    }
  };

  return (
    <div css={selectTypeContainer}>
      <h1>{text.MATCH.SELECT_TYPE.TITLE}</h1>
      <div css={selectTypes}>
        {defaultTypesData.map((type, idx) => {
          const isChecked = checkedType.some(
            (checked) => checked.no === type.no
          );
          return (
            <button
              aria-label="Select Type"
              css={item(isChecked ? type.no : undefined)}
              onClick={() => handleSelect(type, idx)}
              key={uuidv4()}
            >
              {getTranslateType(type.name, language.type)}
            </button>
          );
        })}
      </div>
      <div className="addBox">
        <SelectAbility
          selectedAbility={selectedAbility}
          setSelectedAbility={setSelectedAbility}
        />
        <SelectTerastal
          selectedTerastal={selectedTerastal.value}
          setSelectedTerastal={setSelectedTerastal}
        />
      </div>
    </div>
  );
};

const selectTypeContainer = css`
  h1 {
    color: var(--text);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--background);

  .addBox {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

const selectTypes = css`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
`;

const item = (no: number | undefined) => css`
  background-color: ${no ? `var(--type${no})` : "var(--border)"};
  height: 25px;
  border: 1px solid var(--border);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${no ? "white" : "var(--text)"};
  transition: all 0.2s;
`;

export default SelectType;
