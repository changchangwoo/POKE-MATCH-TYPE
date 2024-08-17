# 포켓몬 약점 계산기(POKE-MATCH-TYPE)
![로고 이미지](https://velog.velcdn.com/images/changwoo/post/8fe6e6f4-31e2-4bf7-855a-bc0b6594418c/image.png)
- **🌐** 배포 URL : https://poke-match-type.vercel.app/
- **🗓️** 프로젝트 기간 :  2024-06-13 ~ 2024-06-16 ( 3일 )
- 1인 개발

포켓몬의 약점 시스템에 적응하기 어려운 초보자들을 대상으로 입력된 포켓몬과 타입을 기반으로 약점을 간편하게 제공하는 웹 서비스입니다. 외부 API 활용과 리액트 쿼리를 통한 데이터 캐싱의 이해 향상을 목적으로 구현하였습니다.

## 구현 목표

> - 타입스크립트를 활용한 구현
> - tanstackQuery를 활용한 통신 데이터 캐싱, 동기화
> - useHookForm을 활용한 입력 데이터 관리
> - 모바일 우선 구현 + 반응형
> - 프론트엔드 서버 배포

## 기술 스택

- 프레임워크 : React, Typescript
- 스타일 관리 : Emotion
- 통신 및 서버 데이터 관리  : axios, tanstack-query
- 유틸 : useHookForm

## 기능 소개

### 포켓몬 검색 기반 약점 파악
![검색 기반 약점 파악](https://velog.velcdn.com/images/changwoo/post/9195b2ca-9d69-4473-b862-4c532b0d6437/image.gif)
<br/>
* 검색란을 통해 포켓몬 이름을 입력받으면, 자동완성을 통해 연관된 내용을 출력하며 데이터에 접근할 수 있습니다.
* 입력한 포켓몬 이름을 바탕으로 포켓몬의 정보와 약점을 계산해 출력합니다.
* 검색 데이터는 로컬 스토리지에 저장됩니다.

### 타입 검색 기반 약점 파악
![타입 기반 약점 파악](https://velog.velcdn.com/images/changwoo/post/38a0e59f-9788-4f0f-af14-6507077f08e6/image.gif)
<br/>
* 타입 클릭을 통해 최대 2개의 타입을 선택할 수 있으며, 이를 바탕으로 해당 타입의 약점을 계산해 출력합니다.
* 타입 데이터는 로컬 스토리지에 저장됩니다.

### 특성 검색 기반 약점 파악
![특성 검색 기반 약점 파악](https://velog.velcdn.com/images/changwoo/post/684560c1-24f1-4e53-b8fe-b23a8acfd17b/image.gif)
<br/>
* 검색된 포켓몬 및 입력된 타입과는 독립적으로, 약점 로직에 추가로 적용되는 특성을 선택할 수 있습니다.
* 이를 바탕으로 기존 약점 추/경감 계산에 해당 타입의 약점을 추가적으로 계산해 출력합니다.
* 특성 데이터는 로컬 스토리지에 저장됩니다.
