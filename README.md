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
- **Storage**: Local Storage for user preferences & quiz stamps, Session Storage for quiz sessions

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
│   │   ├── quiz/              # Quiz gameplay components
│   │   ├── quizHome/          # Quiz dashboard & selection
│   │   ├── search/            # Search functionality
│   │   ├── skeleton/          # Loading skeletons
│   │   └── table/             # Type chart components
│   ├── const/                  # Constants and configurations
│   ├── datas/                  # Static JSON data
│   ├── hooks/                  # Custom React hooks
│   │   └── queries/           # TanStack Query hooks
│   ├── models/                 # TypeScript type definitions
│   ├── pages/                  # Page components
│   │   └── quiz/              # Quiz flow pages (intro, play, result)
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
5. Interactive Quiz Mode (4 types, stamp card, ranking)
6. Type Effectiveness Reference Table
7. Internationalization (Korean, English)
8. Theme Support (Light/Dark mode)

## License

This project is open source and available under the MIT License.

# blog

For detailed development process and troubleshooting stories, visit:

[방문객 수 10배 증가! 포켓몬 약점 계산기 리팩토링](https://www.changchangwoo.com/post/projects/poke-match-type-refactor)
