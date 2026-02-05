import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import LogoBulbasaur from "@images/logo_bulbasar.png";
import LogoCharmander from "@images/logo_charmander.png";
import LogoSquirtle from "@images/logo_squirtle.png";
import LogoPikachu from "@images/logo_pikachu.png";
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
import useRecentSearch from "@hooks/useRecentSearch";
import RecentSearch from "./RecentSearch";

interface SearchProps {
  searchParams: URLSearchParams;
  pokemonNames: PokeDex[];
  setSearchParams: SetURLSearchParams;
  setSelectedAbility: Dispatch<SetStateAction<string>>;
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>;
}

const LOGOS = [LogoBulbasaur, LogoCharmander, LogoSquirtle, LogoPikachu];

const Search = ({
  setSearchParams,
  searchParams,
  pokemonNames,
  setSelectedAbility,
  setSelectedTerastal,
}: SearchProps) => {
  const { text } = useContext(LanguageContext);
  const randomLogos = useMemo(() => {
    const shuffled = [...LOGOS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);
  const { recentSearches, addRecentSearch, handleRecentClick } =
    useRecentSearch(setSearchParams);
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
    addRecentSearch,
  });

  return (
    <div css={searchContainer} ref={searchRef}>
      <div css={searchHeader}>

        <div className="text">
          <h1>{text.APP.TITLE}</h1>
          <h2>{text.MAIN.SEARCH.SUBTITLE}</h2>
        </div>
        <div className="logo-wrapper">
          {randomLogos.map((logoSrc, idx) => (
            <img key={`${logoSrc}-${idx}`} src={logoSrc} className="logo" alt="logo" />
          ))}
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
      <RecentSearch
        recentSearches={recentSearches}
        handleRecentClick={handleRecentClick}
      />
    </div>
  );
};

export default Search;
