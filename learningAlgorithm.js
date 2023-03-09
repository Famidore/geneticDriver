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

            if (track.get(px, py)[0] == 3) {
                // stroke(255, 0, 255, 100);
                // strokeWeight(2);
                // line(0, 0, i, 0);

                fill(51);
                ellipse(i, 0, 5, 5);
                linesControls[ind] = i;
                break;
            };
        };
        pop();
    }
}