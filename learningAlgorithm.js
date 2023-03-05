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
        var s = this.checkCollision(carX, carY, len, carAngle)
        push();
        translate(carX, carY);
        rotate(radians(carAngle));
        if (!s) {
            stroke(255, 0, 0);
            linesControls[ind] = 1;
        } else {
            linesControls[ind] = 0;
            stroke(255, 0, 255, 100);
        }
        strokeWeight(2);
        line(0, 0, len, 0);
        pop();

    }

    checkCollision(x, y, l, a) {
        const px = x + l * cos(radians(a));
        const py = y + l * sin(radians(a));
        if (track.get(px, py)[0] != 3) {
            return true
        }
    }
}