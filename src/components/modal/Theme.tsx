import { css } from "@emotion/react";
import { useContext } from "react";
import { TThemeData } from "../../models/settingData";
import { LanguageContext, ThemeContext } from "../../utils/getInitialData";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { text } = useContext(LanguageContext);

  const ThemeDatas: TThemeData[] = [
    {
      name: text.APP.THEME.DATA_SUN_STONE,
      num: 1,
      type: "light",
    },
    {
      name: text.APP.THEME.DATA_MOON_STONE,
      num: 2,
      type: "dark",
    },
  ];

  const handleThemeBtn = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: TThemeData
  ) => {
    e.stopPropagation();
    setTheme(data);
    localStorage.setItem(
      "theme",
      JSON.stringify({
        ...data,
      })
    );
  };

  return (
    <div css={themeContainer}>
      {ThemeDatas.map((data, idx) => {
        const isClicked = theme.num === idx + 1;
        return (
          <button
            aria-label={`SetTheme-${data.name}`}
            key={data.name}
            css={themeButton(isClicked)}
            onClick={(e) => handleThemeBtn(e, data)}
          >
            {data.name}
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const themeButton = (isClicked: boolean) => css`
  min-width: 150px;
  height: 40px;
  border: 1px solid var(--border);
  font-size: 14px;
  border-radius: 5px;
  background-color: ${isClicked ? "var(--point)" : "var(--background)"};
  color: ${isClicked ? "var(--background)" : "var(--text)"};
  cursor: pointer;
`;
