import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { FaSearch } from "react-icons/fa";
import {
  searchContainer,
  inputBox,
  suggestionsList,
  activeSuggestion,
} from "./SearchStyles";
import { SetURLSearchParams } from "react-router-dom";
import { IPokeDex } from "../../models/pokemonData";
import { LanguageContext } from "../../utils/getInitialData";
import { useRef } from "react";

interface PokemonNameType {
  no: number;
  name: string;
}

interface SearchProps {
  searchParams: URLSearchParams;
  pokemonNames: IPokeDex[];
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
  const { language, text } = useContext(LanguageContext);
  const newSearchParams = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PokemonNameType[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      if (!pokemonNames) return;
      const filteredSuggestions = pokemonNames
        .filter((pokemon) => pokemon.name[language.type].startsWith(searchTerm))
        .map((pokemon) => ({
          no: pokemon.no,
          name: pokemon.name[language.type],
        }));

      setSuggestions(filteredSuggestions);
      setActiveSuggestionIndex(-1);
    }
  }, [searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: PokemonNameType) => {
    setSearchTerm(suggestion.name);
    newSearchParams.set("no", String(suggestion.no));
    newSearchParams.set("name", String(suggestion.name));
    newSearchParams.set("varietiesIdx", "0");
    newSearchParams.set("searchLanguage", language.type);
    setSearchParams(newSearchParams);
    setSearchTerm("");
    setSelectedAbility("");
    setSelectedTerastal({ value: "", no: "" });
    setSuggestions([]);
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (suggestions.length > 0 && suggestions[0].name === searchTerm) {
      newSearchParams.set("no", String(suggestions[0].no));
      newSearchParams.set("name", String(suggestions[0].name));
      newSearchParams.set("varietiesIdx", "0");
      newSearchParams.set("searchLanguage", language.type);
      setSearchParams(newSearchParams);
      setSuggestions([]);
      setSelectedAbility("");
      setSelectedTerastal({ value: "", no: "" });
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
    <div css={searchContainer} ref={searchRef}>
      <form css={inputBox} onSubmit={handleSubmit}>
        <FaSearch />
        <input
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
  );
};

export default Search;
