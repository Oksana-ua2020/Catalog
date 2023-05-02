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
