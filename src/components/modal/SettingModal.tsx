import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Footer from "../Footer";
import AccordianList from "../commons/AccordianList";

interface SettingModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const SettingModal = ({ setModal }: SettingModalProps) => {
  return (
    <div css={ModalOverlay}>
      <div css={ModalContainer}>
        <div className="ModalHeader">
          <span>설정</span>
          <button onClick={() => setModal((prev) => !prev)}>
            <IoMdClose />
          </button>
        </div>
        <ul className="ModalContents">
          <div className="ModalDescription">
            <h1>포켓몬스터 약점 계산기 -v02</h1>
            <p>
              본 서비스를 이용해주셔서 정말 감사합니다.
              <br />
              뭐라도 더 열심히 만들어보겠습니다.. 헤헤
            </p>
            <Footer />
          </div>
          <AccordianList title="라이트 모드">
            <span>컨텐츠 입니다.</span>
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
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = css`
  width: 100%;
  height: 100%;
  background-color: white;

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
      max-width: 300px;
      text-align: center;
    }
  }
  .ModalHeader {
    width: 100%;
    height: 50px;
    background-color: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-bottom: 1px solid var(--border);

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
  }
`;

export default SettingModal;

/*
아코디언 컴포넌트를 만드려고 했을 때 유의사항들
아코디언 버튼을 클릭하는 경우 데이터가 출력되고 제어할 수 있는건 기본적임
=> 공통 컴포넌트로 묶기 위해서는
아코디언 contents 부분을 합성컴포넌트로 받고, 아코디언 타이틀 부분만 제어 

*/
