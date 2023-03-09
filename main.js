let scores = [];
let driver;
let track;
let trackCreator;
let algo;
let toggleCreator = false;
let driverStart = [300, 100];
let linesControls = [0, 0, 0, 0, 0, 0];
const angles = [45, 0, 315, 225, 180, 135];


const agentCount = 1;

let controls = [0, 0, 0, 0];
const keys = ['w', 's', 'a', 'd'];

function preload() {
  track = loadImage('assets/track.png')
  carModelPath = loadImage('assets/pixel_car.png')
}

function setup() {
  frameRate(60);

  createCanvas(windowWidth, windowHeight);
  track.resize(windowWidth, windowHeight);


  trackCreator = new TrackCreator();
  algo = new GenAlgo([]);

  driver = new Driver(driverStart[0], driverStart[1], 12);

  rectMode(CENTER);
  trackCreator.makeButton(25, 25);
}

function draw() {

  background(track);
  if (!toggleCreator) {
    track.loadPixels();
    driver.checkPath();
    driver.show();
    driver.calculate();
    for (i in angles) {
      algo.generateLines(200, driver.x, driver.y, driver.angle + angles[i], i)
    }
    track.updatePixels()


  } else {
    trackCreator.drawTrack();
    if (keyIsDown(90)) {
      trackCreator.trackPoints.pop();
    } else if (keyIsDown(85)) {
      trackCreator.painterSize += 2;
    } else if (keyIsDown(74) && trackCreator.painterSize > 1) {
      trackCreator.painterSize -= 2;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  track.resize(windowWidth, windowHeight);
}


function keyPressed() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 1;
  } else if (key == 'u') {
    trackCreator.painterSize += 5;
  } else if (key == 'j' && trackCreator.painterSize > 1) {
    trackCreator.painterSize -= 5;
  } else if (key == 'q') {
    trackCreator.trackPoints = [];
  } else if (key == 'r') {
    driver.death ? driver.prevDeaths.unshift([driver.x, driver.y, driver.angle]) : '';
    resetDrivers();
  }
}

function keyReleased() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 0;
  }
}

function resetDrivers() {
  driver.x = driverStart[0];
  driver.y = driverStart[1];
  driver.death = false;
  driver.angle = 0;
  driver.score = 0;
}