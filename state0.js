var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, cloud, speed = 7;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('cloud', 'assets/spritesheets/Cloud spritesheet.png', 320, 320);
        game.load.image('city', 'assets/backgrounds/city.png');
        game.load.image('road', 'assets/backgrounds/road.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff';
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 1600, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var city = game.add.sprite(0, 0, 'city');
        var road = game.add.sprite(0, 900, 'road');
        cloud = game.add.sprite(centerX, centerY, 'cloud');
        cloud.anchor.setTo(0.5,0.5);
        cloud.scale.setTo(0.7, 0.7);
        game.physics.enable(cloud);
        cloud.body.collideWorldBounds = true;
        cloud.animations.add('walk', [0,1,2]);
        
        
        game.camera.follow(cloud);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 300, 1000);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            cloud.scale.setTo(-0.7, 0.7);
            cloud.x += speed;
            cloud.animations.play('walk', 14, true);
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            cloud.scale.setTo(0.7, 0.7);
            cloud.x -= speed;
            cloud.animations.play('walk', 14, true);
        }
        else{
            cloud.animations.stop('walk');
            cloud.frame = 0;
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