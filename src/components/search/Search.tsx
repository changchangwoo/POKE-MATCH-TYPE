import { css } from "@emotion/react";
import { useState, useEffect, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface PokemonNameType {
    id: number;
    name: string;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PokemonNameType[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonNameType[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("pokemonData.json"); // 여기 경로 수정
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching the pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      if (!pokemonData) return;
      const filteredSuggestions = pokemonData.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, pokemonData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: PokemonNameType) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div css={searchContainer}>
      <div css={inputBox}>
        <FaSearch />
        <input
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="매칭된 포켓몬을 입력해주세요"
        />
      </div>
      {suggestions.length > 0 && (
        <ul css={suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const searchContainer = css`
  width: 100%;
  position: relative;
`;

const inputBox = css`
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;

  svg {
    fill: grey;
    font-size: var(--fontMedium);
  }

  input {
    flex: 1;
    font-size: var(--fontMedium);
  }
`;

const suggestionsList = css`
  position: absolute;
  top: 60px;
  width: 100%;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export default Search;
