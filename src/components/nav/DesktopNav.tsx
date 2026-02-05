import { IoSunny, IoMoon, IoChevronDown, IoHelpCircle } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { RefObject } from "react";
import { LanguageType, ThemeData } from "@models/settingData";
import { navigationStyle } from "./NavigationStyles";
import logo from "@images/logo.webp";

interface DesktopNavProps {
  navItems: { path: string; label: string }[];
  currentPath: string;
  languageList: { label: string; type: LanguageType }[];
  currentLanguage: LanguageType;
  theme: ThemeData;
  isLangOpen: boolean;
  onNavigate: (path: string) => void;
  onLanguageToggle: () => void;
  onLanguageSelect: (type: LanguageType) => void;
  onThemeToggle: () => void;
  onFeedbackClick: () => void;
  onMenuToggle: () => void;
  navRef: RefObject<HTMLElement>;
  indicatorRef: RefObject<HTMLDivElement>;
  langRef: RefObject<HTMLDivElement>;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  currentPath,
  languageList,
  currentLanguage,
  theme,
  isLangOpen,
  onNavigate,
  onLanguageToggle,
  onLanguageSelect,
  onThemeToggle,
  onFeedbackClick,
  onMenuToggle,
  navRef,
  indicatorRef,
  langRef,
}) => {
  return (
    <div css={navigationStyle}>
      <button
        className="menu-btn"
        onClick={onMenuToggle}
        aria-label="Menu"
      >
        <HiMenu />
      </button>
      <img src={logo} alt="Logo" className="mobile-logo" />
      <nav className="nav-links" ref={navRef}>
        {navItems.map(({ path, label }) => (
          <a
            key={path}
            onClick={() => onNavigate(path)}
            className={currentPath === path ? "active" : ""}
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
            onClick={onLanguageToggle}
            aria-label="Select Language"
          >
            <span>
              {languageList.find((l) => l.type === currentLanguage)?.label}
            </span>
            <IoChevronDown size={12} />
          </button>
          {isLangOpen && (
            <ul className="lang-dropdown-menu">
              {languageList.map((item) => (
                <li
                  key={item.type}
                  className={currentLanguage === item.type ? "selected" : ""}
                  onClick={() => onLanguageSelect(item.type)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="theme-btn"
          onClick={onThemeToggle}
          aria-label="Toggle Theme"
        >
          {theme.type === "light" ? <IoSunny /> : <IoMoon />}
        </button>

        <button
          className="inquiry-btn"
          onClick={onFeedbackClick}
          aria-label="Inquiry"
        >
          <IoHelpCircle />
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
