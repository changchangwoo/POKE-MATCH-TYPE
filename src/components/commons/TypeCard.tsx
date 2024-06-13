import { css } from '@emotion/react'
import React from 'react'

const TypeCard = () => {
  return (
    <div css={typeCardContainer}>
        <div css={typeSection}>
            <div css={title}>데미지x2</div>
            <div css={typeSection}></div>
        </div> 
        <div css={typeSection}>
            <div css={title}>데미지x1</div>
            <div css={typeSection}></div>
        </div> 
        <div css={typeSection}>
            <div css={title}>데미지x0.5</div>
            <div css={typeSection}></div>
        </div> 
    </div>
  )
}

const typeCardContainer = css`
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid var(--border);
    border-radius: 8px;
`

const title = css`
margin-bottom: 10px;
   
`
const typeSection = css`
height: 100px;
    
`

export default TypeCard