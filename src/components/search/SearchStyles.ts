import { css } from "@emotion/react";

export const searchContainer = css`
  width: 100%;
  height: auto;
  position: relative;
`;

export const inputBox = css`
  position: relative;
  background-color: var(--background);
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;

  svg {
    fill: grey;
    font-size: var(--fontMedium);
  }

  input {
    flex: 1;
    font-size: var(--fontMedium);
    background-color: var(--background);
    color: var(--text);
  }
`;

export const suggestionsList = css`
  position: absolute;
  top: 50px;
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
