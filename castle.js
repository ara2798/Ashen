var castleStory1Completed = false,castleStory2Completed = false,castleStory3Completed = false,castleStory4Completed = false, castleMiniBoss = false, bounds;
var castleTreasure1 = {
    items: [Excalibur, AncientStaff],
    opened: false
}
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.image('castle', 'assets/backgrounds/castleinterior.png');
        game.load.spritesheet('jester', 'assets/spritesheets/jesterspritesheet.png', 128, 128);
        game.load.spritesheet('skeleton', 'assets/spritesheets/skeleton.png', 128, 128);
        game.load.image('null_element','assets/sprites/null_element.png');
        game.load.image('hpBar','assets/sprites/hp.png');
        game.load.spritesheet('treasure', 'assets/sprites/treasure.png',64,64);
        game.load.image('jesterportrait1','assets/sprites/jesterportrait.png');
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');

        //background music
        game.load.audio('entrance', ['assets/audio/castle_intro.wav']);
        game.load.audio('background_music', ['assets/audio/castle_outro.wav']);
        game.load.audio('battle_music', ['assets/audio/battle.wav']);
        game.load.audio('jester', ['assets/audio/jester.wav']);
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music2 = game.add.audio('entrance');
        music2.play('', 0, 1, false);
        music = game.add.audio('background_music');
        battleMusic = game.add.audio('battle_music');
        jesterMusic = game.add.audio('jester');
        //game.time.events.add(Phaser.Timer.SECOND * 9, function(){music.play('', 0, 1, true)}, this);
      
        game.world.setBounds(0, 0, 1620, 2220);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'castle');
        
        castleTreasure1.sprite = game.add.sprite(760,1600,'treasure');
        game.physics.enable(castleTreasure1.sprite);
        castleTreasure1.sprite.body.immovable = true;
        castleTreasure1.sprite.body.moves = false;
        if (castleTreasure1.opened){
            castleTreasure1.sprite.frame = 1;
        }
        
        mc = game.add.sprite(805, 2080, 'mc');
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(1.1, 1.1);
        game.physics.enable(mc);
        mc.body.collideWorldBounds = true;
        mc.animations.add('walkleft', [6,7,8,7]);
        mc.animations.add('walkright', [9,10,11,10]);
        mc.animations.add('walkdown', [0,1,2,1]);
        mc.animations.add('walkup', [3,4,5,4]);
        mc.animations.add('attack', [10,12,10]);
        mc.animations.add('firespell', [13,10]);
        mc.animations.add('slash',[10,12,10]);
        mc.animations.add('fireslash',[10,14,10]);
        mc.animations.add('bladeblitz',[10,12,10]);
        mc.animations.add('ignite',[13,10]);
        mc.animations.add('hellfire',[13,15,10]);
        Ash.chSprite = mc;

        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        jester = EnemyGroup1.create(760, 1600,'jester');
        jester.scale.setTo(0.9);
        jester.animations.add('stand',[0,3]);
        jester.animations.add('walkleft',[0,1,2,1]);
        jester.animations.add('walkright',[3,4,5,4]);
        jester.animations.add('attack',[0]);
        jester.animations.play('stand',2,true);
        //jester.animations.add('icespikes',[0]);
        jester.addChild(game.make.sprite(0,135,'fire_element'));
        jester.children[0].scale.setTo(0.3);
        jester.addChild(game.make.sprite(20,139,'hpBar'));
        jester.children[1].scale.setTo(0.3,0.3);
        jester.barXScale = 0.3;
        jester.originalPos = [760, 1600];
        Jester(jester,15);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var skeleton = EnemyGroup2.create(1190, 1610,'skeleton');
        skeleton.scale.setTo(1);
        skeleton.animations.add('walkleft',[0]);
        skeleton.animations.add('walkright',[0]);
        skeleton.animations.add('attack',[0]);
        //skeleton.animations.add('icespikes',[0]);
        skeleton.addChild(game.make.sprite(0,135,'null_element'));
        skeleton.children[0].scale.setTo(0.3);
        skeleton.addChild(game.make.sprite(20,139,'hpBar'));
        skeleton.children[1].scale.setTo(0.3,0.3);
        skeleton.barXScale = 0.3;
        skeleton.originalPos = [1190, 1610];
        Skeleton(skeleton,13);
        var skeleton = EnemyGroup2.create(1210, 1961,'skeleton');
        skeleton.scale.setTo(1);
        skeleton.animations.add('walkleft',[0]);
        skeleton.animations.add('walkright',[0]);
        skeleton.animations.add('attack',[0]);
        //skeleton.animations.add('icespikes',[0]);
        skeleton.addChild(game.make.sprite(0,135,'null_element'));
        skeleton.children[0].scale.setTo(0.3);
        skeleton.addChild(game.make.sprite(20,139,'hpBar'));
        skeleton.children[1].scale.setTo(0.3,0.3);
        skeleton.barXScale = 0.3;
        skeleton.originalPos = [1210, 1961];
        Skeleton(skeleton,13);

        EnemyGroup3 = game.add.group();
        EnemyGroup3.enableBody = true;
        
        var skeleton = EnemyGroup3.create(360, 1290,'skeleton');
        skeleton.scale.setTo(1);
        skeleton.animations.add('walkleft',[0]);
        skeleton.animations.add('walkright',[0]);
        skeleton.animations.add('attack',[0]);
        //skeleton.animations.add('icespikes',[0]);
        skeleton.addChild(game.make.sprite(0,135,'null_element'));
        skeleton.children[0].scale.setTo(0.3);
        skeleton.addChild(game.make.sprite(20,139,'hpBar'));
        skeleton.children[1].scale.setTo(0.3,0.3);
        skeleton.barXScale = 0.3;
        skeleton.originalPos = [360, 1290];
        Skeleton(skeleton,13);
        var skeleton = EnemyGroup3.create(780, 843,'skeleton');
        skeleton.scale.setTo(1);
        skeleton.animations.add('walkleft',[0]);
        skeleton.animations.add('walkright',[0]);
        skeleton.animations.add('attack',[0]);
        //skeleton.animations.add('icespikes',[0]);
        skeleton.addChild(game.make.sprite(0,135,'null_element'));
        skeleton.children[0].scale.setTo(0.3);
        skeleton.addChild(game.make.sprite(20,139,'hpBar'));
        skeleton.children[1].scale.setTo(0.3,0.3);
        skeleton.barXScale = 0.3;
        skeleton.originalPos = [780, 843];
        Skeleton(skeleton,13);
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true; 
        
        var square = bounds.create(0,0,'square');
        square.scale.setTo(6.9,9);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(980,0,'square');
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
        var encounter2 = game.physics.arcade.overlap(mc, EnemyGroup2, null, null, this);
        var encounter3 = game.physics.arcade.overlap(mc, EnemyGroup3, null, null, this);
        var touchingTreasure1 = game.physics.arcade.overlap(mc, castleTreasure1.sprite, null, null, this);
        
        if (encounter1 && !inTransition && !fighting && !castleStory1Completed){
            castleStory1Completed = true;
            storyMode = true;
            moveTo(mc,650,1660);
            moveCamera = game.add.tween(game.camera).to({x:400,y:1400},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                music2.pause();
                jesterMusic.play('', 0, 1, true);
                setStory(["jesterportrait1","What do you want kid? Can’t you\nsee I’m busy here...","ashportrait1","Doesn’t seem to me like you are\ndoing much.","jesterportrait1","Well, what would you know? You\nare just a kid...","Now -- scram!"]);},this);
        }
        
        if (!storyMode && !fighting && !music2.isPlaying && !music.isPlaying){
            jesterMusic.pause();
            music.play('', 0, 1, true);
        }
        
        if (encounter1 && !inTransition && !fighting && castleStory1Completed && !castleStory2Completed){
            castleStory2Completed = true;
            storyMode = true;
            moveTo(mc,650,1660);
            moveCamera = game.add.tween(game.camera).to({x:400,y:1400},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                jesterMusic.play('', 0, 1, true);
                setStory(["jesterportrait1","What!? Do you want to fight me?","...","Nah, you are too weak for me...","Go play somewhere else kid."]);},this);
        }
        
        if (encounter1 && !inTransition && !fighting && castleStory2Completed && !castleStory3Completed){
            fighting = true;
            castleStory3Completed = true;
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
            moveCamera = game.add.tween(game.camera).to({x:400,y:1400},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                jesterMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+200+200*i);
                }
                for (var i = 0; i < EnemyGroup1.children.length; i++){
                    moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+200+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup1;
                dialogueBox = game.add.sprite(game.camera.x,game.camera.y,'hud');
                dialogueBox.scale.setTo(1,1.5);
                dialogueBox.lifespan = 2000;
                portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,'jesterportrait1');
                portrait.scale.setTo(0.5);
                portrait.lifespan = 2000;
                text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,'Ok, that’s it. If you insist,\nthen let’s play!',{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                text.lifespan = 2000;
            },this);
        }
        
        if (encounter1 && !inTransition && !fighting && castleStory3Completed && !castleStory4Completed){
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
            moveCamera = game.add.tween(game.camera).to({x:400,y:1400},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                jesterMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+200+200*i);
                }
                for (var i = 0; i < EnemyGroup1.children.length; i++){
                    moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+200+200*i);
                    EnemyGroup1.children[i].Stats.HP = EnemyGroup1.children[i].MaxStats.HP;
                    game.add.tween(jester.children[1].scale).to({x:jester.barXScale*jester.Stats.HP/jester.MaxStats.HP},500,null,true);
                }
                setFightStage();
                enemyInBattle = EnemyGroup1;
                dialogueBox = game.add.sprite(game.camera.x,game.camera.y,'hud');
                dialogueBox.scale.setTo(1,1.5);
                dialogueBox.lifespan = 2000;
                portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,'jesterportrait1');
                portrait.scale.setTo(0.5);
                portrait.lifespan = 2000;
                text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,'No fair, you took a break. Well,\ntwo can play the same game...',{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                text.lifespan = 2000;
            },this);
        }

        if (jester.Stats.HP <=0 && !fighting && !castleStory4Completed){
            castleStory4Completed = true;
            storyMode = true;
            music.pause();
            jesterMusic.play('', 0, 1, true);
            setStory(["jesterportrait1","Oh no! I think left the oven on...","...","I gotta go!"]);
            //moveCamera = game.add.tween(game.camera).to({x:400,y:1400},500,null,true);
            //moveCamera.onComplete.add(function(){
                //music.pause();
                //jesterMusic.play('', 0, 1, true);
                //setStory(["jesterportrait1","Oh no! I think left the oven on...","...","I gotta go!"]);},this);
        }
        
        if (castleStory4Completed && !castleMiniBoss && !storyMode){
            castleMiniBoss = true;
            moveToAndKill(jester,1550,1660);
            moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
            moveCamera.onComplete.add(function(){game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);},this);
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
            moveCamera = game.add.tween(game.camera).to({x:820,y:1620},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                music2.pause();
                battleMusic.play('', 0, 1, true);
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
        
        if (encounter3 && !inTransition && !fighting){
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
            moveCamera = game.add.tween(game.camera).to({x:260,y:900},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                music2.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+120+200*i);
                }
                for (var i = 0; i < EnemyGroup3.children.length; i++){
                    moveTo(EnemyGroup3.children[i],game.camera.x+650,game.camera.y+30+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup3;
            },this);
        }
        
        if (touchingTreasure1){
            if (cursors.z.isDown && !press[4] && !castleTreasure1.opened){
                press[4] = true;
                castleTreasure1.opened = true;
                mc.body.velocity.x = 0;
                mc.body.velocity.y = 0;
                itemText = "Obtained:\n"
                for (var i = 0; i < castleTreasure1.items.length; i++){
                    if (castleTreasure1.items[i].Category == "Weapon"){
                        Inventory.Weapons.push(castleTreasure1.items[i]);
                        itemText += castleTreasure1.items[i].Name
                    }
                    else if (castleTreasure1.items[i].Category == "Item"){
                        castleTreasure1.items[i].Add(1);
                        itemText += castleTreasure1.items[i].Name + " x1"
                    }
                    itemText += "\n"
                }
                castleTreasure1.sprite.frame = 1;
                treasureDisplay = game.add.sprite(game.camera.x+200,game.camera.y+100,'hud');
                treasureDisplay.scale.setTo(0.5,3.33);
                itemText = game.add.text(treasureDisplay.x+60,treasureDisplay.y+100,itemText,{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4})
                displayingTreasure = true;
            }
            else if (cursors.z.isUp){
                press[4] = false;
            }  
        }
        
        if (displayingTreasure && cursors.z.isDown && !press[4]){
            displayingTreasure = false;
            treasureDisplay.kill();
            itemText.kill();
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