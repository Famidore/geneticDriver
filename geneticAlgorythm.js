class GenAlgo {
    constructor(arrLen, tempGen, ix) {
        this.moves = [];
        this.index = ix;
        for (let i = 0; i < arrLen; i++) {
            this.moves.push(keys[Math.floor(keys.length * Math.random())]);
        };

        this.generation = tempGen;
        this.printed = false;
    }

    saveMoves() {
        let json = {};
        json.moves = this.moves;
        json.generation = this.generation;

        saveJSON(json, 'data.json')
    }

    printBest(){
        if (frameCount > this.moves.length && !this.printed){
            scores.push(drivers[this.index].score)
            this.printed = true;
        }
        
    }
}