# Pokémon Type Effectiveness Calculator

![Logo](https://github.com/user-attachments/assets/8cef1734-c16a-4c9e-a9b1-7434774aa55c)

A web application that helps Pokémon beginners easily understand type matchups and effectiveness calculations.

- **Service**: https://poke-match-type.site

## Overview

This web service provides an intuitive way to check Pokémon type effectiveness for beginners who find the type matchup system challenging. The project focuses on external API integration and data caching using React Query.

## Tech Stack

### Core Technologies

- **Framework**: React 18.2 + TypeScript 5.4
- **Build Tool**: Vite 5.2
- **Styling**: Emotion (React + Styled)
- **Server State**: TanStack Query 5.40
- **Client State**: React Context API
- **Storage**: Local Storage for user preferences

### External APIs

- **PokeAPI**: Pokemon data and type information

## Project Structure

```
poke-match-type/
├── src/
│   ├── ads/                    # Advertisement components
│   ├── api/                    # API integration layer
│   ├── components/             # React components
│   │   ├── commons/           # Reusable components
│   │   ├── modal/             # Modal dialogs
│   │   ├── nav/               # Navigation components
│   │   ├── quizes/            # Quiz mode components
│   │   ├── search/            # Search functionality
│   │   ├── skeleton/          # Loading skeletons
│   │   └── table/             # Type chart components
│   ├── const/                  # Constants and configurations
│   ├── datas/                  # Static JSON data
│   ├── hooks/                  # Custom React hooks
│   │   └── queries/           # TanStack Query hooks
│   ├── models/                 # TypeScript type definitions
│   ├── pages/                  # Page components
│   ├── styles/                 # Global styles
│   ├── utils/                  # Utility functions
│   └── imgs/                   # Image assets
├── public/                     # Static assets
└── Configuration files
```

## Features

1. Pokemon Search-Based Type Effectiveness
2. Type Selection-Based Effectiveness
3. Ability Type Support
4. Terastal Type Support
5. Interactive Quiz Mode
6. Type Effectiveness Reference Table
7. Internationalization (Korean, English, Japanese)
8. Theme Support (Light/Dark mode)

## License

This project is open source and available under the MIT License.

# blog

For detailed development process and troubleshooting stories, visit:

[효과는 굉장했다! 포켓몬 상성 계산기 만들기](https://velog.io/@changwoo/%ED%9A%A8%EA%B3%BC%EB%8A%94-%EA%B5%89%EC%9E%A5%ED%96%88%EB%8B%A4-%ED%8F%AC%EC%BC%93%EB%AA%AC-%EC%95%BD%EC%A0%90-%EA%B3%84%EC%82%B0%EA%B8%B0)

[방문객 수 10배 증가! 포켓몬 약점 계산기 리팩토링](https://velog.io/@changwoo/%EB%B0%A9%EB%AC%B8%EA%B0%9D-%EC%88%98-10%EB%B0%B0-%EC%A6%9D%EA%B0%80-%ED%8F%AC%EC%BC%93%EB%AA%AC-%EC%95%BD%EC%A0%90-%EA%B3%84%EC%82%B0%EA%B8%B0-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)
