import { css } from "@emotion/react";
import { useContext } from "react";
import { LanguageContext } from "@services/getInitialData";

const Footer = () => {
  const { text } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer css={footerContainer}>
      <div css={footerContent}>
        <p css={copyright}>
          © {currentYear} {text.FOOTER.COPYRIGHT}
        </p>
        <p css={disclaimer}>{text.FOOTER.DISCLAIMER}</p>
      </div>
    </footer>
  );
};

const footerContainer = css`
  width: 100%;
  margin-top: auto;
  padding: 10px 20px 20px 10px;
`;

const footerContent = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const copyright = css`
  font-size: 14px;
  color: var(--text);
  opacity: 0.7;
  margin: 0;
`;

const disclaimer = css`
  font-size: 12px;
  color: var(--text);
  opacity: 0.5;
  margin: 0;
  text-align: center;
`;

export default Footer;
