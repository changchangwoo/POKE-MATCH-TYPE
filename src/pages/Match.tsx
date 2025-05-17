import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import SelectType from "../components/SelectType";
import { Types } from "../models/pokemonData";
import TypeCard from "../components/commons/TypeCard";
import { useLocation } from "react-router-dom";
import SelectAbility from "../components/commons/SelectAbility";

const Match = () => {
  const [checkedType, setCheckedType] = useState<Types[]>([]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (checkedType.length > 0) {
      localStorage.setItem(location.pathname + "/matchDatas", JSON.stringify(checkedType));
    }
  }, [checkedType, location.pathname]);

  useEffect(() => {
    const getSessionCheckedDatas = localStorage.getItem(location.pathname + "/matchDatas");
    const getSessionTypeCheck = localStorage.getItem(location.pathname + "/typecheck");

    if (getSessionCheckedDatas) {
      const parsedCheckedDatas = JSON.parse(getSessionCheckedDatas);
      if (parsedCheckedDatas && Array.isArray(parsedCheckedDatas)) {
        setCheckedType(parsedCheckedDatas);
      }
    }

    if (getSessionTypeCheck) {
      setSelectedAbility(getSessionTypeCheck);
    }
  }, [location.pathname]);

  return (
    <div css={matchContainer}>
      <SelectType checkedType={checkedType} setCheckedType={setCheckedType} />
      <SelectAbility
        selectedAbility={selectedAbility}
        setSelectedAbility={setSelectedAbility}
      />
      <TypeCard MatchTypes={checkedType} selectedAbility={selectedAbility} />
    </div>
  );
};

const matchContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

export default Match;
