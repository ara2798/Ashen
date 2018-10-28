var story2Completed = false, swampMiniBoss = false;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.image('lake', 'assets/backgrounds/lake.png');
        game.load.image('immovbl1', 'assets/backgrounds/lake_imm1.png');
        game.load.image('immovbl2', 'assets/backgrounds/lake_imm2.png');
        game.load.image('battle menu', 'assets/sprites/battle.png');
        game.load.image('hud', 'assets/sprites/hud.png');
        game.load.image('cursor', 'assets/sprites/cursor.png');
        game.load.spritesheet('swampboss', 'assets/sprites/swampboss.png', 260, 130);
        game.load.spritesheet('swamplady', 'assets/sprites/swamplady.png', 65, 130);
        game.load.spritesheet('flasher', 'assets/sprites/the flasher.png', 65, 130);
        game.load.image('fire1', 'assets/sprites/skillfire1.png');
        game.load.image('sword1', 'assets/sprites/skillsword1.png');
        
        //image for boundries
        var bounds
        game.load.image('square', 'assets/sprites/square.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/lake_music.ogg', 'assets/audio/lake_music.mp3']);      
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
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
        
        var swamplady = EnemyGroup1.create(253, 373,'swamplady');
        swamplady.scale.setTo(0.9);
        swamplady.animations.add('walkleft',[0]);
        swamplady.animations.add('walkright',[0]);
        swamplady.animations.add('attack',[0]);
        Swamplady(swamplady,5);
        var swamplady = EnemyGroup1.create(446, 466,'swamplady');
        swamplady.scale.setTo(0.9);
        swamplady.animations.add('walkleft',[0]);
        swamplady.animations.add('walkright',[0]);
        swamplady.animations.add('attack',[0]);
        Swamplady(swamplady,5);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var flasher = EnemyGroup2.create(320, 1110,'flasher');
        flasher.scale.setTo(0.9);
        flasher.animations.add('walkleft',[0]);
        flasher.animations.add('walkright',[0]);
        flasher.animations.add('attack',[0]);
        Flasher(flasher,5);
        
        EnemyGroup3 = game.add.group();
        EnemyGroup3.enableBody = true;     
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //bounds
        bounds = game.add.group();
        bounds.enableBody = true;     
        
        //bottom lake
        var square = bounds.create(600, 700,'square');
        square.scale.setTo(7,7);
        square.body.immovable = true;
        square.body.moves = false;
        
        //top lake
        var square = bounds.create(556, 8,'square');
        square.scale.setTo(7,5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(467, 850,'square');
        square.scale.setTo(1,3.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(390, 940,'square');
        square.scale.setTo(1,2);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(240, 1000,'square');
        square.scale.setTo(1,1);
        square.body.immovable = true;
        square.body.moves = false;
        
        //trees
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(4,2);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(404, 276,'square');
        square.scale.setTo(.3,.3);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(520, 276,'square');
        square.scale.setTo(.3,.3);
        square.body.immovable = true;
        square.body.moves = false;
        
        
        //bottom lake bound
        //square1 = game.add.sprite(600,700,'square');
        //square1.scale.setTo(7,7);
        //bounds.add(square1);
        //game.physics.enable(square1);
        //square1.body.immovable = true;
        //square1.body.moves = false;
        
        //top lake bound
        //square2 = game.add.sprite(556,8,'square');
        //square2.scale.setTo(7,5);
        //game.physics.enable(square2);
        //square2.body.immovable = true;
        //square2.body.moves = false;
        
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        //collision = game.physics.arcade.collide(Ash.chSprite,immovableObjs);
        
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);
        var encounter2 = game.physics.arcade.overlap(mc, EnemyGroup2, null, null, this);
        
        //mc cant go pass bounds
        game.physics.arcade.collide(Ash.chSprite, bounds);
        //game.physics.arcade.collide(Ash.chSprite, square2);

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
        }
        
        if (mc.x > 650 && mc.y > 500 && mc.y < 635 && !story2Completed){
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
            var swampboss = EnemyGroup3.create(1400, 420,'swampboss');
            swampboss.scale.setTo(1.8);
            swampboss.animations.add('walkleft',[0]);
            swampboss.animations.add('walkright',[0]);
            swampboss.animations.add('attack',[0]);
            Swampboss(swampboss,10);
            moveCamera = game.add.tween(game.camera).to({x:mc.x-150,y:mc.y-300},500,null,true);
            moveCamera.onComplete.add(function(){game.camera.shake(0.02,1000,true,6);moveTo(EnemyGroup3.children[0],game.camera.x+400,420);setFightStage();enemyInBattle = EnemyGroup3;},this);
        }
        
        //Progress through the story
        continueStory();
        
        //Move main character
        moveMC();
        
        //Move cursor in  battle mode
        moveCursorBM();

        //Move cursor in skills menu
        moveCursorSM();
        
        //Move cursor in items menu
        moveCursorIM();
        
        //Pick enemy
        moveCursorEP(enemyInBattle);
        
        //Pick ally
        moveCursorAP();
        
        //Select actions
        selectBattleActions();
    }
};