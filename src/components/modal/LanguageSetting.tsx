import { useContext, useState, useEffect } from "react";
import { SelectAbilityContainer } from "../commons/SelectAbility";
import { LanguageContext } from "../../utils/getInitialData";
import { LANGUAGE_TEXTS } from "../../const/language_text";

const LanguageSetting = () => {
  const { language, setLanguage, text, setText } = useContext(LanguageContext);
  const [selectLanguage, setSelectLanguage] = useState<string>(language.type);

  const languageList = [
    { label: text.APP.LANGUAGE.DATA_KOR, type: "kor" },
    { label: text.APP.LANGUAGE.DATA_ENG, type: "eng" },
  ];

const handleAbilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = event.target.value as "kor" | "eng";
  setSelectLanguage(selectedValue);
  setLanguage({ type: selectedValue });
  setText(LANGUAGE_TEXTS[selectedValue]);
  localStorage.setItem("language", selectedValue);
};

  return (
    <div css={SelectAbilityContainer}>
      <select
        value={selectLanguage}
        onChange={handleAbilityChange}
        onClick={(e) => e.stopPropagation()}
      >
        {languageList.map((language) => (
          <option key={language.type} value={language.type}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSetting;
