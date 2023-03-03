let scores = [];
let drivers = [];
let driverMoves = [];
let track;
let trackCreator;
let algo;
let toggleCreator = false;
let driverStart = [300, 100];


const agentCount = 5;
const movesLimit = 1000;

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
  algo = new GenAlgo(movesLimit, []);

  for (let i = 0; i < agentCount; i++) {
    drivers.push(new Driver(driverStart[0], driverStart[1], 12));
    driverMoves.push(algo.generateMoves(i));
  };

  rectMode(CENTER);
  trackCreator.makeButton(25, 25);
}

function draw() {

  background(track);
  if (!toggleCreator) {
    for (let i = 0; i < agentCount; i++) {
      drivers[i].checkPath();
      drivers[i].show();
      drivers[i].calculate(driverMoves[i][frameCount]);
    }
  } else {
    trackCreator.drawTrack();
    if (keyIsDown(90)) {
      trackCreator.trackPoints.pop();
    }
  }

  // if (frameCount == movesLimit) {
  //   algo.saveMoves()
  // }

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
    resetDrivers();
  }
}

function keyReleased() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 0;
  }
}

function resetDrivers() {
  for (let i = 0; i < agentCount; i++) {
    drivers[i].x = driverStart[0];
    drivers[i].y = driverStart[1];
    drivers[i].death = false;
    drivers[i].angle = 0;
  }
}