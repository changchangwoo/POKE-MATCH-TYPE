import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "../utils/getInitialData";



const Error = () => {
  const {text} = useContext(LanguageContext);
  
  return (
    <div css={errorContainer}>
        <h1>{text.ERROR.TITLE}</h1>
        <h2>{text.ERROR.DESCRIPTION}</h2>
    </div>
  )
}

const errorContainer = css`
  color: var(--white);
  width: 100%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: var(--fontMedium);
  }

`;export default Error