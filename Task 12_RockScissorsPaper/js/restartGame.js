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
