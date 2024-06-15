import { css } from "@emotion/react";

const Navigation = () => {
  return (
    <>
      <div css={navigationStyle}>포켓몬 약점 계산기</div>
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
  font-weight: 500;
`;

export default Navigation;
