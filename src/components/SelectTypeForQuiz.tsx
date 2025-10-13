import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { getTranslateType } from "../utils/getTranslateType";
import { v4 as uuidv4 } from "uuid";
import { checkedTypes, Types } from "../models/pokemonData";
import { LanguageContext } from "../utils/getInitialData";

interface SelectTypeForQuizProps {
  checkedType: checkedTypes[];
  setCheckedType: Dispatch<SetStateAction<checkedTypes[]>>;
  quizModeDatas: Types[];
  answerIdx?: number;
  isNext?: boolean;
}

const SelectTypeForQuiz = ({
  checkedType,
  setCheckedType,
  quizModeDatas,
  answerIdx,
  isNext = false,
}: SelectTypeForQuizProps) => {
  const { language } = useContext(LanguageContext);

  const handleSelect = (type: any, idx: number) => {
    const isAlreadyChecked = checkedType.some(
      (checked) => checked.no === type.no
    );
    if (isAlreadyChecked) {
      setCheckedType(checkedType.filter((checked) => checked.no !== type.no));
    } else {
      if (checkedType.length === 1) {
        setCheckedType([{ no: type.no, name: type.name, idx }]);
        return;
      }
      setCheckedType([...checkedType, { no: type.no, name: type.name, idx }]);
    }
  };

  return (
    <div css={quizContainer(isNext)}>
      <div css={selectTypes}>
        {quizModeDatas.map((type, idx) => {
          const isChecked = checkedType.some(
            (checked) => checked.no === type.no
          );
          return (
            <button
              aria-label="Select Type"
              css={item(
                isChecked ? type.no : undefined,
                isNext && answerIdx === idx
              )}
              onClick={() => handleSelect(type, idx)}
              key={uuidv4()}
            >
              {getTranslateType(type.name, language.type)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const quizContainer = (isNext: boolean = false) => css`
  pointer-events: ${isNext ? "none" : "all"};
  width: 100%;
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
  background-color: var(--primary);
`;

const item = (no: number | undefined, isAnswer: boolean | undefined) => css`
  background-color: ${no ? `var(--type${no})` : "var(--border)"};
  height: 25px;
  border: ${isAnswer
    ? `2px solid var(--highlight)`
    : `1px solid var(--border)`};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${no ? "white" : "var(--text)"};
  transition: all 0.2s;
`;

export default SelectTypeForQuiz;
