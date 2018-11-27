var story3Completed = false, forestMiniBoss = false, bounds;
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.image('castle', 'assets/backgrounds/castleinterior.png');
        game.load.spritesheet('jester', 'assets/spritesheets/jesterspritesheet.png', 128, 128);
        //game.load.spritesheet('weasel', 'assets/spritesheets/weasel.png', 128, 128);
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square2.png');

        //background music
        game.load.audio('entrance', ['assets/audio/castle_intro.wav']);
        game.load.audio('background_music', ['assets/audio/castle_outro.wav']);
        game.load.audio('jester', ['assets/audio/jester.wav']);
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music2 = game.add.audio('entrance');
        music2.play('', 0, 1, false);
        music = game.add.audio('background_music');
        jesterMusic = game.add.audio('jester');
        game.time.events.add(Phaser.Timer.SECOND * 10, function(){music.play('', 0, 1, true)}, this);
      
        game.world.setBounds(0, 0, 1620, 2220);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'castle');
        
        mc = game.add.sprite(805, 2080, 'mc');
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

        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var jester = EnemyGroup1.create(815, 1600,'jester');
        jester.scale.setTo(0.9);
        jester.animations.add('stand',[0,3]);
        jester.animations.add('walkleft',[1,2]);
        jester.animations.add('walkright',[3,4]);
        jester.animations.add('attack',[0]);
        jester.animations.play('stand',2,true);
        //jester.animations.add('icespikes',[0]);
        Jester(jester,15);
        
        /*
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
        square.scale.setTo(6.9,9);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(945,0,'square');
        square.scale.setTo(7.1,9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(0,1370,'square');
        square.scale.setTo(2.9,1.3);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1335,1370,'square');
        square.scale.setTo(2.9,1.3);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(500,1370,'square');
        square.scale.setTo(6.25,1.3);
        square.body.immovable = true;
        square.body.moves = false;
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        //mc cant go pass bounds
        game.physics.arcade.collide(Ash.chSprite, bounds);
        
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);
        //var encounter2 = game.physics.arcade.overlap(mc, EnemyGroup2, null, null, this);

        if (encounter1 && !inTransition && !fighting){
            fighting = true;
            game.camera.unfollow();
            if (Allies.length > 1){
                if (Allies.indexOf(Kori) != -1){
                    kori = game.add.sprite(mc.x,mc.y,'kori');
                    kori.anchor.setTo(0.5,0.5);
                    kori.scale.setTo(1.1, 1.1);
                    game.physics.enable(kori);
                    kori.body.collideWorldBounds = true;
                    kori.animations.add('walkleft', [6,7,8]);
                    kori.animations.add('walkright', [9,10,11]);
                    kori.animations.add('walkdown', [0,1,2]);
                    kori.animations.add('walkup', [3,4,5]);
                    kori.animations.add('attack', [10,12,10]);
                    kori.animations.add('icespell', [13,10]);
                    kori.animations.add('heal',[13,10]);
                    Kori.chSprite = kori;
                }
            }
            moveCamera = game.add.tween(game.camera).to({x:400,y:1500},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+200*i);
                }
                for (var i = 0; i < EnemyGroup1.children.length; i++){
                    moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+100+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup1;
            },this);
        }
        /*
        if (encounter2 && !inTransition){
            fighting = true;
            game.camera.unfollow();
            moveTo(mc,game.camera.x+150,game.camera.y+200);
            for (var i = 0; i < EnemyGroup2.children.length; i++){
                moveTo(EnemyGroup2.children[i],game.camera.x+650,game.camera.y+100+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup2;
        }
        
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