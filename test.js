var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, mc, speed = 30, road, Materia, score=0, scoreText, mcStats = {HP:500, Attack:50,Defense:30,Magic:10,MagicDefense:15,Mana:60}, mcLevel=5,mcSkillsL = ["Slash","Fire"];
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

function moveTo (character,xpos,ypos){
    
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    var dy = ypos - currentPos[1];
    console.log(dx);
    console.log(dy);
    if (dx < 0){
        character.scale.setTo(0.7, 0.7);
        character.animations.play('walk', 14, true);
        character.body.velocity.x = -100;
        while (character.x > xpos){
            console.log("moving left");
            console.log(mc.body.velocity.x);
        } 
        character.body.velocity.x = 0;
        character.animations.stop('walk');
        character.frame = 0;
    }
    else if (dx > 0){
        while (character.x < xpos){
            character.scale.setTo(-0.7, 0.7);
            character.x += 1;
            character.animations.play('walk', 14, true);
        }
        character.animations.stop('walk');
        character.frame = 0;
        character.body.velocity.x = 0;
    }
    if(dy < 0){
        while (character.y > ypos){
            console.log("moving up");
            character.scale.setTo(0.7, 0.7);
            character.y -= 1;
        } 
        character.body.velocity.y = 0;
    }
    else if(dy > 0){
        while (character.y < xpos){
            console.log("moving down")
            character.scale.setTo(-0.7, 0.7);
            character.y += 1;
        }
        character.body.velocity.y = 0;
    }
    
}
//inside fight function (beginning)
//currentPosition = [mc.x, mc.y];
    //dx = EnemyGroup.alliesPos[0][0] - currentPosition[0];
    //dy = EnemyGroup.alliesPos[0][1] - currentPosition[1];
    
    //mc.x = EnemyGroup.alliesPos[0][0];
    //mc.y = EnemyGroup.alliesPos[0][1];

//inside moveCursorBM (after changing currentCpos[0])
/*if(cursors.right.isDown && fighting && !press[0]){
            press[0] = true;
            if (currentCpos[0] < maxCBpos){
                cursor.kill();
                currentCpos[0] += 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[0] = 68;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.right.isUp && fighting){
            press[0] = false;
        }
        if(cursors.left.isDown && fighting && !press[1]){
            press[1] = true;
            if (currentCpos[0] > 68){
                cursor.kill();
                currentCpos[0] -= 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[0] = maxCBpos;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.left.isUp && fighting){
            press[1] = false;
        }*/