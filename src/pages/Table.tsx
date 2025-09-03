import { css } from "@emotion/react";
import { useContext, useState } from "react";
import KakaoAdfitBanner from "../ads/KakaoAdfitBanner";
import TableDescription from "../components/table/TableDescription";
import typeEffectivenessData from "../datas/tableData.json";
import { LanguageContext } from "../utils/getInitialData";
import { getTranslateType } from "../utils/getTranslateType";

const Table = () => {
  const { language, text } = useContext(LanguageContext);
  const { columnHeaders, rowData } = typeEffectivenessData;
  const [clearDatas, setClearDatas] = useState<number[]>([]);

  const handleBodyHeader = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (clearDatas.includes(Number(target.dataset.type))) {
      setClearDatas(
        clearDatas.filter((no) => no !== Number(target.dataset.type))
      );
    } else {
      setClearDatas([...clearDatas, Number(target.dataset.type)]);
    }
  };

  const handleAllHeader = () => {
    if (clearDatas.length === columnHeaders.length) {
      setClearDatas([]);
    } else {
      setClearDatas(columnHeaders.map((header) => header.no));
    }
  };

  return (
    <>
      <div css={tableContainer}>
        <h1>{text.TABLE.TITLE}</h1>
        <div css={tableContents}>
          <div>
            <table>
              <thead>
                <tr>
                  <th onClick={handleAllHeader}>전체 선택</th>
                  {columnHeaders.map((header, index) => (
                    <th
                      css={tableHeaderStyle(header.no, false, true)}
                      key={index}
                    >
                      {getTranslateType(header.name, language.type)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowData.map((row, rowIndex) => {
                  const isClicked = clearDatas.includes(row.no);
                  return (
                    <tr key={rowIndex}>
                      <th
                        css={tableHeaderStyle(row.no, isClicked)}
                        onClick={handleBodyHeader}
                        data-type={row.no}
                      >
                        {getTranslateType(row.type, language.type)}
                      </th>
                      {row.values.map((value, colIndex) => (
                        <td key={colIndex} css={valueColor(value, isClicked)}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <KakaoAdfitBanner />

        <TableDescription text={text} />
      </div>
    </>
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

  h1 {
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: max-content;
    border-style: hidden;
    box-shadow: 0 0 0 1px var(--border);
    font-size: var(--fontMedium);
  }

  thead th {
    width: 90px;
    :nth-of-type(1) {
      background-color: var(--background);
      position: sticky;
      vertical-align: middle;
      cursor: pointer;
      left: 0;
    }
    :nth-of-type(1):hover {
      filter: brightness(85%);
      transition: all 0.2s;
    }
  }

  tbody th {
    cursor: pointer;
    position: sticky;
    vertical-align: middle;
    left: 0;
    border: 1px solid var(--border);
    :hover {
      filter: brightness(85%);
      transition: all 0.2s;
    }
  }

  td {
    text-align: center;
    vertical-align: middle;
    height: 30px;
    border: 1px solid var(--border);
  }
`;

const tableHeaderStyle = (
  no: number,
  isClicked: boolean = false,
  isHeader: boolean = false
) => css`
  background-color: ${isClicked ? "var(--primary)" : `var(--type${no})`};
  height: 30px;
  vertical-align: middle;
  color: ${isHeader ? "#ffffff" : isClicked ? "var(--tableText)" : "#ffffff"};
  :hover {
    background-color: var(--type ${no});
  }
`;

const valueColor = (value: string, isClicked: boolean) => css`
  visibility: ${isClicked ? "hidden" : "visible"};
  color: ${value === "●"
    ? "var(--type14)"
    : value === "▲"
    ? "var(--type7)"
    : value === "✕"
    ? "var(--type16)"
    : "inherit"};
`;

export default Table;
