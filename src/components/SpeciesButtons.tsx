import { getSpeciesDetail } from '../utils/getSpeciesDetail';
import { SetURLSearchParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';

interface SpeciesButtonsProps {
  speciesData: any;
  setSearchParams: SetURLSearchParams;
}

const SpeciesButtons = ({ speciesData, setSearchParams }: SpeciesButtonsProps) => {
  const [clickedBtn, setClickedBtn] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnIdx = e.currentTarget.dataset.idx;
    const urlIdx = e.currentTarget.dataset.url?.match(/\/(\d+)\/$/)?.[1];
    const name = e.currentTarget.dataset.name;
    if (btnIdx !== undefined) {
      setClickedBtn(Number(btnIdx));
      setSearchParams({no : urlIdx || ''})
    }
  };
  
  return (
    <>
      <h1>종류</h1>
      <div css={speciesTypes}>
        {speciesData.varieties.map((species: any, idx: number) => {
          const label = getSpeciesDetail(species.pokemon.name);
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
