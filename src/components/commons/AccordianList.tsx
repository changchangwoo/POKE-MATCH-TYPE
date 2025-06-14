import { css } from "@emotion/react";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface AccrodianProps {
  children: React.ReactNode;
  title: string;
}
const AccordianList = ({ children, title }: AccrodianProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      css={AccordianListContainer}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="title">
        <span>{title}</span>
        <span css={openIcon(isOpen)}>
          <FaCaretDown />
        </span>
      </div>
      {isOpen && <div className="contents">{children}</div>}
    </div>
  );
};

const AccordianListContainer = () => css`
  width: 100%;
  margin: auto;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  margin: auto;


  .copyrightContents {
    display: flex;
    flex-direction: column;
    gap: 5px;
    p {
  margin: auto;
color: var(--text);
text-align: center;
font-size: var(--fontSmall);
max-width: 600px;
    }
  }

  :hover {
    background-color: var(--border);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    gap: 5px;
    cursor: pointer;
    color: var(--text);
  }

  .contents {
    padding: 12px 16px;
  }

  a {
    margin: auto;
    display: flex;
    gap: 10px;
    color: var(--text);
  }

  p {
        margin: auto;
    display: flex;
    gap: 10px;
    color: var(--text);
    font-size: var(--fontSmall);
  }
`;

const openIcon = (isOpen: boolean) => css`
  transform: rotate(${isOpen ? "180deg" : "0deg"});
  display: flex;
  align-items: center;
`;

export default AccordianList;
