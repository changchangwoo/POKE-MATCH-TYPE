import { SetURLSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import { useContext, useState } from "react";
import { getSpeciesTranslate } from "../utils/getSpeciesTranslate";
import { LanguageContext } from "../utils/getInitialData";

interface SpeciesButtonsProps {
  varietiesData: any;
  varietiesIdx: string | null;
  name: string;
  setSearchParams: SetURLSearchParams;
}

const SpeciesButtons = ({
  varietiesData,
  varietiesIdx,
  name,
  setSearchParams,
}: SpeciesButtonsProps) => {
  const [clickedBtn, setClickedBtn] = useState<number | null>(
    Number(varietiesIdx)
  );
  const { language, text } = useContext(LanguageContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnIdx = e.currentTarget.dataset.idx;
    const urlIdx = e.currentTarget.dataset.url?.match(/\/(\d+)\/$/)?.[1];
    console.log(urlIdx)
    if (btnIdx !== undefined) {
      setClickedBtn(Number(btnIdx));
      setSearchParams({
        no: urlIdx || "",
        name: name || "",
        varietiesIdx: btnIdx || "0",
      });
      localStorage.setItem(
        location.pathname + "/varietiesIdx",
        JSON.stringify({
          varietiesIdx: btnIdx,
        })
      );
    }
  };

  return (
    <>
      <h1>{text.MAIN.MATCH.FORM}</h1>
      <div css={speciesTypes}>
        {varietiesData.varieties.map((species: any, idx: number) => {
          if (species.is_visible === false) return null;
          const label = getSpeciesTranslate(species.pokemon.name, language.type)
          if (!label) return null;

          return (
            <button
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
`;

const selectedBtn = css`
  background-color: var(--point);
  color: var(--background);
`;

export default SpeciesButtons;
