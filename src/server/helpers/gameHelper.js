export const keys = {
  KDOWN: 40,
  KLEFT: 37,
  KRIGHT: 39,
  KUP: 38,
  KSPACE: 32,
  KENTER: 13,
};

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const STAGE_WIDTH_SMALL = 8;
export const STAGE_HEIGHT_SMALL = 8;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

export const calcScore = (level, lines) => {
  switch (lines) {
    case 1:
      return 40;
    case 2:
      return 100;
    case 3:
      return 300;
    case 4:
      return 1200;
    default:
      return 0;
  }
};

export const calcLevel = (lines) => Math.trunc(lines / 10) + 1;
