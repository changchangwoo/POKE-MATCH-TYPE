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
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 700px;

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
      color: var(--black);
    }
  }
`;

export const activeSuggestion = css`
  background-color: #f0f0f0;
  color: var(--black);
`;
