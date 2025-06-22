import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "../utils/getInitialData";

const Table = () => {
  const { text } = useContext(LanguageContext);
  return (
    <div css={tableContainer}>
      <h1>{text.TABLE.TITLE}</h1>
      <div className="tableContents">
        <h1>구현중</h1>
      </div>
    </div>
  );
};

const tableContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 10px;
  h1 {
    color: var(--text);
  }
  .tableContents {
    width: 100%;
    height: 400px;
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default Table;
