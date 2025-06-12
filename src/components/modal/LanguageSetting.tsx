import { useState } from "react";
import { SelectAbilityContainer } from "../commons/SelectAbility";
import { v4 as uuidv4 } from "uuid";

const languageList = [
  { label: "한국어", type: "ko" },
  { label: "English", type: "eng" },
];

const LanguageSetting = () => {
  const [selectLanguage, setSelectLanguage] = useState<string>("");
  const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectLanguage(selectedValue);
    let currentPath = location.pathname + "/typecheck";
    localStorage.setItem(currentPath, selectedValue);
  };
  return (
    <>
      <div css={SelectAbilityContainer}>
        <select
          value={selectLanguage}
          onChange={handleAbilityChange}
          onClick={(e) => e.stopPropagation()}
        >
          {languageList.map((language) => (
            <option key={uuidv4()} value={language.type}>
              {language.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LanguageSetting;
