import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import {
  recentSearchContainer,
  recentSearchChip,
} from "./SearchStyles";
import { RecentSearchItem } from "@hooks/useRecentSearch";

interface RecentSearchProps {
  recentSearches: RecentSearchItem[];
  handleRecentClick: (item: RecentSearchItem) => void;
}

const RecentSearch = ({
  recentSearches,
  handleRecentClick,
}: RecentSearchProps) => {
  const { language } = useContext(LanguageContext);

  if (recentSearches.length === 0) return null;

  return (
    <div css={recentSearchContainer} role="group" aria-label={language.type === "kor" ? "최근 검색" : "Recent searches"}>
      {/* <span css={recentSearchLabel}>{text.MAIN.SEARCH.RECENT_SEARCH}</span> */}
      {recentSearches.map((item) => (
        <button
          key={item.no}
          css={recentSearchChip}
          onClick={() => handleRecentClick(item)}
          aria-label={`${item.name[language.type]} ${language.type === "kor" ? "검색" : "search"}`}
        >
          {item.name[language.type]}
        </button>
      ))}
    </div>
  );
};

export default RecentSearch;
