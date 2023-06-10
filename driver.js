class Driver {
    constructor(tempX, tempY, tempSize) {
        this.x = tempX;
        this.y = tempY;

        this.size = tempSize;

        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;


        // hiperParameters zone!
        this.speedVar = 0.35;
        this.dampForce = 1.07;
        this.angleForce = 3;

        this.loopCheck = false;
        this.score = 0;
        this.checkPointScore = 0;
        this.death = false;

        this.carColor = color(100, 0, 0, 0);

        this.prevDeaths = [];
    }

    show() {
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle + 270));

        noStroke();
        if (!this.death) {
            noFill()
            imageMode(CENTER)
            carModelPath.resize(this.size, this.size * 2)
            image(carModelPath, 0, 0)
            //fill(this.carColor);
        } else {
            fill(199, 25, 0, 150)
        };
        rect(0, 0, this.size, this.size * 2);

        pop();


        // render previous deaths
        for (i in this.prevDeaths) {
            push();
            translate(this.prevDeaths[i][0], this.prevDeaths[i][1]);
            rotate(radians(this.prevDeaths[i][2] + 270));

            fill(199, 25, 0, 150 - 30 * i)
            noStroke();
            rect(0, 0, this.size, this.size * 2);

            pop();
            i > 5 ? this.prevDeaths.pop() : '';
        }

    }

    calculate(order) {
        if (!this.death) {
            if (controls[0] || order == 'w' || order == 0) {
                this.ay += sin(radians(this.angle));
                this.ax += cos(radians(this.angle));
            };
            if (controls[1] || order == 's') {
                this.ay -= sin(radians(this.angle));
                this.ax -= cos(radians(this.angle));
            };
            if (controls[2] || order == 'a' || order == 2) {
                this.angle -= this.angleForce;
                if (this.angle < 0) {
                    this.angle = 360;
                };
            };
            if (controls[3] || order == 'd' || order == 3) {
                this.angle += this.angleForce;
                if (this.angle > 360) {
                    this.angle = 0;
                };
            };
        };


        this.vx += this.ax *= this.speedVar;
        this.vy += this.ay *= this.speedVar;

        this.x += this.vx;
        this.y += this.vy;

        strokeWeight(2);
        textSize(64);
        stroke(51);
        fill(255);
        textAlign(CENTER, BASELINE);
        text(this.score, width / 2, height / 2 + 25);
        text(RL.tries, width / 2, height / 2 + 100);

        this.ax = 0;
        this.ay = 0;

        this.vx /= this.dampForce;
        this.vy /= this.dampForce;
    }

    checkPath() {
        let currColor = track.get(this.x, this.y)[0];

        switch (currColor) {
            case 0: this.carColor = color(25, 255, 0, 150); break;
            case 3: this.carColor = color(180, 25, 0, 150); this.death = true; OnSpecialBadEvent(); resetDrivers(); break;
            case 255: this.carColor = color(10, 25, 255, 150); this.loopCheck = (!this.loopCheck && this.score % 2 == 0) ? (true, this.score++, OnSpecialGoodEvent(2.0)) : false; break;
            case 200: this.carColor = color(10, 25, 255, 150); this.loopCheck = (!this.loopCheck && this.score % 2 == 1) ? (true, this.score++, OnSpecialGoodEvent(2.0)) : false; break;
            default: this.carColor = color(180, 25, 255, 150); break;
        }
    }

    sendInputs(){
        return [this.x, this.y, this.angle, this.vx, this.vy]
    }
}