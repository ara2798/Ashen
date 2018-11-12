var story3Completed = false, forestMiniBoss = false, bounds;
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.image('castle', 'assets/backgrounds/castleinterior.png');
        //game.load.spritesheet('harpie', 'assets/spritesheets/harpie.png', 128, 128);
        //game.load.spritesheet('weasel', 'assets/spritesheets/weasel.png', 128, 128);
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square1.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/castle.mp3']);      
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 2220);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'castle');
        
        if (previousState == "overworld"){
            mc = game.add.sprite(805, 2080, 'mc');
        }
        
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(1.1, 1.1);
        game.physics.enable(mc);
        mc.body.collideWorldBounds = true;
        mc.animations.add('walkleft', [6,7,8]);
        mc.animations.add('walkright', [9,10,11]);
        mc.animations.add('walkdown', [0,1,2]);
        mc.animations.add('walkup', [3,4,5]);
        mc.animations.add('attack', [10,12,10]);
        mc.animations.add('firespell', [13,10]);
        mc.animations.add('slash',[10,12,10]);
        mc.animations.add('cyclone',[10,12,10]);
        Ash.chSprite = mc;
        
        /*
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var weasel = EnemyGroup1.create(446, 466,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0]);
        weasel.animations.add('walkright',[0]);
        weasel.animations.add('attack',[0]);
        //weasel.animations.add('icespikes',[0]);
        Weasel(weasel,10);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var harpie = EnemyGroup2.create(253, 373,'harpie');
        harpie.scale.setTo(0.9);
        harpie.animations.add('walkleft',[0]);
        harpie.animations.add('walkright',[0]);
        harpie.animations.add('attack',[0]);
        //harpie.animations.add('icespikes',[0]);
        Harpie(harpie,8);
        var weasel = EnemyGroup2.create(320, 1110,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0]);
        weasel.animations.add('walkright',[0]);
        weasel.animations.add('attack',[0]);
        //weasel.animations.add('shadowbeam',[0]);
        Weasel(weasel,8);
        
        EnemyGroup3 = game.add.group();
        EnemyGroup3.enableBody = true;
        var kori = EnemyGroup3.create(320,1110,'kori');
        kori.anchor.setTo(0.5,0.5);
        kori.scale.setTo(1.1, 1.1);
        game.physics.enable(kori);
        kori.body.collideWorldBounds = true;
        kori.animations.add('walkleft', [6,7,8]);
        kori.animations.add('walkright', [9,10,11]);
        kori.animations.add('walkdown', [0,1,2]);
        kori.animations.add('walkup', [3,4,5]);
        kori.animations.add('attack', [10,12,10]);
        kori.animations.add('firespell', [13,10]);
        kori.animations.add('slash',[10,12,10]);
        kori.animations.add('cyclone',[10,12,10]);
        Kori.chSprite = kori;*/
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true; 
        
        var square = bounds.create(0,0,'square');
        square.scale.setTo(7.1,10);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(900,0,'square');
        square.scale.setTo(7.1,10);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,1090,'square');
        square.scale.setTo(2.7,1.6);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1350,1090,'square');
        square.scale.setTo(2.7,1.6);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,1275,'square');
        square.scale.setTo(3,3.6);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1315,1275,'square');
        square.scale.setTo(3,3.6);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,1652,'square');
        square.scale.setTo(2.7,1.7);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1350,1652,'square');
        square.scale.setTo(2.7,1.7);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,1830,'square');
        square.scale.setTo(7,3.7);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(900,1830,'square');
        square.scale.setTo(7,3.7);
        square.body.immovable = true;
        square.body.moves = false;
        
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        //mc cant go pass bounds
        game.physics.arcade.collide(Ash.chSprite, bounds);
        /*
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);
        var encounter2 = game.physics.arcade.overlap(mc, EnemyGroup2, null, null, this);

        if (encounter1 && !inTransition){
            fighting = true;
            game.camera.unfollow();
            moveTo(mc,game.camera.x+150,game.camera.y+200);
            for (var i = 0; i < EnemyGroup1.children.length; i++){
                moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+100+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup1;
        }
        
        if (encounter2 && !inTransition){
            fighting = true;
            game.camera.unfollow();
            moveTo(mc,game.camera.x+150,game.camera.y+200);
            for (var i = 0; i < EnemyGroup2.children.length; i++){
                moveTo(EnemyGroup2.children[i],game.camera.x+650,game.camera.y+100+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup2;
        }*/
        /*
        if (mc.x > 1170 && mc.y > 7300 && !story3Completed){
            story3Completed = true;
            storyMode = true;
            fighting = true;
            game.camera.unfollow();
            mc.body.velocity.x = 0;
            mc.body.velocity.y = 0;
            mc.animations.stop();
            mc.frame = 10;
            setStory(["ashportrait1","(Huh?)","(I hear something...)","(Sounds like it's coming this way)"]);
        }
        
        if (story3Completed && !storyMode && !swampMiniBoss){
            forestMiniBoss = true;
            moveCamera = game.add.tween(game.camera).to({x:mc.x-150,y:mc.y-300},500,null,true);
            moveCamera.onComplete.add(function(){game.camera.shake(0.02,1000,true,6);moveTo(EnemyGroup3.children[0],game.camera.x+400,420);setFightStage();enemyInBattle = EnemyGroup3;},this);
        }*/
        
        if (Ash.chSprite.y > 2090){
            music.destroy();
            previousState = "castle";
            changeState(null,'Overworld');
        }
        
        if (Ash.chSprite.y < 90){
            music.destroy();
            previousState = "castle";
            changeState(null,'castlebossroom');
        }
        
        //Progress through the story
        continueStory();
        
        //Create pause menu
        createPauseM();
        
        //Move cursor in main pause menu
        moveCursorPM();
        
        //Move cursor in pause submenus
        moveCursorPSM();
        
        //Select pause menu actions (bug might be here)
        selectPauseMActions();
        
        //Move main character
        moveMC();
        
        //Move cursor in  battle mode
        moveCursorBM();

        //Move cursor in skills menu (battle)
        moveCursorSM();
        
        //Move cursor in items menu (battle)
        moveCursorIM();
        
        //Pick enemy (battle)
        moveCursorEP(enemyInBattle);
        
        //Pick ally (battle)
        moveCursorAP();
        
        //Select actions (battle)
        selectBattleActions();
    }
};