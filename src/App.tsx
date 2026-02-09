import Logo from "@images/logo.webp";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "@pages/Main";
import Type from "@pages/Type";
import { css, Global } from "@emotion/react";
import { Navigation, RouteTracker } from "@components/nav";
import Table from "@pages/Table";
import QuizSelectPage from "@pages/quiz/QuizSelectPage";
import QuizIntroPage from "@pages/quiz/QuizIntroPage";
import QuizPlayPage from "@pages/quiz/QuizPlayPage";
import QuizResultPage from "@pages/quiz/QuizResultPage";
import { globalStyles } from "@styles/globalStyles";
import { useEffect, useMemo, useState } from "react";
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
import MainTitle from "@components/mainTitle";

const IMAGE_LIST = [Logo] as const;
const SITE_ORIGIN = "https://poke-match-type.site";
const DEFAULT_IMAGE_URL = `${SITE_ORIGIN}/favicon.ico`;

type SeoData = {
  title: string;
  description: string;
  h1: string;
  robots: string;
  canonicalPath: string;
};

const upsertMetaTag = (
  attributeName: "name" | "property",
  key: string,
  content: string,
) => {
  const selector = `meta[${attributeName}="${key}"]`;
  let metaTag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute(attributeName, key);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute("content", content);
};

const upsertCanonicalLink = (canonicalUrl: string) => {
  let canonical = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", canonicalUrl);
};

const getSeoData = (pathname: string, languageType: LanguageType): SeoData => {
  const isKorean = languageType === "kor";
  const quizPathMatch = pathname.match(/^\/quiz\/(\d+)\/(intro|play|result)$/);

  if (pathname === "/") {
    return {
      title: isKorean
        ? "포켓몬 상성 계산기 | 포켓몬 타입별 상성 계산"
        : "Pokemon Type Calculator | Pokemon Type Matchup Tool",
      description: isKorean
        ? "포켓몬 이름 검색으로 타입 상성을 빠르게 확인하는 포켓몬 상성 계산기."
        : "Quickly check Pokemon type matchups with a beginner-friendly Pokemon type calculator.",
      h1: isKorean ? "포켓몬 상성 계산기" : "Pokemon Type Calculator",
      robots: "index, follow",
      canonicalPath: "/",
    };
  }

  if (pathname === "/type") {
    return {
      title: isKorean
        ? "타입 상성 비교 | 포켓몬 상성 계산기"
        : "Type Matchup Compare | Pokemon Type Calculator",
      description: isKorean
        ? "두 타입을 직접 선택해 공격·방어 상성을 비교해 보세요."
        : "Select one or two types and compare attack and defense effectiveness.",
      h1: isKorean ? "포켓몬 타입 상성 비교" : "Pokemon Type Matchup Compare",
      robots: "index, follow",
      canonicalPath: "/type",
    };
  }

  if (pathname === "/table") {
    return {
      title: isKorean
        ? "포켓몬 타입 상성표 | 포켓몬 상성 계산기"
        : "Pokemon Type Chart | Pokemon Type Calculator",
      description: isKorean
        ? "포켓몬 18개 타입 상성표를 한눈에 확인하고 약점과 반감을 빠르게 찾으세요."
        : "View the full 18-type matchup chart and quickly find strengths and weaknesses.",
      h1: isKorean ? "포켓몬 타입 상성표" : "Pokemon Type Matchup Table",
      robots: "index, follow",
      canonicalPath: "/table",
    };
  }

  if (pathname === "/quiz") {
    return {
      title: isKorean
        ? "포켓몬 상성 퀴즈 | 포켓몬 상성 계산기"
        : "Pokemon Type Quiz | Pokemon Type Calculator",
      description: isKorean
        ? "포켓몬 상성 퀴즈로 타입 지식을 점검하고 실전 감각을 높여보세요."
        : "Test and improve your type matchup knowledge with interactive Pokemon quizzes.",
      h1: isKorean ? "포켓몬 상성 퀴즈" : "Pokemon Type Quiz",
      robots: "index, follow",
      canonicalPath: "/quiz",
    };
  }

  if (quizPathMatch) {
    const [, quizId, quizStep] = quizPathMatch;
    const isIndexable = quizStep === "intro";

    return {
      title: isKorean
        ? `${quizId}번 퀴즈 ${quizStep} | 포켓몬 상성 계산기`
        : `Quiz ${quizId} ${quizStep} | Pokemon Type Calculator`,
      description: isKorean
        ? "퀴즈 진행 페이지입니다."
        : "Pokemon quiz flow page.",
      h1: isKorean ? `포켓몬 상성 퀴즈 ${quizId}` : `Pokemon Type Quiz ${quizId}`,
      robots: isIndexable ? "noindex, follow" : "noindex, nofollow",
      canonicalPath: pathname,
    };
  }

  return {
    title: isKorean
      ? "404 페이지 | 포켓몬 상성 계산기"
      : "404 Page | Pokemon Type Calculator",
    description: isKorean
      ? "요청하신 페이지를 찾을 수 없습니다."
      : "The page you requested could not be found.",
    h1: isKorean ? "페이지를 찾을 수 없습니다" : "Page Not Found",
    robots: "noindex, nofollow",
    canonicalPath: pathname,
  };
};

const applySeoData = (seoData: SeoData, languageType: LanguageType) => {
  const canonicalUrl = `${SITE_ORIGIN}${seoData.canonicalPath}`;

  document.title = seoData.title;
  document.documentElement.lang = languageType === "kor" ? "ko" : "en";

  upsertMetaTag("name", "description", seoData.description);
  upsertMetaTag("name", "robots", seoData.robots);
  upsertMetaTag("property", "og:type", "website");
  upsertMetaTag("property", "og:site_name", "Pokemon Type Calculator");
  upsertMetaTag(
    "property",
    "og:locale",
    languageType === "kor" ? "ko_KR" : "en_US",
  );
  upsertMetaTag("property", "og:title", seoData.title);
  upsertMetaTag("property", "og:description", seoData.description);
  upsertMetaTag("property", "og:url", canonicalUrl);
  upsertMetaTag("property", "og:image", DEFAULT_IMAGE_URL);
  upsertMetaTag("name", "twitter:card", "summary");
  upsertMetaTag("name", "twitter:title", seoData.title);
  upsertMetaTag("name", "twitter:description", seoData.description);
  upsertMetaTag("name", "twitter:image", DEFAULT_IMAGE_URL);
  upsertCanonicalLink(canonicalUrl);
};

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
  const { pathname } = useLocation();
  const isTablePage = pathname === "/table";
  const isQuizSubPage = /^\/quiz\/\d+\//.test(pathname);
  const seoData = useMemo(
    () => getSeoData(pathname, language.type as LanguageType),
    [pathname, language.type],
  );

  useEffect(() => {
    applySeoData(seoData, language.type as LanguageType);
  }, [seoData, language.type]);

  return (
    <>
      <Global styles={globalStyles(theme.type)} />
      <LanguageContext.Provider value={languageContextValue}>
        <div css={Layout}>
          <ThemeContext.Provider value={themeContextValue}>
            <Navigation />
          </ThemeContext.Provider>
          <div css={container(isTablePage)}>
            <RouteTracker />
            <h1 css={visuallyHiddenHeading}>{seoData.h1}</h1>
            {!isQuizSubPage && <MainTitle />}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/type" element={<Type />} />
              <Route path="/table" element={<Table />} />
              <Route path="/quiz" element={<QuizSelectPage />} />
              <Route path="/quiz/:id/intro" element={<QuizIntroPage />} />
              <Route path="/quiz/:id/play" element={<QuizPlayPage />} />
              <Route path="/quiz/:id/result" element={<QuizResultPage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          {/* <Footer/> */}
        </div>
      </LanguageContext.Provider>
    </>
  );
}
const container = (isWide: boolean) => css`
  width: 100vw;
  max-width: ${isWide ? "1420px" : "1240px"};
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0px 20px 20px 20px;
  }
`;

const Layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  justify-content: flex-start;
`;

const visuallyHiddenHeading = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default App;
