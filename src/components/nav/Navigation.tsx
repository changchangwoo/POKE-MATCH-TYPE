import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext, ThemeContext } from "@services/getInitialData";
import { LANGUAGE_TEXTS } from "@const/language_text";
import { LanguageType } from "@models/settingData";
import { overlayStyle } from "./NavigationStyles";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";

const ROUTES = ["/", "/type", "/table", "/quiz"] as const;

const Navigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLangOpen, setLangOpen] = useState<boolean>(false);
  const [isDrawerLangOpen, setDrawerLangOpen] = useState<boolean>(false);
  const { language, setLanguage, text, setText } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const langRef = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();
  const location = useLocation();

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const languageList = [
    { label: text.APP.LANGUAGE.DATA_KOR, type: "kor" as LanguageType },
    { label: text.APP.LANGUAGE.DATA_ENG, type: "eng" as LanguageType },
  ];

  const handleLanguageSelect = (type: LanguageType) => {
    setLanguage({ type });
    setText(LANGUAGE_TEXTS[type]);
    localStorage.setItem("language", type);
    setLangOpen(false);
    setDrawerLangOpen(false);
  };

  const handleThemeToggle = () => {
    const next =
      theme.type === "light"
        ? { name: "달의 돌", num: 2 as Number, type: "dark" as const }
        : { name: "태양의 돌", num: 1 as Number, type: "light" as const };
    setTheme(next);
    localStorage.setItem("theme", JSON.stringify(next));
  };

  const handleFeedbackClick = () => {
    window.open(
      "https://forms.gle/AYkAFR5kYKNVsQf19",
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/", label: text.APP.CHANGE_BUTTON.COMPARE_POKEMON },
    { path: "/type", label: text.APP.CHANGE_BUTTON.COMPARE_TYPE },
    { path: "/table", label: text.APP.CHANGE_BUTTON.COPATIBILITY_TABLE },
    { path: "/quiz", label: text.APP.CHANGE_BUTTON.COMPATIBILITY_QUIZ },
  ];

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeIndex = ROUTES.indexOf(
      location.pathname as (typeof ROUTES)[number],
    );
    if (activeIndex === -1) {
      indicator.style.opacity = "0";
      return;
    }

    const links = nav.querySelectorAll("a");
    const activeLink = links[activeIndex];
    if (!activeLink) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    indicator.style.opacity = "1";
  }, [location.pathname]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleDrawerNavigate = (path: string) => {
    navigator(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <DesktopNav
        navItems={navItems}
        currentPath={location.pathname}
        languageList={languageList}
        currentLanguage={language.type}
        theme={theme}
        isLangOpen={isLangOpen}
        onNavigate={navigator}
        onLanguageToggle={() => setLangOpen(!isLangOpen)}
        onLanguageSelect={handleLanguageSelect}
        onThemeToggle={handleThemeToggle}
        onFeedbackClick={handleFeedbackClick}
        onMenuToggle={() => setDrawerOpen(!isDrawerOpen)}
        navRef={navRef}
        indicatorRef={indicatorRef}
        langRef={langRef}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        navItems={navItems}
        currentPath={location.pathname}
        languageList={languageList}
        currentLanguage={language.type}
        theme={theme}
        isLangOpen={isDrawerLangOpen}
        appTitle={text.APP.TITLE}
        themeLightLabel={text.APP.THEME.DATA_SUN_STONE}
        themeDarkLabel={text.APP.THEME.DATA_MOON_STONE}
        feedbackLabel={text.APP.FEEDBACK}
        onNavigate={handleDrawerNavigate}
        onLanguageToggle={() => setDrawerLangOpen(!isDrawerLangOpen)}
        onLanguageSelect={handleLanguageSelect}
        onThemeToggle={handleThemeToggle}
        onFeedbackClick={handleFeedbackClick}
      />

      {isDrawerOpen && (
        <div css={overlayStyle} onClick={() => setDrawerOpen(false)} />
      )}
    </>
  );
};

export default Navigation;
