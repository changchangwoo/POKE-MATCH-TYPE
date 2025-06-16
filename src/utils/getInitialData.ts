import { createContext, Dispatch, SetStateAction } from "react";
import {
  TLanguageData,
  TLanguageType,
  TThemeData,
} from "../models/settingData";
import { LANGUAGE_TEXTS } from "../const/language_text";

type TThemeContext = {
  theme: TThemeData;
  setTheme: Dispatch<SetStateAction<TThemeData>>;
};

type TLanguageContext = {
  language: TLanguageData;
  setLanguage: Dispatch<SetStateAction<TLanguageData>>;
  text: any;
  setText: Dispatch<SetStateAction<any>>;
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
    type: "kor",
  },
  setLanguage: () => {},
  text: LANGUAGE_TEXTS.kor,
  setText: () => {},
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
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    return {
      name: "달의 돌",
      num: 2,
      type: "dark",
    };
  } else {
    return {
      name: "태양의 돌",
      num: 1,
      type: "light",
    };
  }
};
export const getInitialLanguage = (): TLanguageData => {
  const sessionLanguage = localStorage.getItem("language") as TLanguageType;

  if (sessionLanguage) {
    return { type: sessionLanguage };
  }

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ko")) {
    return { type: "kor" };
  }

  return { type: "eng" };
};
