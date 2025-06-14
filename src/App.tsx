import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Match from "./pages/Match";
import { css, Global } from "@emotion/react";
import Navigation from "./components/nav/Navigation";
import ChangeButtons from "./components/nav/ChangeButtons";
import Table from "./pages/Table";
import Quiz from "./pages/Quiz";
import { globalStyles } from "./styles/globalStyles";
import { useState } from "react";
import { TLanguageData, TLanguageType, TThemeData } from "./models/settingData";
import {
  getInitialLanguage,
  getInitialTheme,
  LanguageContext,
  ThemeContext,
} from "./utils/getInitialData";
import { LANGUAGE_TEXTS } from "./const/language_text";

function App() {
  const [theme, setTheme] = useState<TThemeData>(getInitialTheme());
  const initialLanguage = getInitialLanguage();
  const [language, setLanguage] = useState<TLanguageData>(initialLanguage);
  const [text, setText] = useState(LANGUAGE_TEXTS[initialLanguage.type  as TLanguageType]);

  return (
    <>
      <Global styles={globalStyles(theme.type)} />
      <LanguageContext.Provider
        value={{ language, setLanguage, text, setText }}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Navigation />
        </ThemeContext.Provider>
        <div css={Container}>
          <ChangeButtons />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/type" element={<Match />} />
            <Route path="/table" element={<Table />} />
            <Route path="/quiz" element={<Quiz />} />
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
