import { css } from '@emotion/react'
import React from 'react'

const SelectType = () => {
  return (
    <div css={selectTypeContainer}>
        <h1>타입 선택</h1>
        <div css={selectTypes}>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
            <div css={item}></div>
        </div>
    </div>
  )
}

const selectTypeContainer = css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
`

const selectTypes = css`
    display: grid;
    height: auto;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 5px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: white;
`

const item = css`
    background-color: var(--border);
    height: 25px;
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
export default SelectType