import { css } from "@emotion/react";
import { useContext, useState } from "react";
import TableDescription from "@components/table/TableDescription";
import typeEffectivenessData from "@data/tableData.json";
import { LanguageContext } from "@services/getInitialData";
import { getTranslateType } from "@utils/getTranslateType";

const Table = () => {
  const { language, text } = useContext(LanguageContext);
  const { columnHeaders, rowData } = typeEffectivenessData;
  const [clearDatas, setClearDatas] = useState<number[]>([]);

  const handleBodyHeader = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (clearDatas.includes(Number(target.dataset.type))) {
      setClearDatas(
        clearDatas.filter((no) => no !== Number(target.dataset.type)),
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
        {/* <h1>{text.TABLE.TITLE}</h1> */}
        <div css={tableContents}>
          <div>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={handleAllHeader}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleAllHeader();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={text.TABLE.SELECT_ALL}
                  ></th>
                  {columnHeaders.map((header, index) => (
                    <th
                      scope="col"
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
                        scope="row"
                        css={tableHeaderStyle(row.no, isClicked)}
                        onClick={handleBodyHeader}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleBodyHeader(e);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isClicked}
                        data-type={row.no}
                      >
                        {getTranslateType(row.type, language.type)}
                      </th>
                      {row.values.map((value, colIndex) => (
                        <td
                          key={colIndex}
                          css={valueColor(value, isClicked)}
                          aria-label={
                            value === "●"
                              ? text.TABLE.EFFECT_SUMMARY.SUPER_EFFECT
                              : value === "▲"
                                ? text.TABLE.EFFECT_SUMMARY.NORMAL_EFFECT
                                : value === "✕"
                                  ? text.TABLE.EFFECT_SUMMARY.NOT_EFFECT
                                  : undefined
                          }
                        >
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

        <TableDescription text={text} />
      </div>
    </>
  );
};

const tableContainer = css`
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  gap: 20px;
  color: var(--text);

  > div:first-of-type {
    flex: 7.3;
    min-width: 0;
  }
  > div:last-of-type {
    flex: 2.7;
    min-width: 0;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-top: 10px;
    height: auto;
  }
`;

const tableContents = css`
  margin: auto;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    text-align: center;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    width: max-content;
    border: 1px solid var(--border);
    font-size: var(--fontMedium);
    border-radius: 20px;
    overflow: hidden;
  }

  thead th {
    width: 50px;
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

  tbody tr {
    content-visibility: auto;
    contain-intrinsic-size: auto 30px;
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
  isHeader: boolean = false,
) => css`
  background-color: ${isClicked ? "var(--primary)" : `var(--type${no})`};
  height: 30px;
  vertical-align: middle;
  color: ${isHeader ? "#ffffff" : isClicked ? "var(--tableText)" : "#ffffff"};
  :hover {
    background-color: var(--type${no});
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
