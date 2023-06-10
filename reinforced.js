function keepDistance(linesDistance) {
    for (i in linesDistance) {
        OnSpecialGoodEvent(linesDistance[i] * 0.001);
    }
}

function newDeath(prevDeathX, prevDeathY, currDeathX, currDeathY){
    
    if (dist(prevDeathX, prevDeathY, currDeathX, currDeathY) < 50){
        OnSpecialBadEvent(-2);
    }
}