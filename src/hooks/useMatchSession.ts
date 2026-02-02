import { Dispatch, SetStateAction, useEffect } from "react";
import { SetURLSearchParams } from "react-router-dom";

const useMatchSession = (
  setSearchParams: SetURLSearchParams,
  setSelectedAbility: Dispatch<SetStateAction<string>>,
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>
) => {
  useEffect(() => {
    const getSessionMatchDatas = sessionStorage.getItem(
      location.pathname + "/matchDatas"
    );
    const getSessionTypeCheck = sessionStorage.getItem(
      location.pathname + "/typecheck"
    );
    const getSessionVarietiesIdx = sessionStorage.getItem(
      location.pathname + "/varietiesIdx"
    );
    const getSessionTerastal = sessionStorage.getItem(
      location.pathname + "/terastal"
    );

    if (getSessionMatchDatas) {
      const parseMatchDatas = JSON.parse(getSessionMatchDatas);
      const parsedVarietiesIdx = getSessionVarietiesIdx
        ? JSON.parse(getSessionVarietiesIdx)
        : "0";
      setSearchParams({
        ...parseMatchDatas,
        varietiesIdx: parsedVarietiesIdx.varietiesIdx,
      });
    }

    if (getSessionTerastal) {
      const parseSesstionTerastal = JSON.parse(getSessionTerastal);
      setSelectedTerastal(parseSesstionTerastal);
    }
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);
};

export default useMatchSession;
