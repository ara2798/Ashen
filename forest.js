var story3Completed = false, story4Completed = false, forestMiniBoss = false, bounds, joinParty = false;
demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.spritesheet('korienemy', 'assets/spritesheets/korienemysheet.png', 90, 90);
        game.load.image('forest', 'assets/backgrounds/forest.png');
        game.load.image('koriportrait1','assets/sprites/koriportrait.png');
        game.load.image('koriportmad','assets/sprites/koriportrait.png');
        game.load.image('koriportsad','assets/sprites/koriportrait.png');
        game.load.image('koriportthink','assets/sprites/koriportrait.png');
        game.load.image('koriportsmile','assets/sprites/koriportrait.png');
        game.load.image('koriportfsmile','assets/sprites/koriportrait.png');
        game.load.image('koriportsigh','assets/sprites/koriportrait.png');
        game.load.spritesheet('harpie', 'assets/spritesheets/harpie.png', 128, 128);
        game.load.spritesheet('weasel', 'assets/spritesheets/weasel.png', 128, 128);
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/forest1.wav']);      
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'forest');
        
        if (previousState == "overworld"){
            mc = game.add.sprite(100, 580, 'mc');
        }
        if (previousState == "cave"){
            mc = game.add.sprite(1570, 915, 'mc');
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
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var weasel = EnemyGroup1.create(530, 490,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0]);
        weasel.animations.add('walkright',[0]);
        weasel.animations.add('attack',[0]);
        //weasel.animations.add('icespikes',[0]);
        Weasel(weasel,10);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var harpie = EnemyGroup2.create(1030, 315,'harpie');
        harpie.scale.setTo(0.9);
        harpie.animations.add('walkleft',[0]);
        harpie.animations.add('walkright',[0]);
        harpie.animations.add('attack',[0]);
        //harpie.animations.add('icespikes',[0]);
        Harpie(harpie,8);
        var weasel = EnemyGroup2.create(1290, 435,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0]);
        weasel.animations.add('walkright',[0]);
        weasel.animations.add('attack',[0]);
        //weasel.animations.add('shadowbeam',[0]);
        Weasel(weasel,8);
        
        if (!story3Completed){
            EnemyGroup3 = game.add.group();
            EnemyGroup3.enableBody = true;
            kori = EnemyGroup3.create(1470,817,'korienemy');
            kori.anchor.setTo(0.5,0.5);
            kori.scale.setTo(1.1);
            kori.frame = 7;
            kori.animations.add('walkleft', [6,7,8]);
            kori.animations.add('walkright', [9,10,11]);
            kori.animations.add('walkdown', [0,1,2]);
            kori.animations.add('walkup', [3,4,5]);
            kori.animations.add('attack', [7,12,7]);
            kori.animations.add('icespell', [13,7]);
            kori.animations.add('heal',[13,7]);
            Koriboss(kori,6);
        }
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true;     

        //Top Forest
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(5,2.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(100, 271,'square');
        square.scale.setTo(1.06,.94);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(500, 0,'square');
        square.scale.setTo(1,1);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(740,30,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(860,130,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1180,0,'square');
        square.scale.setTo(.90,1.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(350,240,'square');
        square.scale.setTo(.76,.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(790,320,'square');
        square.scale.setTo(.76,.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(990,90,'square');
        square.scale.setTo(.76,.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1450,50,'square');
        square.scale.setTo(.76,.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(821,23,'square');
        square.scale.setTo(1.45,.8);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1280,0,'square');
        square.scale.setTo(1.45,.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1435,200,'square');
        square.scale.setTo(1.45,2);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1540,500,'square');
        square.scale.setTo(1.45,1);
        square.body.immovable = true;
        square.body.moves = false;
        
        
        //bottom Forest
        var square = bounds.create(0, 1050,'square');
        square.scale.setTo(3.33,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(67, 869,'square');
        square.scale.setTo(.76,1.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(190, 835,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1073, 0,'square');
        square.scale.setTo(.76,.58);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(296, 992,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(700, 1125,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(960, 1100,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1078,1015,'square');
        square.scale.setTo(.76,1.9);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(480,835,'square');
        square.scale.setTo(.9,1.7);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(583,950,'square');
        square.scale.setTo(.76,.76);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1190,1020,'square');
        square.scale.setTo(2.5,1.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1430,1125,'square');
        square.scale.setTo(1.45,.8);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(418,1214,'square');
        square.scale.setTo(1.45,.8);
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
            console.log("fight!");
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
            moveCamera = game.add.tween(game.camera).to({x:0,y:309},500,null,true);
            moveCamera.onComplete.add(function(){
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
            moveCamera = game.add.tween(game.camera).to({x:710,y:133},500,null,true);
            moveCamera.onComplete.add(function(){
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+200*i);
                }
                for (var i = 0; i < EnemyGroup2.children.length; i++){
                    moveTo(EnemyGroup2.children[i],game.camera.x+650,game.camera.y+100+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup2;
            },this);
        }
        
        if (mc.x >= 845 && !story3Completed){
            story3Completed = true;
            storyMode = true;
            fighting = true;
            game.camera.unfollow();
            moveTo(mc,970,817);
            moveCamera = game.add.tween(game.camera).to({x:820,y:546},500,null,true);
            moveCamera.onComplete.add(function(){setStory(["ashportrait1","Kori??","koriportrait1","My liege...","ashportsad","I- I thought you died too.","koriportthink","...","koriportfsmile","You intend to kill %&$$%, don't you?","ashportrait1","...","koriportthink","I owe him a life debt. It's a bind I cannot break.","koriportrait1","Moreover... You are not strong enough to defeat him.","koriportsad","I don't want you to die too.","ashportmad","...Move.","koriportmad","Fine. If you think you are strong enough, then\nprove it.","Kill me if you can!"]);},this);
            
        }
        
        if (story3Completed && !storyMode && !forestMiniBoss){
            forestMiniBoss = true;
            setFightStage();
            enemyInBattle = EnemyGroup3;
        }
        
        if (story3Completed && forestMiniBoss && !story4Completed && !fighting){
            story4Completed = true;
            storyMode = true;
            setStory(["ashportthink","...","koriportmad","What are you waiting for? Do it!!!","ashportmad","No! We can defeat %^&* together.","ashportsmug","After all, you owe me your life now.","koriportthink","...","koriportsigh","Fine...","koriportsmile","Being with you again is somehow nostalgic. I\nsuppose I have to accompany you now... That's\nwhat your sister would have wanted.","ashportthink","...","ashportrait1","Good. Let's go."]);
            Kori.LvlUp();
            Allies.push(Kori);
        }
        
        if (story4Completed && !storyMode && !joinParty){
            joinParty = true;
            moveToAndKill(Kori.chSprite,mc.x,mc.y);
        }
        
        if (Ash.chSprite.x <= 44){
            music.destroy();
            previousState = "forest";
            changeState(null,'Overworld');
        }
        else if (Ash.chSprite.x >= 1576 && Ash.chSprite.y > 725){
            music.destroy();
            previousState = "cave";
            changeState(null,'cave');
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