export const LANGUAGE_TEXTS = {
  kor: {
    APP: {
      TITLE: "포켓몬 상성 계산기",
      THEME: {
        TITLE: "테마 선택",
        DATA_SUN_STONE: "태양의 돌",
        DATA_MOON_STONE: "달의 돌",
      },
      LANGUAGE: {
        TITLE: "언어 선택",
        DATA_KOR: "한국어",
        DATA_ENG: "영어",
      },
      CHANGE_BUTTON: {
        COMPARE_POKEMON: "포켓몬으로 비교",
        COMPARE_TYPE: "타입으로 비교",
        COPATIBILITY_TABLE: "상성 표",
        COMPATIBILITY_QUIZ: "상성 퀴즈",
      },
      FEEDBACK: "피드백",
    },
    MAIN: {
      LOADING: "로딩 중",
      SEARCH: {
        SUBTITLE: "초간단 포켓몬 상성 계산 서비스",
        PLACE_HOLDER: "매칭된 포켓몬을 입력해주세요",
        RECENT_SEARCH: "최근 검색",
      },
      MATCH: {
        MATCH_CARD_TITLE: "매치 포켓몬",
        TYPE_CARD_DAMAGE: "데미지",
        TYPE_CARD_EMPTY: "타입을 선택하면 상성 결과가 표시됩니다",
        FORM: "폼",
      },
    },
    MATCH: {
      SELECT_TYPE: {
        TITLE: "타입 선택",
      },
      SELECT_ABILITY: {
        TITLE: "특성",
      },
      SELECT_TERASTAL: {
        TITLE: "테라스탈",
        SELECTED: "테라스탈 선택됨",
      },
      RESET: "초기화",
    },
    TABLE: {
      TITLE: "타입 상성 표",
      SELECT_ALL: "전체 선택",
      EFFECT_SUMMARY: {
        SUPER_EFFECT: "데미지 2배",
        NORMAL_EFFECT: "데미지 0.5배",
        NOT_EFFECT: "데미지 0배",
      },
      IMMUNITY_LIST: {
        FIRE: "불: 화상 면역",
        GRASS: "풀: 씨뿌리기·가루·포자 면역",
        ELECTRIC: "전기: 마비 면역",
        ICE: "얼음: 얼음·싸라기눈 면역",
        POISON: "독: 독·맹독 면역",
        GROUND: "땅: 전기자석파·모래바람 면역",
        FLYING: "비행: 압정뿌리기 면역",
        ROCK: "바위: 모래바람 면역",
        GHOST: "고스트: 도망 제한 기술 면역",
        STEEL: "강철: 독·맹독·모래바람 면역",
      },
    },
    QUIZ: {
      TITLE: "포켓몬 상성 퀴즈",
      ERROR: "에러 페이지",
      NEXT: "다음 문제",
      SUBMIT: "정답 제출",
      MAIN_1: {
        TITLE_1: "해당 포켓몬을 공격했을 때,",
        TITLE_2: "{damageNum}x의 데미지를 가하는 타입은?",
      },
      MAIN_2: {
        TITLE: "에 들어갈 타입은?",
      },
      MAIN_3: {
        TITLE_1: "{type1}타입 공격에 대한",
        TITLE_2: "{type2}/{type3}타입의 피해량은?",
        DESCRIPTION: "{damage}x의 피해를 입는다.",
        DATA_NAME_ATTACK: "공격",
        DATA_NAME_DEFENSE: "방어",
      },
      ALERT: {
        SUCCESS: "정답입니다!",
        FAILED: "오답입니다..",
        MESSAGE: "정답은 {answerText} 입니다.",
        TYPE_1: "정답",
        TYPE_2: "오답",
      },
      DASHBOARD: {
        TITLE: "내 타입 지식, 실전에서 통할까?",
        DESC: "배틀의 승패는 {0}이 좌우해요!",
        DESC_STRONG: "타입 상성",
        LIST_1: "포켓몬들이 도움을 기다리고 있어요👀",
        LIST_2: "총 {0}, 과연 맞힐 수 있을까요?",
        LIST_2_STRONG: "10번의 선택",
        LIST_3: "4가지 퀴즈 유형 중 골라서 도전하세요!",
        LIST_4: "7문제 이상 맞히면 {0} 입니다",
        LIST_4_STRONG: "성공🎉",
        STAMP_HINT: "퀴즈를 풀어 스탬프를 획득하세요",
        STAMP_LABEL_1: "종합",
        STAMP_LABEL_2: "피해량",
        STAMP_LABEL_3: "부등호",
        STAMP_LABEL_4: "배수",
        STAMP_CLEAR: "CLEAR",
        STAMP_FAIL: "FAIL",
      },
      DIFFICULTY: {
        EASY: "쉬움",
        MEDIUM: "보통",
        HARD: "어려움",
      },
      SELECTION: {
        Q1_TITLE: "타입 종합 퀴즈",
        Q1_CARD_STORY: "숲 속에서 길 잃은 피카츄를 도와 길을 찾아주세요!",
        Q1_CARD_DESC: "포켓몬 타입 상성을 종합적으로 테스트하는 퀴즈",
        Q1_INTRO_STORY:
          "숲 속에서 길을 잃은 피카츄를 도와 안전한 길을 찾아주세요!",
        Q1_INTRO_LORE:
          "숲 속에서 피카츄가 도움을 요청하고 있어요. \n 각 타입의 강점과 약점을 정확히 꿰뚫고 피카츄를 무사히 집까지 데려다주세요!",
        Q2_TITLE: "피해량 맞추기",
        Q2_CARD_STORY: "이상해씨와 함께 맛있는 요리를 완성해 보세요!",
        Q2_CARD_DESC: "타입 공격에 대한 피해량을 맞추는 퀴즈",
        Q2_INTRO_STORY: "이상해씨와 함께 맛있는 요리를 완성해 보세요!",
        Q2_INTRO_LORE:
          "이상해씨의 특별한 요리 대회가 열렸어요! \n타입 공격의 피해량을 정확히 판단해 이상해씨와 요리를 완성해주세요!",
        Q3_TITLE: "부등호 방향 맞추기",
        Q3_CARD_STORY: "소방관 꼬부기와 함께 침착하게 불을 진압하세요!",
        Q3_CARD_DESC: "두 타입의 상성을 비교하여 부등호 방향을 맞추는 퀴즈",
        Q3_INTRO_STORY: "소방관 꼬부기와 함께 불을 진압하세요!",
        Q3_INTRO_LORE:
          "마을에 화재가 발생했어요! \n 소방관 꼬부기가 출동했습니다. \n두 타입의 상성을 비교하고 올바른 부등호 방향을 선택해서 꼬부기의 진화 작전을 도와주세요!",
        Q4_TITLE: "타입 배수 구하기",
        Q4_CARD_STORY:
          "파이리 산타가 들키지 않고 선물을 전달할 수 있도록 도와주세요!",
        Q4_CARD_DESC: "주어진 포켓몬에 가하는 타입 배수를 구하는 퀴즈",
        Q4_INTRO_STORY:
          "파이리 산타가 들키지 않고 선물을 전달할 수 있도록 도와주세요!",
        Q4_INTRO_LORE:
          "모두가 잠든 크리스마스 이브 \n 파이리가 마을에 선물을 배달하고 있어요. \n정확한 배수를 계산해야 들키지 않고 선물을 전달할 수 있답니다!",
      },
      INTRO: {
        START: "시작하기",
        NOT_FOUND: "퀴즈를 찾을 수 없습니다.",
      },
      PLAY: {
        EXIT: "나가기",
        EXIT_TITLE: "퀴즈를 종료하시겠습니까?",
        EXIT_MESSAGE: "현재까지의 진행 상황이 저장되지 않습니다.",
        EXIT_CONTINUE: "계속하기",
        BEFOREUNLOAD: "퀴즈가 진행 중입니다. 페이지를 나가시겠습니까?",
      },
      PROGRESS: {
        TITLE: "문제 진행 목록",
        QUESTION: "문제 {0}",
      },
      RANKING: {
        TITLE: "명예의 전당",
        RESET_NOTICE: "매 주 월요일에 초기화됩니다",
        RANK_SUFFIX: "위",
        ERROR: "랭킹을 불러올 수 없습니다",
        EMPTY: "아직 기록이 없습니다",
        RETRY: "다시 시도",
      },
      END: {
        SCORE: "10문제 중 {correctCount}문제 정답",
        TIME: "소요 시간: {time}",
        RETRY: "다시 도전",
        SELECT_DIFFERENT: "다른 퀴즈 선택",
        Q1: {
          SUCCESS_1:
            "길을 찾았어요!\n 피카츄가 번개처럼 앞장서며 숲을 빠져나갑니다!",
          SUCCESS_2:
            "상성을 정확히 꿰뚫었네요.\n 이제 집까지 안전하게 갈 수 있어요!",
          FAIL_1:
            "길이 또 갈라졌어요…\n 피카츄가 잠깐 멈춰 서서 두리번거립니다.",
          FAIL_2: "조금만 더 도와줄까요?\n 타입 표를 보고 다시 길을 찾아봐요!",
        },
        Q2: {
          SUCCESS_1:
            "요리 완성!\n 한입 맛본 포켓몬들이 전부 엄지를 치켜세웠어요!",
          SUCCESS_2:
            "피해량 계산이 딱 맞았네요.\n 이상해씨도 뿌듯해하고 있어요!",
          FAIL_1:
            "앗… 간이 조금 달라졌어요.\n 이상해씨가 레시피를 다시 펼쳐봅니다.",
          FAIL_2: "최고의 요리를 위해서 다시 도전해볼까요? ",
        },
        Q3: {
          SUCCESS_1: "진압 완료! 마을의 영웅이 되어버린 꼬부기!",
          SUCCESS_2:
            "부등호 선택이 완벽했어요. 이제 안전한 마을로 돌아갈 수 있어요!",
          FAIL_1: "불길이 더 거세졌어요… \n꼬부기가 다시 도움을 요청합니다!",
          FAIL_2: "꼬부기가 끝까지 진압할 수 있도록 도와줄까요?",
        },
        Q4: {
          SUCCESS_1:
            "이번 크리스마스도 무사히 성공!\n 파이리가 조용히 선물을 전달했어요!",
          SUCCESS_2:
            "배수 계산이 정확했네요. 들키지 않고 마지막 집까지 도착했어요!",
          FAIL_1: "아차… 발자국 소리가 났어요!\n 파이리가 급히 숨습니다.",
          FAIL_2:
            "파이리의 정체가 탄로났어요… 배수를 다시 계산해서 완벽히 잠입해봐요!",
        },
      },
      RESULT_SUBMIT: {
        MODAL_TITLE: "랭킹 등록",
        ID_PLACEHOLDER: "닉네임 입력 (1~20자)",
        BUTTON: "제출",
        CANCEL: "취소",
        SUCCESS: "제출 완료!",
        ERROR: "제출에 실패했습니다. 다시 시도해주세요.",
        RETRY: "다시 시도",
        VALIDATION_LENGTH: "1~20자 이내로 입력해주세요.",
      },
    },
    ERROR: {
      TITLE: "404 오류",
      DESCRIPTION_1: "앗! 야생의 404가 나타났다!",
      DESCRIPTION_2: "URL을 다시 확인해주세요.",
    },
    FOOTER: {
      COPYRIGHT: "포켓몬 상성 계산기. All rights reserved.",
      DISCLAIMER: "본 사이트는 팬 제작 프로젝트입니다.",
    },
  },
  eng: {
    APP: {
      TITLE: "Pokémon Type Calculator",
      THEME: {
        TITLE: "Theme",
        DATA_SUN_STONE: "Sun Stone",
        DATA_MOON_STONE: "Moon Stone",
      },
      LANGUAGE: {
        TITLE: "Language",
        DATA_KOR: "Korean",
        DATA_ENG: "English",
      },
      CHANGE_BUTTON: {
        COMPARE_POKEMON: "Compare by Pokémon",
        COMPARE_TYPE: "Compare by Type",
        COPATIBILITY_TABLE: "Type Table",
        COMPATIBILITY_QUIZ: "Type Quiz",
      },
      FEEDBACK: "Feedback",
    },
    MAIN: {
      LOADING: "Loading...",
      SEARCH: {
        SUBTITLE: "Simple Pokémon Type Calculator",
        PLACE_HOLDER: "Please enter the matched Pokémon",
        RECENT_SEARCH: "Recent",
      },
      MATCH: {
        MATCH_CARD_TITLE: "Matched Pokémon",
        TYPE_CARD_DAMAGE: "Damage",
        TYPE_CARD_EMPTY: "Select a type to see matchup results",
        FORM: "Form",
      },
    },
    MATCH: {
      SELECT_TYPE: {
        TITLE: "Select Type",
      },
      SELECT_ABILITY: {
        TITLE: "Ability",
      },
      SELECT_TERASTAL: {
        TITLE: "Terastal",
        SELECTED: "Terastal Selected",
      },
      RESET: "Reset",
    },
    TABLE: {
      TITLE: "Type Matchup Table",
      SELECT_ALL: "Select All",
      EFFECT_SUMMARY: {
        SUPER_EFFECT: "It's super effective!",
        NORMAL_EFFECT: "It's not very effective...",
        NOT_EFFECT: "It doesn't affect...",
      },
      IMMUNITY_LIST: {
        FIRE: "Fire‑type burn immunity",
        GRASS: "Grass‑type immunity to Leech Seed, powder, and spore moves",
        ELECTRIC: "Electric‑type paralysis immunity",
        ICE: "Ice‑type immunity to freeze and hail",
        POISON: "Poison‑type immunity to poison and badly poisoned",
        GROUND: "Ground‑type immunity to Thunder Wave and sandstorm",
        FLYING: "Flying‑type immunity to Spikes",
        ROCK: "Rock‑type sandstorm immunity",
        GHOST: "Ghost‑type immunity to trapping moves",
        STEEL: "Steel‑type immunity to poison, badly poisoned, and sandstorm",
      },
    },
    QUIZ: {
      TITLE: "Pokémon Type Quiz",
      ERROR: "Error Page",
      NEXT: "Next Question",
      SUBMIT: "Submit",
      MAIN_1: {
        TITLE_1: "When you attack this Pokémon,",
        TITLE_2: "which type deals {damageNum}x damage?",
      },
      MAIN_2: {
        TITLE: " Which type goes in the blank?",
      },
      MAIN_3: {
        TITLE_1: "When attacked by a {type1}",
        TITLE_2: "how much damage does the {type2}/{type3}",
        DESCRIPTION: "Takes {damage}x damage.",
        DATA_NAME_ATTACK: "Attack",
        DATA_NAME_DEFENSE: "Defense",
      },
      ALERT: {
        SUCCESS: "Correct!",
        FAILED: "Incorrect...",
        MESSAGE: "The correct answer is {answerText} type.",
        TYPE_1: "Correct",
        TYPE_2: "Incorrect",
      },
      DASHBOARD: {
        TITLE: "Can my type knowledge hold up in battle?",
        DESC: "Victory in Pokémon battles is all about {0}!",
        DESC_STRONG: "type matchups",
        LIST_1: "Many Pokémon are waiting for your help👀",
        LIST_2: "A total of {0} — can you get them all right?",
        LIST_2_STRONG: "10 choices",
        LIST_3: "Choose from 4 quiz types and take the challenge!",
        LIST_4: "Get 7 or more right for a {0}",
        LIST_4_STRONG: "Pass🎉",
        STAMP_HINT: "Solve quizzes to earn stamps",
        STAMP_LABEL_1: "General",
        STAMP_LABEL_2: "Damage",
        STAMP_LABEL_3: "Inequality",
        STAMP_LABEL_4: "Multiplier",
        STAMP_CLEAR: "CLEAR",
        STAMP_FAIL: "FAIL",
      },
      DIFFICULTY: {
        EASY: "Easy",
        MEDIUM: "Medium",
        HARD: "Hard",
      },
      SELECTION: {
        Q1_TITLE: "Type General Quiz",
        Q1_CARD_STORY: "Help Pikachu find its way out of the forest!",
        Q1_CARD_DESC: "A comprehensive test of Pokémon type matchups",
        Q1_INTRO_STORY:
          "Help the lost Pikachu find a safe path out of the forest!",
        Q1_INTRO_LORE:
          "Deep in the forest, Pikachu is calling for help.\nKnow each type's strengths and weaknesses to guide Pikachu safely home!",
        Q2_TITLE: "Guess the Damage",
        Q2_CARD_STORY: "Help Bulbasaur prepare a delicious dish!",
        Q2_CARD_DESC: "A quiz on type attack damage values",
        Q2_INTRO_STORY: "Help Bulbasaur prepare a delicious dish!",
        Q2_INTRO_LORE:
          "Bulbasaur's special cooking contest has begun!\nJudge the correct type attack damage to help Bulbasaur finish the recipe!",
        Q3_TITLE: "Guess the Inequality",
        Q3_CARD_STORY: "Help firefighter Squirtle put out the fire!",
        Q3_CARD_DESC: "A quiz comparing type matchups using inequality signs",
        Q3_INTRO_STORY: "Help firefighter Squirtle put out the fire!",
        Q3_INTRO_LORE:
          "A fire has broken out in town!\nFirefighter Squirtle is on the scene.\nCompare the two types and choose the right inequality sign to help Squirtle's strategy!",
        Q4_TITLE: "Find the Multiplier",
        Q4_CARD_STORY:
          "Help Santa Charmander deliver presents without being caught!",
        Q4_CARD_DESC: "A quiz on calculating type damage multipliers",
        Q4_INTRO_STORY:
          "Help Santa Charmander deliver presents without being caught!",
        Q4_INTRO_LORE:
          "On a quiet Christmas Eve,\nSanta Charmander is delivering gifts to the village.\nCalculate the correct multiplier to deliver presents undetected!",
      },
      INTRO: {
        START: "Start",
        NOT_FOUND: "Quiz not found.",
      },
      PLAY: {
        EXIT: "Exit",
        EXIT_TITLE: "Quit the quiz?",
        EXIT_MESSAGE: "Your current progress will not be saved.",
        EXIT_CONTINUE: "Continue",
        BEFOREUNLOAD: "A quiz is in progress. Are you sure you want to leave?",
      },
      PROGRESS: {
        TITLE: "Question Progress",
        QUESTION: "Q. {0}",
      },
      RANKING: {
        TITLE: "Hall of Fame",
        RESET_NOTICE: "Resets every Monday",
        RANK_SUFFIX: "th",
        ERROR: "Failed to load rankings",
        EMPTY: "No records yet",
        RETRY: "Retry",
      },
      END: {
        SCORE: "{correctCount} out of 10 correct",
        TIME: "Time: {time}",
        RETRY: "Try Again",
        SELECT_DIFFERENT: "Choose Another Quiz",
        Q1: {
          SUCCESS_1:
            "You found the way!\n Pikachu dashes ahead like lightning through the forest!",
          SUCCESS_2:
            "You nailed every type matchup.\n Pikachu can safely make it home now!",
          FAIL_1:
            "The path splits again…\n Pikachu pauses and looks around nervously.",
          FAIL_2:
            "Need a little more help?\n Check the type chart and find the way!",
        },
        Q2: {
          SUCCESS_1:
            "Dish complete!\n Every Pokémon who tasted it gave a thumbs up!",
          SUCCESS_2:
            "Your damage calculations were spot on.\n Bulbasaur is proud of you!",
          FAIL_1:
            "Oops… the seasoning is a bit off.\n Bulbasaur opens the recipe again.",
          FAIL_2:
            "Want to try again for the perfect dish?",
        },
        Q3: {
          SUCCESS_1:
            "Fire extinguished! Squirtle has become the hero of the town!",
          SUCCESS_2:
            "Your inequality choices were perfect.\n The town is safe again!",
          FAIL_1:
            "The flames are growing stronger…\n Squirtle is calling for backup!",
          FAIL_2:
            "Can you help Squirtle put out every last flame?",
        },
        Q4: {
          SUCCESS_1:
            "Another Christmas success!\n Charmander quietly delivered all the presents!",
          SUCCESS_2:
            "Your multiplier calculations were perfect.\n Made it to the last house undetected!",
          FAIL_1:
            "Uh oh… footsteps were heard!\n Charmander hides in a hurry.",
          FAIL_2:
            "Charmander's cover is blown…\n Recalculate the multipliers for a perfect stealth run!",
        },
      },
      RESULT_SUBMIT: {
        MODAL_TITLE: "Register Ranking",
        ID_PLACEHOLDER: "Enter nickname (1-20 chars)",
        BUTTON: "Submit",
        CANCEL: "Cancel",
        SUCCESS: "Submitted!",
        ERROR: "Submission failed. Please try again.",
        RETRY: "Retry",
        VALIDATION_LENGTH: "Please enter 1-20 characters.",
      },
    },
    ERROR: {
      TITLE: "404 Error",
      DESCRIPTION_1: "Uh-oh! A wild 404 appeared!",
      DESCRIPTION_2: "Please check your URL.",
    },
    FOOTER: {
      COPYRIGHT: "Pokémon Type Calculator. All rights reserved.",
      DISCLAIMER:
        "This is a fan-made project and is not official Pokémon content.",
    },
  },
};
