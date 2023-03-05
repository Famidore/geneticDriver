class GenAlgo {
    constructor(tempGen) {
        this.generation = tempGen;
        this.printed = false;
    }

    generateMoves(index) {
    }

    saveMoves() {
        let json = {};
        json.generation = this.generation;

        saveJSON(json, 'data.json');
    }
}