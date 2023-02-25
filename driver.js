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

        this.dampForce = 1.07;
        this.angleForce = 5;

        this.vibeCheck = false;
    }

    show() {
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle + 270));
        noStroke();
        fill(0, 255, 0);
        rect(0, 0, this.size, this.size * 2);
        stroke(255, 0, 0);
        strokeWeight(2)
        line(0, 0, 0, this.size + 10)
        pop();

    }

    calculate() {
        if (controls[0]) {
            this.ay += sin(radians(this.angle));
            this.ax += cos(radians(this.angle));
        };
        if (controls[1]) {
            this.ay -= sin(radians(this.angle));
            this.ax -= cos(radians(this.angle));
        };
        if (controls[2]) {
            this.angle -= this.angleForce;
            if (this.angle < 0) {
                this.angle = 360;
            };
        };
        if (controls[3]) {
            this.angle += this.angleForce;
            if (this.angle > 360) {
                this.angle = 0;
            };
        };


        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        textSize(64);
        stroke(255);
        textAlign(CENTER, CENTER);
        text([round(this.vx, 2), round(this.vy, 2)], width / 2, height / 2);

        text(controls, width / 2, height / 2 + 64);
        text(this.angle, width / 2, height / 2 + 128);

        this.ax = 0;
        this.ay = 0;

        this.vx /= this.dampForce;
        this.vy /= this.dampForce;
    }

    checkPath(){
        const currColor = get(this.x, this.y + this.size)
    }
}