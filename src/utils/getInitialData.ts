import { createContext, Dispatch, SetStateAction } from "react";
import { TLanguageData, TThemeData } from "../models/settingData";

type TThemeContext = {
  theme: TThemeData;
  setTheme: Dispatch<SetStateAction<TThemeData>>;
};

type TLanguageContext = {
  language: TLanguageData;
  setLanguage: Dispatch<SetStateAction<TLanguageData>>;
};

export const ThemeContext = createContext<TThemeContext>({
  theme: {
    name: "태양의 돌",
    num: 1,
    type: "light",
  },
  setTheme: () => {},
});

export const LanguageContext = createContext<TLanguageContext>({
  language: {
    label: "한국어",
    type: "kor",
  },
  setLanguage: () => {},
});

export const getInitialTheme = (): TThemeData => {
  const sessionTheme = localStorage.getItem("theme");
  if (sessionTheme) {
    try {
      return JSON.parse(sessionTheme) as TThemeData;
    } catch {
      return {
        name: "태양의 돌",
        num: 1,
        type: "light",
      };
    }
  }

  return {
    name: "태양의 돌",
    num: 1,
    type: "light",
  };
};
export const getInitialLanguage = (): TLanguageData => {
  const sessionTheme = localStorage.getItem("language");
  if (sessionTheme) {
    try {
      return JSON.parse(sessionTheme) as TLanguageData;
    } catch {
      return {
        label: "한국어",
        type: "kor",
      };
    }
  }

  return {
    label: "한국어",
    type: "kor",
  };
};
