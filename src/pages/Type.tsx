import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KakaoAdfitBanner from "@ads/KakaoAdfitBanner";
import TypeCard from "@components/commons/TypeCard";
import SelectType from "@components/commons/SelectType";
import { CheckedType } from "@models/pokemonData";

const Type = () => {
  const [checkedType, setCheckedType] = useState<CheckedType[]>([]);
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
    const pathPrefix = location.pathname;
    const getSessionCheckedDatas = sessionStorage.getItem(`${pathPrefix}/matchDatas`);
    const getSessionTypeCheck = sessionStorage.getItem(`${pathPrefix}/typecheck`);
    const getSessionTerastal = sessionStorage.getItem(`${pathPrefix}/terastal`);

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
      {/* <KakaoAdfitBanner /> */}
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
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  padding-top: 40px;

  > div {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      width: 100%;
    }
  }
`;

export default Type;
