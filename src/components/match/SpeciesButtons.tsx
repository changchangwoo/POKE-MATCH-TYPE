import { SetURLSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import { useContext } from "react";
import { getSpeciesTranslate } from "@utils/getSpeciesTranslate";
import { LanguageContext } from "@services/getInitialData";
import { LanguageType } from "@models/settingData";
import useSpeciesSelect from "@hooks/useSpeciesSelect";

interface SpeciesButtonsProps {
  varietiesData: any;
  varietiesIdx: string | null;
  name: string;
  setSearchParams: SetURLSearchParams;
  searchLanguage : LanguageType | "";
}

const SpeciesButtons = ({
  varietiesData,
  varietiesIdx,
  name,
  setSearchParams,
  searchLanguage
}: SpeciesButtonsProps) => {
  const { language, text } = useContext(LanguageContext);
  const { clickedBtn, handleClick } = useSpeciesSelect({
    varietiesIdx,
    name,
    searchLanguage,
    setSearchParams,
  });

  return (
    <>
      <h2>{text.MAIN.MATCH.FORM}</h2>
      <div css={speciesTypes}>
        {varietiesData.varieties.map((species: any, idx: number) => {
          if (species.is_visible === false) return null;
          
          const label = getSpeciesTranslate(species.pokemon.name, language.type)
          if (!label) return null;

          return (
            <button
              aria-label={label}
              aria-pressed={clickedBtn === idx}
              key={species.pokemon.name}
              css={[speciesBtn, clickedBtn === idx && selectedBtn]}
              data-idx={idx}
              data-url={species.pokemon.url}
              data-name={species.pokemon.name}
              onClick={handleClick}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
};

const speciesTypes = css`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  width: 60%;
  justify-content: center;
  margin-bottom: 10px;
`;

const speciesBtn = css`
  height: 25px;
  border-radius: 4px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--primary);
  color: var(--text);
`;

const selectedBtn = css`
  background-color: var(--point);
  color: var(--background);
`;

export default SpeciesButtons;
