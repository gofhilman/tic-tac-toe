const ticTacToe = (function (doc) {
    const nameForm = doc.querySelector("#name-form");
    const playerOne = doc.querySelector("#player-one");
    const playerTwo = doc.querySelector("#player-two");
    const confirmData = doc.querySelector("#confirm");

    const announcement = doc.querySelector("#announcement");
    const announceText = doc.querySelector("#announcement p");
    const repeatGame = doc.querySelector("#repeat");

    const gameboard = doc.querySelector(".gameboard");
    const boardGrids = doc.querySelectorAll(".grid");
    const turnNumber = doc.querySelector("#turn-number");
    const playerOneName = doc.querySelector("#player-one-name");
    const playerTwoName = doc.querySelector("#player-two-name");
    const crossMark = doc.querySelector(".mark:nth-of-type(1)");
    const circleMark = doc.querySelector(".mark:nth-of-type(2)");

    const players = [];
    const grids = [];
    for (let gridPos = 0; gridPos < 9; gridPos++) grids.push('');
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

    function createPlayers (playerNames) {
        return [{name: playerNames[0],
            mark: 'x',
            result: ''
        }, {name: playerNames[1],
            mark: 'o',
            result: ''
        }];
    }

    function marking () {
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
                    announce(players[0]);
                } else if (gameDecision) {
                    let winner = players.find(player => player.mark === gameDecision);
                    winner.result = 'win';
                    announce(winner);
                }
                displayInfo();
            }
        });
    }

    function decideGame () {
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

    function checkPattern (pattern) {
        if (pattern[0]) {
            return pattern.every(mark => mark === pattern[0]);
        } 
    }

    function displayInfo () {
        turnNumber.textContent = `${moveCount + 1}`;
        playerOneName.textContent = `${playerOne.value}`;
        playerTwoName.textContent = `${playerTwo.value}`;
        if (moveCount%2 === 0) {
            playerOneName.style.opacity = 1;
            playerTwoName.style.opacity = 0.3;
            crossMark.style.filter = 'invert(100%) brightness(1000%)';
            circleMark.style.filter = 'invert(30%) brightness(100%)';
        } else {
            playerOneName.style.opacity = 0.3;
            playerTwoName.style.opacity = 1;
            crossMark.style.filter = 'invert(30%) brightness(100%)';
            circleMark.style.filter = 'invert(100%) brightness(1000%)';
        }
    }

    function announce (player) {
        moveCount--;
        displayInfo();
        announcement.showModal();
        if (player.result === 'draw') {
            announceText.textContent = 'The game is draw!';
        } else {
            announceText.textContent = `${player.name} wins!`;
        }
        repeatGame.addEventListener('click', (event) => {
            event.preventDefault();
            announcement.close(); 
            reset();
            displayInfo();
        });
    }

    function reset () {
        grids.fill('');
        boardGrids.forEach(boardGrid => boardGrid.replaceChildren());
        moveCount = 0;
        players.forEach(player => player.result = '');
        [players[0].name, players[1].name] = [players[1].name, players[0].name];
    }
    
    return { displayForm, marking };
})(document);

ticTacToe.displayForm();
ticTacToe.marking();