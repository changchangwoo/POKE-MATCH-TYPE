/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangeButtons = () => {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div css={ChangeSectionContainer(location.pathname)}>
      <button onClick={() => navigator('/')} className={location.pathname === '/' ? 'active' : ''}>
        포켓몬으로 비교
      </button>
      <button onClick={() => navigator('/type')} className={location.pathname === '/type' ? 'active' : ''}>
        타입으로 비교
      </button>
    </div>
  );
};

const ChangeSectionContainer = (pathname: string) => css`
  padding-top: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  button {
    flex: 1;
    height: 40px;
    max-width: 300px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    font-size: var(--fontMedium);
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 6px;

    :hover {
      background-color: var(--point);
    }

    &.active {
      background-color: var(--point);
      color:#ffffff;
    }
  }
`;

export default ChangeButtons;
