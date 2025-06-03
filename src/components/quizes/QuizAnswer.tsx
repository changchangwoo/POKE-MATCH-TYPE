import React, { useState } from 'react'
import SelectType from '../SelectType';
import { Types } from '../../models/pokemonData';
import { css } from '@emotion/react';

interface QuizAnswerProps {
    questionArr: Types[];
    submitAnswer: (answer: string, correct: string) => void;
}

export const QuizAnswer = ({questionArr, submitAnswer} : QuizAnswerProps) => {
        const [checkedType, setCheckedType] = useState<Types[]>([]);

  return (
    <>
              <div css={typeSection}>
            <SelectType
              checkedType={checkedType}
              setCheckedType={setCheckedType}
              quizModeDatas={questionArr}
            />
          </div>
          <button
            onClick={() => submitAnswer(checkedType[0]?.name, questionArr[0].name)}
            css={submitBtn}
          >
            정답 제출
          </button>
          </>
  )
}

const typeSection = css`
  width: 100%;
`;

const submitBtn = css`
  width: 30%;
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

export default QuizAnswer