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
    right: 20px;
    background: none;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
  }

  .mobile-logo {
    display: none;
    position: absolute;
    left: 20px;
    height: 40px;
    width: auto;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
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
          color: var(--point);

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

    .mobile-logo {
      display: block;
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
  right: 0;
  width: 260px;
  height: 100%;
  background-color: var(--background);
  z-index: 100;
  transform: translateX(${isOpen ? "0" : "100%"});
  transition: transform 0.3s ease;
  box-shadow: ${isOpen ? "-2px 0 12px rgba(0, 0, 0, 0.15)" : "none"};
  padding: 0;
  box-sizing: border-box;

  .drawer-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    box-sizing: border-box;

    .drawer-logo {
      height: 40px;
      width: auto;
    }

    h2 {
      margin: 0;
      font-size: var(--fontLarge);
      color: var(--text);
      font-weight: 600;
    }
  }

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
    border-right: 3px solid transparent;

    &:hover {
      background-color: var(--border);
    }

    &.active {
      background-color: var(--border);
      border-right-color: var(--point);
    }
  }

  .drawer-divider {
    height: 1px;
    background-color: var(--border);
    margin: 8px 0;
  }

  .drawer-actions {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
  }

  .drawer-lang-accordion {
    display: flex;
    flex-direction: column;
  }

  .drawer-action-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    font-size: var(--fontLarge);
    color: var(--text);
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;
    border-right: 3px solid transparent;
    width: 100%;
    box-sizing: border-box;

    svg {
      font-size: 20px;
      color: var(--point);
      flex-shrink: 0;
      transition: transform 0.2s;

      &.rotated {
        transform: rotate(180deg);
      }
    }

    span {
      flex: 1;
      text-align: left;
    }

    .current-lang {
      flex: 0;
      font-size: var(--fontSmall);
      opacity: 0.7;
      text-align: right;
    }

    &:hover {
      background-color: var(--border);
    }
  }

  .drawer-lang-list {
    display: flex;
    flex-direction: column;
    background-color: color-mix(in srgb, var(--border) 30%, transparent);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    transition-property: max-height, opacity, border-top-color, border-bottom-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    &.open {
      max-height: 300px;
      opacity: 1;
      border-top-color: var(--border);
      border-bottom-color: var(--border);
    }
  }

  .drawer-lang-item {
    padding: 12px 24px 12px 56px;
    font-size: var(--fontLarge);
    color: var(--text);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s;
    border-right: 3px solid transparent;

    &:hover {
      background-color: var(--border);
    }

    &.active {
      color: var(--point);
      background-color: color-mix(in srgb, var(--point) 10%, transparent);
      border-right-color: var(--point);
    }
  }
`;
