import { css } from "@emotion/react";

export const navigationStyle = css`
  width: 100%;
  font-size: var(--fontLarge);
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

  .nav-actions {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lang-dropdown {
    position: relative;
    width: 110px;
  }

  .lang-dropdown-toggle {
    width: 100%;
    height: 36px;
    font-size: var(--fontSmall);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: var(--text);
    background-color: var(--background);
    cursor: pointer;
    transition: background-color 0.2s;
    box-sizing: border-box;

    svg {
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    &.open svg {
      transform: rotate(180deg);
    }

    :hover {
      background-color: var(--border);
    }
  }

  .lang-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    z-index: 20;
    list-style: none;
    margin: 0;
    padding: 4px 0;

    li {
      font-size: var(--fontSmall);
      color: var(--text);
      padding: 8px 10px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: color-mix(in srgb, var(--point) 15%, transparent);
        color: var(--point);
      }

      &.selected {
        color: var(--point);
      }
    }
  }

  .theme-btn,
  .inquiry-btn {
    max-width: 36px;
    height: 36px;
    font-size: 18px;
    border: 1px solid var(--border);
    border-radius: 8px;
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

    .theme-btn,
    .inquiry-btn,
    .lang-dropdown {
      display: none;
    }
  }
`;

export const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

export const drawerStyle = (isOpen: boolean) => css`
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
