import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KakaoAdfitBanner from "../ads/KakaoAdfitBanner";
import TypeCard from "../components/commons/TypeCard";
import SelectType from "../components/SelectType";
import { checkedTypes } from "../models/pokemonData";

const Type = () => {
  const [checkedType, setCheckedType] = useState<checkedTypes[]>([]);
  const [selectedAbility, setSelectedAbility] = useState<string>("");
  const [selectedTerastal, setSelectedTerastal] = useState<{
    value: string;
    no: string;
  }>({ value: "", no: "" });
  const location = useLocation();

  useEffect(() => {
    setCheckedType([]);
  }, []);

  useEffect(() => {
    if (checkedType.length > 0) {
      sessionStorage.setItem(
        location.pathname + "/matchDatas",
        JSON.stringify(checkedType)
      );
    }
  }, [checkedType, location.pathname]);

  useEffect(() => {
    const getSessionCheckedDatas = sessionStorage.getItem(
      location.pathname + "/matchDatas"
    );
    const getSessionTypeCheck = sessionStorage.getItem(
      location.pathname + "/typecheck"
    );
    const getSessionTerastal = sessionStorage.getItem(
      location.pathname + "/terastal"
    );

    if (getSessionCheckedDatas) {
      const parsedCheckedDatas = JSON.parse(getSessionCheckedDatas);
      if (parsedCheckedDatas && Array.isArray(parsedCheckedDatas)) {
        setCheckedType(parsedCheckedDatas);
      }
    }

    if (getSessionTypeCheck) {
      setSelectedAbility(getSessionTypeCheck);
    }

    if (getSessionTerastal) {
      const parseSesstionTerastal = JSON.parse(getSessionTerastal);
      setSelectedTerastal(parseSesstionTerastal);
    }
  }, [location.pathname]);

  return (
    <div css={matchContainer}>
      <KakaoAdfitBanner />
      <SelectType
        checkedType={checkedType}
        setCheckedType={setCheckedType}
        selectedAbility={selectedAbility}
        selectedTerastal={selectedTerastal}
        setSelectedAbility={setSelectedAbility}
        setSelectedTerastal={setSelectedTerastal}
      />

      <TypeCard
        MatchTypes={checkedType}
        selectedAbility={selectedAbility}
        selectedTerastal_no={selectedTerastal.no}
      />
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

export default Type;
