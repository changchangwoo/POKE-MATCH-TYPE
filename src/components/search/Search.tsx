import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import pokemonNames from "../../datas/pokemonData.json";
import {
  searchContainer,
  inputBox,
  suggestionsList,
  activeSuggestion,
} from "./SearchStyles";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

interface PokemonNameType {
  no: number;
  name: string;
}

interface SearchProps {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

const Search = ({ setSearchParams, searchParams }: SearchProps) => {
  const newSearchParams = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PokemonNameType[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      if (!pokemonNames) return;

      const filteredSuggestions = pokemonNames.filter((pokemon) => {
        return pokemon.name.startsWith(searchTerm);
      });

      setSuggestions(filteredSuggestions);
      setActiveSuggestionIndex(-1);
    }
  }, [searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: PokemonNameType) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    handleSubmit();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (suggestions.length > 0 && suggestions[0].name === searchTerm) {
      console.log(suggestions[0].no);
      newSearchParams.set("no", String(suggestions[0].no));
      newSearchParams.set("name", String(suggestions[0].name));
      setSearchParams(newSearchParams);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
        );
      } else if (event.key === "ArrowUp") {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
        );
      } else if (event.key === "Enter") {
        if (
          activeSuggestionIndex >= 0 &&
          activeSuggestionIndex < suggestions.length
        ) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
      }
    }
  };

  return (
    <div css={searchContainer}>
      <form css={inputBox} onSubmit={handleSubmit}>
        <FaSearch />
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="매칭된 포켓몬을 입력해주세요"
        />
      </form>
      {suggestions.length > 0 && (
        <ul css={suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              css={
                index === activeSuggestionIndex ? activeSuggestion : undefined
              }
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
