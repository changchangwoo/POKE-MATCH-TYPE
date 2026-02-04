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
    <div css={recentSearchContainer}>
      {/* <span css={recentSearchLabel}>{text.MAIN.SEARCH.RECENT_SEARCH}</span> */}
      {recentSearches.map((item) => (
        <button
          key={item.no}
          css={recentSearchChip}
          onClick={() => handleRecentClick(item)}
        >
          {item.name[language.type]}
        </button>
      ))}
    </div>
  );
};

export default RecentSearch;
