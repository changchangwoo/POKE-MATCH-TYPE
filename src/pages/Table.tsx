import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "../utils/getInitialData";
import typeEffectivenessData from "../datas/tableData.json";
import { getTranslateType } from "../utils/getTranslateType";

const Table = () => {
  const { language, text } = useContext(LanguageContext);
  const { columnHeaders, rowData } = typeEffectivenessData;

  const getCellClassName = (value: any) => {
    switch (value) {
      case "●":
        return "super-effective";
      case "▲":
        return "not-very-effective";
      case "x":
        return "no-effect";
      default:
        return "";
    }
  };

  return (
    <div css={tableContainer}>
      <h1>{text.TABLE.TITLE}</h1>
      <div css={tableContents}>
        <div>
          <table>
            <thead>
              <tr>
                <th>선택 해제</th>
                {columnHeaders.map((header, index) => (
                  <th css={tableHeaderStyle(header.no)} key={index}>
                    {getTranslateType(header.name, language.type)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th css={tableHeaderStyle(row.no)}>
                    {getTranslateType(row.type, language.type)}
                  </th>
                  {row.values.map((value, colIndex) => (
                    <td key={colIndex} css={valueColor(value)}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div css={tableDescription}>
        <div className="box">
          <div>
            <span style={{ color: "var(--type14)" }}>●</span> : 효과가 굉장했다!
            (x2)
          </div>
          <div>
            <span style={{ color: "var(--type7)" }}>▲</span> : 효과가 별로인 것
            같다... (x0.5)
          </div>
          <div>
            <span style={{ color: "var(--type16)", marginLeft: "3px" }}>✕</span>{" "}
            : 효과가 없는 것 같다... (x0)
          </div>
        </div>
        <div className="extraBox">
          <div>
            <span style={{ color: "var(--type10)" }}>●</span> 불꽃타입 화상 면역
          </div>
          <div>
            <span style={{ color: "var(--type12)" }}>●</span> 풀 타입
            씨뿌리기·가루·포자 면역
          </div>
          <div>
            <span style={{ color: "var(--type13)" }}>●</span> 전기타입 마비 면역
          </div>
          <div>
            <span style={{ color: "var(--type15)" }}>●</span> 얼음타입
            얼음·싸라기눈 면역
          </div>
          <div>
            <span style={{ color: "var(--type4)" }}>●</span> 독타입 독·맹독 면역
          </div>
          <div>
            <span style={{ color: "var(--type5)" }}>●</span> 땅타입
            전기자석파·모래바람 면역
          </div>
          <div>
            <span style={{ color: "var(--type3)" }}>●</span> 비행타입 압정뿌리기
            면역
          </div>
          <div>
            <span style={{ color: "var(--type6)" }}>●</span> 바위타입 모래바람
            면역
          </div>
          <div>
            <span style={{ color: "var(--type8)" }}>●</span> 고스트타입 도망치기
            제한 기술 면역
          </div>
          <div>
            <span style={{ color: "var(--type9)" }}>●</span> 강철타입
            독·맹독·모래바람 면역
          </div>
        </div>
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
  gap: 20px;
  color: var(--text);
`;

const tableDescription = css`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: var(--text);
  text-align: center;
  border-radius: 10px;
  border: 1px solid var(--border);
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;

  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 20px;
    background-color: var(--primary);
    border-radius: 8px;
    text-align: left;
    box-sizing: border-box;
  }
  .extraBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    color: var(--text);
    width: 100%;
    background-color: var(--primary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    div {
      display: flex;
      gap: 10px;
    }
    div span {
      text-align: left;
    }
  }
`;

const tableContents = css`
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0px;

  h1 {
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: max-content;
    border-style: hidden;
    box-shadow: 0 0 0 1px var(--border);
  }

  thead th {
    width: 90px;
    :nth-child(1) {
      background-color: var(--background);
      position: sticky;
      vertical-align: middle;
      cursor: pointer;
      left: 0;
    }
  }

  tbody th {
    cursor: pointer;
    position: sticky;
    vertical-align: middle;
    left: 0;
  }

  td {
    text-align: center;
    vertical-align: middle;
    height: 30px;
    border: 1px solid var(--border);
  }
`;

const tableHeaderStyle = (no: number) => css`
  background-color: var(--type${no});
  height: 30px;
  vertical-align: middle;
  color: #ffffff;
`;

const valueColor = (value: string) => css`
  color: ${value === "●"
    ? "var(--type14)"
    : value === "▲"
    ? "var(--type7)"
    : value === "✕"
    ? "var(--type16)"
    : "inherit"};
`;

export default Table;
