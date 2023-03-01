let scores = [];
let drivers = [];
let driverMoves = [];
let track;
let algo;


const agentCount = 1;
const movesLimit = 100;

let controls = [0, 0, 0, 0];
const keys = ['w', 's', 'a', 'd'];

function preload() {
  track = loadImage('assets/track.png')
  carModelPath = loadImage('assets/pixel_car.png')
}

function setup() {
  frameRate(60);

  createCanvas(windowWidth, windowHeight);

  algo = new GenAlgo(movesLimit, []);

  for (let i = 0; i < agentCount; i++) {
    drivers.push(new Driver(300, 100, 12));
    driverMoves.push(algo.generateMoves(i));
  }

  rectMode(CENTER);
}

function draw() {
  background(track);

  for (let i = 0; i < agentCount; i++) {
    drivers[i].checkPath();
    drivers[i].show();
    drivers[i].calculate(driverMoves[i][frameCount]);
  }

  if (frameCount == movesLimit) {
    print(scores.sort())
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 1;
  }
}

function keyReleased() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 0;
  }
}