import { IoSunny, IoMoon, IoChevronDown, IoHelpCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { LanguageType, ThemeData } from "@models/settingData";
import { drawerStyle } from "./NavigationStyles";
import logo from "@images/logo.webp";

interface MobileDrawerProps {
  isOpen: boolean;
  navItems: { path: string; label: string }[];
  languageList: { label: string; type: LanguageType }[];
  currentLanguage: LanguageType;
  theme: ThemeData;
  isLangOpen: boolean;
  appTitle: string;
  themeLightLabel: string;
  themeDarkLabel: string;
  feedbackLabel: string;
  onLinkClick: () => void;
  onLanguageToggle: () => void;
  onLanguageSelect: (type: LanguageType) => void;
  onThemeToggle: () => void;
  onFeedbackClick: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  navItems,
  languageList,
  currentLanguage,
  theme,
  isLangOpen,
  appTitle,
  themeLightLabel,
  themeDarkLabel,
  feedbackLabel,
  onLinkClick,
  onLanguageToggle,
  onLanguageSelect,
  onThemeToggle,
  onFeedbackClick,
}) => {
  return (
    <aside css={drawerStyle(isOpen)}>
      <div className="drawer-header">
        <img src={logo} alt="Logo" className="drawer-logo" />
        <h2>{appTitle}</h2>
      </div>

      <nav className="drawer-nav">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="drawer-divider" />

      <div className="drawer-actions">
        <div className="drawer-lang-accordion">
          <button className="drawer-action-btn" onClick={onLanguageToggle}>
            <IoChevronDown className={isLangOpen ? "rotated" : ""} />
            <span>
              {languageList.find((l) => l.type === currentLanguage)?.label}
            </span>
          </button>
          <div className={`drawer-lang-list${isLangOpen ? " open" : ""}`}>
            {languageList.map((item) => (
              <button
                key={item.type}
                className={`drawer-lang-item${currentLanguage === item.type ? " active" : ""}`}
                onClick={() => onLanguageSelect(item.type)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button className="drawer-action-btn" onClick={onThemeToggle}>
          {theme.type === "light" ? <IoSunny /> : <IoMoon />}
          <span>
            {theme.type === "light" ? themeLightLabel : themeDarkLabel}
          </span>
        </button>

        <button className="drawer-action-btn" onClick={onFeedbackClick}>
          <IoHelpCircle />
          <span>{feedbackLabel}</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileDrawer;
