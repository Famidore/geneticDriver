function OnSpecialGoodEvent() {
    academy.addRewardToAgent(agent, 1.0);
}

function OnSpecialBadEvent() {
    academy.addRewardToAgent(agent, -1.0);
}

function processInputs(inputs) {

    let results = academy.step([{ teacherName: teacher, agentsInput: inputs }]);
    return results;
}