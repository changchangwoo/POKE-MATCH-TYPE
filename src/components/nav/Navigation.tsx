import { css } from "@emotion/react";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";
import SettingModal from "../modal/SettingModal";

const Navigation = () => {
  const [isModal, setModal] = useState<boolean>(false)

  return (
    <>
      <div css={navigationStyle}>
        <span>포켓몬 약점 계산기 </span>
        <button onClick={() => setModal(!isModal)}>
          <IoSettingsSharp />
        </button>
      </div>
      {isModal && <SettingModal setModal={setModal} />}
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
  position: absolute;
  box-sizing: border-box;
  padding: 20px;

  

  button {
    position: absolute;
    right: 20px;
    max-width: 25px;
    height: 25px;
    border: 1px solid var(--white);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--point);
    background-color: white;
    cursor: pointer;
    transition: all 0.2;
    :hover {
      background-color: var(--border);
    }
  }
`;

export default Navigation;
