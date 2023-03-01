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
        this.angleForce = 4;

        this.loopCheck = false;
        this.score = 0;
        this.death = false;

        this.carColor = color(100, 0, 0, 0);
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
        stroke(150, 0, 0, 50);
        strokeWeight(2)
        line(0, 0, 0, this.size + 10)

        pop();

    }

    calculate(order) {
        if (!this.death) {
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
        };


        this.vx += this.ax *= this.speedVar;
        this.vy += this.ay *= this.speedVar;

        this.x += this.vx;
        this.y += this.vy;

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
        let currColor = track.get(this.x, this.y)[0];

        switch (currColor) {
            case 0: this.carColor = color(25, 255, 0, 150); break;
            case 3: this.carColor = color(180, 25, 0, 150); this.death = true; break;
            case 255: this.carColor = color(10, 25, 255, 150); this.loopCheck = (!this.loopCheck && this.score % 2 == 0 && this.x < width / 2) ? (true, this.score++) : false; break;
            case 200: this.carColor = color(10, 25, 255, 150); this.loopCheck = (!this.loopCheck && this.score % 2 == 1 && this.x > width / 2) ? (true, this.score++) : false; break;
            default: this.carColor = color(180, 25, 255, 150); break;
        }
    }
}