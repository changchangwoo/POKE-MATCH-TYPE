import { css } from "@emotion/react";
import { useContext, useMemo } from "react";
import { LanguageContext } from "@services/getInitialData";
import LogoBulbasaur from "@images/logo_bulbasar.webp";
import LogoCharmander from "@images/logo_charmander.webp";
import LogoSquirtle from "@images/logo_squirtle.webp";
import LogoPikachu from "@images/logo_pikachu.webp";

const LOGOS = [LogoBulbasaur, LogoCharmander, LogoSquirtle, LogoPikachu];

const MainTitle = () => {
  const { text } = useContext(LanguageContext);
  const randomLogos = useMemo(() => {
    const shuffled = [...LOGOS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div css={titleContainer}>
      <div css={textWrapper}>
        <h1 css={title}>{text.APP.TITLE}</h1>
        <h2 css={subtitle}>{text.MAIN.SEARCH.SUBTITLE}</h2>
      </div>
      <div css={logoWrapper}>
        {randomLogos.map((logoSrc, idx) => (
          <img key={`${logoSrc}-${idx}`} src={logoSrc} css={logo} alt="logo" />
        ))}
      </div>
    </div>
  );
};

const titleContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const title = css`
  font-size: var(--fontTitle);
  color: var(--text);
  margin: 0;
`;

const subtitle = css`
  font-size: var(--fontLarge);
  color: var(--type1);
  margin: 0;
`;

const logoWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  gap: 8px;
`;

const logo = css`
  width: 40px;
  height: 40px;
  object-fit: contain;
  position: relative;
  animation: logoHop 900ms ease-out 1;

  &:nth-of-type(2) {
    animation-delay: 120ms;
  }

  &:nth-of-type(3) {
    animation-delay: 240ms;
  }

  @keyframes logoHop {
    0% {
      top: 0;
    }
    30% {
      top: -12px;
    }
    60% {
      top: 0;
    }
    80% {
      top: -6px;
    }
    100% {
      top: 0;
    }
  }
`;

export default MainTitle;

