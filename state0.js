var demo = {};
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#DDDDDD';
        console.log('state0');
        addChangeStateEventListeners();
       /* game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 1);
       */
    },
    update: function(){}
};

function changeState(i, stateNum){
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    /*
    var keys = [48,49,50,51,52,53,54,55,56,57]
    for (var i=0; i<keys.length; i++){
        game.input.keyboard.addKey(keys[i]).onDown.add(changeState, null, null, i);
    }*/
}