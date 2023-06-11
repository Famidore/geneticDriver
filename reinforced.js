function keepDistance(linesDistance) {
    const sortedDist = [...linesDistance].sort();
    if (sortedDist[0] > 25) { OnSpecialGoodEvent(0.1); }
    else {OnSpecialBadEvent(-0.1); }
    // for (i in linesDistance) {
    //     if (linesDistance[i] > 25) { OnSpecialGoodEvent(linesDistance[i] * 0.1); }
    //     else { OnSpecialBadEvent(-1.0); OnSpecialGoodEvent(linesDistance[i] * -0.1); }

    // }
}

function newDeath(prevDeathX, prevDeathY, currDeathX, currDeathY) {

    if (dist(prevDeathX, prevDeathY, currDeathX, currDeathY) < 50) {
        //OnSpecialBadEvent(-1.0);
    }
}