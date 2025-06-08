import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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
          <h1>포켓몬스터 약점 계산기 -v02</h1>
          <li>라이트 모드 <FaCaretDown /></li>
          <li>언어 설정 <FaCaretDown /></li>
          <li>저작권 <FaCaretDown /></li>
          <li>피드백 <FaCaretDown /></li>
        </ul>
      </div>
    </div>
  );
};

/*
모달 안에 컨텐츠들을 전부 새 컴포넌트로 할까??
단순 아코디언으로 할 수 있는 것들
-> 저작권
-> 피드백
-> 감사인사
-> 걍 필요없는 자잘구레한것들

동작이 이뤄지는 것들
-> 다크모드
-> 언어 설정
-> 분리하자

*/

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
  .ModalContents {
  display: flex;
  flex-direction: column;
  h1 {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border);

  }
    li {
      width: 100%;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--border);
      height: 40px;
      cursor: pointer;
      :hover {
        background-color: var(--border);
      }
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
