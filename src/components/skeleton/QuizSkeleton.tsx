import { css } from '@emotion/react'

export const QuizType0Skeleton = () => {
  return (
    <div css={quizType0_SkeletionStyle} role="status" aria-busy="true" aria-label="Loading">
    <div className='title'/>
    <div className='dummy_imgBox'/>
    <div className='dummy_typeBox'/>
    <div className='dummy_selectBox'/>
    </div>
  )
}

 const shimmer = css`
  background: linear-gradient(
    90deg,
    var(--skeleton) 0%,
    var(--background) 30%,
    var(--skeleton) 80%
  );
  background-size: 200% 50%;
  animation: shimmer 2.3s infinite ease-in-out;
  border-radius: 8px;

  @keyframes shimmer {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
`

const quizType0_SkeletionStyle = css`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;

  .title {
  width: 30%;
  height: 40px;
  background-color: var(--skeleton);
  border-radius: 8px;
  }

  .dummy_imgBox {
    ${shimmer}
    width: 100%;
    height: 200px;
    background-color: var(--skeleton);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }

  .dummy_typeBox {
    ${shimmer}
    width: 20%;
    height: 30px;
    background-color: var(--skeleton);
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .dummy_selectBox {
    ${shimmer}
    width: 100%;
    height: 80px;
    background-color: var(--skeleton);
    border-radius: 8px;  }



  
`


