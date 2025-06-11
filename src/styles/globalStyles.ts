import { css } from "@emotion/react";
import { TTheme } from "../models/settingData";

type TThemeStyles = {
  point: string;
  primary: string;
  background: string;
  text: string;
  border: string;
};

const themes: Record<TTheme, TThemeStyles> = {
  light: {
    point: "#DE7038", // 태양의 돌
    primary: "#f8f9fa",
    background: "#ffffff",
    text: "#000000",
    border: "#d9d9d9",
  },
  dark: {
    point: "#AEC6B5",
    primary: "#171717",
    background: "#212121",
    text: "#E0E0E0",
    border: "#3A3A3A",
  },
};

export const globalStyles = (themeMode: keyof typeof themes = "light") => {
  const theme = themes[themeMode];
  return css`
    :root {
      /* 컬러 */
      /* --point: #eb9191; */
      --point: ${theme.point}; // 포인트 색
      --primary: ${theme.primary}; // 배경 바탕
      --background: ${theme.background}; // 디폴트(화이트)
      --text: ${theme.text}; // 디폴트(블랙)
      --border: ${theme.border}; // border 배경
      --grey: grey;

      /* 타입 */
      --type1: #949495; /* normal */
      --type2: #e09c40; /* fighting */
      --type3: #a2c3e7; /* flying */
      --type4: #735198; /* poison */
      --type5: #9c7743; /* ground */
      --type6: #bfb889; /* rock */
      --type7: #9fa244; /* bug */
      --type8: #684870; /* ghost */
      --type9: #69a9c7; /* steel */
      --type10: #e56c3e; /* fire */
      --type11: #2992ff; /* water */
      --type12: #66a945; /* grass */
      --type13: #fbb917; /* electric */
      --type14: #dd6b7b; /* psychic */
      --type15: #42d8ff; /* ice */
      --type16: #535ca8; /* dragon */
      --type17: #4c4948; /* dark */
      --type18: #dab4d4; /* fairy */
      --type19: #ffffff; /* unknown */
      --type20: #4c4948; /* shadow */
      --type100: grey; /* blank */

      /* 폰트 사이즈 */
      @media screen and (max-width: 600) {
        --fontLarge: 16px;
        --fontMedium: 14px;
      }
    }
  `;
};
