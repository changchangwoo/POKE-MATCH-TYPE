import { SetURLSearchParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import { getSpeciesTranslate } from '../utils/getSpeciesTranslate';

interface SpeciesButtonsProps {
  varietiesData: any;
  varietiesIdx: string | null;
  name : string;
  setSearchParams: SetURLSearchParams;
}

const SpeciesButtons = ({ varietiesData, varietiesIdx, name, setSearchParams }: SpeciesButtonsProps) => {
  const [clickedBtn, setClickedBtn] = useState<number | null>(Number(varietiesIdx));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnIdx = e.currentTarget.dataset.idx;
    const urlIdx = e.currentTarget.dataset.url?.match(/\/(\d+)\/$/)?.[1];
    if (btnIdx !== undefined) {
      setClickedBtn(Number(btnIdx));
      setSearchParams({no : urlIdx || "", name : name || "", varietiesIdx : btnIdx || "0"});
    }
  };


  
  return (
    <>
      <h1>변형</h1>
      <div css={speciesTypes}>
        {varietiesData.varieties.map((species: any, idx: number) => {
          const label = getSpeciesTranslate(species.pokemon.name);
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
  grid-template-columns: repeat(4, 1fr);
  width: 60%;
  justify-content: center;
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
  color: white;
`;

export default SpeciesButtons;
