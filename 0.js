var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, mc, speed = 30, road, Materia, score=0, scoreText;
mc.stats = []
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/Cloud spritesheet.png', 150, 250);
        game.load.image('city', 'assets/backgrounds/city.png');
        game.load.image('road', 'assets/backgrounds/road.png');
        game.load.image('materia', 'assets/sprites/materia.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff';
        console.log('state0');
        addChangeStateEventListeners();
        
        game.world.setBounds(0, 0, 1600, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        var city = game.add.sprite(0, 0, 'city');
        road = game.add.sprite(0, 900, 'road');
        
        mc = game.add.sprite(100, centerY + 200, 'mc');
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(-0.7, 0.7);
        
        game.physics.enable([mc, road]);
        mc.body.gravity.y = 600;
        mc.body.bounce.y = 0.1;
        mc.body.collideWorldBounds = true;
        mc.animations.add('walk', [0,1,2]);
        
        road.body.immovable = true;
        
        Materia = game.add.group();
        Materia.enableBody = true;
        
        for (var i = 0; i < 3; i++){
            var materia = Materia.create(500+i*150, 500,'materia');
            materia.scale.setTo(0.5, 0.5);
            materia.body.gravity.y = 900;
            materia.body.bounce.y = 0.3;
        }
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 300, 1000);
        
        scoreText = game.add.text(50,50, 'XP: '+score, {fontSize: '32px', fill: '#fff' });
    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(mc, road);
        game.physics.arcade.collide(Materia, road);
        game.physics.arcade.overlap(mc, Materia, collectMateria, null, this);

        mc.body.velocity.x = 0;
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mc.scale.setTo(-0.7, 0.7);
            mc.body.velocity.x = 550;
            mc.animations.play('walk', 14, true);
            if(mc.x >= 1547.5){
                changeState(null,"graveyard");
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mc.scale.setTo(0.7, 0.7);
            mc.body.velocity.x = -550;
            mc.animations.play('walk', 14, true);
        }
        else{
            mc.animations.stop('walk');
            mc.frame = 0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && mc.body.touching.down && hitPlatform){
            mc.body.velocity.y = -450;
        }
        /*else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            mc.y += speed;
        }*/
    }
};

function collectMateria (mc, Materia) {
    
    // Removes the star from the screen
    Materia.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'XP: ' + score;

}

function changeState(i, stateNum){
    game.state.start(stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, "0");
    addKeyCallback(Phaser.Keyboard.ONE, changeState, "graveyard");
    /*
    var keys = [48,49,50,51,52,53,54,55,56,57]
    for (var i=0; i<keys.length; i++){
        game.input.keyboard.addKey(keys[i]).onDown.add(changeState, null, null, i);
    }*/
}