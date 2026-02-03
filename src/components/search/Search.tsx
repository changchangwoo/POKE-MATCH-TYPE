import { Dispatch, SetStateAction, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "@images/logo.webp";
import {
  searchContainer,
  searchHeader,
  inputWrapper,
  inputBox,
  suggestionsList,
  activeSuggestion,
} from "./SearchStyles";
import { SetURLSearchParams } from "react-router-dom";
import { PokeDex } from "@models/pokemonData";
import { LanguageContext } from "@services/getInitialData";
import usePokemonSearch from "@hooks/usePokemonSearch";

interface SearchProps {
  searchParams: URLSearchParams;
  pokemonNames: PokeDex[];
  setSearchParams: SetURLSearchParams;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const Search = ({
  setSearchParams,
  searchParams,
  pokemonNames,
  setSelectedAbility,
  setSelectedTerastal,
}: SearchProps) => {
  const { text } = useContext(LanguageContext);
  const {
    searchTerm,
    suggestions,
    activeSuggestionIndex,
    searchRef,
    inputRef,
    handleInputChange,
    handleSuggestionClick,
    handleSubmit,
    handleKeyDown,
  } = usePokemonSearch({
    searchParams,
    pokemonNames,
    setSearchParams,
    setSelectedAbility,
    setSelectedTerastal,
  });

  return (
    <div css={searchContainer} ref={searchRef}>
      <div css={searchHeader}>
        <div className="logo-wrapper">
          <img src={Logo} className="logo" alt="logo" />
        </div>
        <div className="text">
          <h1>{text.APP.TITLE}</h1>
          <h2>{text.MAIN.SEARCH.SUBTITLE}</h2>
        </div>
      </div>
      <div css={inputWrapper}>
        <form css={inputBox} onSubmit={handleSubmit} onClick={() => inputRef.current?.focus()}>
          <FaSearch />
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={text.MAIN.SEARCH.PLACE_HOLDER}
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
    </div>
  );
};

export default Search;
