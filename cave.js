var bounds;

var caveTreasure1 = {
    items: [FrostStaff,CycloneStaff],
    opened: false
}

demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.image('cave', 'assets/backgrounds/cave.png');
        game.load.spritesheet('snek', 'assets/spritesheets/snekspritesheet.png', 128, 128);
        //game.load.image('dark','assets/sprites/square2.png');
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/cave.wav']);      
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        battleMusic = game.add.audio('battle_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'cave');
        
        //darken = game.add.sprite(0,0,'dark');
        //darken.scale.setTo(16.2,12.6);
        //darken.alpha = 0.5;
        
        caveTreasure1.sprite = game.add.sprite(1015,425,'treasure');
        game.physics.enable(caveTreasure1.sprite);
        caveTreasure1.sprite.body.immovable = true;
        caveTreasure1.sprite.body.moves = false;
        if (caveTreasure1.opened){
            caveTreasure1.sprite.frame = 1;
        }
        
        if (previousState == "forest"){
            mc = game.add.sprite(100, 580, 'mc');
        }
        if (previousState == "overworld"){
            mc = game.add.sprite(1500, 1100, 'mc');
        }
        
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
        
        var snek = EnemyGroup1.create(500, 465,'snek');
        snek.scale.setTo(0.9);
        snek.frame = 0;
        snek.animations.add('walkleft',[1,2]);
        snek.animations.add('walkright',[3,4]);
        snek.animations.add('attack',[5,6,1]);
        //snek.animations.add('icespikes',[0]);
        snek.addChild(game.make.sprite(20,135,'null_element'));
        snek.children[0].scale.setTo(0.3);
        snek.addChild(game.make.sprite(37,139,'hpBar'));
        snek.children[1].scale.setTo(0.4,0.3);
        snek.barXScale = 0.4;
        snek.originalPos = [500, 465];
        Snek(snek,13);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var snek = EnemyGroup2.create(1000, 490,'snek');
        snek.scale.setTo(0.9);
        snek.frame = 0;
        snek.animations.add('walkleft',[1,2]);
        snek.animations.add('walkright',[3,4]);
        snek.animations.add('attack',[5,6,1]);
        //snek.animations.add('icespikes',[0]);
        snek.addChild(game.make.sprite(20,135,'null_element'));
        snek.children[0].scale.setTo(0.3);
        snek.addChild(game.make.sprite(37,139,'hpBar'));
        snek.children[1].scale.setTo(0.4,0.3);
        snek.barXScale = 0.4;
        snek.originalPos = [1050, 500];
        Snek(snek,11);
        var snek = EnemyGroup2.create(1350, 675,'snek');
        snek.scale.setTo(0.9);
        snek.frame = 0;
        snek.animations.add('walkleft',[1,2]);
        snek.animations.add('walkright',[3,4]);
        snek.animations.add('attack',[5,6,1]);
        //snek.animations.add('icespikes',[0]);
        snek.addChild(game.make.sprite(20,135,'null_element'));
        snek.children[0].scale.setTo(0.3);
        snek.addChild(game.make.sprite(37,139,'hpBar'));
        snek.children[1].scale.setTo(0.4,0.3);
        snek.barXScale = 0.4;
        snek.originalPos = [1350, 675];
        Snek(snek,11);
        var snek = EnemyGroup2.create(1050, 820,'snek');
        snek.scale.setTo(0.9);
        snek.frame = 0;
        snek.animations.add('walkleft',[1,2]);
        snek.animations.add('walkright',[3,4]);
        snek.animations.add('attack',[5,6,1]);
        //snek.animations.add('icespikes',[0]);
        snek.addChild(game.make.sprite(20,135,'null_element'));
        snek.children[0].scale.setTo(0.3);
        snek.addChild(game.make.sprite(37,139,'hpBar'));
        snek.children[1].scale.setTo(0.4,0.3);
        snek.barXScale = 0.4;
        snek.originalPos = [1050, 820];
        Snek(snek,11);
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        //****BOUNDS*****
        bounds = game.add.group();
        bounds.enableBody = true;     

        //top cave
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(16,2.8);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1068, 280,'square');
        square.scale.setTo(10,.7);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1116, 399,'square');
        square.scale.setTo(10,.1);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1499, 489,'square');
        square.scale.setTo(2,.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(870, 350,'square');
        square.scale.setTo(2,.5);
        square.body.immovable = true;
        square.body.moves = false;  
        
        //bottom cave
        var square = bounds.create(0, 1030,'square');
        square.scale.setTo(11.2,3);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(489, 978,'square');
        square.scale.setTo(1.6,3);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(534, 937,'square');
        square.scale.setTo(1,3);
        square.body.immovable = true;
        square.body.moves = false;
        
        var square = bounds.create(1131, 1124,'square');
        square.scale.setTo(1,1);
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
        var touchingTreasure1 = game.physics.arcade.overlap(mc, caveTreasure1.sprite, null, null, this);

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
            moveCamera = game.add.tween(game.camera).to({x:120,y:250},500,null,true);
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
            moveCamera = game.add.tween(game.camera).to({x:720,y:400},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                for (var i = 0; i < Allies.length; i++){
                    moveTo(Allies[i].chSprite,game.camera.x+150,game.camera.y+150+200*i);
                }
                for (var i = 0; i < EnemyGroup2.children.length; i++){
                    moveTo(EnemyGroup2.children[i],game.camera.x+650,game.camera.y+60+120*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup2;
            },this);
        }
        
        if (touchingTreasure1){
            if (cursors.z.isDown && !press[4] && !caveTreasure1.opened){
                press[4] = true;
                caveTreasure1.opened = true;
                mc.body.velocity.x = 0;
                mc.body.velocity.y = 0;
                itemText = "Obtained:\n"
                for (var i = 0; i < caveTreasure1.items.length; i++){
                    if (caveTreasure1.items[i].Category == "Weapon"){
                        Inventory.Weapons.push(caveTreasure1.items[i]);
                        itemText += caveTreasure1.items[i].Name
                    }
                    else if (caveTreasure1.items[i].Category == "Item"){
                        caveTreasure1.items[i].Add(1);
                        itemText += caveTreasure1.items[i].Name + " x1"
                    }
                    itemText += "\n"
                }
                caveTreasure1.sprite.frame = 1;
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
        
        if (Ash.chSprite.x <= 55){
            previousState = "cave";
            changeState(null,'forest');
        }
        else if (Ash.chSprite.x >= 1565 || Ash.chSprite.y >= 1200){
            previousState = "cave";
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