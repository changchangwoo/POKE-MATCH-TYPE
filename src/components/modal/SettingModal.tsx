import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import Footer from "@components/nav/Footer";
import AccordianList from "@components/commons/AccordianList";

import { FaGithub } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { LanguageContext } from "@services/getInitialData";

interface SettingModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const SettingModal = ({ setModal }: SettingModalProps) => {
  const { text } = useContext(LanguageContext);

  return (
    <div css={ModalOverlay}>
      <div css={ModalContainer}>
        <div className="ModalHeader">
          <span>{text.APP.SETTING.TITLE}</span>
          <button aria-label="Open Setting" onClick={() => setModal((prev) => !prev)
          }>
            <IoMdClose />
          </button>
        </div>
        <ul className="ModalContents">
          <div className="ModalDescription">
            <h1>{text.APP.SETTING.DESCRIPTION_TITLE}</h1>
            <p>
              {text.APP.SETTING.DESCRIPTION_SUB_1}
              <br />
              {text.APP.SETTING.DESCRIPTION_SUB_2}
            </p>
            <Footer />
          </div>


          <AccordianList title={text.APP.COPYRIGHT.TITLE}>
            <div className="copyrightContents">
              <p>{text.APP.COPYRIGHT.DESCIRPTION_1}</p>
              <p>{text.APP.COPYRIGHT.DESCIRPTION_2}</p>
              <p>{text.APP.COPYRIGHT.DESCIRPTION_3}</p>
            </div>
          </AccordianList>
          <AccordianList title={text.APP.FEEDBACK.TITLE}>
            <div className="copyrightContents">
              <p>{text.APP.FEEDBACK.DESCRIPTION_1}</p>
              <p>{text.APP.FEEDBACK.DESCRIPTION_2}</p>
              <p>{text.APP.FEEDBACK.DESCRIPTION_3}</p>
              <p>{text.APP.FEEDBACK.DESCRIPTION_4}</p>
              <p>{text.APP.FEEDBACK.DESCRIPTION_5}</p>
              <br />
              <a
                href="https://github.com/changchangwoo/POKE-MATCH-TYPE"
                target="_blank"
                rel="noopener noreferrer"
                className="githubLink"
              >
                <FaGithub />
                changchangwoo/POKE-MATCH-TYPE
              </a>
              <p>
                <IoMailSharp />
                changchangwoo@naver.com
              </p>
              <br />
            </div>
          </AccordianList>
        </ul>
      </div>
    </div>
  );
};

const ModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: var(--primary);

  .ModalDescription {
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    p {
      font-size: 13px;
      color: grey;
      padding: 20px;
      max-width: 400px;
      text-align: center;
    }

    h1 {
      color: var(--text);
    }
  }
  .ModalHeader {
    width: 100%;
    height: 50px;
    background-color: var(--point);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--background);
    border-bottom: 1px solid var(--border);

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
      background-color: var(--primary);
      cursor: pointer;
      transition: all 0.2;
      :hover {
        background-color: var(--border);
      }
    }
  }
`;

export default SettingModal;

