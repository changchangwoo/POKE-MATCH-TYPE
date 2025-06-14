import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { APP } from "../../const/kor";

const ChangeButtons = () => {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div css={ChangeSectionContainer}>
      <button
        onClick={() => navigator("/")}
        className={location.pathname === "/" ? "active" : ""}
      >
        {APP.CHANGE_BUTTON.COMPARE_POKEMON}
      </button>
      <button
        onClick={() => navigator("/type")}
        className={location.pathname === "/type" ? "active" : ""}
      >
        {APP.CHANGE_BUTTON.COMPARE_TYPE}
      </button>
      <button
        onClick={() => navigator("/table")}
        className={`new ${location.pathname === "/table" ? "active" : ""}`}
      >
        {APP.CHANGE_BUTTON.COPATIBILITY_TABLE}
      </button>
      <button
        onClick={() => navigator("/quiz")}
        className={`new ${location.pathname === "/quiz" ? "active" : ""}`}
      >
        {APP.CHANGE_BUTTON.COMPATIBILITY_QUIZ}
      </button>
    </div>
  );
};

const ChangeSectionContainer = css`
  padding-top: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  button {
    flex: 1;
    height: 40px;
    max-width: 300px;
    min-width: 150px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    font-size: var(--fontMedium);
    cursor: pointer;
    background-color: var(--background);
    border-radius: 6px;
    color: var(--text);
    position: relative;

    :hover {
      background-color: var(--point);
    }

    &.active {
      background-color: var(--point);
      color: var(--background);
    }

    &.new::after {
      content: "new";
      color: var(--highlight) !important;
      left: 43%;
      top: -8px;
      position: absolute;
      font-size: 14px;
    }
  }
`;

export default ChangeButtons;
