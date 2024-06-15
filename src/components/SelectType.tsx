import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import defaultTypesData from "../../src/datas/defaultTypes.json";
import { getKoreanType } from "../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { Types } from "../models/pokemonData";
import { useLocation } from "react-router-dom";

interface SelectTypeProps {
  checkedType: Types[];
  setCheckedType: Dispatch<SetStateAction<Types[]>>;
}
const SelectType = ({ checkedType, setCheckedType }: SelectTypeProps) => {
  const handleSelect = (type: any) => {
    const isAlreadyChecked = checkedType.some(
      (checked) => checked.typeNo === type.no
    );

    if (isAlreadyChecked) {
      setCheckedType(
        checkedType.filter((checked) => checked.typeNo !== type.no)
      );
    } else {
      if (checkedType.length >= 2) return;
      setCheckedType([...checkedType, { typeNo: type.no, name: type.name }]);
    }
  };

  return (
    <div css={selectTypeContainer}>
      <h1>타입 선택</h1>
      <div css={selectTypes}>
        {defaultTypesData.map((type) => {
          const isChecked = checkedType.some(
            (checked) => checked.typeNo === type.no
          );
          return (
            <div
              css={item(isChecked ? type.no : undefined)}
              onClick={() => handleSelect(type)}
              key={uuidv4()}
            >
              {getKoreanType(type.name)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const selectTypeContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const selectTypes = css`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: white;
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
  color : ${no ? `white` : "black"};
  transition: all 0.2s;
`;

export default SelectType;
