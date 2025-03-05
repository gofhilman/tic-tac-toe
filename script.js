const ticTacToe = (function (doc) {
    function createGameboard (players) {
        let moveCount = 0;
        let grids = [];
        for (let gridPos = 0; gridPos < 9; gridPos++) grids.push('');

        const marking = (gridPos) => {
            if (grids[gridPos] === '') {
                if (moveCount%2 === 0) {
                    grids[gridPos] = 'x';
                } else {
                    grids[gridPos] = 'o';
                }
                moveCount++;
                let gameDecision = decideGame();
                if (gameDecision === 'draw') {
                    players.forEach(player => player.result = 'draw');
                } else if (gameDecision) {
                    players.find(player => player.mark === gameDecision).result = 'win';
                }
            }
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

        return { get grids() { return grids.slice(); }, 
            marking, 
            reset 
        };
    }

    function createPlayer (name, mark) {
        let result = '';
        return { name, mark, result };
    };

    function checkPattern(pattern) {
        if (pattern[0]) {
            return pattern.every(mark => mark === pattern[0]);
        } 
    }
    
    return { createGameboard, createPlayer };
})(document);

hilman = ticTacToe.createPlayer('Hilman','x');
fikry = ticTacToe.createPlayer('Fikry', 'o');
game = ticTacToe.createGameboard([hilman, fikry]);
// document.querySelector("#name-form").showModal();