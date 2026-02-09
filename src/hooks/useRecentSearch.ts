import { useState, useCallback, useContext } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageType } from "@models/settingData";
import { LanguageContext } from "@services/getInitialData";

export interface RecentSearchItem {
  no: number;
  name: Record<LanguageType, string>;
}

const STORAGE_KEY = "recentSearch";
const MAX_ITEMS = 10;

const getStoredSearches = (): RecentSearchItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const useRecentSearch = (setSearchParams: SetURLSearchParams) => {
  const { language } = useContext(LanguageContext);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(
    getStoredSearches,
  );

  const addRecentSearch = useCallback((item: RecentSearchItem) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.no !== item.no);
      const updated = [item, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleRecentClick = useCallback(
    (item: RecentSearchItem) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("no", String(item.no));
        params.set("name", item.name[language.type]);
        params.set("varietiesIdx", "0");
        params.set("searchLanguage", language.type);
        return params;
      });
    },
    [setSearchParams, language.type],
  );

  return { recentSearches, addRecentSearch, handleRecentClick };
};

export default useRecentSearch;
