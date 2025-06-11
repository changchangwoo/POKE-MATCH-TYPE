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
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TThemeData } from "./models/settingData";

type TThemeContext = {
  theme: TThemeData;
  setTheme: Dispatch<SetStateAction<TThemeData>>;
};

export const ThemeContext = createContext<TThemeContext>({
  theme: {
    name: "태양의 돌",
    num: 1,
    type: "light",
  },
  setTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState<TThemeData>({
    name: "태양의 돌",
    num: 1,
    type: "light",
  });
  return (
    <>
      <Global styles={globalStyles(theme.type)} />
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
