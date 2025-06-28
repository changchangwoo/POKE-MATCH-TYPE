import { css } from "@emotion/react";

const EFFECT_SUMMARY = [
  { icon: "●", typeNo: 14, text: "효과가 굉장했다!", factor: "x2" },
  { icon: "▲", typeNo: 7,  text: "효과가 별로인 것 같다...", factor: "x0.5" },
  { icon: "✕", typeNo: 16, text: "효과가 없는 것 같다...",  factor: "x0" },
];

const IMMUNITY_LIST = [
  { typeNo: 10, text: "불꽃타입 화상 면역" },
  { typeNo: 12, text: "풀 타입 씨뿌리기·가루·포자 면역" },
  { typeNo: 13, text: "전기타입 마비 면역" },
  { typeNo: 15, text: "얼음타입 얼음·싸라기눈 면역" },
  { typeNo: 4,  text: "독타입 독·맹독 면역" },
  { typeNo: 5,  text: "땅타입 전기자석파·모래바람 면역" },
  { typeNo: 3,  text: "비행타입 압정뿌리기 면역" },
  { typeNo: 6,  text: "바위타입 모래바람 면역" },
  { typeNo: 8,  text: "고스트타입 도망치기 제한 기술 면역" },
  { typeNo: 9,  text: "강철타입 독·맹독·모래바람 면역" },
];


const TableDescription = () => (
  <div css={tableDescriptionStyle}>
    <div className="box">
      {EFFECT_SUMMARY.map(({ icon, typeNo, text, factor }) => (
        <div key={icon}>
          <span style={{ color: `var(--type${typeNo})` }}>{icon}</span> : {text} ({factor})
        </div>
      ))}
    </div>

    <div className="extraBox">
      {IMMUNITY_LIST.map(({ typeNo, text }) => (
        <div key={text}>
          <span style={{ color: `var(--type${typeNo})` }}>●</span> {text}
        </div>
      ))}
    </div>
  </div>
);

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
    }
  }
`;

export default TableDescription;
