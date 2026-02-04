import { IoSettingsSharp, IoSunny, IoMoon, IoChevronDown } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SettingModal from "@components/modal/SettingModal";
import { LanguageContext, ThemeContext } from "@services/getInitialData";
import { LANGUAGE_TEXTS } from "@const/language_text";
import { LanguageType } from "@models/settingData";
import { navigationStyle, overlayStyle, drawerStyle } from "./NavigationStyles";

const ROUTES = ["/", "/type", "/table", "/quiz"] as const;

const Navigation = () => {
  const [isModal, setModal] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isLangOpen, setLangOpen] = useState<boolean>(false);
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

    const activeIndex = ROUTES.indexOf(location.pathname as typeof ROUTES[number]);
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
          {isDrawerOpen ? <HiX /> : <HiMenu />}
        </button>
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
              <span>{languageList.find((l) => l.type === language.type)?.label}</span>
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
              const next = theme.type === "light"
                ? { name: "달의 돌", num: 2 as Number, type: "dark" as const }
                : { name: "태양의 돌", num: 1 as Number, type: "light" as const };
              setTheme(next);
              localStorage.setItem("theme", JSON.stringify(next));
            }}
            aria-label="Toggle Theme"
          >
            {theme.type === "light" ? <IoSunny /> : <IoMoon />}
          </button>
          <button className="setting-btn" onClick={() => setModal(!isModal)}
            aria-label="SetModal">
            <IoSettingsSharp />
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div css={overlayStyle} onClick={() => setDrawerOpen(false)} />
      )}
      <aside css={drawerStyle(isDrawerOpen)}>
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
      </aside>

      {isModal && <SettingModal setModal={setModal} />}
    </>
  );
};

export default Navigation;
