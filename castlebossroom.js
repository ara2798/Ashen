var story5Completed = false, story6Completed = false,story7Completed = false, story8Completed = false, castleBoss = false, bounds;
demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.image('castlebossroom', 'assets/backgrounds/castlebossroom.png');
        game.load.spritesheet('knight', 'assets/spritesheets/knightspritesheet.png', 135, 135);
        game.load.image('knightportrait1','assets/sprites/knightportrait.png');
        game.load.spritesheet('dark_beam', 'assets/sprites/dark_beam.png', 400, 400);
        game.load.spritesheet('knightfire', 'assets/sprites/knightfire.png', 150, 100);
        game.load.spritesheet('knightice', 'assets/sprites/knightice.png', 150, 100);
        game.load.spritesheet('knightstorm', 'assets/sprites/knightstorm.png', 100, 150);
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/knight_dialogue1.wav']);   
        game.load.audio('knight',['assets/audio/battle_with_the_knight.wav']);
        game.load.audio('white',['assets/audio/white-sound.wav'])
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        battleMusic = game.add.audio('knight');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'castlebossroom');

        mc = game.add.sprite(400, 480, 'mc');
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(1.3);
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
        
        knight = EnemyGroup1.create(400, 230,'knight');
        knight.frame = 6;
        knight.anchor.setTo(0.5,0.5);
        knight.scale.setTo(1.1);
        knight.animations.add('walkleft',[0]);
        knight.animations.add('walkright',[0]);
        knight.animations.add('attack',[0,1,2]);
        knight.animations.add('firespell',[0,1,2,3,0]);
        knight.animations.add('icespell',[0,1,2,4,0]);
        knight.animations.add('stormspell',[0,1,2,5,0]);
        Knight(knight,10);
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        //mc cant go pass bounds
        //game.physics.arcade.collide(Ash.chSprite, bounds);
        if (!story5Completed){
            story5Completed = true;
            storyMode = true;
            fighting = true;
            game.camera.unfollow();
            mc.body.velocity.x = 0;
            mc.body.velocity.y = 0;
            mc.animations.stop();
            mc.frame = 4;
            setStory(["knightportrait1","So... the prince is finally back.\nAre you here to take back your\nthrone?","Can’t you see? There’s nothing\nleft for you to take back.","koriportrait1","...","knightportrait1","And you... I’m not surprised you\nare here with him.","This will be more fun. I will have\nno mercy on you two."]);
        }
        
        if (story5Completed && !storyMode && !castleBoss){
            castleBoss = true;
            knight.addChild(game.make.sprite(-40,70,'null_element'));
            knight.children[0].scale.setTo(0.3);
            knight.addChild(game.make.sprite(-20,74,'hpBar'));
            knight.children[1].scale.setTo(0.35,0.3);
            knight.barXScale = 0.35;
            if (Allies.length > 1){
                if (Allies.indexOf(Kori) != -1){
                    kori = game.add.sprite(mc.x,mc.y,'kori');
                    kori.anchor.setTo(0.5,0.5);
                    kori.scale.setTo(1.3);
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
            music.pause();
            battleMusic.play('', 0, 1, true);
            for (var i = 0; i < Allies.length; i++){
                moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+200*i);
            }
            for (var i = 0; i < EnemyGroup1.children.length; i++){
                moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+250+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup1;
        }
        /*
        if (story5Completed && castleBoss && !story6Completed && !fighting){
            story6Completed = true;
            storyMode = true;
            moveTo(mc,game.camera.x+399,game.camera.y+230);
            setStory(["knightportrait1","I’m going to make sure you pay for your sins,\neven until my last breath...","Your family took everything from me, it was only\nfair that I returned the favor.","My home, my village... Everything--","ashportmad","Shut up! I don’t care. ","koriportrait1","Ash, perhaps you should show him mercy--","ashportmad","There was no mercy for my sister, and she was\njust a child!","I’ll see to it that he rots in hell!","knightportrait1","Do it, kill m--","koriportrait1","...","What will you do now?", "ashportrait1","I’ll rebuild this kingdom... We’ll have peace\nin her honor."]);
        }
        if (story6Completed && !story7Completed && !storyMode){
            story7Completed = true;
            game.camera.fade(0x000000,1500);
            game.camera.onFadeComplete.add(function(){music.destroy();});
            game.time.events.add(Phaser.Timer.SECOND * 1.75, function(){
                changeState(null,"Credits")
            }, this);
        }
        */

        if (story5Completed && castleBoss && !story6Completed && !fighting){
            story6Completed = true;
            storyMode = true;
            moveTo(mc,game.camera.x+399,game.camera.y+230);
            setStory(["knightportrait1","I’m going to make sure you pay for\nyour sins, even until my last\nbreath...","Your family took everything from\nme, it was only fair that I\nreturned the favor.","My home, my village...\nEverything--","ashportmad","Shut up! I don’t care.","koriportrait1","Ash, perhaps you should show him\nmercy--","ashportmad","There was no mercy for my sister,\nand she was just a child!","I’ll see to it that he rots in\nhell!"]);
        }
        
        if (story6Completed && !story7Completed && !storyMode){
            story7Completed = true;
            storyMode = true;
            game.camera.shake(0.02,1000,true,6);
            white = game.add.audio('white');
            white.play('', 0, 1, true);
            var knightRevive = game.add.tween(knight.children[1].scale).to({x:knight.barXScale},1000,null,true);
            knightRevive.onComplete.add(function(){
                setStory(["knightportrait1","Hahahaha...","Fool! Did you really think I'd\nlet you in here without a plan?","I only needed to delay you...","The gates to the underworld are\nnow open!","I can feel it's power flowing\nthrough me.","Now... you shall atone for your\ncrimes!"]);
            },this);
        }
        
        if (story7Completed && !story8Completed && !storyMode){
            story8Completed = true;
            beam = game.add.sprite(400,200,'dark_beam');
            beam.anchor.setTo(0.5);
            beam.animations.add('act',[0,1,2,3,4,5,3,4,5,3,4,5,2,1]);
            beam.animations.play('act',8,false,true);
            game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                mc.kill();
            }, this);
            game.time.events.add(Phaser.Timer.SECOND * 1.75, function(){
                beam.kill();
                game.camera.fade(0x000000,1500);
                game.camera.onFadeComplete.add(function(){music.destroy();white.destroy();});
            }, this);
            game.time.events.add(Phaser.Timer.SECOND * 4.5, function(){
                changeState(null,"Credits")
            }, this);
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