import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import SelectType from "../components/SelectType";
import { Types } from "../models/pokemonData";
import TypeCheckwithCharacter from "../components/commons/TypeCheckwithCharacter";
import TypeCard from "../components/commons/TypeCard";
import { useLocation } from "react-router-dom";

const Match = () => {
  const [checkedType, setCheckedType] = useState<Types[]>([]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const location = useLocation();

  // 데이터를 로컬 저장소에 저장하는 useEffect
  useEffect(() => {
    if (checkedType.length > 0) {
      localStorage.setItem(location.pathname + "/matchDatas", JSON.stringify(checkedType));
    }
  }, [checkedType, location.pathname]);

  // 로컬 저장소에서 데이터를 불러오는 useEffect
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
      <TypeCheckwithCharacter
        types={checkedType}
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
