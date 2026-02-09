import { css } from "@emotion/react";
import { mainContainer } from "@components/match/MatchMain";

export const MatchMainSkeleton = () => {
  return (
    <div css={mainContainer}>
      <div css={matchCardContainerSkeleton}>
        <div className="dummy_titleBox"/>
        <div className="dummy_imgBox" />
        <div className="dummy_nameBox" />
        <div className="dummy_formBox" />
        <div className="dummy_abilityBox" />
      </div>
      <div css={typeCardContainerSkeleton}>
        <div className="dummy_typeBox"/>
        <div className="dummy_typeBox"/>
        <div className="dummy_typeBox"/>
        <div className="dummy_typeBox"/>
        </div>
    </div>
  );
};

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

export const matchCardContainerSkeleton = css`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  background-color: var(--background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 510px;
  .dummy_titleBox {
  
    width: 30%;
    height: 30px;
    background-color: var(--primary);
    border-radius: 8px;
    box-sizing: border-box;

  }

  .dummy_imgBox {
  
    width: 100%;
    height: 200px;
    background-color: var(--skeleton);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }

  .dummy_nameBox {
  
    width: 180px;
    height: 40px;
    background-color: var(--skeleton);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }
  .dummy_formBox {
  
    width: 60%;
    height: 40px;
    background-color: var(--skeleton);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }
  .dummy_abilityBox {
  
    width: 90%;
    height: 50px;
    background-color: var(--skeleton);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }

    .dummy_titleBox,
  .dummy_imgBox,
  .dummy_nameBox,
  .dummy_formBox,
  .dummy_abilityBox {
    background-color: var(--skeleton);
    ${shimmer};
  }
`;

const typeCardContainerSkeleton = css`
  width: 100%;
  background-color: var(--background);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  gap: 20px;
  min-height: 300px;

  .dummy_typeBox {
  width: 100%;
  height: 50px;
    background-color: var(--skeleton);
      

  /* padding: 20px; */
  box-sizing: border-box;
  border-radius: 8px;
    ${shimmer};

  }
`;

