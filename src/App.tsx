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
import { TLanguageData, TThemeData } from "./models/settingData";
import {
  getInitialLanguage,
  getInitialTheme,
  LanguageContext,
  ThemeContext,
} from "./utils/getInitialData";

function App() {
  const [theme, setTheme] = useState<TThemeData>(getInitialTheme);
  const [language, setLanguage] = useState<TLanguageData>(getInitialLanguage);

  return (
    <>
      <Global styles={globalStyles(theme.type)} />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <Navigation />
        </LanguageContext.Provider>
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
