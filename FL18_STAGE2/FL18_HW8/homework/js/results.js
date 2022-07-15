export const showRoundInfo = (roundText, roundNumber) => {
  document.getElementById('gameResults').insertAdjacentHTML(
    'beforeend',
    `<li class="game-results-item">
                <span class="game-results-label">Round ${roundNumber}</span>
                <span class="game-results-details round-details">${roundText}</span>
            </li>`,
  );
};

export const showWinnerInfo = (winner) => {
  document.getElementById('gameResults').insertAdjacentHTML(
    'beforeend',
    `<li class="game-results-item">
                <span class="game-results-label winner-label">Winner</span>
                <span class="game-results-details winner-details">${winner}</span>
            </li>`,
  );
};
