/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaGithub } from "react-icons/fa";
import { FaCopyright, FaPencil } from "react-icons/fa6";

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

  a, h3 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  a {
    font-size: 11px;
    color: grey;
  }

  h3 {
    font-size: 14px;
    color: black;
    margin-bottom: 10px;
  }
`;

export default Footer;
