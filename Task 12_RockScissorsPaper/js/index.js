const choices = document.querySelectorAll('.choice');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const illustration = document.querySelector('#illustration');
illustration.innerHTML = `<img src="RSP.png" alt="Illustration">`
const scoreboard = {
  player: 0,
  computer: 0
};

function play(e) {
  restart.style.display = 'inline-block'
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice, scoreboard, modal);
}

choices.forEach(choice => {
  choice.addEventListener('click', play)
});
window.addEventListener('click', (e) => clearModal(e));
restart.addEventListener('click', () => restartGame(scoreboard));

const clearModal = (e) => {
  const modal = document.querySelector('.modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

const getWinner = (p, c) => {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

const random1 = 0.34;
const random2 = 0.67;

const getComputerChoice = () => {
  const rand = Math.random();
  if (rand < random1) {
    return 'rock'
  } else if (rand < random2) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

// Restart game
const restartGame = (scoreboard) => {
  const score = document.getElementById('score');
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
  <p>Player: 0</p>
  <p>Computer: 0</p>
  `;
}

const showWinner = (winner, computerChoice, scoreboard, modal) => {
  const score = document.getElementById('score');
  const result = document.getElementById('result');
  const computerText = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  if (winner === 'player') {
    scoreboard.player++;
    result.innerHTML = `
    <h1 class="text-win">You Win</h1>
    <i class="choice fas fa-hand-${computerChoice} "></i>
    <p>Computer Chose <strong>${computerText}</strong></p>
    `;
  } else if (winner === 'computer') {
    scoreboard.computer++;
    result.innerHTML = `
    <h1 class="text-lose">You Lose</h1>
    <i class="choice fas fa-hand-${computerChoice} "></i>
    <p>Computer Chose <strong>${computerText}</strong></p>
    `;
  } else {
    result.innerHTML = `
    <h1>It's A Draw</h1>
    <i class="choice fas fa-hand-${computerChoice} "></i>
    <p>Computer Chose <strong>${computerText}</strong></p>
    `;
  }

  // Show score
  score.innerHTML = `
  <p>Player: ${scoreboard.player}</p>
  <p>Computer: ${scoreboard.computer}</p>
  `;
  modal.style.display = 'block';
}
