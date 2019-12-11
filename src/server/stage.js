
export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;


export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));






export const STAGE_WIDTH_PIECE = 10;
export const STAGE_HEIGHT_PIECE = 4;


export const createStagePiece = () => Array.from(Array(STAGE_HEIGHT_PIECE), () => new Array(STAGE_WIDTH_PIECE).fill([0, 'clear']));
