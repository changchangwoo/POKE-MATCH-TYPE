import { css } from "@emotion/react";
import { IoSettingsSharp } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SettingModal from "@components/modal/SettingModal";
import { LanguageContext } from "@services/getInitialData";

const ROUTES = ["/", "/type", "/table", "/quiz"] as const;

const Navigation = () => {
  const [isModal, setModal] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { text } = useContext(LanguageContext);
  const navigator = useNavigate();
  const location = useLocation();

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

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
        <button className="setting-btn" onClick={() => setModal(!isModal)}
          aria-label="SetModal">
          <IoSettingsSharp />
        </button>
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

const navigationStyle = css`
  width: 100%;
  font-size: var(--fontLarge);
  /* background-color: var(--background); */
  border-bottom: 1px solid var(--border);
  height: 60px;
  display: flex;
  align-items: center;
  color: var(--background);
  position: absolute;
  box-sizing: border-box;
  padding: 0 20px;
  z-index: 10;

  .menu-btn {
    display: none;
    position: absolute;
    left: 20px;
    background: none;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
    margin: 0 auto;
    position: relative;
    height: 100%;
  }

  .nav-links a {
    font-size: var(--fontLarge);
    color: var(--text);
    cursor: pointer;
    white-space: nowrap;
    opacity: 0.7;
    transition: opacity 0.2s;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
    }
  }

  .indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: var(--point);
    border-radius: 3px 3px 0 0;
    transition: transform 0.3s ease, width 0.3s ease;
    opacity: 0;
  }

  .setting-btn {
    position: absolute;
    right: 20px;
    max-width: 25px;
    height: 25px;
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--point);
    background-color: var(--background);
    cursor: pointer;
    transition: background-color 0.2s;
    :hover {
      background-color: var(--border);
    }
  }

  @media (max-width: 768px) {
    .menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-links {
      display: none;
    }
  }
`;

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

const drawerStyle = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background-color: var(--background);
  z-index: 100;
  transform: translateX(${isOpen ? "0" : "-100%"});
  transition: transform 0.3s ease;
  box-shadow: ${isOpen ? "2px 0 12px rgba(0, 0, 0, 0.15)" : "none"};
  padding: 80px 0 0 0;
  box-sizing: border-box;

  .drawer-nav {
    display: flex;
    flex-direction: column;
  }

  .drawer-nav a {
    padding: 16px 24px;
    font-size: var(--fontLarge);
    color: var(--text);
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;
    border-left: 3px solid transparent;

    &:hover {
      background-color: var(--border);
    }

    &.active {
      background-color: var(--border);
      border-left-color: var(--point);
    }
  }
`;

export default Navigation;
