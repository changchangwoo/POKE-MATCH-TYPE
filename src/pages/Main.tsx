import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Search from "../components/search/Search";
import MatchCard from "../components/commons/MatchCard";
import TypeCard from "../components/commons/TypeCard";

const Main = () => {
  return <div css={MainContainer}>
    <Search/>
    <MatchCard/>
    <TypeCard />

  </div>;
};

const MainContainer = css`
display : flex;
height: auto;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 20px;
`;

export default Main;
