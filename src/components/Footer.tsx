/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaCopyright, FaGithub } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const Footer = () => {
  return (
    <div css={FooterContainer}>
      <>
        <h3>
          <FaCopyright /> Data provided by PokeAPI
        </h3>

        <a href="https://github.com/changchangwoo/POKE-MATCH-TYPE">
          <FaGithub />
          changchangwoo/github.io
        </a>
        <a href="https://velog.io/@changwoo/posts">
          <FaPencil />
          velog.io/@changwoo
        </a>

        <h2>
          본 서비스는 쿠팡 파트너스 활동의 일환으로 <br />
          이에 따른 일정액의 수수료를 제공받습니다.
        </h2>
      </>
    </div>
  );
};

const FooterContainer = css`
  padding: 20px;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 13px;

  a,
  h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-decoration: none;
  }

  a {
    font-size: 11px;
    color: grey;
  }

  h3 {
    font-size: 14px;
    color: var(--text);
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 10px;
    color: grey;
    text-align: center;
  }
`;

export default Footer;
