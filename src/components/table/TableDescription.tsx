import { css } from "@emotion/react";
import CoupangBanner from "../../ads/CoupangBanner";

interface TableDescriptionProps {
  text: any;
}

const TableDescription = ({ text }: TableDescriptionProps) => {
  const EFFECT_SUMMARY = [
    {
      icon: "●",
      typeNo: 14,
      description: text.TABLE.EFFECT_SUMMARY.SUPER_EFFECT,
      factor: "x2",
    },
    {
      icon: "▲",
      typeNo: 7,
      description: text.TABLE.EFFECT_SUMMARY.NORMAL_EFFECT,
      factor: "x0.5",
    },
    {
      icon: "✕",
      typeNo: 16,
      description: text.TABLE.EFFECT_SUMMARY.NOT_EFFECT,
      factor: "x0",
    },
  ];

  const IMMUNITY_LIST = [
    { typeNo: 10, description: text.TABLE.IMMUNITY_LIST.FIRE },
    { typeNo: 12, description: text.TABLE.IMMUNITY_LIST.GRASS },
    { typeNo: 13, description: text.TABLE.IMMUNITY_LIST.ELECTRIC },
    { typeNo: 15, description: text.TABLE.IMMUNITY_LIST.ICE },
    { typeNo: 4, description: text.TABLE.IMMUNITY_LIST.POISON },
    { typeNo: 5, description: text.TABLE.IMMUNITY_LIST.GROUND },
    { typeNo: 3, description: text.TABLE.IMMUNITY_LIST.FLYING },
    { typeNo: 6, description: text.TABLE.IMMUNITY_LIST.ROCK },
    { typeNo: 8, description: text.TABLE.IMMUNITY_LIST.GHOST },
    { typeNo: 9, description: text.TABLE.IMMUNITY_LIST.STEEL },
  ];

  return (
    <div css={tableDescriptionStyle}>
      <div className="box">
        {EFFECT_SUMMARY.map(({ icon, typeNo, description, factor }) => (
          <div key={icon}>
            <span style={{ color: `var(--type${typeNo})` }}>{icon}</span>:
            <span>
              {description} ({factor})
            </span>
          </div>
        ))}
      </div>

      <div className="extraBox">
        {IMMUNITY_LIST.map(({ typeNo, description }) => (
          <div key={description}>
            <span style={{ color: `var(--type${typeNo})` }}>●</span>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const tableDescriptionStyle = css`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: var(--text);
  text-align: center;
  border-radius: 10px;
  border: 1px solid var(--border);
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;

  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 20px;
    background-color: var(--primary);
    border-radius: 8px;
    text-align: left;
    box-sizing: border-box;
    width: 100%;
  }

  .box div {
    display: flex;
    gap: 10px;
    @media screen and (max-width: 415px) {
      letter-spacing: -2px;
    }
  }

  .box div:nth-of-type(3) {
    margin-left: 3px;
  }
  .extraBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    color: var(--text);
    width: 100%;
    background-color: var(--primary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    div {
      display: flex;
      gap: 10px;
    }
    div span {
      text-align: left;
      @media screen and (max-width: 380px) {
        letter-spacing: -2px;
      }
    }
  }
`;

export default TableDescription;
