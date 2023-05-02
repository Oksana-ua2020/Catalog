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
