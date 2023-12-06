import { IGameMode } from '@core/interfaces/model/GameMode';

export const GAME_MODE: IGameMode[] = [
  {
    rank: 'Easy',
    numberOfHorizontalItems: 4,
    numberOfVerticalItems: 4,
  },
  {
    rank: 'Normal',
    numberOfHorizontalItems: 6,
    numberOfVerticalItems: 6,
  },
  {
    rank: 'Hard',
    numberOfHorizontalItems: 8,
    numberOfVerticalItems: 8,
  },
  {
    rank: 'Super Hard',
    numberOfHorizontalItems: 10,
    numberOfVerticalItems: 10,
  },
];

export const NUMBER_OF_DUPLICATE_CARDS = 2;

export const MAX_ALLOWED_FLIPPED_CARDS = 2;

export const FLIPPING_TIME_IN_MILI_SECOND = 800;

export const RATIO_OF_HEIGHT_AND_WIDTH = 4 / 3;

export const TOTAL_NUMBER_OF_CARDS = 64;

export const CARD_SCREEN_WIDTH_IN_PIXEL = 600;
