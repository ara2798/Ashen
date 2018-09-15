var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, cloud, speed = 7;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('cloud', 'assets/sprites/Cloud.png');
    },
    create: function(){
        game.stage.backgroundColor = '#DDDDDD';
        console.log('state0');
        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        cloud = game.add.sprite(centerX, centerY, 'cloud');
        cloud.anchor.setTo(0.5,0.5);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            cloud.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            cloud.x -= speed;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            cloud.y -= speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            cloud.y += speed;
        }
    }
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