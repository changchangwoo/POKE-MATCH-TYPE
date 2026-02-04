import { css } from "@emotion/react";

export const searchContainer = css`
  width: 100%;
  height: auto;
`;

export const searchHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 50px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .logo-wrapper {
    width: 50px;
    height: 50px;
    background-color: var(--point);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  h1 {
    font-size: var(--fontTitle);
    color: var(--text);
    margin: 0;
  }

  h2 {
    font-size: var(--fontLarge);
    color: var(--type1);
    margin: 0;
    font-weight: normal;
  }
`;

export const inputWrapper = css`
  position: relative;
  width: 100%;
`;

export const inputBox = css`
  position: relative;
  background-color: var(--background);
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 2px solid var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  cursor: text;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--point);

    svg {
      fill: var(--point);
    }
  }

  svg {
    fill: grey;
    font-size: var(--fontMedium);
    flex-shrink: 0;
    transition: fill 0.2s;
  }

  input {
    flex: 1;
    font-size: var(--fontLarge);
    background-color: var(--background);
    color: var(--text);
    padding: 20px 0;
    height: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
`;

export const suggestionsList = css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  color: var(--text);
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid var(--border);
  background-color: var(--background);
  border-radius: 16px;
  list-style-type: none;
  margin: 0;
  overflow-y: auto;
  max-height: 300px;

  li {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: color-mix(in srgb, var(--point) 15%, transparent);
      color: var(--point);
    }
  }
`;

export const activeSuggestion = css`
  background-color: color-mix(in srgb, var(--point) 15%, transparent);
  color: var(--point);
`;

export const recentSearchContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const recentSearchLabel = css`
  font-size: var(--fontSmall);
  color: var(--type1);
  flex-shrink: 0;
`;

export const recentSearchChip = css`
  font-size: var(--fontSmall);
  color: var(--text);
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 4px 12px;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: var(--point);
    color: var(--point);
  }
`;
