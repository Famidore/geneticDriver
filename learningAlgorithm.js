class GenAlgo {
    constructor(tempGen) {
        this.generation = tempGen;
        this.lineCheckpoints = [];

        this.lastCheck = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];

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
                stroke(255, 0, 255, 100);
                strokeWeight(2);
                line(0, 0, i, 0);

                fill(51);
                ellipse(i, 0, 5, 5);
                linesControls[ind] = i;
                break;
            };
        };
        pop();
    }

    showCheckpoints() {
        // if (!trackCreator.hiddenUI){
        if (true) {
            for (let i = 0; i < this.lineCheckpoints.length - 1; i += 2) {
                stroke(51, 255, 51);
                strokeWeight(3);
                if (this.lineCheckpoints.length % 2 == 0) {
                    line(this.lineCheckpoints[i][0], this.lineCheckpoints[i][1], this.lineCheckpoints[i + 1][0], this.lineCheckpoints[i + 1][1]);
                } else {
                    line(this.lineCheckpoints[i + 1][0], this.lineCheckpoints[i + 1][1], this.lineCheckpoints[i + 2][0], this.lineCheckpoints[i + 2][1]);
                    line(this.lineCheckpoints[0][0], this.lineCheckpoints[0][1], mouseX, mouseY);
                }
            }
        }
    }

    checkCheckpoint() {
        const d1 = [driver.x, driver.y];
        const d2 = [driver.x + 10, driver.y];

        for (let i = 0; i < this.lineCheckpoints.length - 1; i += 2) {
            var lc1 = this.lineCheckpoints[i];
            var lc2 = this.lineCheckpoints[i + 1];
            var inter = this.findIntersection(d1, d2, this.lineCheckpoints[i], this.lineCheckpoints[i + 1])

            if (dist(d1[0], d1[1], inter[0], inter[1]) <= driver.size * 2) {
                if ((lc1 != this.lastCheck[0][0] && lc2 != this.lastCheck[0][1]) && (lc1 != this.lastCheck[1][0] && lc2 != this.lastCheck[1][1])) {

                    this.lastCheck.unshift([lc1, lc2]);
                    this.lastCheck.length > 2 ? this.lastCheck.pop() : '';

                    console.log('Passed checkpoint!');
                }
            }
        }

    }

    findIntersection(p1, p2, p3, p4) {
        const ua = ((p4[0] - p3[0]) * (p1[1] - p3[1]) -
            (p4[1] - p3[1]) * (p1[0] - p3[0])) /
            ((p4[1] - p3[1]) * (p2[0] - p1[0]) -
                (p4[0] - p3[0]) * (p2[1] - p1[1]));

        const ub = ((p2[0] - p1[0]) * (p1[1] - p3[1]) -
            (p2[1] - p1[1]) * (p1[0] - p3[0])) /
            ((p4[1] - p3[1]) * (p2[0] - p1[0]) -
                (p4[0] - p3[0]) * (p2[1] - p1[1]));

        const x = p1[0] + ua * (p2[0] - p1[0]);
        const y = p1[1] + ua * (p2[1] - p1[1]);

        return [x, y]
    }
}


/*
TODO
find a way to clear each checkpoint without going back - done
interpolate points drawn when creating track
implement reinforced learning :)
*/