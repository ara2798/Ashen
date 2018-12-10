var story3Completed = false, story4Completed = false, forestMiniBoss = false, bounds, joinParty = false;
var forestTreasure1 = {
    items: [ScorchingSword],
    opened: false
}
var forestTreasure2 = {
    items: [FlameStaff],
    opened: false
}
demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
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
        game.load.image('heal','assets/sprites/heal.png');
        game.load.image('defensebuff','assets/sprites/koribuff.png');
        game.load.spritesheet('hailstorm','assets/sprites/hailstorm.png',128, 128);
        game.load.spritesheet('harpie', 'assets/spritesheets/harpie.png', 128, 128);
        game.load.spritesheet('weasel', 'assets/spritesheets/weaselspritesheet.png', 128, 128);
        //game.load.image('icespikes', 'assets/sprites/icespikes.png');
        //game.load.image('shadowbeam', 'assets/sprites/beam.png');
        //game.load.image('tidalwave', 'assets/sprites/wave.png');
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png'); 

        //background music
        game.load.audio('background_music', ['assets/audio/forest.wav']);
        game.load.audio('kori1',['assets/audio/kori1.wav']);
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        koriMusic = game.add.audio('kori1');
        battleMusic = game.add.audio('battle_music');
        music.play('', 0, 1, true);
      
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'forest');
        
        forestTreasure1.sprite = game.add.sprite(575,1065,'treasure');
        game.physics.enable(forestTreasure1.sprite);
        forestTreasure1.sprite.body.immovable = true;
        forestTreasure1.sprite.body.moves = false;
        if (forestTreasure1.opened){
            forestTreasure1.sprite.frame = 1;
        }
        
        forestTreasure2.sprite = game.add.sprite(1290,90,'treasure');
        game.physics.enable(forestTreasure2.sprite);
        forestTreasure2.sprite.body.immovable = true;
        forestTreasure2.sprite.body.moves = false;
        if (forestTreasure2.opened){
            forestTreasure2.sprite.frame = 1;
        }
        
        if (previousState == "overworld"){
            mc = game.add.sprite(100, 580, 'mc');
        }
        if (previousState == "cave"){
            mc = game.add.sprite(1550, 915, 'mc');
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
        
        var weasel = EnemyGroup1.create(530, 490,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0,1,2,3]);
        weasel.animations.add('walkright',[4,5,6,7]);
        weasel.animations.add('attack',[8,9,0]);
        weasel.addChild(game.make.sprite(20,135,'null_element'));
        weasel.children[0].scale.setTo(0.3);
        weasel.addChild(game.make.sprite(37,139,'hpBar'));
        weasel.children[1].scale.setTo(0.3,0.3);
        weasel.barXScale = 0.3;
        weasel.originalPos = [530, 490];
        Weasel(weasel,10);
        
        EnemyGroup2 = game.add.group();
        EnemyGroup2.enableBody = true;     
        
        var harpie = EnemyGroup2.create(1030, 315,'harpie');
        harpie.scale.setTo(0.9);
        harpie.animations.add('walkleft',[0]);
        harpie.animations.add('walkright',[0]);
        harpie.animations.add('attack',[0]);
        //harpie.animations.add('icespikes',[0]);
        harpie.addChild(game.make.sprite(20,135,'storm_element'));
        harpie.children[0].scale.setTo(0.3);
        harpie.addChild(game.make.sprite(37,139,'hpBar'));
        harpie.children[1].scale.setTo(0.3,0.3);
        harpie.barXScale = 0.3;
        harpie.originalPos = [1030, 315];
        Harpie(harpie,8);
        var weasel = EnemyGroup2.create(1290, 425,'weasel');
        weasel.scale.setTo(0.9);
        weasel.animations.add('walkleft',[0,1,2,3]);
        weasel.animations.add('walkright',[4,5,6,7]);
        weasel.animations.add('attack',[8,9,0]);
        weasel.addChild(game.make.sprite(20,135,'null_element'));
        weasel.children[0].scale.setTo(0.3);
        weasel.addChild(game.make.sprite(37,139,'hpBar'));
        weasel.children[1].scale.setTo(0.3,0.3);
        weasel.barXScale = 0.3;
        weasel.originalPos = [1290, 425];
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
            Koriboss(kori,8);
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
        var touchingTreasure1 = game.physics.arcade.overlap(mc, forestTreasure1.sprite, null, null, this);
        var touchingTreasure2 = game.physics.arcade.overlap(mc, forestTreasure2.sprite, null, null, this);

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
            moveCamera = game.add.tween(game.camera).to({x:0,y:309},500,null,true);
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
            moveCamera = game.add.tween(game.camera).to({x:820,y:500},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
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
        
        if (mc.x >= 845 && !story3Completed){
            story3Completed = true;
            storyMode = true;
            fighting = true;
            game.camera.unfollow();
            moveTo(mc,970,817);
            moveCamera = game.add.tween(game.camera).to({x:820,y:546},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                koriMusic.play('', 0, 1, true);
                setStory(["ashportrait1","Kori??","koriportrait1","My liege...","ashportsad","I- I thought you died too.","koriportthink","...","koriportfsmile","You intend to kill the new king, don't you?","ashportrait1","...","koriportthink","I owe him a life debt... he spared me. It's a bind I\ncannot break. I have to remain loyal to our\nnew king.","koriportrait1","Moreover... You are not strong enough to defeat\nhim.","koriportsad","I don't want you to die too.","ashportmad","Move!!!","koriportmad","Fine. If you think you are strong enough, then\nprove it.","Kill me if you can!"]);},this);
            
        }
        
        if (story3Completed && !storyMode && !forestMiniBoss){
            forestMiniBoss = true;
            kori.addChild(game.make.sprite(-50,40,'ice_element'));
            kori.children[0].scale.setTo(0.3);
            kori.addChild(game.make.sprite(-30,44,'hpBar'));
            kori.children[1].scale.setTo(0.3,0.3);
            kori.barXScale = 0.3;
            setFightStage();
            enemyInBattle = EnemyGroup3;
        }
        
        if (story3Completed && forestMiniBoss && !story4Completed && !fighting){
            story4Completed = true;
            storyMode = true;
            kori.children[0].kill();
            kori.children[1].kill();
            setStory(["ashportthink","...","koriportmad","What are you waiting for!? Do it!!!","ashportmad","No! We can defeat the knight together.","ashportsmug","After all, you owe me your life now.","koriportthink","...","koriportsigh","Fine...","koriportsmile","Being with you again is somehow nostalgic. I\nsuppose I have to accompany you now...", "That's what your sister would have wanted.","ashportthink","...","ashportrait1","Good. Let's go."]);
            Kori.LvlUp();
            Allies.push(Kori);
            Inventory.Weapons.push(WoodStaff);
        }
        
        if (story4Completed && !storyMode && !joinParty){
            koriMusic.destroy();
            music.resume();
            moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
            moveCamera.onComplete.add(function(){game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);},this);
            joinParty = true;
            moveToAndKill(Kori.chSprite,mc.x,mc.y);
        }
        
        if (touchingTreasure1){
            if (cursors.z.isDown && !press[4] && !forestTreasure1.opened){
                press[4] = true;
                forestTreasure1.opened = true;
                mc.body.velocity.x = 0;
                mc.body.velocity.y = 0;
                itemText = "Obtained:\n"
                for (var i = 0; i < forestTreasure1.items.length; i++){
                    if (forestTreasure1.items[i].Category == "Weapon"){
                        Inventory.Weapons.push(forestTreasure1.items[i]);
                        itemText += forestTreasure1.items[i].Name
                    }
                    else if (forestTreasure1.items[i].Category == "Item"){
                        forestTreasure1.items[i].Add(1);
                        itemText += forestTreasure1.items[i].Name + " x1"
                    }
                    itemText += "\n"
                }
                forestTreasure1.sprite.frame = 1;
                treasureDisplay = game.add.sprite(game.camera.x+200,game.camera.y+100,'hud');
                treasureDisplay.scale.setTo(0.5,3.33);
                itemText = game.add.text(treasureDisplay.x+60,treasureDisplay.y+100,itemText,{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4})
                displayingTreasure = true;
            }
            else if (cursors.z.isUp){
                press[4] = false;
            }  
        }
        
        if (touchingTreasure2){
            if (cursors.z.isDown && !press[4] && !forestTreasure2.opened){
                press[4] = true;
                forestTreasure2.opened = true;
                mc.body.velocity.x = 0;
                mc.body.velocity.y = 0;
                itemText = "Obtained:\n"
                for (var i = 0; i < forestTreasure2.items.length; i++){
                    if (forestTreasure2.items[i].Category == "Weapon"){
                        Inventory.Weapons.push(forestTreasure2.items[i]);
                        itemText += forestTreasure2.items[i].Name
                    }
                    else if (forestTreasure2.items[i].Category == "Item"){
                        forestTreasure2.items[i].Add(1);
                        itemText += forestTreasure2.items[i].Name + " x1"
                    }
                    itemText += "\n"
                }
                forestTreasure2.sprite.frame = 1;
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
            music.destroy();
            previousState = "forest";
            changeState(null,'Overworld');
        }
        else if (Ash.chSprite.x >= 1568 && Ash.chSprite.y > 800){
            music.destroy();
            previousState = "forest";
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