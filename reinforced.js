// import { NeuralNetwork, Model, Academy } from "reimprovejs/dist/reimprove.js"


const modelFitConfig = {              
    epochs: 1,                        
    stepsPerEpoch: 16
};

const numActions = 2;
const inputSize = 100;
const temporalWindow = 1;


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
    lessonsQuantity: 10,
    lessonsLength: 100,
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

const academy = new ReImprove.Academy();
const teacher = academy.addTeacher(teacherConfig);
const agent = academy.addAgent(agentConfig);

academy.assignTeacherToAgent(agent, teacher);

function OnSpecialGoodEvent() {
    academy.addRewardToAgent(agent, 1.0)
}

function OnSpecialBadEvent() {
    academy.addRewardToAgent(agent, -1.0)
}

function processInputs(inputs) {

    let result = academy.step([{ teacherName: teacher, agentsInput: inputs }])
    return results
}