/* START TASK 1:*/
let table = document.getElementById('table')

table.onclick = function (event) {
  let td = event.target.closest('td');
  if (!td) {
    return
  }
  if (!table.contains(td)) {
    return
  }
  td.id !== 'special' ? setColor(td) : setColorSpecialCell();
};

function setColor(selectedTd) {
  selectedTd.cellIndex === 0 ? setColorBlue(selectedTd) : setColorYellow(selectedTd);
}

function setColorSpecialCell() {
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      if (!row.cells[j].classList.length > 0) {
        row.cells[j].classList.add('td-green');
      }
    }
  }
}

function setColorYellow(selectedTd) {
  if (!selectedTd.classList.contains('td-yellow')) {
    selectedTd.classList.add('td-yellow')
  }
}

function setColorGreen(selectedTd) {
  !selectedTd.classList.contains('td-yellow') ? selectedTd.classList.add('td-yellow') :
    selectedTd.classList.add('td-green');
}

function setColorBlue(selectedTd) {
  let row = selectedTd.parentElement;
  for (let i = 0; i < row.cells.length; i++) {
    if (!row.cells[i].classList.length > 0) {
      row.cells[i].classList.add('td-blue');
    }
  }
}
/* END TASK 1 */

/* START TASK 2:*/
const phone = document.getElementById('phone');
const validPhone = document.createElement('p');
const select = document.getElementById('send');
validPhone.id = 'notification';

phone.addEventListener('input', function () {
  if (phone.value.length > 0) {
    if (phone.validity.valid) {
      validPhone.className = 'notification notification-valid';
      validPhone.innerText = `Data was successfully sent`;
      phone.before(validPhone);
    } else {
      validPhone.className = 'notification notification-invalid';
      validPhone.innerText = `Type number does follow format
    +380*********`;
      phone.before(validPhone);
      select.disabled = true;
    }
  } else {
    const notificationRemove = document.getElementById('notification');
    notificationRemove.remove();
    select.disabled = false;
  }
}, false);

/* END TASK 2 */

/* START TASK 3:*/
const n15 = 15;
const n3000 = 3000;

let ball = document.getElementById('ball');
let court = document.getElementById('court');
let goalsTeamA = 0;
let goalsTeamB = 0;

const scoringZoneA = document.getElementById('scoringZoneA');
const scoringZoneB = document.getElementById('scoringZoneB');

const scoreboard = document.getElementById('scoreboard');
const scoreboardA = document.getElementById('scoreboardA');
const scoreboardB = document.getElementById('scoreboardB');

const teamA = 'Team A';
const teamB = 'Team B';

court.addEventListener('mousedown', function(e) {
  const target = this;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left - n15;
  const y = e.clientY - rect.top - n15;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
}, true);

function clearMassage() {
  const delMassage = document.getElementById('massage');
  delMassage.remove();
}

function addMassage(team) {
  const resultMassage = document.createElement('p');
  resultMassage.id = 'massage';
  resultMassage.className = 'massage';
  resultMassage.innerText = `Team ${team} score!`
  scoreboard.after(resultMassage);
  setTimeout(clearMassage, n3000);
}
function addScore(team, score) {
  const teamId = `team${team}`;
  const delScore = document.getElementById(teamId);
  const boxScore = document.createElement('p');
  boxScore.id = teamId;
  boxScore.innerText = `Team ${team}:${score}`
  delScore.replaceWith(boxScore);
}
let setScoreboardA = () => goalsTeamA++;
let setScoreboardB = () => ++goalsTeamB;

scoringZoneA.addEventListener('mousedown', function() {
  setScoreboardA();
  addScore('A', goalsTeamA);
  addMassage('A')
});

scoringZoneB.addEventListener('mousedown', function() {
  setScoreboardB();
  addScore('B', goalsTeamB);
  addMassage('B')
});
/* END TASK 3 */
