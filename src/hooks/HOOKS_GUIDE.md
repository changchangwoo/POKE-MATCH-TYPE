# Hooks Guide

이 문서는 `src/hooks`와 `src/hooks/queries`에 있는 훅들의 비즈니스 로직을 빠르게 파악하기 위한 요약 가이드입니다.

## 공통 개념
- `searchParams`: 라우팅 쿼리스트링을 통해 선택된 포켓몬/언어/품종 정보를 전달합니다.
- `sessionStorage`: 매치 화면의 선택 상태(포켓몬, 타입 체크, 테라스탈, 품종 인덱스 등)를 유지합니다.
- `localStorage`: 최근 검색 목록을 저장합니다.
- TanStack Query 훅은 API 호출 결과를 캐싱합니다.

## Hooks (src/hooks)

### useDefaultSetting
- 목적: 이미지 리스트를 미리 로드하여 첫 렌더 지연을 줄입니다.
- 입력: `imageList: readonly string[]`
- 동작: `useEffect`에서 각 URL로 `Image`를 생성해 프리로드합니다.
- 출력: 없음 (사이드이펙트 전용)

### useGetDetailPokemonForQuiz
- 목적: 퀴즈 타입 0에 필요한 랜덤 포켓몬 및 타입 데이터를 조합합니다.
- 입력: `progress: number` (쿼리 키에 포함)
- 동작: 랜덤 포켓몬 번호를 뽑아 상세 정보 조회 → 타입 상세 조회 → 타입 상성 그룹화 → 퀴즈 문제 생성.
- 출력: `questionArr`, `quizNum`, `groupResult`, `matchDatas`, `answerIdx`, `isLoading`, `isError`
- 특징: `staleTime: Infinity`, `gcTime: 0`, 실패 시 재시도 2회.

### useMatchInitialData
- 목적: 매치 화면 초기 선택 포켓몬을 결정합니다.
- 입력: `searchParams`, `currentLanguage`
- 우선순위:
- URL 파라미터(`no`, `name`, `varietiesIdx`, `searchLanguage`)
- 세션 저장값(`/matchDatas`, `/varietiesIdx`)
- 랜덤 포켓몬(pokedex)
- 출력: `{ no, name, searchLanguage, varietiesIdx }`
- 특징: `useMemo`로 동일 입력에 대해 재계산 방지.

### useMatchSession
- 목적: 매치 화면에서 타입체크/테라스탈 선택 상태를 복원합니다.
- 입력: `setSelectedAbility`, `setSelectedTerastal`
- 동작: `sessionStorage`에서 `/typecheck`, `/terastal`을 읽어 상태 반영.

### usePokemonName
- 목적: 현재 언어에 맞는 포켓몬 이름으로 변환합니다.
- 입력: `matchInfo`
- 동작: `matchInfo.searchLanguage`로 원본을 찾고, `LanguageContext` 기준 언어 이름으로 변환.
- 출력: 변환된 이름 문자열.

### usePokemonSearch
- 목적: 포켓몬 검색 자동완성 및 검색 결과 반영을 담당합니다.
- 입력: `searchParams`, `pokemonNames`, `setSearchParams`, 상태 초기화 setter, `addRecentSearch`
- 핵심 동작:
- 검색어 변경 시 현재 언어 기준으로 시작 문자열 매칭.
- 제안 클릭/Enter 시 URL 파라미터 설정(`no`, `name`, `varietiesIdx`, `searchLanguage`).
- 최근 검색에 저장하고 상태 초기화(능력/테라스탈/검색어).
- 외부 클릭 시 제안 닫기, 마운트 시 인풋 포커스.
- 출력: 검색 UI에 필요한 상태 및 핸들러 세트.

### useRecentSearch
- 목적: 최근 검색 목록을 로컬 저장소 기반으로 관리합니다.
- 입력: `setSearchParams`
- 동작:
- 초기 로드 시 `localStorage`에서 최대 10개 로드.
- `addRecentSearch`: 중복 제거 후 최신 항목을 앞에 추가.
- `handleRecentClick`: 선택 항목으로 URL 파라미터 업데이트.
- 출력: `recentSearches`, `addRecentSearch`, `handleRecentClick`.

### useSpeciesSelect
- 목적: 품종(폼) 선택을 처리하고 URL/세션을 동기화합니다.
- 입력: `varietiesIdx`, `name`, `searchLanguage`, `setSearchParams`
- 동작: 클릭된 버튼 인덱스를 저장하고 URL 파라미터 갱신, 세션에 `varietiesIdx` 저장.
- 출력: `clickedBtn`, `handleClick`.

## Hooks (src/hooks/queries)

### useFetchDetailPokemon
- 목적: 포켓몬 상세 정보로 매치 데이터(`MatchInfo`)를 생성합니다.
- 입력: `no`, `name`, `searchLanguage`
- 동작: 포켓몬 상세 API 호출 → 타입 번호 추출 → 매치 데이터 구성 → 세션에 `/matchDatas` 저장.
- 출력: `MatchInfo` 쿼리 결과.
- 특징: `enabled: !!no`로 번호가 있을 때만 호출.

### useFetchDetailType
- 목적: 선택된 타입(또는 테라스탈 타입) 기준 상성 그룹을 계산합니다.
- 입력: `no[]`, `selectedAbility?`, `selectedTerastal_no?`
- 동작:
- 테라스탈 타입이 있으면 단일 타입으로 덮어씀.
- 타입 상세 조회 → 타입 데이터 정규화 → 능력치 보정 적용 → 상성 그룹 결과 반환.
- 출력: 상성 그룹 결과 쿼리.

### useFetchPokemonVarieties
- 목적: 포켓몬의 품종(폼) 정보를 가져오고 캐싱합니다.
- 입력: `no`, `name`, `pokeDexHash`, `language`
- 동작:
- 종(species) API 호출.
- 세션 캐시가 없거나 이름이 다르면 새로 구성.
- `getFilterFixVarieties`로 필터링 후 첫 항목 이름을 `default`로 설정.
- 세션에 `varieties` 저장 후 반환.
- 출력: `{ name, varieties }` 쿼리 결과.
- 특징: `enabled: !!no`.

### useFetchQuizType2
- 목적: 퀴즈 타입 2 문제를 생성합니다.
- 입력: `progress`
- 동작: 랜덤 타입 번호 생성 → 타입 상세 조회 → 상성 그룹 생성 → 퀴즈 문제 생성.
- 출력: `attacker`, `defender`, `questionArr`, `answerIdx`, `answer`, `isLoading`, `isError`.
- 특징: `staleTime: Infinity`, `gcTime: 0`, 실패 시 재시도 2회.
