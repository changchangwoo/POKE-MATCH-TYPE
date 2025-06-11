import { css } from "@emotion/react";
import { useState } from "react";

type TThemeData = { name: string; num: Number };

const ThemeData: TThemeData[] = [
  {
    name: "태양의 돌",
    num: 1,
  },
  {
    name: "달의 돌",
    num: 2,
  },
];

const Theme = () => {
  const [curTheme, setCurTheme] = useState<TThemeData>({
    name: "태양의 돌",
    num: 1,
  });
  return (
    <div css={themeContainer}>
      {ThemeData.map((element, idx) => {
        const isClicked = curTheme.num === idx;
        return (
          <button
            css={themeButton(isClicked)}
            onClick={() => setCurTheme(element)}
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};
export default Theme;

const themeContainer = css`
  display: flex;
  gap: 10px;
`;

const themeButton = (isClicked: boolean) => css`
  width: 100%;
  height: 40px;
  border: 1px solid var(--border);
  font-size: 14px;
  border-radius: 8px;
  background-color: ${isClicked ? "var(--background)" : "var(--point)"};
  color: ${isClicked ? "var(--text)" : "var(--background)"};
`;
