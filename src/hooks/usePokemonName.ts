import { useContext, useEffect, useState } from "react";
import { MatchInfo } from "@models/pokemonData";
import { LanguageContext } from "@services/getInitialData";
import { LanguageType } from "@models/settingData";
import pokedex from "@data/pokedex.json";

const usePokemonName = (matchInfo: MatchInfo): string => {
  const { language } = useContext(LanguageContext);
  const [name, setName] = useState<string>(matchInfo.name);

  useEffect(() => {
    const pokedexItem = pokedex.filter(
      (item) =>
        item.name[matchInfo.searchLanguage as LanguageType] === matchInfo.name
    );
    setName(pokedexItem[0].name[language.type]);
  }, [language, matchInfo]);

  return name;
};

export default usePokemonName;
