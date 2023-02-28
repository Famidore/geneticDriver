let scores = []

let drivers = [];
let track;
let algo = [];
let dLimit = 50;

let controls = [0, 0, 0, 0];
let keys = ['w', 's', 'a', 'd'];

function preload(){
  track = loadImage('track.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < dLimit; i++){
    drivers.push(new Driver(175, 150, 12));
    algo.push(new GenAlgo(1000, 1, i))
  }
  
  rectMode(CENTER);

  // algo[0].saveMoves()
}

function draw() {
  //background(51);
  background(track);

  for (let i = 0; i < dLimit; i++){
  drivers[i].checkPath();
  drivers[i].show();
  drivers[i].calculate(algo[i].moves[frameCount]);
  algo[i].printBest()
  }
  if(frameCount > 1000 && frameCount < 1004){
    print(scores.sort())
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed(){
  if(keys.includes(key)){
    controls[keys.indexOf(key)] = 1;
  }
}

function keyReleased(){
  if(keys.includes(key)){
    controls[keys.indexOf(key)] = 0;
  }
}