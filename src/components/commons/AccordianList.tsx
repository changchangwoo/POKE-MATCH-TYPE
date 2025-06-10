import { css } from "@emotion/react";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface AccrodianProps {
  children: React.ReactNode;
  title: string;
}
const AccordianList = ({ children, title }: AccrodianProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div css={AccordianListContainer}>
      <div className="title" onClick={() => setIsOpen((prev) => !prev)}>
        {title} <FaCaretDown />
      </div>
      {isOpen && <div className="contents">{children}</div>}
    </div>
  );
};

const AccordianListContainer = css`
  width: 100%;
  border-bottom: 1px solid var(--border);

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    cursor: pointer;
    :hover {
      background-color: var(--border);
    }
  }

  .contents {
    padding: 12px 16px;
  }
`;

export default AccordianList;
