import Logo from "@images/logo.webp";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main";
import Type from "@pages/Type";
import { css, Global } from "@emotion/react";
import {Footer, Navigation, RouteTracker } from "@components/nav";
import Table from "@pages/Table";
import Quiz from "@pages/Quiz";
import QuizHome from "@pages/QuizHome";
import { globalStyles } from "@styles/globalStyles";
import { useMemo, useState } from "react";
import { LanguageData, LanguageType, ThemeData } from "@models/settingData";
import {
  getInitialLanguage,
  getInitialTheme,
  LanguageContext,
  ThemeContext,
} from "@services/getInitialData";
import { LANGUAGE_TEXTS } from "@const/language_text";
import useDefaultSetting from "@hooks/useDefaultSetting";
import Error from "@pages/Error";

const IMAGE_LIST = [Logo] as const;

function App() {
  const [theme, setTheme] = useState<ThemeData>(getInitialTheme());
  const initialLanguage = getInitialLanguage();
  const [language, setLanguage] = useState<LanguageData>(initialLanguage);
  const [text, setText] = useState(
    LANGUAGE_TEXTS[initialLanguage.type as LanguageType],
  );

  useDefaultSetting(IMAGE_LIST);

  const languageContextValue = useMemo(
    () => ({ language, setLanguage, text, setText }),
    [language, text],
  );

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <>
      <Global styles={globalStyles(theme.type)} />
      <LanguageContext.Provider value={languageContextValue}>
        <div css={Layout}>
        <ThemeContext.Provider value={themeContextValue}>
          <Navigation />
        </ThemeContext.Provider>
        <div css={Container}>
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/type" element={<Type />} />
            <Route path="/table" element={<Table />} />
            <Route path="/quiz" element={<QuizHome />} />
            <Route path="/quiz/play" element={<Quiz />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        {/* <Footer/> */}
        </div>
      </LanguageContext.Provider>
    </>
  );
}
const Container = css`
  width: 100vw;
  max-width: 1405px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 60px 20px 20px 20px;
  }
`;

const Layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: auto;
    justify-content: flex-start;
  }
`
export default App;
