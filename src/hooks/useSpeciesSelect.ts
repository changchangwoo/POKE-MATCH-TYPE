import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { LanguageType } from "@models/settingData";

interface UseSpeciesSelectParams {
  varietiesIdx: string | null;
  name: string;
  searchLanguage: LanguageType | "";
  setSearchParams: SetURLSearchParams;
}

const useSpeciesSelect = ({
  varietiesIdx,
  name,
  searchLanguage,
  setSearchParams,
}: UseSpeciesSelectParams) => {
  const [clickedBtn, setClickedBtn] = useState<number | null>(
    Number(varietiesIdx)
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnIdx = e.currentTarget.dataset.idx;
    const urlIdx = e.currentTarget.dataset.url?.match(/\/(\d+)\/$/)?.[1];
    if (btnIdx !== undefined) {
      setClickedBtn(Number(btnIdx));
      setSearchParams({
        no: urlIdx || "",
        name: name || "",
        varietiesIdx: btnIdx || "0",
        searchLanguage: searchLanguage || "",
      });
      sessionStorage.setItem(
        location.pathname + "/varietiesIdx",
        JSON.stringify({
          varietiesIdx: btnIdx,
        })
      );
    }
  };

  return { clickedBtn, handleClick };
};

export default useSpeciesSelect;
