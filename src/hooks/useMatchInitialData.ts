import { useMemo } from "react";
import { LanguageType } from "@models/settingData";
import { MatchInfo } from "@models/pokemonData";
import pokedex from "@data/pokedex.json";

interface UseMatchInitialDataParams {
  searchParams: URLSearchParams;
  currentLanguage: LanguageType;
}

interface InitialMatchData {
  no: string;
  name: string;
  searchLanguage: LanguageType;
  varietiesIdx: string;
}

const useMatchInitialData = ({
  searchParams,
  currentLanguage,
}: UseMatchInitialDataParams): InitialMatchData => {
  return useMemo(() => {
    // 우선순위 1: URL 파라미터
    const urlNo = searchParams.get("no");
    const urlName = searchParams.get("name");
    const urlVarietiesIdx = searchParams.get("varietiesIdx");
    const urlSearchLanguage = searchParams.get("searchLanguage") as LanguageType;

    if (urlNo && urlName) {
      return {
        no: urlNo,
        name: urlName,
        searchLanguage: urlSearchLanguage || currentLanguage,
        varietiesIdx: urlVarietiesIdx || "0",
      };
    }

    // 우선순위 2: 세션 스토리지
    try {
      const sessionKey = location.pathname + "/matchDatas";
      const sessionData = sessionStorage.getItem(sessionKey);

      if (sessionData) {
        const parsedData: MatchInfo = JSON.parse(sessionData);

        if (parsedData.no && parsedData.name) {
          const varietiesIdxKey = location.pathname + "/varietiesIdx";
          const sessionVarietiesIdx = sessionStorage.getItem(varietiesIdxKey);
          const parsedVarietiesIdx = sessionVarietiesIdx
            ? JSON.parse(sessionVarietiesIdx).varietiesIdx
            : "0";

          return {
            no: String(parsedData.no),
            name: parsedData.name,
            searchLanguage: parsedData.searchLanguage || currentLanguage,
            varietiesIdx: parsedVarietiesIdx,
          };
        }
      }
    } catch (error) {
      console.warn("Failed to parse session storage data:", error);
    }

    // 우선순위 3: 랜덤 포켓몬
    const random = pokedex[Math.floor(Math.random() * pokedex.length)];
    return {
      no: String(random.no),
      name: random.name[currentLanguage],
      searchLanguage: currentLanguage,
      varietiesIdx: "0",
    };
  }, [searchParams, currentLanguage]);
};

export default useMatchInitialData;
