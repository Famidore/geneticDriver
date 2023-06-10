let scores = [];
let driver;
let track;
let trackCreator;
let algo;
let RL;
let toggleCreator = false;
let driverStart = [300, 100];
let linesControls = [0, 0, 0, 0, 0, 0];
const angles = [45, 0, 315]; // 225, 180, 135

const agentCount = 1;

let academy;
let teacher;
let agent;

let controls = [0, 0, 0, 0];
const keys = ['w', 's', 'a', 'd'];

function preload() {
  track = loadImage('assets/track.png');
  carModelPath = loadImage('assets/pixel_car.png');
}

function setup() {


  frameRate(60);

  createCanvas(windowWidth, windowHeight);
  track.resize(windowWidth, windowHeight);


  trackCreator = new TrackCreator();
  algo = new GenAlgo([]);
  RL = new Learning(0.01);

  driver = new Driver(driverStart[0], driverStart[1], 12);

  rectMode(CENTER);
  trackCreator.makeButton(25, 25);

  track.loadPixels();

  // reimproveJS setup
  const modelFitConfig = {
    epochs: 1,
    stepsPerEpoch: 16
  };

  const numActions = 3;
  const inputSize = 6;
  const temporalWindow = 3;


  const totalInputSize = inputSize * temporalWindow + numActions * temporalWindow + inputSize;

  const network = new ReImprove.NeuralNetwork();

  network.InputShape = [totalInputSize];
  network.addNeuralNetworkLayers([
    { type: 'dense', units: 32, activation: 'relu' },
    { type: 'dense', units: numActions, activation: 'softmax' }
  ]);

  const model = new ReImprove.Model.FromNetwork(network, modelFitConfig);

  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });


  const teacherConfig = {
    lessonsQuantity: 10000,
    lessonsLength: 20,
    lessonsWithRandom: 2,
    epsilon: 1,
    epsilonDecay: 0.995,
    epsilonMin: 0.05,
    gamma: 0.8
  };

  const agentConfig = {
    model: model,
    agentConfig: {
      memorySize: 5000,
      batchSize: 128,
      temporalWindow: temporalWindow
    }
  };

  academy = new ReImprove.Academy();
  teacher = academy.addTeacher(teacherConfig);
  agent = academy.addAgent(agentConfig);

  academy.assignTeacherToAgent(agent, teacher);

  // reimproveIS setup/
}

function draw() {

  background(track);
  if (!toggleCreator) {
    driver.checkPath();
    driver.show();

    // driver.calculate(RL.performAction(keys[Math.floor(Math.random() * keys.length)]));

    step().then(result => {
      // console.log(result)
      driver.calculate(result);
    }).catch(error => {
      console.log(error)
    });

    for (i in angles) {
      algo.generateLines(200, driver.x, driver.y, driver.angle + angles[i], i)
    };

    algo.checkCheckpoint();
    algo.showCheckpoints();
  } else {
    trackCreator.drawTrack();
    algo.showCheckpoints();
    if (keyIsDown(90)) {
      trackCreator.trackPoints.pop();
    } else if (keyIsDown(85)) {
      trackCreator.painterSize += 2;
    } else if (keyIsDown(74) && trackCreator.painterSize > 1) {
      trackCreator.painterSize -= 2;
    }
  }
  // reimproveJS
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  track.resize(windowWidth, windowHeight);
}

function keyPressed() {
  if (keys.includes(key)) {
    controls[keys.indexOf(key)] = 1;
  } else if (key == 'q') {
    trackCreator.trackPoints = [];
    algo.lineCheckpoints = [];
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

  algo.lastCheck = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
}

// reimproveJS

function OnSpecialGoodEvent(award) {
  console.log("GOOD ROBOT");
  academy.addRewardToAgent(agent, award);
}

function OnSpecialBadEvent() {
  console.log("BAD ROBOT!");
  academy.addRewardToAgent(agent, -1.0);
}

function getInputs(){
 return [driver.x, driver.y, driver.vx, driver.vy]
}

async function step() {
  let inputs = linesControls;
  
  let result = await academy.step([{teacherName: teacher, agentsInput: inputs}]);

  let ord = result.get(agent);

  return ord
}