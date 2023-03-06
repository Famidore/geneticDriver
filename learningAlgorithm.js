class GenAlgo {
    constructor(tempGen) {
        this.generation = tempGen;
    }

    generateMoves(index) {
    }

    saveMoves() {
        let json = {};
        json.generation = this.generation;

        saveJSON(json, 'data.json');
    }

    generateLines(len, carX, carY, carAngle, ind) {
        push();
        translate(carX, carY);
        rotate(radians(carAngle));
        for (let i = 0; i < len; i++) {
            const px = carX + i * cos(radians(carAngle))
            const py = carY + i * sin(radians(carAngle))
            stroke(255, 0, 255, 100);
            strokeWeight(1);
            line(0, 0, i, 0);
            if (track.get(px, py)[0] == 3) {ellipse(i, 0, 25, 25); break; };
        };

        pop();
    }
}