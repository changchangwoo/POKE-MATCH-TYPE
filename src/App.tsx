import Logo from "@images/logo.webp";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main";
import Type from "@pages/Type";
import { css, Global } from "@emotion/react";
import Navigation from "@components/nav/Navigation";
import ChangeButtons from "@components/nav/ChangeButtons";
import Table from "@pages/Table";
import Quiz from "@pages/Quiz";
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
import RouteTracker from "@components/nav/RouteTracker";
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
        <ThemeContext.Provider value={themeContextValue}>
          <Navigation />
        </ThemeContext.Provider>
        <div css={Container}>
          <ChangeButtons />
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/type" element={<Type />} />
            <Route path="/table" element={<Table />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </LanguageContext.Provider>
    </>
  );
}
const Container = css`
  width: 100vw;
  max-width: 800px;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;
export default App;
