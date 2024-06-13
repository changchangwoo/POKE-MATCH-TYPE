import { css } from "@emotion/react";
import React from "react";

const Navigation = () => {
  return (
    <>
      <div css={navigationStyle}>POKE MATCH TYPE</div>
    </>
  );
};

const navigationStyle = css`
  width: 100%;
  background-color: var(--point);
  font-size: var(--fontMedium);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: fixed;
  z-index: 300;
`;

export default Navigation;
