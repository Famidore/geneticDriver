class GenAlgo {
    constructor(tempGen) {
        this.generation = tempGen;
        this.lineCheckpoints = [];

        this.lastCheck = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
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

            if (track.get(px, py)[0] == 3) { // change get to optimal func
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
        if (!trackCreator.hiddenCheckpoints || !trackCreator.hiddenUI) {
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
        const d2 = [driver.x + 10, driver.y + 10];

        for (let i = 0; i < this.lineCheckpoints.length - 1; i += 2) {
            var lc1 = this.lineCheckpoints[i];
            var lc2 = this.lineCheckpoints[i + 1];
            var inter = this.findIntersection(d1[0], d1[1], d2[0], d2[1], lc1[0], lc1[1], lc2[0], lc2[1]);

            if (inter) {
                //ellipse(inter[0], inter[1], 25, 25)

                if (dist(d1[0], d1[1], inter[0], inter[1]) <= driver.size * 2) {
                    if ((lc1 != this.lastCheck[0][0] && lc2 != this.lastCheck[0][1]) && (lc1 != this.lastCheck[1][0] && lc2 != this.lastCheck[1][1])) {

                        this.lastCheck.unshift([lc1, lc2]);
                        this.lastCheck.length > 2 ? this.lastCheck.pop() : '';

                        driver.checkPointScore++;
                        console.log('Passed checkpoint!');
                        OnSpecialGoodEvent(1.0)
                    }
                }
            }
        }
    }

    findIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        var uA, uB;
        var den, numA, numB;

        den = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
        numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

        if (abs(numA) == 0 && abs(numB) == 0 && abs(den) == 0) {
            var intx = (x1 + x2) / 2;
            var inty = (y1 + y2) / 2;
            return ([intx, inty]);
        }

        if (abs(den) == 0) {
            return (false);
        }

        uA = numA / den;
        uB = numB / den;

        if (uA < 0 || uA > 1 || uB < 0 || uB > 1) {
            return (false);
        }

        var intx = x1 + uA * (x2 - x1);
        var inty = y1 + uA * (y2 - y1);
        return ([intx, inty]);
    }
}

class Learning {
    constructor(learningRate) {
        this.learningRate = learningRate;
        this.tries = 0;
    }


    performAction(move) {
        if (driver.death) {
            driver.prevDeaths.unshift([driver.x, driver.y, driver.angle]);
            resetDrivers();
            this.tries++;
        }

        return move == 's' ? 'w' : move
    }
}