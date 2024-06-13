import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom';

const ChangeButtons = () => {
  const navigator = useNavigate();

  return (
    <div css={ChangeSectionContainer}>
      <button onClick={()=>navigator('/')}>
        포켓몬으로 비교
      </button>
      <button onClick={()=>navigator('/type')}>
        타입으로 비교
      </button>
    </div>
  )
}

const ChangeSectionContainer = css`
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
  }
`;
export default ChangeButtons