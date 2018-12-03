var story5Completed = false, story6Completed = false, castleBoss = false, bounds;
demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.image('castlebossroom', 'assets/backgrounds/castlebossroom.png');
        game.load.spritesheet('knight', 'assets/spritesheets/knightspritesheet.png', 135, 135);
        game.load.image('knightportrait1','assets/sprites/knightportrait.png');
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/knight_dialogue1.wav']);   
        game.load.audio('knight',['assets/audio/battle_with_the_knight.wav']);
        
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
            setStory(["knightportrait1","So... the prince is finally back. Are you here to\ntake back your throne?","Can’t you see? There’s nothing left for you to\ntake back.","koriportrait1","...","knightportrait1","And you... I’m not surprised you are here with him.","This will be more fun. I will have no mercy on you two."]);
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
                moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+200+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup1;
        }
        
        if (story5Completed && castleBoss && !story6Completed && !fighting){
            story6Completed = true;
            storyMode = true;
            moveTo(mc,game.camera.x+399,game.camera.y+230);
            setStory(["knightportrait1","I’m going to make sure you pay for your sins,\neven until my last breath...","Your family took everything from me, it was only\nfair that I returned the favor.","My home, my village... Everything--","ashportmad","Shut up. I don’t care. ","koriportrait1","Ash, perhaps you should show him mercy--","ashportmad","There was no mercy for my sister, and she was\njust a child.","I’ll see to it that he rots in hell.","knightportrait1","Do it, kill m--","koriportrait1","...","What will you do now?", "ashportrait1","I’ll rebuild this kingdom... We’ll have peace\nin her honor."]);
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