import { useState } from "react";
import { SelectAbilityContainer } from "../commons/SelectAbility";
import { v4 as uuidv4 } from "uuid";
import { APP } from "../../const/kor";

const languageList = [
  { label: APP.LANGUAGE.DATA_KOR, type: "kor" },
  { label: APP.LANGUAGE.DATA_ENG, type: "eng" },
];

const LanguageSetting = () => {
  const [selectLanguage, setSelectLanguage] = useState<string>("");
  const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectLanguage(selectedValue);
    localStorage.setItem("langauge", selectedValue);
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
