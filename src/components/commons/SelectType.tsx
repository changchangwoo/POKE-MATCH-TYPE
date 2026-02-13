import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext, useCallback } from "react";
import defaultTypesData from "@data/defaultTypes.json";
import { getTranslateType } from "@utils/getTranslateType";

import { CheckedType } from "@models/pokemonData";
import { LanguageContext } from "@services/getInitialData";
import { useLocation } from "react-router-dom";
import SelectAbility from "./SelectAbility";
import SelectTerastal from "./SelectTerastal";

interface SelectTypeProps {
  checkedType: CheckedType[];
  selectedAbility: string;
  selectedTerastal: { value: string; no: string };
  setCheckedType: Dispatch<SetStateAction<CheckedType[]>>;
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
  const { pathname } = useLocation();

  const handleReset = useCallback(() => {
    setCheckedType([]);
    setSelectedAbility("");
    setSelectedTerastal({ value: "", no: "" });
    sessionStorage.removeItem(`${pathname}/matchDatas`);
    sessionStorage.removeItem(`${pathname}/typecheck`);
    sessionStorage.removeItem(`${pathname}/terastal`);
  }, [pathname, setCheckedType, setSelectedAbility, setSelectedTerastal]);

  const handleSelect = (type: any, idx: number) => {
    const isAlreadyChecked = checkedType.some(
      (checked) => checked.no === type.no
    );
    if (isAlreadyChecked) {
      setCheckedType(checkedType.filter((checked) => checked.no !== type.no));
    } else {
      if (checkedType.length >= 2) {
        setCheckedType([...checkedType.slice(1), { no: type.no, name: type.name, idx }]);
      } else {
        setCheckedType([...checkedType, { no: type.no, name: type.name, idx }]);
      }
    }
  };

  const isTerastalSelected = selectedTerastal.no !== "";

  return (
    <div css={selectTypeContainer}>
      <div css={typeSelectArea}>
        {/* <h1>{text.MATCH.SELECT_TYPE.TITLE}</h1> */}
        <div css={selectTypes}>
          {defaultTypesData.map((type, idx) => {
            const isChecked = checkedType.some(
              (checked) => checked.no === type.no
            );
            return (
              <button
                aria-label={`${getTranslateType(type.name, language.type)} ${text.MATCH.SELECT_TYPE.TITLE}`}
                aria-pressed={isChecked}
                css={item(isChecked ? type.no : undefined)}
                onClick={() => handleSelect(type, idx)}
                key={type.no}
              >
                {getTranslateType(type.name, language.type)}
              </button>
            );
          })}
        </div>
        {isTerastalSelected && (
          <div css={overlay}>
            <span>{text.MATCH.SELECT_TERASTAL.SELECTED}</span>
          </div>
        )}
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
      <button css={resetButton} onClick={handleReset} aria-label="Reset">
        ↻ {text.MATCH.RESET}
      </button>
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
  gap: 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--background);
  height: 520px;
  box-sizing: border-box;
  align-self: flex-start;

  @media (max-width: 768px) {
    gap: 20px;
  }

  .addBox {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

const typeSelectArea = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  span {
    color: white;
    font-size: 1.2rem;
  }
`;

const selectTypes = css`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
  width: 100%;
`;

const item = (no: number | undefined) => css`
  background-color: ${no ? `var(--type${no})` : "var(--border)"};
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${no ? "white" : "var(--text)"};
  transition: all 0.2s;
    font-size: var(--fontLarge);

`;

const resetButton = css`
  padding: 6px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  cursor: pointer;
  font-size: var(--fontLarge);
  transition: all 0.2s;

  &:hover {
    background-color: var(--border);
  }
`;

export default SelectType;
