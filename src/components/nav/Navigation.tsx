import { css } from "@emotion/react";
import { IoSettingsSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import SettingModal from "@components/modal/SettingModal";
import { LanguageContext } from "@services/getInitialData";
import Logo from "@images/logo.webp"



const Navigation = () => {
  const [isModal, setModal] = useState<boolean>(false);
      const {text} = useContext(LanguageContext);
  

  return (
    <>
      <div css={navigationStyle}>
        <img src={Logo} className="logo" alt="logo Image"/>
        <span>{text.APP.TITLE}</span>
        <button onClick={() => setModal(!isModal)}
          aria-label="SetModal">
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
  color: var(--background);
  position: absolute;
  box-sizing: border-box;
  padding: 20px;

  .logo {
    width: 35px;
    height: 35px;
  }

  button {
    position: absolute;
    right: 20px;
    max-width: 25px;
    height: 25px;
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--point);
    background-color: var(--background);
    cursor: pointer;
    transition: all 0.2;
    :hover {
      background-color: var(--border);
    }
  }
`;

export default Navigation;
