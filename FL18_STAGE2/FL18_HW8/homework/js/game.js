export const PAIRINGS = [
  [0, 2, 1],
  [1, 0, 2],
  [2, 1, 0],
];
export const GESTURES = ['Rock', 'Paper', 'Scissors'];

export const getRandomGestureIndex = () => Math.floor(Math.random() * GESTURES.length);
