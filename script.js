const ticTacToe = (function (doc) {
    let iter = 0;

    function createGameboard () {
        const grids = [];
        for (let gridPos = 0; gridPos < 9; gridPos++) grids.push('');

        const marking = (gridPos) => {
            if (grids[gridPos] === '') {
                if (iter%2 === 0) {
                    grids[gridPos] = 'x';
                } else {
                    grids[gridPos] = 'o';
                }
                iter++;
            }
        }
        return { grids, marking };
    }

    function createPlayer (name, mark) {
        return { name, mark };
    };
    
    return {createGameboard, createPlayer};
})(document);