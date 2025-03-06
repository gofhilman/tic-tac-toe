const ticTacToe = (function (doc) {
    const nameForm = doc.querySelector("#name-form");
    const playerOne = doc.querySelector("#player-one");
    const playerTwo = doc.querySelector("#player-two");
    const confirmData = doc.querySelector("#confirm");

    const announcement = doc.querySelector("#announcement");
    const repeatGame = doc.querySelector("#repeat");

    const gameboard = doc.querySelector(".gameboard");
    const turnNumber = doc.querySelector("#turn-number");
    const playerOneName = doc.querySelector("#player-one-name");
    const playerTwoName = doc.querySelector("#player-two-name");

    const players = [];
    let moveCount = 0;

    function displayForm () {
        nameForm.showModal();
        confirmData.addEventListener('click', (event) => {
            event.preventDefault();
            nameForm.close(); 
            displayInfo();
            const playerObjs = createPlayers([playerOne.value, playerTwo.value]);
            playerObjs.forEach(player => players.push(player));
        });
    }

    function createGameboard () {
        let grids = [];
        for (let gridPos = 0; gridPos < 9; gridPos++) grids.push('');

        const marking = () => {
            gameboard.addEventListener('click', (event) => {
                let gameGrid = event.target.closest('.gameboard').children;
                let gridPos = Array.from(gameGrid).indexOf(event.target);
                if (grids[gridPos] === '') {
                    if (moveCount%2 === 0) {
                        grids[gridPos] = 'x';
                        gameGrid[gridPos].innerHTML = '<img src="icons/red-cross.png" alt="Cross">'
                    } else {
                        grids[gridPos] = 'o';
                        gameGrid[gridPos].innerHTML = '<img src="icons/rec.png" alt="Circle">'
                    }
                    moveCount++;
                    let gameDecision = decideGame();
                    if (gameDecision === 'draw') {
                        players.forEach(player => player.result = 'draw');
                    } else if (gameDecision) {
                        players.find(player => player.mark === gameDecision).result = 'win';
                    }
                    displayInfo();
                }
            });
        }

        const decideGame = () => {
            const winPatterns = [grids.slice(0,3), grids.slice(3,6),
                grids.slice(6,9), [grids[0], grids[3], grids[6]],
                [grids[1], grids[4], grids[7]], [grids[2], grids[5], grids[8]],
                [grids[0], grids[4], grids[8]], [grids[2], grids[4], grids[6]]
            ];
            let winPattern = winPatterns.find(pattern => checkPattern(pattern));
            if (winPattern) {
                return winPattern[0];
            }
            if (moveCount === 9) {
                return 'draw';
            }
        }

        const reset = () => {
            grids.fill('');
            moveCount = 0;
            players.forEach(player => player.result = '');
        }

        return { marking, reset };
    }

    function displayInfo () {
        turnNumber.textContent = `${moveCount + 1}`;
        playerOneName.textContent = `${playerOne.value}`;
        playerTwoName.textContent = `${playerTwo.value}`;
    }

    function createPlayers (playerNames) {
        return [{name: playerNames[0],
            mark: 'x',
            result: ''
        }, {name: playerNames[1],
            mark: 'o',
            result: ''
        }];
    }

    function checkPattern (pattern) {
        if (pattern[0]) {
            return pattern.every(mark => mark === pattern[0]);
        } 
    }
    
    return { displayForm, createGameboard };
})(document);

ticTacToe.displayForm();
const game = ticTacToe.createGameboard();
game.marking();