'use strict'

const askWantPlay = confirm('Do you want to play a game?');

if (askWantPlay) {
    do {
        const massageThankParticip = 'Thank you for your participation. ';
        const massagePrize = 'Your prize is: ';
        const massageСurrency = '$. ';
        const massageWon = 'Congratulation, you won! ';

        const minRange = 0;
        const rangeStep = 4;
        const prizeIndex = 2;
        const maxAttempts = 3;
        const fixPrize = 100;


        let totalPrize = 0;
        let maxRange = 8;
        let userRoundIndex = 1;
        let maxPrize = fixPrize * userRoundIndex;
        let attempts = 3;


        let randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        while (attempts) {
            const pick = prompt(`
    Choose a roulette pocket number from 0 to ${maxRange}
    Attempts left: ${attempts}
    Total prise: ${totalPrize} ${massageСurrency}
    Possible prize on current attempt: ${maxPrize}
    `)
            let userGuess = parseInt(pick) === randomNumber;
            if (userGuess) {
                totalPrize += maxPrize;
                if (confirm(`${massageWon} ${massagePrize} ${totalPrize} ${massageСurrency} 
    Do you want to continue?`)) {
                    maxPrize = fixPrize * userRoundIndex * prizeIndex;
                    maxRange += rangeStep;
                    attempts = maxAttempts;
                    userRoundIndex *= prizeIndex;
                    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
                } else {
                    attempts = 0;
                    userRoundIndex = 1;
                }
            } else {
                maxPrize /= prizeIndex;
                attempts--;
            }
        }
        alert(`${massageThankParticip} ${massagePrize} ${totalPrize}  ${massageСurrency}`)
    }
    while (confirm('Do you want to play again?'))
} else {
    alert('You did not become a billionaire, but can.');
}
