import { css } from "@emotion/react";
import { useState } from "react";
import QuizReady from "../components/quizes/QuizReady";
import QuizMain from "../components/quizes/QuizMain";
import QuizEnd from "../components/quizes/QuizEnd";

const Quiz = () => {
  const [section, setSection] = useState<number>(0);
  const onClickStartBtn = () => {
    setSection(1);
  };

  return (
    <div css={quizContainer}>
      {(() => {
        switch (section) {
          case 0:
            return <QuizReady onClickStartBtn={onClickStartBtn} />;
          case 1:
            return <QuizMain />;
          case 2:
            return <QuizEnd />;
          default:
            return <div>에러 페이지</div>;
        }
      })()}
    </div>
  );
};

const quizContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 800px;
  border-radius: 30px;
  background-color: white;
`;

export default Quiz;
// 컴포넌트 설계
// 각 문제별 퀴즈 (5개)
// 성공, 실패 Alert창 (1개)
// 프로그레스 바 (1개)
// 개별 퀴즈 설계

/*
  페이지 초기 섹션
  = 퀴즈 안내, 퀴즈 시작 버튼,
  
  시나리오
  - 사용자가 버튼을 누르면 유형 배열에서 랜덤으로 하나 발췌
  - 모든 퀴즈는 퀴즈 내 문제 풀이 및 정답이 랜덤으로 제공되어도 풀 수 있어야함
  - 정답 제출 버튼을 클릭하면 정답 체크, 
  - "모든 퀴즈"는 퀴즈 내 문제 풀이 및 정답이 랜덤으로 제공되어도 풀 수 있어야함
  - 정답시 맞아용 (마자용) 팝업 후 다음 문제, 오답시 고라파덕 팝업 등장 후 다음 문제
  - 상단에 프로그레스바가 항상 나와있으며, 풀 때 마다 증가하는 애니메이션, 총 10문제
  - 정답 개수에 따라 결과창에 다른 포켓몬들 출력
*/

/*
  문제 유형1. 해당 포켓몬에게 공격했을 때,
  - 4배의 데미지를 줄 수 있는
  - 2배의 데미지를 줄 수 있는
  - 1배의 데미지를 줄 수 있는
  - 0배의 데미지를 줄 수 있는
  타입을 선택하세요.

  문제 유형2. 다음 빈칸에 들어갈 타입을 고르세요
  - 상성 배치에 맞게 총 3개로 꼬리잡히는 타입을 추린 후, 해당 문제에서 랜덤으로 발췌 

  문제 유형3. 드래그 형식의 타입 퀴즈
  - 다음 공격 타입에 대해 가장 효과적인 방어 타입을 연결하세요
  - 전기 → [ ]  
  - 격투 → [ ]  
  - 얼음 → [ ]  
  - 불꽃 → [ ]


  문제 유형4. 
  - 주어진 설명을 듣고 타입 선택하기
  - 다음을 설명하는 타입은 무슨 타입일까요?
  - 땅 타입에 대한 면역입니다. 독, 등등등에 x2에 대미지를 받습니다.
  - 타입선택,

  문제 유형5.
  - 공격과 방어타입에 대해서 데미지를 선택하는 퀴즈
  - 팬텀과 홍수몬이 만났습니다
  - 홍수몬에 "격투" 타입 기술은 팬텀에게 얼만큼에 데미지를 줄수 있을까요?
  - x4
  - x2
  - x1
  - x0
*/
