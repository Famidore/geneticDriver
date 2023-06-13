# geneticDriver
Contrary, to what the title says, instead of using a genetic algorithm, reinforced learning will be implemented.

## Framework
This project will be done entirely using p5.js framework (for now and for my sanity's sake).

## Libraries
This project will utilize [ReImprove](https://github.com/BeTomorrow/ReImproveJS) package based on `TensorFlow.js` for Deep Reinforcement Learning.

## Main idea
The `Teacher` will be given inputs based on the car's distance to the track's boundry. There can be multiple rays sent from the car, each having a certain length. This rays will return a distance to the track boundry if they encounter it. <br><br>

The car can also encounter `checkpoint lines` which will count towards agent's score.

The `Agent` (one just for now) will be able to perform 2 moves simultaneously (steering while also maintaining speed) during each frame. <br><br>

The `Agent's` job is to pass the alternately pass the two finish lines as fast as possible <br><br>

## User inputs

The user can stop the simulation at any given moment and change the track and ammount of agents (may be implemented later). The track editor is easy to use. <br><br>
It is essential for the user to create both of the finish lines, as well as a certain ammount of `checkpoint lines` (ammount depends on the track's length, in some cases the model can do without them).


# Editor
Press the `Create Track!` button to enter the track editor.  
Press the `Save` button to save your track and give it a try, the starting position of the car is marked.  

The pink and white colors are used to set checkpoints, if you are using more than one each, place them in an alternating pattern.
# Controls
`w`, `s`, `a`, `d` - drive controls,  
`r` - reset positions of the drivers,  
`u`/`j` - make brush in track editor bigger/smaller,  
`z` - hold to undo a move in editor,
`q` - clear canvas in track editor.
# Play
Visit and play at: https://famidore.github.io/geneticDriver/
# Examples
![](gifs/2023-06-11%2019-49-50%20(3).gif)<br>
![](gifs/2023-06-10%2019-00-47.gif)