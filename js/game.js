const step = 100;
const interval = 0.5;
let gameEnd = 0;

let xPositionHero = 0;
let yPositionHero = 0;

let xPositionGhost = 0;
let yPositionGhost = 0;

let xPositionTreasure = 0;
let yPositionTreasure = 0;

const hero = document.querySelector('.hero');
// hero.style.top = `${yPositionHero}px`;
// hero.style.left = `${xPositionHero}px`;

const ghost = document.querySelector('.ghost');
// ghost.style.top = `${yPositionGhost}px`;
// ghost.style.left = `${xPositionGhost}px`;

const treasure = document.querySelector('.treasure');
// treasure.style.top = `${yPositionTreasure}px`;
// treasure.style.left = `${xPositionTreasure}px`;

const message = document.querySelector('.message');

const btnStart = document.querySelector('#btn-start');
btnStart.addEventListener('click', (event) => {
    let gameEnd = 0;
    // Hide all at the beginning START
    hero.style.display = 'none';
    ghost.style.display = 'none';
    treasure.style.display = 'none';
    // Hide all at the beginning END

    // generation random position array of Ghost&Hero&Treasure START
    const xRandomPosition = () => {
        return Math.floor(Math.random() * 8) * 100;
    }
    const yRandomPosition = () => {
        return Math.floor(Math.random() * 6) * 100;
    }
    let randomPositionTreasure = [];
    randomPositionTreasure[0] = xRandomPosition();
    randomPositionTreasure[1] = yRandomPosition();

    let randomPositionGhost = [];
    randomPositionGhost[0] = xRandomPosition();
    randomPositionGhost[1] = yRandomPosition();

    let randomPositionHero = [];
    randomPositionHero[0] = xRandomPosition();
    randomPositionHero[1] = yRandomPosition();
    // generation random position array of Ghost&Hero&Treasure END

    //set&display random position of hero
    xPositionHero = randomPositionHero[0];
    yPositionHero = randomPositionHero[1];
    hero.style.top = `${yPositionHero}px`;
    hero.style.left = `${xPositionHero}px`;
    hero.style.display = 'initial';
    //set&display random position of Treasure
    xPositionTreasure = randomPositionTreasure[0];
    yPositionTreasure = randomPositionTreasure[1];
    treasure.style.top = `${yPositionTreasure}px`;
    treasure.style.left = `${xPositionTreasure}px`;
    treasure.style.display = 'initial';
    //set&display random position of Ghost
    xPositionGhost = randomPositionGhost[0];
    yPositionGhost = randomPositionGhost[1];
    ghost.style.top = `${yPositionGhost}px`;
    ghost.style.left = `${xPositionGhost}px`;
    ghost.style.display = 'initial';

    //Hero free movement START
    window.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowUp' || event.code === 'KeyW') {
            if (yPositionHero > 0) {
                hero.style.top = `${yPositionHero -= step}px`;

            }
        } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
            if (yPositionHero < 500) {
                hero.style.top = `${yPositionHero += step}px`;

            }
        } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
            if (xPositionHero < 700) {
                hero.style.left = `${xPositionHero += step}px`;
            }

        } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
            if (xPositionHero > 0) {
                hero.style.left = `${xPositionHero -= step}px`;
            }
        }
    })
    //Hero free movement END

    // let ghost moving towards hero direction 
    const ghostMove = setInterval(() => {

        // DISTANCE EVALUATION START
        //Hero vs. Ghost
        let xDistanceHeroGhost = xPositionHero - xPositionGhost;
        let yDistanceHeroGhost = yPositionHero - yPositionGhost;
        // Treasure vs. Hero
        let xDistanceTreasureHero = xPositionTreasure - xPositionHero;
        let yDistanceTreasureHero = yPositionTreasure - yPositionHero;
        //Treasure vs. Ghost
        let xDistanceTreasureGhost = xPositionTreasure - xPositionGhost;
        let yDistanceTreasureGhost = yPositionTreasure - yPositionGhost;
        // DISTANCE EVALUATION END

        switch (true) {
            case (xDistanceHeroGhost > 0):
                ghost.style.left = `${xPositionGhost += step}px`;
                break;
            case (xDistanceHeroGhost < 0):
                ghost.style.left = `${xPositionGhost -= step}px`;
                break;
            case (yDistanceHeroGhost > 0):
                ghost.style.top = `${yPositionGhost += step}px`;
                break;
            case (yDistanceHeroGhost < 0):
                ghost.style.top = `${yPositionGhost -= step}px`;
                break;
            case (xDistanceHeroGhost === 0 && yDistanceHeroGhost === 0):
                ghost.style.left = `${xPositionGhost}px`;
                ghost.style.top = `${yPositionGhost}px`;
                gameEnd = 2;
                break;

        };

        // WINNER EVALUATION
        const winnerEvaluation = () => {
            if (xDistanceTreasureHero === 0 && yDistanceTreasureHero === 0) {
                gameEnd = 1;
                terminateGame(gameEnd);
            } else if (xDistanceTreasureGhost === 0 && yDistanceTreasureGhost === 0) {
                gameEnd = 3;
                terminateGame(gameEnd);
            } else if (gameEnd === 2) {
                terminateGame(gameEnd);
            }
        }
        winnerEvaluation();


    }, `${interval * 1000}`);

    const terminateGame = (terminateCode) => {
        if (terminateCode === 1) {
            clearInterval(ghostMove);
            return message.innerHTML = "Hero reached Treasure and wins!";
        } else if (terminateCode === 2) {
            clearInterval(ghostMove);
            return message.innerHTML = " You lost : Ghost killed You!";
        } else if (terminateCode === 3) {
            clearInterval(ghostMove);
            return message.innerHTML = "You lost : Ghost reached Treasure before you!";
        }
    }

})

