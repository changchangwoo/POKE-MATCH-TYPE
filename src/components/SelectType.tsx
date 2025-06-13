import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import defaultTypesData from "../../src/datas/defaultTypes.json";
import { getKoreanType } from "../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { Types } from "../models/pokemonData";

interface SelectTypeProps {
  checkedType: Types[];
  setCheckedType: Dispatch<SetStateAction<Types[]>>;
  quizModeDatas?: Types[];
  answerIdx?: number;
  isNext: boolean
}
const SelectType = ({
  checkedType,
  setCheckedType,
  quizModeDatas,
  answerIdx,
  isNext = false
}: SelectTypeProps) => {
  const selectedDatas = quizModeDatas || defaultTypesData;
  const handleSelect = (type: any) => {
    const isAlreadyChecked = checkedType.some(
      (checked) => checked.no === type.no
    );
    if (isAlreadyChecked) {
      setCheckedType(checkedType.filter((checked) => checked.no !== type.no));
    } else {
      if (quizModeDatas) {
        if (checkedType.length === 1) {
          setCheckedType([{ no: type.no, name: type.name }]);
          return;
        }
      }
      if (checkedType.length >= 2) return;
      setCheckedType([...checkedType, { no: type.no, name: type.name }]);
    }
  };

  return (
    <div css={selectTypeContainer(isNext)}>
      <h1>{quizModeDatas ? "" : "타입 선택"}</h1>
      <div css={selectTypes(quizModeDatas)}>
        {selectedDatas.map((type, idx) => {
          const isChecked = checkedType.some(
            (checked) => checked.no === type.no
          );
          return (
            <button
              css={item(isChecked ? type.no : undefined, 
                (isNext && answerIdx === idx)
              )}
              onClick={() => handleSelect(type)}
              key={uuidv4()}
            >
              {getKoreanType(type.name)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const selectTypeContainer = (isNext : boolean = false) => css`
pointer-events: ${isNext ? "none" : "all"};
h1 {
    color: var(--text);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const selectTypes = (quizModeDatas: Types[] | undefined) => css`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: ${quizModeDatas ? "var(--primary)" : "var(--background)"};
`;

const item = (no: number | undefined, isAnswer : boolean| undefined) => css`
  background-color: ${no ? `var(--type${no})` : "var(--border)"};
  height: 25px;
  border: ${isAnswer ? `2px solid var(--highlight)`:`1px solid var(--border)`};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${no ? "white" : "var(--text)"};
  transition: all 0.2s;

`;

export default SelectType;

/*
퀴즈모드 데이터가 아닌 경우, 담는 개념 X

*/
