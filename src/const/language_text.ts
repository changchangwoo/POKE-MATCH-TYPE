export const LANGUAGE_TEXTS = {
  kor: {
    APP: {
      TITLE: "포켓몬 상성 계산기",
      SETTING: {
        TITLE: "설정",
        DESCRIPTION_TITLE: "포켓몬스터 상성 계산기 -v02",
        DESCRIPTION_SUB_1: "본 서비스는 포켓몬 상성 계산 서비스를 제공합니다",
        DESCRIPTION_SUB_2: "초보 유저의 이해 및 지원을 목적으로 하고있습니다.",
      },
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
      COPYRIGHT: {
        TITLE: "저작권",
        DESCIRPTION_1:
          "본 서비스는 PokeAPI에서 제공하는 공개 API 데이터를 사용합니다.",
        DESCIRPTION_2:
          "포켓몬의 이름, 이미지, 타입 등 모든 포켓몬 관련 콘텐츠의 저작권은 Nintendo, Creatures Inc. ,GAME FREAK Inc.에 있습니다.",
        DESCIRPTION_3: "또한 개인 포트폴리오 및 학습 목적의 프로젝트입니다.",
      },
      FEEDBACK: {
        TITLE: "피드백",
        DESCRIPTION_1:
          "안녕하세요! 제가 만든 서비스를 이용해주셔서 정말 감사합니다.",
        DESCRIPTION_2:
          "훌륭한 여러분들과 본 서비스를 비롯하여 다양한 의견을 교류하고싶습니다.",
        DESCRIPTION_3:
          "지금은 많이 부족하지만, 도움을 주신다면 멋진 서비스가 될 것입니다.",
        DESCRIPTION_4:
          "어떤 내용이라도 남겨주신다면 확인 후 꼭 반영하겠습니다!",
        DESCRIPTION_5: "그럼 좋은하루 되세요!",
      },
      CHANGE_BUTTON: {
        COMPARE_POKEMON: "포켓몬으로 비교",
        COMPARE_TYPE: "타입으로 비교",
        COPATIBILITY_TABLE: "상성 표",
        COMPATIBILITY_QUIZ: "상성 퀴즈",
      },
    },
    MAIN: {
      LOADING: "로딩 중",
      SEARCH: {
        PLACE_HOLDER: "매칭된 포켓몬을 입력해주세요",
      },
      MATCH: {
        MATCH_CARD_TITLE: "매치 포켓몬",
        TYPE_CARD_DAMAGE: "데미지",
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
      },
    },
    TABLE: {
      TITLE: "타입 상성 표",
      SELECT_ALL: "전체 선택",
      EFFECT_SUMMARY: {
        SUPER_EFFECT: "효과가 굉장했다!",
        NORMAL_EFFECT: "효과가 별로인 것 같다...",
        NOT_EFFECT: "효과가 없는 것 같다...",
      },
      IMMUNITY_LIST: {
        FIRE: "불꽃타입 화상 면역",
        GRASS: "풀 타입 씨뿌리기·가루·포자 면역",
        ELECTRIC: "전기타입 마비 면역",
        ICE: "얼음타입 얼음·싸라기눈 면역",
        POISON: "독타입 독·맹독 면역",
        GROUND: "땅타입 전기자석파·모래바람 면역",
        FLYING: "비행타입 압정뿌리기 면역",
        ROCK: "바위타입 모래바람 면역",
        GHOST: "고스트타입 도망 제한 기술 면역",
        STEEL: "강철타입 독·맹독·모래바람 면역",
      },
    },
    QUIZ: {
      TITLE: "포켓몬 상성 퀴즈",
      ERROR: "에러 페이지",
      NEXT: "다음 문제",
      SUBMIT: "정답 제출",
      READY: {
        TITLE: "퀴즈를 통해 내 타입 이해도를 확인해보세요!",
        TITLE_SUB_1: "총 10문제로 구성되어있습니다.",
        TITLE_SUB_2: "중도 이탈 시 진행 초기화됩니다.",
        TITLE_SUB_3: "퀴즈 유형과 문제는 랜덤입니다.",
        BTN: "시작하기",
      },
      INTRO: {
        TITLE_1: "이런! 피카츄가 숲에서 길을 잃었어요!",
        TITLE_2: "정말 다행스럽게도",
        TITLE_3: "퀴즈를 풀면 무사히 빠져나갈 수 있어요.",
        TITLE_4: "길 잃은 피카츄를 도와주세요!",
      },
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
      END: {
        SUCCESS_1: "피카츄가 무사히 숲 속을 빠져나왔어요!",
        SUCCESS_2: "트레이너로서 기본 소양이 출중한데요?",
        FAILD_1: "피카츄가 아직 길을 헤매고 있어요",
        FAILD_2: "다시 한번 피카츄를 도와줄까요?",
        SYSTEM: "10문제 중 {correctCount} 문제 맞추셨습니다!✨",
        RETRY: "다시하기",
      },
    },
    ERROR: {
      TITLE: "404 오류",
      DESCRIPTION_1: "앗! 야생의 404가 나타났다!",
      DESCRIPTION_2: "URL을 다시 확인해주세요.",
    },
  },
  eng: {
    APP: {
      TITLE: "Pokémon Type Calculator",
      SETTING: {
        TITLE: "Settings",
        DESCRIPTION_TITLE: "Pokémon Type Calculator -v02",
        DESCRIPTION_SUB_1:
          "This service provides Pokémon type compatibility calculations.",
        DESCRIPTION_SUB_2:
          "It is intended to support and assist beginner players.",
      },
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
      COPYRIGHT: {
        TITLE: "Copyright",
        DESCIRPTION_1:
          "This service uses data from the publicly available PokeAPI.",
        DESCIRPTION_2:
          "All content related to Pokémon including names, images, and types is copyrighted by Nintendo, Creatures Inc., and GAME FREAK Inc.",
        DESCIRPTION_3:
          "This is a personal project for portfolio and learning purposes.",
      },
      FEEDBACK: {
        TITLE: "Feedback",
        DESCRIPTION_1:
          "Hello! Thank you so much for using the service I created.",
        DESCRIPTION_2:
          "I’d love to exchange thoughts and ideas with amazing users like you.",
        DESCRIPTION_3:
          "Although the service is still lacking, with your help it can become much better.",
        DESCRIPTION_4:
          "Any feedback you leave will be carefully reviewed and reflected!",
        DESCRIPTION_5: "Wishing you a wonderful day!",
      },
      CHANGE_BUTTON: {
        COMPARE_POKEMON: "Compare by Pokémon",
        COMPARE_TYPE: "Compare by Type",
        COPATIBILITY_TABLE: "Type Table",
        COMPATIBILITY_QUIZ: "Type Quiz",
      },
    },
    MAIN: {
      LOADING: "Loading...",
      SEARCH: {
        PLACE_HOLDER: "Please enter the matched Pokémon",
      },
      MATCH: {
        MATCH_CARD_TITLE: "Matched Pokémon",
        TYPE_CARD_DAMAGE: "Damage",
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
      },
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
      SUBMIT: "Submit Answer",
      READY: {
        TITLE:
          "Test your understanding of type compatibility through this quiz!",
        TITLE_SUB_1: "Consists of 10 questions.",
        TITLE_SUB_2: "Progress will reset if you quit midway.",
        TITLE_SUB_3: "Question types and content are random.",
        BTN: "Start",
      },
      INTRO: {
        TITLE_1: "Oh no! Pikachu is lost in the forest!",
        TITLE_2: "Luckily,",
        TITLE_3: "Solving this quiz will help Pikachu escape safely.",
        TITLE_4: "Please help the lost Pikachu!",
      },
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
      END: {
        SUCCESS_1: "Pikachu has safely escaped the forest!",
        SUCCESS_2: "You’ve got excellent trainer skills!",
        FAILD_1: "Pikachu is still lost in the forest.",
        FAILD_2: "Would you like to try helping Pikachu again?",
        SYSTEM: "You got {correctCount} out of 10 questions right! ✨",
        RETRY: "RETRY",
      },
    },
    ERROR: {
      TITLE: "404 Error",
      DESCRIPTION_1: "Uh-oh! A wild 404 appeared!",
      DESCRIPTION_2: "Please check your URL.",
    },
  },
};
