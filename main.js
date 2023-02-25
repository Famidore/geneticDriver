let driver;
let track;

let controls = [0, 0, 0, 0];
let keys = ['w', 's', 'a', 'd'];

function preload(){
  track = loadImage('track.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  driver = new Driver(100, 200, 25);
  rectMode(CENTER);
}

function draw() {
  //background(51);
  background(track, 100);

  driver.checkPath();
  driver.show();
  driver.calculate();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed(){
  if(keys.includes(key)){
    print(key)
    controls[keys.indexOf(key)] = 1;
  }
}

function keyReleased(){
  if(keys.includes(key)){
    print(key)
    controls[keys.indexOf(key)] = 0;
  }
}