import { css } from "@emotion/react";

export const searchContainer = css`
  width: 100%;
  position: relative;
`;

export const inputBox = css`
  background-color: #ffffff;
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
  }
`;

export const suggestionsList = css`
  position: absolute;
  top: 60px;
  width: 100%;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const activeSuggestion = css`
  background-color: #f0f0f0;
`;
