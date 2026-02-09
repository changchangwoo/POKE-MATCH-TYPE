import { createContext, Dispatch, SetStateAction } from "react";
import {
  LanguageData,
  LanguageType,
  ThemeData,
} from "@models/settingData";
import { LANGUAGE_TEXTS } from "@const/language_text";

type ThemeContextType = {
  theme: ThemeData;
  setTheme: Dispatch<SetStateAction<ThemeData>>;
};

type LanguageContextType = {
  language: LanguageData;
  setLanguage: Dispatch<SetStateAction<LanguageData>>;
  text: any;
  setText: Dispatch<SetStateAction<any>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: {
    name: "태양의 돌",
    num: 1,
    type: "light",
  },
  setTheme: () => {},
});

export const LanguageContext = createContext<LanguageContextType>({
  language: {
    type: "kor",
  },
  setLanguage: () => {},
  text: LANGUAGE_TEXTS.kor,
  setText: () => {},
});

export const getInitialTheme = (): ThemeData => {
  const sessionTheme = localStorage.getItem("theme");
  if (sessionTheme) {
    try {
      return JSON.parse(sessionTheme) as ThemeData;
    } catch {
      return {
        name: "태양의 돌",
        num: 1,
        type: "light",
      };
    }
  }
  return {
    name: "달의 돌",
    num: 2,
    type: "dark",
  };
};
export const getInitialLanguage = (): LanguageData => {
  const sessionLanguage = localStorage.getItem("language") as LanguageType;

  if (sessionLanguage) {
    return { type: sessionLanguage };
  }

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ko")) {
    return { type: "kor" };
  }

  return { type: "eng" };
};
