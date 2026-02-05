import { IoSunny, IoMoon, IoChevronDown, IoHelpCircle } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext, ThemeContext } from "@services/getInitialData";
import { LANGUAGE_TEXTS } from "@const/language_text";
import { LanguageType } from "@models/settingData";
import { navigationStyle, overlayStyle, drawerStyle } from "./NavigationStyles";
import logo from "@images/logo.webp";

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
      <div css={navigationStyle}>
        <button
          className="menu-btn"
          onClick={() => setDrawerOpen(!isDrawerOpen)}
          aria-label="Menu"
        >
          <HiMenu />
        </button>
        <img src={logo} alt="Logo" className="mobile-logo" />
        <nav className="nav-links" ref={navRef}>
          {navItems.map(({ path, label }) => (
            <a
              key={path}
              onClick={() => navigator(path)}
              className={location.pathname === path ? "active" : ""}
            >
              {label}
            </a>
          ))}
          <div className="indicator" ref={indicatorRef} />
        </nav>
        <div className="nav-actions">
          <div className="lang-dropdown" ref={langRef}>
            <button
              className={`lang-dropdown-toggle${isLangOpen ? " open" : ""}`}
              onClick={() => setLangOpen(!isLangOpen)}
              aria-label="Select Language"
            >
              <span>
                {languageList.find((l) => l.type === language.type)?.label}
              </span>
              <IoChevronDown size={12} />
            </button>
            {isLangOpen && (
              <ul className="lang-dropdown-menu">
                {languageList.map((item) => (
                  <li
                    key={item.type}
                    className={language.type === item.type ? "selected" : ""}
                    onClick={() => handleLanguageSelect(item.type)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="theme-btn"
            onClick={() => {
              const next =
                theme.type === "light"
                  ? { name: "달의 돌", num: 2 as Number, type: "dark" as const }
                  : {
                      name: "태양의 돌",
                      num: 1 as Number,
                      type: "light" as const,
                    };
              setTheme(next);
              localStorage.setItem("theme", JSON.stringify(next));
            }}
            aria-label="Toggle Theme"
          >
            {theme.type === "light" ? <IoSunny /> : <IoMoon />}
          </button>
          <button
            className="inquiry-btn"
            onClick={() =>
              window.open(
                "https://forms.gle/AYkAFR5kYKNVsQf19",
                "_blank",
                "noopener,noreferrer",
              )
            }
            aria-label="Inquiry"
          >
            <IoHelpCircle />
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div css={overlayStyle} onClick={() => setDrawerOpen(false)} />
      )}
      <aside css={drawerStyle(isDrawerOpen)}>
        <div className="drawer-header">
          <img src={logo} alt="Logo" className="drawer-logo" />
          <h2>{text.APP.TITLE}</h2>
        </div>
        <nav className="drawer-nav">
          {navItems.map(({ path, label }) => (
            <a
              key={path}
              onClick={() => handleDrawerNavigate(path)}
              className={location.pathname === path ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="drawer-divider" />
        <div className="drawer-actions">
          <div className="drawer-lang-accordion">
            <button
              className="drawer-action-btn"
              onClick={() => setDrawerLangOpen(!isDrawerLangOpen)}
            >
              <IoChevronDown className={isDrawerLangOpen ? "rotated" : ""} />
              <span>{languageList.find((l) => l.type === language.type)?.label}</span>
            </button>
            <div className={`drawer-lang-list${isDrawerLangOpen ? " open" : ""}`}>
              {languageList.map((item) => (
                <button
                  key={item.type}
                  className={`drawer-lang-item${language.type === item.type ? " active" : ""}`}
                  onClick={() => {
                    handleLanguageSelect(item.type);
                    setDrawerLangOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button
            className="drawer-action-btn"
            onClick={() => {
              const next =
                theme.type === "light"
                  ? { name: "달의 돌", num: 2 as Number, type: "dark" as const }
                  : {
                      name: "태양의 돌",
                      num: 1 as Number,
                      type: "light" as const,
                    };
              setTheme(next);
              localStorage.setItem("theme", JSON.stringify(next));
            }}
          >
            {theme.type === "light" ? <IoSunny /> : <IoMoon />}
            <span>
              {theme.type === "light"
                ? text.APP.THEME.DATA_SUN_STONE
                : text.APP.THEME.DATA_MOON_STONE}
            </span>
          </button>
          <button
            className="drawer-action-btn"
            onClick={() =>
              window.open(
                "https://forms.gle/AYkAFR5kYKNVsQf19",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <IoHelpCircle />
            <span>{text.APP.FEEDBACK}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
