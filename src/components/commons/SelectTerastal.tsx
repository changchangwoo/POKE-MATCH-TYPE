import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import terastalTypes from "../../datas/pokemonTerastalData.json";
import defaultTypes from "../../datas/defaultTypes.json";
import { Dispatch, SetStateAction, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../utils/getInitialData";

interface SelectTerastalProps {
  selectedTerastal: string;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const SelectTerastal = ({
  selectedTerastal,
  setSelectedTerastal,
}: SelectTerastalProps) => {
  const location = useLocation();
  const { language, text } = useContext(LanguageContext);

  const handleTerastalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    let currentPath = location.pathname + "/terastal";

    if (selectedValue === "") {
      setSelectedTerastal({ value: "", no: "" });
      sessionStorage.removeItem(currentPath);
      return;
    }

    const selectedType = defaultTypes.find(
      (type) => type.name === selectedValue
    );
    const typeNo = selectedType ? String(selectedType.no) : "";

    const terastalData = {
      value: selectedValue,
      no: typeNo,
    };

    setSelectedTerastal(terastalData);
    sessionStorage.setItem(currentPath, JSON.stringify(terastalData));
  };

  return (
    <>
      <div css={SelectTerastalContainer}>
        <h1>{text.MATCH.SELECT_TERASTAL.TITLE}</h1>

        <select
          value={selectedTerastal}
          onChange={handleTerastalChange}
          aria-label="Select Terastal"
        >
          {terastalTypes.map((type) => (
            <option key={uuidv4()} value={type.value}>
              {type.label[language.type]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export const SelectTerastalContainer = css`
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

export default SelectTerastal;
