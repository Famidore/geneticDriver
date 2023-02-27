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

        this.speedVar = 0.35
        this.dampForce = 1.07;
        this.angleForce = 4;

        this.loopCheck = false;
        this.score = 0;

        this.carColor = color(255, 0, 0)
    }

    show() {
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle + 270));
        noStroke();
        fill(this.carColor);
        rect(0, 0, this.size, this.size * 2);
        stroke(255, 0, 0);
        strokeWeight(2)
        line(0, 0, 0, this.size + 10)
        pop();

    }

    calculate(order) {
        if (controls[0] || order == 'w') {
            this.ay += sin(radians(this.angle));
            this.ax += cos(radians(this.angle));
        };
        if (controls[1] || order == 's') {
            this.ay -= sin(radians(this.angle));
            this.ax -= cos(radians(this.angle));
        };
        if (controls[2] || order == 'a') {
            this.angle -= this.angleForce;
            if (this.angle < 0) {
                this.angle = 360;
            };
        };
        if (controls[3] || order == 'd') {
            this.angle += this.angleForce;
            if (this.angle > 360) {
                this.angle = 0;
            };
        };

        this.ay
        this.ax


        this.vx += this.ax *= this.speedVar;;
        this.vy += this.ay *= this.speedVar;;

        this.x += this.vx
        this.y += this.vy

        textSize(64);
        stroke(255);
        textAlign(CENTER, BASELINE);
        text(this.score, width / 2, height / 2 + 50);

        this.ax = 0;
        this.ay = 0;

        this.vx /= this.dampForce;
        this.vy /= this.dampForce;
    }

    checkPath() {
        let currColor = get(this.x, this.y)[0]

        switch (currColor) {
            case 0: this.carColor = color(25, 255, 0); break;
            case 3: this.carColor = color(255, 25, 0); break;
            case 255: this.carColor = color(0, 25, 255); this.loopCheck = (!this.loopCheck && this.score % 2 == 0) ? true : false; break;
            case 200: this.carColor = color(0, 25, 255); this.loopCheck = (!this.loopCheck && this.score % 2 == 1) ? true : false; break;
            default: this.carColor = color(255, 25, 255); break;
        }

        if (this.loopCheck && this.x < width / 2) {
            this.score++;
        } else if (this.loopCheck && this.x > width / 2) {
            this.score++;
        }
    }
}