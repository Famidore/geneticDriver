function keepDistance(linesDistance) {

    for (i in linesDistance) {
        if (linesDistance[i] > 50) { award += 0.1 }
        else { award -= 0.1 }

    }
}

function newDeath(prevDeathX, prevDeathY, currDeathX, currDeathY) {
    if (dist(prevDeathX, prevDeathY, currDeathX, currDeathY) < 50) {
        award -= 10.0;
    }
}

function timePoints(timeDeath) {
    award += (timeDeath * 0.003);
}

function velocityPoints(vx, vy) {
    award += ((abs(vx + vy) - 2.5) * 0.01);
}