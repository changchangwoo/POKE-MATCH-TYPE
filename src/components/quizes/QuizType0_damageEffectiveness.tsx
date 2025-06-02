import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import TypeBadge from "../commons/TypeBadge";
import { getKoreanType } from "../../utils/getKoreanType";
import { v4 as uuidv4 } from "uuid";
import { imgBox, matchCardContainer, pokeTypes } from "../MatchCard";
import SelectType from "../SelectType";
import { useGetDetailPokemonForQuiz } from "../../hooks/useGetDetailPokemonForQuiz";
import { Types } from "../../models/pokemonData";

interface QuizType0_Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const QuizType0_damageEffectiveness = ({ setProgress }: QuizType0_Props) => {
  const [checkedType, setCheckedType] = useState<Types[]>([]);
  const { questionArr, quizNum, groupResult, matchDatas } =
    useGetDetailPokemonForQuiz();
  const submitAnswer = () => {
    if (checkedType[0].name === questionArr[0].name) {
    } else {
      alert("틀렸습니다! 정답은 " + questionArr[0].name + "입니다.");
    }
    setProgress((prev: number) => prev + 1);
  };

  if (!questionArr || !quizNum || !groupResult || !matchDatas) return null;
  return (
    <div css={matchCardContainer}>
      <h1 css={title}>
        해당 포켓몬을 공격했을 때,&nbsp;
        <b>{groupResult[quizNum].damage}배의 데미지를 줄 수 있는 타입</b>을
        선택하세요
      </h1>
      <div css={imgBox(matchDatas.types[0].typeNo)}>
        <img
          src={matchDatas.imgs}
          loading="lazy"
          alt={`Pokemon ${matchDatas.no}`}
        />
      </div>
      <div css={pokeTypes}>
        {matchDatas.types.map((type) => (
          <TypeBadge key={uuidv4()} typeNo={type.typeNo}>
            {getKoreanType(type.name)}
          </TypeBadge>
        ))}
      </div>
      <div css={typeSection}>
        <SelectType
          checkedType={checkedType}
          setCheckedType={setCheckedType}
          quizModeDatas={questionArr}
        />
      </div>
      <button onClick={submitAnswer} css={submitBtn}>
        정답 제출
      </button>
    </div>
  );
};

export default QuizType0_damageEffectiveness;

const title = css`
  b {
    font-weight: bold;
  }
`;

const submitBtn = css`
  width: 30%;
  /* background-color: orange; */
  height: 45px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--primary);
  cursor: pointer;

  &:hover {
    transition: all 0.2s;
    background-color: var(--border);
  }
`;

const typeSection = css`
  width: 80%;
`;
