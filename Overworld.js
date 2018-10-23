var graveyard, lake;
demo.state998 = function(){};
demo.state998.prototype = {
    preload: function(){
        game.load.image('overworld', 'assets/backgrounds/overworld.png');
        game.load.image('square', 'assets/sprites/square.png');
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'overworld');
        
        if (previousState == "graveyard"){
            mc = game.add.sprite(200, 230, 'mc');
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
        
        graveyard = game.add.sprite(0,0,'square');
        graveyard.scale.setTo(1.8);
        game.physics.enable(graveyard);
        graveyard.body.immovable = true;
        
        lake = game.add.sprite(300,265,'square');
        lake.scale.setTo(2.3,1.1);
        game.physics.enable(lake);
        lake.body.immovable = true;
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        
        var goToGraveyard = game.physics.arcade.overlap(mc, graveyard, null, null, this);
        var goToLake = game.physics.arcade.overlap(mc, lake, null, null, this);
        
        if (goToGraveyard){
            previousState = "overworld";
            changeState(null,'graveyard');
        }
        
        if (goToLake && mc.x < 400){
            music.destroy();
            previousState = "overworldL";
            changeState(null,'lake');
        }
        
        //Move main character
        moveMC();
        
        
    }
};