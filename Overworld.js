var graveyard, lake, forest, cave, castle;
demo.state998 = function(){};
demo.state998.prototype = {
    preload: function(){
        game.load.image('overworld', 'assets/backgrounds/overworld.png');
        game.load.image('square', 'assets/sprites/square.png');
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        
        //background music
        game.load.audio('background_music', ['assets/audio/overworld1.wav']);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'overworld');
        
        if (previousState == "graveyard"){
            mc = game.add.sprite(200, 230, 'mc');
        }
        else if (previousState == "lakeL"){
            mc = game.add.sprite(260, 265, 'mc');
        }
        else if (previousState == "lakeR"){
            mc = game.add.sprite(570, 360, 'mc');
        }
        else if (previousState == "forest"){
            mc = game.add.sprite(690, 376, 'mc');
        }
        else if (previousState == "cave"){
            mc = game.add.sprite(1238, 576, 'mc');
        }
        else if (previousState == "castle"){
            mc = game.add.sprite(1460, 1010, 'mc');
        }
        
        
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(0.7, 0.7);
        game.physics.enable(mc);
        mc.body.collideWorldBounds = true;
        mc.animations.add('walkleft', [6,7,8]);
        mc.animations.add('walkright', [9,10,11]);
        mc.animations.add('walkdown', [0,1,2]);
        mc.animations.add('walkup', [3,4,5]);
        Ash.chSprite = mc;
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****TRANSPORT *****
        graveyard = game.add.sprite(0,0,'square');
        graveyard.scale.setTo(1.8);
        game.physics.enable(graveyard);
        graveyard.body.immovable = true;
        
        lake = game.add.sprite(300,265,'square');
        lake.scale.setTo(2.3,1.1);
        game.physics.enable(lake);
        lake.body.immovable = true;
        
        forest = game.add.sprite(730,340,'square');
        forest.scale.setTo(2,1.5);
        game.physics.enable(forest);
        forest.body.immovable = true;
        
        cave = game.add.sprite(1170,430,'square');
        cave.scale.setTo(1.3,1);
        game.physics.enable(cave);
        cave.body.immovable = true;
        
        castle = game.add.sprite(1370,890,'square');
        castle.scale.setTo(1.3,0.7);
        game.physics.enable(castle);
        castle.body.immovable = true;
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true; 
        
        var square = bounds.create(410,0,'square');
        square.scale.setTo(1.3,2.78);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(230,366,'square');
        square.scale.setTo(2.5,1.28);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,440,'square');
        square.scale.setTo(2,1.6);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(622,422,'square');
        square.scale.setTo(1,1.3);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(0,690,'square');
        square.scale.setTo(8.2,5.6);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1030,300,'square');
        square.scale.setTo(5.7,1.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(940,460,'square');
        square.scale.setTo(2.45,0.63);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(930,515,'square');
        square.scale.setTo(2.5,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(772,660,'square');
        square.scale.setTo(2,1);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1450,600,'square');
        square.scale.setTo(2,3);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1290,720,'square');
        square.scale.setTo(1.1,1.5);
        square.body.immovable = true;
        square.body.moves = false;
             
        var square = bounds.create(670,730,'square');
        square.scale.setTo(1.5,0.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,850,'square');
        square.scale.setTo(10,2.4);
        square.body.immovable = true;
        square.body.moves = false;
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        
        //mc cant go pass bounds
        game.physics.arcade.collide(Ash.chSprite, bounds);
        
        var goToGraveyard = game.physics.arcade.overlap(mc, graveyard, null, null, this);
        var goToLake = game.physics.arcade.overlap(mc, lake, null, null, this);
        var goToForest = game.physics.arcade.overlap(mc, forest, null, null, this);
        var goToCave = game.physics.arcade.overlap(mc, cave, null, null, this);
        var goToCastle = game.physics.arcade.overlap(mc, castle, null, null, this);
        
        if (goToGraveyard){
            music.destroy();
            previousState = "overworld";
            changeState(null,'graveyard');
        }
        
        if (goToLake && mc.x < 400){
            music.destroy();
            previousState = "overworldL";
            changeState(null,'lake');
        }
        else if (goToLake && mc.x > 400){
            music.destroy();
            previousState = "overworldR";
            changeState(null,'lake');
        }
        
        if (goToForest){
            music.destroy();
            previousState = "overworld";
            changeState(null,'forest');
        }
        
        if (goToCave){
            music.destroy();
            previousState = "overworld";
            changeState(null,'cave');
        }
        
        if (goToCastle){
            music.destroy();
            previousState = "overworld";
            changeState(null,'castle');
        }
        
        //Move main character
        moveMC();
        
        //Create pause menu
        createPauseM();
        
        //Move cursor in main pause menu
        moveCursorPM();
        
        //Move cursor in pause submenus
        moveCursorPSM();
        
        //Select pause menu actions (bug might be here)
        selectPauseMActions();
    }
};