var story2Completed = false, swampMiniBoss = false, bounds;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.image('lake', 'assets/backgrounds/lake.png');
        game.load.spritesheet('swampboss', 'assets/spritesheets/swampbosssprites.png', 280, 160);
        game.load.spritesheet('swamplady', 'assets/spritesheets/swampladysprites.png', 100, 130);
        game.load.spritesheet('flasher', 'assets/spritesheets/theflashersprites.png', 140, 130);
        game.load.image('icespikes', 'assets/sprites/icespikes.png');
        game.load.image('shadowbeam', 'assets/sprites/beam.png');
        game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square2.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/lake_music.ogg', 'assets/audio/lake_music.mp3']);      
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        battleMusic = game.add.audio('battle_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'lake');
        
        /*
        immovableObjs = game.add.group();
        immovableObjs.enableBody = true;
        var immovbl = immovableObjs.create(0,0,'immovbl1');
        immovbl.body.immovable = true;
        immovbl.body.moves = false;
        var immovbl = immovableObjs.create(0,0,'immovbl2');
        immovbl.body.immovable = true;
        immovbl.body.moves = false;*/
        if (previousState == "overworldL"){
            mc = game.add.sprite(100, 600, 'mc');
        }
        if (previousState == "overworldR"){
            mc = game.add.sprite(1570, 470, 'mc');
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
        mc.animations.add('fireslash',[10,12,10]);
        mc.animations.add('bladeblitz',[10,12,10]);
        mc.animations.add('ignite',[13,10]);
        mc.animations.add('hellfire',[10,12,10]);
        Ash.chSprite = mc;
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var swamplady = EnemyGroup1.create(223, 373,'swamplady');
        swamplady.scale.setTo(0.9);
        swamplady.animations.add('walkleft',[0,1]);
        swamplady.animations.add('walkright',[2,3]);
        swamplady.animations.add('attack',[0,5]);
        swamplady.animations.add('icespikes',[4,5,0]);
        swamplady.addChild(game.make.sprite(15,135,'ice_element'));
        swamplady.children[0].scale.setTo(0.3);
        swamplady.addChild(game.make.sprite(32,139,'hpBar'));
        swamplady.children[1].scale.setTo(0.3,0.3);
        swamplady.barXScale = 0.3;
        Swamplady(swamplady,5);
        var swamplady = EnemyGroup1.create(416, 466,'swamplady');
        swamplady.scale.setTo(0.9);
        swamplady.animations.add('walkleft',[0,1]);
        swamplady.animations.add('walkright',[2,3]);
        swamplady.animations.add('attack',[0,5]);
        swamplady.animations.add('icespikes',[4,5,0]);
        swamplady.addChild(game.make.sprite(15,135,'ice_element'));
        swamplady.children[0].scale.setTo(0.3);
        swamplady.addChild(game.make.sprite(32,139,'hpBar'));
        swamplady.children[1].scale.setTo(0.3,0.3);
        swamplady.barXScale = 0.3;
        Swamplady(swamplady,5);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var flasher = EnemyGroup2.create(320, 1110,'flasher');
        flasher.scale.setTo(0.9);
        flasher.animations.add('walkleft',[0]);
        flasher.animations.add('walkright',[1]);
        flasher.animations.add('attack',[0,2,4]);
        flasher.animations.add('shadowbeam',[2,3,0]);
        flasher.addChild(game.make.sprite(35,135,'null_element'));
        flasher.children[0].scale.setTo(0.3);
        flasher.addChild(game.make.sprite(52,139,'hpBar'));
        flasher.children[1].scale.setTo(0.3,0.3);
        flasher.barXScale = 0.3;
        Flasher(flasher,5);
        
        EnemyGroup3 = game.add.group();
        EnemyGroup3.enableBody = true;     
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true;     

        //bottom lake
        
        var square = bounds.create(1055, 640,'square');
        square.scale.setTo(.5,.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1065, 643,'square');
        square.scale.setTo(2.7,3);
        square.body.immovable = true;
        square.body.moves = false;
        
        
        var square = bounds.create(620, 700,'square');
        square.scale.setTo(6.8,4);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1340, 825,'square');
        square.scale.setTo(7,1);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(912, 1125,'square');
        square.scale.setTo(4,4);
        square.body.immovable = true;
        square.body.moves = false;

        //top lake
        var square = bounds.create(670, 0,'square');
        square.scale.setTo(6.1,4.3);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(627, 416,'square');
        square.scale.setTo(1,0.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(760, 429,'square');
        square.scale.setTo(1.7,.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(467, 850,'square');
        square.scale.setTo(1,2.6);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(390, 940,'square');
        square.scale.setTo(1,1.6);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(260, 1000,'square');
        square.scale.setTo(1,.7);
        square.body.immovable = true;
        square.body.moves = false;    
        
        var square = bounds.create(366, 0,'square');
        square.scale.setTo(5,.8);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(366, 0,'square');
        square.scale.setTo(1.3,2.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1306, 239,'square');
        square.scale.setTo(5,.1);
        square.body.immovable = true;
        square.body.moves = false; 
        
        var square = bounds.create(530, 80,'square');
        square.scale.setTo(5,.5);
        square.body.immovable = true;
        square.body.moves = false;  

        //trees
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(4,2);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1280, 5,'square');
        square.scale.setTo(4,1.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1280, 255,'square');
        square.scale.setTo(.5,.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1488, 880,'square');
        square.scale.setTo(2,4);
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
        var encounter2 = game.physics.arcade.overlap(mc, EnemyGroup2, null, null, this);

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
            moveCamera = game.add.tween(game.camera).to({x:0,y:315},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+190*i);
                }
                for (var i = 0; i < EnemyGroup1.children.length; i++){
                    moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+100+180*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup1;
            },this);
        }
        
        if (encounter2 && !inTransition && !fighting){
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
            moveCamera = game.add.tween(game.camera).to({x:0,y:420},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+190*i);
                }
                for (var i = 0; i < EnemyGroup2.children.length; i++){
                    moveTo(EnemyGroup2.children[i],game.camera.x+650,game.camera.y+100+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup2;
            },this);
        }
        
        if (mc.x > 800 && mc.y > 500 && mc.y <= 650.5 && !story2Completed){
            story2Completed = true;
            storyMode = true;
            fighting = true;
            game.camera.unfollow();
            mc.body.velocity.x = 0;
            mc.body.velocity.y = 0;
            mc.animations.stop();
            mc.frame = 10;
            setStory(["ashportrait1","(Huh?)","(I hear something...)","(Sounds like it's coming this way)"]);
        }
        
        if (story2Completed && !storyMode && !swampMiniBoss){
            swampMiniBoss = true;
            var swampboss = EnemyGroup3.create(1400, 400,'swampboss');
            swampboss.scale.setTo(1.8);
            swampboss.animations.add('walkleft',[0,1,2,3]);
            swampboss.animations.add('walkright',[4,5,6,7]);
            swampboss.animations.add('attack',[0]);
            swampboss.animations.add('tidalwave',[8,9,0]);
            swampboss.addChild(game.make.sprite(35,165,'ice_element'));
            swampboss.children[0].scale.setTo(0.3);
            swampboss.addChild(game.make.sprite(52,169,'hpBar'));
            swampboss.children[1].scale.setTo(0.5,0.3);
            swampboss.barXScale = 0.5;
            Swampboss(swampboss,10);
            moveCamera = game.add.tween(game.camera).to({x:570,y:300},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+250+200*i);
                }
                game.camera.shake(0.02,1000,true,6);
                moveTo(EnemyGroup3.children[0],game.camera.x+400,350);
                setFightStage();
                enemyInBattle = EnemyGroup3;
            },this);
        }
        
        if (Ash.chSprite.x <= 44){
            music.destroy();
            previousState = "lakeL";
            changeState(null,'Overworld');
        }
        else if (Ash.chSprite.x >= 1576){
            music.destroy();
            previousState = "lakeR";
            changeState(null,'Overworld');
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