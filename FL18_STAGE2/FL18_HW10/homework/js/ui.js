export const appendSign = (div, sign) => {
    div.insertAdjacentHTML('beforeend', `<div class="${sign}"></div>`);
};

export const highlightUsername = (classToAdd, classToRemove) => {
    document.getElementById(classToAdd).classList.add('highlight-player-name');
    document.getElementById(classToRemove).classList.remove('highlight-player-name');
}

export const showMessageBox = (msg) => {
    document.getElementById('winner-message').innerText = msg;
    document.getElementById('winner-message-background').classList.add('show-winner-messagebox');
}

export const hideMessageBox = () => document.getElementById('winner-message-background')
    .classList.remove('show-winner-messagebox');
