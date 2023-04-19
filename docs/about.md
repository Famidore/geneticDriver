# This is a temporary file containing this project's description

## Framework
This project will be done entirely using p5.js framework (for now, for my sanity's sake).

## Libraries
This project will utilize [ReImprove](https://github.com/BeTomorrow/ReImproveJS) package based on `TensorFlow.js` for Deep Reinforcement Learning.

## Main idea
The `Teacher` will be given inputs based on the car's distance to the track's boundry. There can be multiple rays sent from the car, each having a certain length. This rays will return a distance to the track boundry if they encounter it. <br><br>

The car can also encounter `checkpoint lines` which will count towards agent's score.

The `Agent` (one just for now) will be able to perform 2 moves simultaneously (steering while also maintaining speed). <br><br>

The `Agent's` job is to pass the alternately pass the two finish lines as fast as possible <br><br>

## User inputs

The user can stop the simulation at any given moment and change the track and ammount of agents (may be implemented later). The track editor is easy to use. <br><br>
It is essential for the user to create both of the finish lines, as well as a certain ammount of `checkpoint lines` (ammount depends on the track's length, in some cases the model can do without them).
