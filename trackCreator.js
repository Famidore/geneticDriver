class TrackCreator {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;

        this.button;
        this.buttonSaving;

        this.painterSize = 50;

        this.trackPoints = [];

        this.hiddenUI = false;
    }

    makeButton(x, y) {
        this.button = createButton(toggleCreator ? 'Save!' : 'Create Track!');
        this.button.position(x, y);
        this.button.mouseClicked(this.initialize);

        this.buttonSaving = createButton(!toggleCreator ? 'Save!' : 'Create Track!');
        this.buttonSaving.position(x, y + 25);
        this.buttonSaving.mouseClicked(this.saveTrack);
        this.buttonSaving.mouseOver(() => (toggleCreator) ? this.hiddenUI = true : this.hiddenUI = false);

    }

    initialize() {
        resetDrivers();
        toggleCreator = !toggleCreator;
        this.hiddenUI = false;
    }

    drawTrack() {
        background(3, 49, 3)
        var colorSize = width / 32;
        if (!this.hiddenUI) {
            this.pickColor(0, 0, 0, width - colorSize * 2, colorSize, colorSize);       // black - road
            this.pickColor(3, 49, 3, width - colorSize * 4, colorSize, colorSize);       // green - grass
            this.pickColor(255, 255, 255, width - colorSize * 6, colorSize, colorSize);       // white - firstCheckpoint
            this.pickColor(200, 0, 126, width - colorSize * 8, colorSize, colorSize);       // pinkish - secondCheckpoint
        }

        for (var i = 1; i < this.trackPoints.length; i++) {
            var red = this.trackPoints[i][3]; var green = this.trackPoints[i][4]; var blue = this.trackPoints[i][5];
            var circleX = this.trackPoints[i][0]; var circleY = this.trackPoints[i][1]; var circleSize = this.trackPoints[i][2];

            fill(red, green, blue);
            noStroke();
            ellipse(circleX, circleY, circleSize);
        }
        if (!this.hiddenUI) {
            this.painter(colorSize * 2 + this.painterSize / 2, width - colorSize * 10 - this.painterSize / 2);


            fill(255, 0, 255);
            textAlign(CENTER, CENTER);
            textSize(24);
            text('START', driverStart[0], driverStart[1]);
        }
    }

    pickColor(r, g, b, x, y, size) {
        rectMode(CENTER);
        stroke(255);
        strokeWeight(5);
        fill(r, g, b);
        rect(x, y, size * 2, size * 2);

        if (mouseX > x - size && mouseX < x + size && mouseY < size * 2 && mouseIsPressed) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
    }

    painter(boundryUp, boundryLeft, buttonRight, buttonDown) {
        noStroke()
        fill(this.r, this.g, this.b);
        ellipse(mouseX, mouseY, this.painterSize);

        if (mouseIsPressed && !(mouseX > boundryLeft && mouseY < boundryUp)) {
            this.trackPoints.push([mouseX, mouseY, this.painterSize, this.r, this.g, this.b]);
        };
    }


    saveTrack() {
        if (toggleCreator) {
            // saveCanvas('track', 'png');
            const dens = pixelDensity()
            let img = createImage(width, height);
            img.loadPixels();
            loadPixels();
            for (let i = 0; i < img.width; i++) {
                for (let j = 0; j < img.height; j++) {

                    const off = (j * width + i) * dens * 4;
                    const components = [
                        pixels[off],
                        pixels[off + 1],
                        pixels[off + 2],
                        pixels[off + 3]
                    ];

                    img.set(i, j, components);
                }
            }
            img.updatePixels();
            track = img;
            toggleCreator = !toggleCreator;
            background(track);

            driver.prevDeaths = [];
        }
    }




}