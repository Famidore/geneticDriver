class GenAlgo {
    constructor(arrLen, tempGen) {
        this.generation = tempGen;
        this.printed = false;
        this.arrLen = arrLen;
    }

    generateMoves(index) {
        this.moves = [];
        for (let i = 0; i < this.arrLen; i++) {
            this.moves.push(keys[Math.floor(keys.length * Math.random())]);
        };
        this.generation.push([this.moves, index]);

        return this.moves;
    }

    saveMoves() {
        let json = {};
        json.generation = this.generation;

        saveJSON(json, 'data.json');
    }
}