/* START TASK 1: Your code goes here */
const color = {'1': 'yellow', '2': 'blue', '3': 'green'};
const table = document.getElementById('table');
const cells = document.querySelectorAll('td');
const tableSize = 3;

cells.forEach(cell => {
    cell.addEventListener('click', cellColoring);
});

function cellColoring() {
    if (this.cellIndex === 0) {
        for (const td of this.parentNode.children) {
            td.classList.toggle(`${color['2']}-cell`);
        }
    } else if (this.cellIndex === 1 && this.closest('tr').rowIndex === 1) {
        table.classList.toggle(`${color['3']}-cell`);
        for (let row = 0; row < tableSize; row++) {
            for (let col = 0; col < tableSize; col++) {
                let cell = table.rows[row].cells[col];
                cell.classList.toggle(`${color['3']}-cell`);
            }
        }
    } else {
        this.classList.toggle(`${color['1']}-cell`);
    }
}

/* END TASK 1 */

/* START TASK 2: Your code goes here */
const label = document.getElementById('phoneLabel');
const sendBtn = document.getElementById('send');
const input = document.getElementById('phone');
sendBtn.addEventListener('click', validatePhoneNumber);

function validatePhoneNumber() {
    if (/^(\+380)[0-9]{9}$/.test(input.value)) {
        label.textContent = 'Data was successfully send';
        label.style.backgroundColor = 'green';
        input.style.border = '2px solid green';
        sendBtn.disabled = false;
        input.removeEventListener('keyup', unHideBtnOnValid);
    } else {
        label.textContent = 'Type number does not follow format +380*********';
        label.style.backgroundColor = 'lightcoral';
        input.style.border = '2px solid lightcoral';
        sendBtn.disabled = true;
        input.addEventListener('keyup', unHideBtnOnValid);
    }
}

function unHideBtnOnValid() {
    sendBtn.disabled = !/^(\+380)[0-9]{9}$/.test(input.value);
}

/* END TASK 2 */

/* START TASK 3: Your code goes here */
const court = document.getElementById('court');
const ball = document.getElementById('ball');
const scoreA = document.getElementById('score-a');
const scoreB = document.getElementById('score-b');
const notification = document.getElementById('score-notification');
court.addEventListener('click', playBasketball);

function playBasketball(e) {
    const courtSize = this.getBoundingClientRect();
    const coordinates = {x: e.clientX - courtSize.x, y: e.clientY - courtSize.y};
    const min = {x: 22, y: 21}, max = {x: 577, y: 307};
    const teamAHoop = {x: 40, y: 165}, teamBHoop = {x: 560, y: 165};
    const scoringZone = 7.5;
    if (coordinates.x > max.x) {
        coordinates.x = max.x;
    }
    if (coordinates.x < min.x) {
        coordinates.x = min.x;
    }
    if (coordinates.y > max.y) {
        coordinates.y = max.y;
    }
    if (coordinates.y < min.y) {
        coordinates.y = min.y;
    }
    ball.style.left = coordinates.x + 'px';
    ball.style.top = coordinates.y + 'px';
    let teamScore;
    if (Math.abs(coordinates.x - teamAHoop.x) <= scoringZone &&
        Math.abs(coordinates.y - teamAHoop.y) <= scoringZone) {
        scoreB.innerHTML = `${++scoreB.innerHTML}`;
        teamScore = 'Team B';
    }
    if (Math.abs(coordinates.x - teamBHoop.x) <= scoringZone &&
        Math.abs(coordinates.y - teamBHoop.y) <= scoringZone) {
        scoreA.innerHTML = `${++scoreA.innerHTML}`;
        teamScore = 'Team A';
    }
    notification.dispatchEvent(new CustomEvent('scoreNotifications', {detail: {team: teamScore}}));
}

notification.addEventListener('scoreNotifications', function (e) {
    if (e.detail.team === 'Team A') {
        notification.innerHTML = 'Team A score!';
        notification.style.color = 'blue';
        cleanNotification();
    }
    if (e.detail.team === 'Team B') {
        notification.innerHTML = 'Team B score!';
        notification.style.color = 'red';
        cleanNotification();
    }
});

function cleanNotification() {
    const delay = 3000;
    setTimeout(function () {
        notification.innerHTML = '&nbsp;';
    }, delay);
}

/* END TASK 3 */