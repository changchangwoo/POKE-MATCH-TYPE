import { Dispatch, SetStateAction, useEffect } from "react";

const useMatchSession = (
  setSelectedAbility: Dispatch<SetStateAction<string>>,
  setSelectedTerastal: Dispatch<SetStateAction<{ value: string; no: string }>>
) => {
  useEffect(() => {
    const getSessionTypeCheck = sessionStorage.getItem(
      location.pathname + "/typecheck"
    );
    const getSessionTerastal = sessionStorage.getItem(
      location.pathname + "/terastal"
    );

    if (getSessionTerastal) {
      const parseSesstionTerastal = JSON.parse(getSessionTerastal);
      setSelectedTerastal(parseSesstionTerastal);
    }
    if (getSessionTypeCheck) setSelectedAbility(getSessionTypeCheck);
  }, [location.pathname]);
};

export default useMatchSession;
