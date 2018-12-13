var previousState = "intro", pause = false, storyMode=false, story1Completed=false, story, storyElement, unlockGYExit = false, fighting=false, inTransition = false, escapedBattle = false, enemyInBattle, firstEnemy = 0, lastEnemy = 5, enemyPicked = 0, skillPicked = 0, itemPicked = 0, allyPicked = 0, weaponPicked, currentCpos = [], press = [true,true,true,true,true,true,true],/*[right,left,up,down,z,x,p]*/ cursors, currentMenu, currentSubmenu, turn = 1, actionBuilder = [], BattleActionStack = [], DamageMultiplier = 1, Damage, LostBattle = false, WonBattle = false, BattleXP = 0, BattleCoins = 0, BattleResults = [], ResultDisplayed = 0, Allies=[Ash], currentHPRatio = [], currentMPRatio = [];

var bounds

var portraitL=["ashportrait1","ashportmad","ashportsad","ashportthink","ashportsmile","ashportsmug","koriportrait1","koriportmad","koriportsad","koriportthink","koriportsmile","koriportfsmile","koriportsigh","knightportrait1","jesterportrait1"];

var graveyardTreasure1 = {
    items: [ThunderousSword],
    opened: false
}
var displayingTreasure = false;

demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        game.load.image('graveyard', 'assets/backgrounds/graveyard.png');
        game.load.spritesheet('rain','assets/sprites/rain.png', 10, 17);
        game.load.image('pause menu', 'assets/sprites/real pause.png');
        game.load.image('battle menu', 'assets/sprites/battle.png');
        game.load.image('hud', 'assets/sprites/hud.png');
        game.load.image('cursor', 'assets/sprites/cursor.png');
        game.load.image('ashportrait1','assets/sprites/ashportrait.png');
        game.load.image('ashportmad','assets/sprites/ashportmad.png');
        game.load.image('ashportsad','assets/sprites/ashportsad.png');
        game.load.image('ashportsmile','assets/sprites/ashportsmile.png');
        game.load.image('ashportsmug','assets/sprites/ashportsmile.png');
        game.load.image('ashportthink','assets/sprites/ashportrait.png');
        game.load.image('hpBar','assets/sprites/hp.png');
        game.load.image('mpBar','assets/sprites/mp.png');
        game.load.image('fire_element','assets/sprites/fire_element.png');
        game.load.image('ice_element','assets/sprites/ice_element.png');
        game.load.image('storm_element','assets/sprites/storm_element.png');
        game.load.image('null_element','assets/sprites/null_element.png');
        game.load.spritesheet('ghoul', 'assets/spritesheets/ghoulspritesheet.png', 89, 45);
        game.load.image('fireball', 'assets/sprites/skillfire1.png');
        game.load.spritesheet('attackbuff', 'assets/sprites/ashbuff.png', 90, 90);
        game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 128, 128);
        game.load.image('hellfire', 'assets/sprites/hellfire.png');
        game.load.image('smallHP', 'assets/sprites/small_pot_hp.png');
        game.load.image('mediumHP', 'assets/sprites/mid_pot_hp.png');
        game.load.image('largeHP', 'assets/sprites/large_pot_hp.png');
        game.load.image('smallMP', 'assets/sprites/small_pot_mana.png');
        game.load.image('mediumMP', 'assets/sprites/mid_pot_mana.png');
        game.load.image('largeMP', 'assets/sprites/large_pot_mana.png');
        game.load.image('smallRevitalizer', 'assets/sprites/small_pot_revitalizer.png');
        game.load.image('mediumRevitalzer', 'assets/sprites/mid_pot_revitalizer.png');
        game.load.image('largeRevitalizer', 'assets/sprites/large_pot_revitalizer.png');
        game.load.image('sword1', 'assets/sprites/skillsword1.png');
        game.load.image('item', 'assets/sprites/item.png');
        game.load.spritesheet('treasure', 'assets/sprites/treasure.png',64,64);
        
        //image for boundries
        game.load.image('square', 'assets/sprites/square.png');
        
        //music
        game.load.audio('background_music', ['assets/audio/graveyard_background_music.ogg', 'assets/audio/graveyard_background_music.mp3']);
        game.load.audio('battle_music', ['assets/audio/battle.wav']);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        battleMusic = game.add.audio('battle_music');
        music.play('', 0, 1, true);
        
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'graveyard');
        
        var emitter = game.add.emitter(850, -630, 1500);
        emitter.width = 2300;
        emitter.angle = 20;
        emitter.makeParticles('rain');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 2600, 5, 0);
        
        /*platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, 900, 'road');
        ground.body.immovable = true;
        var ledge = platforms.create(600,700, 'road');
        ledge.scale.setTo(0.3,0.5);
        ledge.body.immovable = true;*/
        
        graveyardTreasure1.sprite = game.add.sprite(188,214,'treasure');
        game.physics.enable(graveyardTreasure1.sprite);
        graveyardTreasure1.sprite.body.immovable = true;
        graveyardTreasure1.sprite.body.moves = false;
        if (graveyardTreasure1.opened){
            graveyardTreasure1.sprite.frame = 1;
        }
        
        if(previousState == "intro"){
            mc = game.add.sprite(622, 914, 'mc');
        }
        else{
            mc = game.add.sprite(1400, 1200, 'mc');
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
        
        //bounds
        square = game.add.sprite(5,815,'square');
        square.scale.setTo(1.5,3.5);
        game.physics.enable(square);
        square.body.immovable = true;
        square.body.moves = false;
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;  
        if (!unlockGYExit){
            var ghoul = EnemyGroup1.create(212, 232,'ghoul');
            ghoul.scale.setTo(1.2);
            ghoul.animations.add('walkleft',[0]);
            ghoul.animations.add('walkright',[1]);
            ghoul.animations.add('attack',[0,2]);
            ghoul.addChild(game.make.sprite(0,50,'null_element'));
            ghoul.children[0].scale.setTo(0.3);
            ghoul.addChild(game.make.sprite(17,54,'hpBar'));
            ghoul.children[1].scale.setTo(0.3,0.3);
            ghoul.barXScale = 0.3;
            ghoul.originalPos = [212,232];
            Ghoul(ghoul,5);
            
            var ghoul = EnemyGroup1.create(1100, 375,'ghoul');
            ghoul.scale.setTo(1.2);
            ghoul.animations.add('walkleft',[0]);
            ghoul.animations.add('walkright',[1]);
            ghoul.animations.add('attack',[0,2]);
            ghoul.addChild(game.make.sprite(0,50,'null_element'));
            ghoul.children[0].scale.setTo(0.3);
            ghoul.addChild(game.make.sprite(17,54,'hpBar'));
            ghoul.children[1].scale.setTo(0.3,0.3);
            ghoul.barXScale = 0.3;
            ghoul.originalPos = [1100,375];
            Ghoul(ghoul,5);
            //ghoul.addChild(game.add.text(20,50,'HP: '+ghoul.Stats.HP+'/'+ghoul.MaxStats.HP,{fontSize:10,fill:'#ffffff',stroke:'#000000',strokeThickness:2}));
        }
        
        //var move3 = game.add.tween(ghoul).to({x:315,y:550},4500,null,true,0);
        //move3.onRepeat.add(function(){ghoul.scale.setTo(1.2);console.log("fort");});
        //var move4 = game.add.tween(ghoul).from({x:315,y:550},4500,null,true,0);
        //move4.onStart.add(function(){ghoul.scale.setTo(-1.2,1.2);console.log("baack");});
        //move3.chain(move4);
        //move3.repeatAll(-1);
        //move3.start();
        
        //bounds
        bounds = game.add.group();
        bounds.enableBody = true;     

        //top fence
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(7,0.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(0, 20,'square');
        square.scale.setTo(3,0.5);
        square.body.immovable = true;
        square.body.moves = false;
        
        //bottom fence
        var square = bounds.create(8, 815,'square');
        square.scale.setTo(1.5,3.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1220, 880,'square');
        square.scale.setTo(1,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(920, 930,'square');
        square.scale.setTo(3.8,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(820, 940,'square');
        square.scale.setTo(4.8,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(760, 960,'square');
        square.scale.setTo(5.4,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(730, 980,'square');
        square.scale.setTo(5.7,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(698, 1000,'square');
        square.scale.setTo(6,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(606, 1010,'square');
        square.scale.setTo(7,5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(380, 1140,'square');
        square.scale.setTo(2,1);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(606, 1037,'square');
        square.scale.setTo(1.5,3.5);
        square.body.immovable = true;
        square.body.moves = false;
    
        //right fence
        var square = bounds.create(1398, 361,'square');
        square.scale.setTo(7,3.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1323, 261,'square');
        square.scale.setTo(7,3.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1228, 60,'square');
        square.scale.setTo(7,3.5);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(1153, 41,'square');
        square.scale.setTo(7,2);
        square.body.immovable = true;
        square.body.moves = false;
        
        //left fence
        var square = bounds.create(0, 0,'square');
        square.scale.setTo(1,7);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(100, 430,'square');
        square.scale.setTo(1,7);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(190, 650,'square');
        square.scale.setTo(1,2);
        square.body.immovable = true;
        square.body.moves = false;
        var square = bounds.create(280, 860,'square');
        square.scale.setTo(1,3);
        square.body.immovable = true;
        square.body.moves = false;
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        
        game.physics.arcade.collide(mc, bounds);
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);
        var touchingTreasure1 = game.physics.arcade.overlap(mc, graveyardTreasure1.sprite, null, null, this);
        
        if (EnemyGroup1.countLiving() == 0){
            unlockGYExit = true;
        }
        
        if (encounter1 && !inTransition && !fighting){
            fighting = true;
            game.camera.unfollow();
            moveCamera = game.add.tween(game.camera).to({x:362,y:164},500,null,true);
            moveCamera.onComplete.add(function(){
                music.pause();
                battleMusic.play('', 0, 1, true);
                moveTo(mc,game.camera.x+150,game.camera.y+200);
                for (var i = 0; i < EnemyGroup1.children.length; i++){
                    moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+100+200*i);
                }
                setFightStage();
                enemyInBattle = EnemyGroup1;
            },this);
        }
        
        if (touchingTreasure1){
            if (cursors.z.isDown && !press[4] && !graveyardTreasure1.opened){
                press[4] = true;
                graveyardTreasure1.opened = true;
                mc.body.velocity.x = 0;
                mc.body.velocity.y = 0;
                itemText = "Obtained:\n"
                for (var i = 0; i < graveyardTreasure1.items.length; i++){
                    if (graveyardTreasure1.items[i].Category == "Weapon"){
                        Inventory.Weapons.push(graveyardTreasure1.items[i]);
                        itemText += graveyardTreasure1.items[i].Name
                    }
                    else if (graveyardTreasure1.items[i].Category == "Item"){
                        graveyardTreasure1.items[i].Add(1);
                        itemText += graveyardTreasure1.items[i].Name + " x1"
                    }
                    itemText += "\n"
                }
                graveyardTreasure1.sprite.frame = 1;
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
        
        if (Ash.chSprite.x >= 1370 && Ash.chSprite.y >= 1210 && unlockGYExit){
            music.destroy();
            previousState = "graveyard";
            changeState(null,'Overworld');
        }
        else if (Ash.chSprite.x >= 1370 && Ash.chSprite.y >= 1210 && !unlockGYExit && !storyMode){
            storyMode = true;
            moveTo(mc,1438,998);
            setStory(["ashportrait1","I should kill all the monsters\nnearby.", "I don't want them anywhere near\nmy sister's grave."]);
        }
        
        //Intro to story
        if (!story1Completed && game.camera.x == 72){
            story1Completed = true;
            storyMode = true;
            mc.frame = 4;
            setStory(["ashportsad","Rest in peace, my beloved sister.\nI brought your favorite flowers...","I’m sorry... I should’ve been able\nto save you. It’s all my fault...","All I have left of you is your old\nteddy bear -- it keeps me warm...","Almost like you’re still here.","...","I know you wouldn’t approve, but\nI have to make this right.","...I’ll do whatever it takes."]);
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

function setStory(storyL){
    dialogueBox = game.add.sprite(game.camera.x,game.camera.y,'hud');
    dialogueBox.scale.setTo(1,1.5);
    portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,storyL[0]);
    portrait.scale.setTo(0.5);
    text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,storyL[1],{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4,font:'Press Start 2P'});
    story = storyL;
    storyElement = 2;
}

function continueStory(){
    if (storyMode){
        if(cursors.z.isDown && !press[4] && storyElement < story.length){
            press[4] = true;
            if(portraitL.indexOf(story[storyElement]) != -1){
                portrait.kill();
                portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,story[storyElement]);
                portrait.scale.setTo(0.5);
                storyElement += 1;
            }
            text.kill();
            text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,story[storyElement],{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4,font:'Press Start 2P'});
            storyElement += 1;
        }
        else if(cursors.z.isDown && !press[4]){
            press[4] = true;
            portrait.kill();
            text.kill();
            dialogueBox.kill();
            story = null;
            storyMode = false;
        }
        else if (cursors.z.isUp){
            press[4] = false;
        }
    }
}

function createPauseM(){
    if (!fighting && !storyMode){
        if (cursors.p.isDown && !press[6] && !pause){
            press[6] = true;
            pause = true;
            currentMenu = "pauseM";
            pauseM = game.add.sprite(game.camera.x,game.camera.y,'pause menu');
            pauseMtext = game.add.text(game.camera.x+610,game.camera.y+40,"Stats\nSkills\nItems\nWeapons",{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            currentCpos = [game.camera.x+570,game.camera.y+43]
            createCursor(currentCpos[0],currentCpos[1]);
            currentSubmenu = "Stats";
            createSubmenu();
        }
        else if (cursors.p.isDown && !press[6] && pause){
            press[6] = true;
            pause = false;
            currentMenu = "";
            pauseM.kill();
            pauseMtext.kill();
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            cursor.kill();
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
        }
        else if (cursors.p.isUp){
            press[6] = false;
        }
    }
}

function createSubmenu(){
    textOS = [];
    if (currentSubmenu == "Stats"){
        for (var i = 0; i < Allies.length; i++){
            text = "";
            Allies[i].portrait = game.add.sprite(game.camera.x+50,game.camera.y+50+175*i,Allies[i].PortraitKey);
            Allies[i].portrait.scale.setTo(0.7);
            text += "Lvl. " + Allies[i].Lvl + "\n";
            text += "HP: " + Allies[i].Stats.HP + "/" + Allies[i].MaxStats.HP + "\n";
            text += "MP: " + Allies[i].Stats.MP + "/" + Allies[i].MaxStats.MP + "\n";
            text += "Phys. Attack: " + Allies[i].Stats.PhysAttack;
            var SpaceBetwn = 6 - Allies[i].Stats.PhysAttack.toString().length;
            for (var j = 0; j < SpaceBetwn; j++){
                text += " ";
            }
            text += "Phys. Defense: " + Allies[i].Stats.PhysDefense + "\n";
            text += "Mag. Attack: " + Allies[i].Stats.MagAttack;
            var SpaceBetwn = 7 - Allies[i].Stats.MagAttack.toString().length;
            for (var j = 0; j < SpaceBetwn; j++){
                text += " ";
            }
            text += "Mag. Defense: " + Allies[i].Stats.MagDefense + "\n";
            text += "Speed: " + Allies[i].Stats.Speed + "\n";
            Allies[i].XPCurve();
            text += "Exp. Points: " + Allies[i].XPObtained + "/" + Allies[i].XPNeeded;
            text += "\n\n";
            Text = game.add.text(game.camera.x+210, game.camera.y+50+175*i,text,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
            textOS.push(Text);
        }
    }
    else if (currentSubmenu == "Skills"){
        text = "";
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait = game.add.sprite(game.camera.x+100+150*i,game.camera.y+50,Allies[i].PortraitKey);
            Allies[i].portrait.scale.setTo(0.4);
        }
        text += "Skill           Description                              MP\n";
        for (var j = 0; j < Allies[allyPicked].SkillsLearned.length; j++){
            text += Allies[allyPicked].SkillsLearned[j].Name;
            var SpaceBetwn = 15 - Allies[allyPicked].SkillsLearned[j].Name.length;
            for (var k = 0; k < SpaceBetwn; k++){
                text += " ";
            }
            text += Allies[allyPicked].SkillsLearned[j].Description;
            var SpaceBetwn = 25 - Allies[allyPicked].SkillsLearned[j].Description.length;
            for (var k = 0; k < SpaceBetwn; k++){
                text += " ";
            }
            text += Allies[allyPicked].SkillsLearned[j].Stats.MP;
            text += "\n"
        }
        Text = game.add.text(game.camera.x+50,game.camera.y+150,text,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
        textOS.push(Text);
    }
    else if (currentSubmenu == "Items"){
        text = "";
        text += "Name                              Price          Quantity\n";
        for (var i = 0; i < Inventory.Items.length; i++){
            if (Inventory.Items[i].Quantity > 0){
                text += Inventory.Items[i].Name;
                var SpaceBetwn = 30 - Inventory.Items[i].Name.length;
                for (var j = 0; j < SpaceBetwn; j++){
                    text += " ";
                }
                text += Inventory.Items[i].Price;
                var SpaceBetwn = 17 - Inventory.Items[i].Price.toString().length;
                for (var j = 0; j < SpaceBetwn; j++){
                    text += " ";
                }
                text += "x" + Inventory.Items[i].Quantity + "\n";
            }
        }
        Text = game.add.text(game.camera.x+80,game.camera.y+150,text,{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
        textOS.push(Text);
    }
    else if (currentSubmenu == "Weapons"){
        text = "";
        text += "Name                 Stats                        Element\n";
        for (var i = 0; i < Inventory.Weapons.length; i++){
            text += Inventory.Weapons[i].Name;
            var SpaceBetwn = 15 - Inventory.Weapons[i].Name.length;
            for (var j = 0; j < SpaceBetwn; j++){
                text += " ";
            }
            if (Inventory.Weapons[i].Stats.PhysAttack != 0){
                text += "+" + Inventory.Weapons[i].Stats.PhysAttack + " Phys. Attack";
                var SpaceBetwn = 7 - Inventory.Weapons[i].Stats.PhysAttack.toString().length;
                for (var j = 0; j < SpaceBetwn; j++){
                    text += " ";
                }
            }
            else{
                text += "+" + Inventory.Weapons[i].Stats.MagAttack + " Mag. Attack";
                var SpaceBetwn = 8 - Inventory.Weapons[i].Stats.PhysAttack.toString().length;
                for (var j = 0; j < SpaceBetwn; j++){
                    text += " ";
                }
            }
            text += Inventory.Weapons[i].Element + "\n";
        }
        Text = game.add.text(game.camera.x+80,game.camera.y+150,text,{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
        textOS.push(Text);
    }
}

function moveCursorPM(){
    if (currentMenu == "pauseM"){
        //currentCpos[0] = textBox.x + 122 + (turn - 1) * 250;
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (currentCpos[1] > game.camera.y+43){
                cursor.kill();
                currentCpos[1] -= 36;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] += 108;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            console.log("pressing down");
            if (currentCpos[1] < game.camera.y+151){
                cursor.kill();
                currentCpos[1] += 36;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] -= 108;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function moveCursorPSM(){
    if (currentMenu == "pickAlly" && pause == true){
        if(cursors.right.isDown && !press[0]){
            press[0] = true;
            if (allyPicked + 1 < Allies.length){
                allyPicked += 1;
                cursor.kill();
                currentCpos[0] += 150;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                allyPicked = 0;
                cursor.kill();
                currentCpos[0] = game.camera.x+65;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.right.isUp){
            press[0] = false;
        }
        if(cursors.left.isDown && !press[1]){
            press[1] = true;
            if (allyPicked > 0){
                allyPicked -= 1;
                cursor.kill();
                currentCpos[0] -= 150;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else {
                allyPicked = Allies.length - 1;
                cursor.kill();
                currentCpos[0] += 150 * (Allies.length - 1);
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.left.isUp){
            press[1] = false;
        }
    }
    if (currentMenu == "pickItem" && Inventory.Items.length > 0){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (itemPicked > 0){
                itemPicked -= 1;
                cursor.kill();
                currentCpos[1] -= 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                itemPicked = Inventory.Items.length - 1;
                cursor.kill();
                currentCpos[1] += 29 * (Inventory.Items.length - 1);
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            if (itemPicked < Inventory.Items.length - 1){
                itemPicked += 1;
                cursor.kill();
                currentCpos[1] += 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                itemPicked = 0;
                cursor.kill();
                currentCpos[1] -= 29 * (Inventory.Items.length - 1);
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
    if (currentMenu == "pickWeapon"){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (weaponPicked > 0){
                weaponPicked -= 1;
                cursor.kill();
                currentCpos[1] -= 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                weaponPicked = Inventory.Weapons.length - 1;
                cursor.kill();
                currentCpos[1] += 29 * (Inventory.Weapons.length - 1);
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            if (weaponPicked < Inventory.Weapons.length - 1){
                weaponPicked += 1;
                cursor.kill();
                currentCpos[1] += 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                weaponPicked = 0;
                cursor.kill();
                currentCpos[1] -= 29 * (Inventory.Weapons.length - 1);
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function selectPauseMActions(){
    if(cursors.z.isDown && !press[4] && pause){
        press[4] = true;
        if (currentMenu == "pauseM" && cursor.y == game.camera.y + 43){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            currentSubmenu = "Stats";
            createSubmenu();
        }
        else if (currentMenu == "pauseM" && cursor.y == game.camera.y + 79){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Skills";
            currentMenu = "pickAlly";
            allyPicked = 0;
            createSubmenu();
            currentCpos = [game.camera.x+65,game.camera.y+80];
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "pauseM" && cursor.y == game.camera.y + 115){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Items";
            currentMenu = "pickItem";
            itemPicked = 0;
            createSubmenu();
            currentCpos = [game.camera.x+45,game.camera.y+178];
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "pauseM" && cursor.y == game.camera.y + 151){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Weapons";
            currentMenu = "pickWeapon";
            weaponPicked = 0;
            createSubmenu();
            currentCpos = [game.camera.x+45,game.camera.y+178];
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentSubmenu == "Skills" && currentMenu == "pickAlly"){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            createSubmenu();
        }
        else if (currentSubmenu == "Items" && currentMenu == "pickItem"){
            if (Inventory.Items.length > 0){
                if (Inventory.Items[itemPicked].Quantity > 0){
                    for (var i = 0; i < textOS.length; i++){
                        textOS[i].kill();
                    }
                    for (var i = 0; i < Allies.length; i++){
                        Allies[i].portrait.kill();
                        //Allies[i].hpBar.kill();
                        //Allies[i].mpBar.kill();
                    }
                    cursor.kill();
                    currentSubmenu = "Items";
                    currentMenu = "useItem";
                    createSubmenu();
                    createCursor(game.camera.x+380,game.camera.y+118);
                    itemImage = game.add.sprite(game.camera.x+60,game.camera.y+50,Inventory.Items[itemPicked].imageKey);
                    itemImage.scale.setTo(0.8);
                    itemDescr = game.add.text(game.camera.x+150,game.camera.y+55,Inventory.Items[itemPicked].Description,{fontSize:17,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                    itemUse = game.add.text(game.camera.x+420,game.camera.y+120,"Use",{fontSize:17,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                    textOS.push(itemImage);
                    textOS.push(itemDescr);
                    textOS.push(itemUse);
                }
            }
        }
        else if (currentSubmenu == "Items" && currentMenu == "useItem"){
            for (var i = 0; i < 3; i++){
                textOS[textOS.length-1].kill();
                textOS.splice(textOS.length-1,1);
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait = game.add.sprite(game.camera.x+100+150*i,game.camera.y+50,Allies[i].PortraitKey);
                Allies[i].portrait.scale.setTo(0.4);
            }
            cursor.kill();
            currentCpos = [game.camera.x+65,game.camera.y+80];
            createCursor(currentCpos[0],currentCpos[1]);
            allyPicked = 0;
            currentMenu = "pickAlly";
        }
        else if (currentSubmenu == "Items" && currentMenu == "pickAlly"){
            if (Inventory.Items[itemPicked].Quantity > 1){
                Inventory.Items[itemPicked].Use(Allies[allyPicked]);
            }
            else{
                Inventory.Items[itemPicked].Use(Allies[allyPicked]);
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].portrait.kill();
                    //Allies[i].hpBar.kill();
                    //Allies[i].mpBar.kill();
                }
                cursor.kill();
                currentMenu = "pickItem";
                itemPicked = 0;
                currentCpos = [game.camera.x+45,game.camera.y+178];
                createCursor(currentCpos[0],currentCpos[1]);
            }
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            currentSubmenu = "Items";
            createSubmenu();
        }
        else if (currentSubmenu == "Weapons" && currentMenu == "pickWeapon"){
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            if (Inventory.Weapons[weaponPicked].WeapType == "Sword"){
                Ash.portrait = game.add.sprite(game.camera.x+80,game.camera.y+50,Ash.PortraitKey);
                Ash.portrait.scale.setTo(0.4);
                text = "Current weapon: " + Ash.Weapon.Name + "\n       Assign " + Inventory.Weapons[weaponPicked].Name;
            }
            else if (Inventory.Weapons[weaponPicked].WeapType == "Staff"){
                Kori.portrait = game.add.sprite(game.camera.x+80,game.camera.y+50,Kori.PortraitKey);
                Kori.portrait.scale.setTo(0.4);
                text = "Current weapon: " + Kori.Weapon.Name + "\n       Assign " + Inventory.Weapons[weaponPicked].Name;
            }
            text = game.add.text(game.camera.x+180, game.camera.y+70,text,{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4})
            textOS.push(text);
            cursor.kill();
            currentMenu = "assignWeapon";
            createCursor(game.camera.x+180, game.camera.y+98);
        }
        else if (currentSubmenu == "Weapons" && currentMenu == "assignWeapon"){
            if (Inventory.Weapons[weaponPicked].WeapType == "Sword"){
                Ash.Weapon = Inventory.Weapons[weaponPicked];
            }
            else if (Inventory.Weapons[weaponPicked].WeapType == "Staff"){
                Kori.Weapon = Inventory.Weapons[weaponPicked];
            }
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Weapons";
            currentMenu = "pickWeapon";
            weaponPicked = 0;
            createSubmenu();
            currentCpos = [game.camera.x+45,game.camera.y+178];
            createCursor(currentCpos[0],currentCpos[1]);
        }
    }
    else if (cursors.z.isUp && pause){
        press[4] =false;
    }
    if(cursors.x.isDown && !press[5] && pause){
        press[5] = true;
        if (currentSubmenu == "Skills"){
            cursor.kill()
            currentCpos = [game.camera.x+570,game.camera.y+79];
            createCursor(currentCpos[0],currentCpos[1]);
            currentMenu = "pauseM";
        }
        else if (currentSubmenu == "Items" && currentMenu == "pickItem"){
            cursor.kill()
            currentCpos = [game.camera.x+570,game.camera.y+115];
            createCursor(currentCpos[0],currentCpos[1]);
            currentMenu = "pauseM";
        }
        else if (currentSubmenu == "Items" && currentMenu == "useItem"){
            cursor.kill();
            currentCpos = [game.camera.x+45,game.camera.y+178+(itemPicked*29)];
            createCursor(currentCpos[0],currentCpos[1]);
            currentMenu = "pickItem";
        }
        else if (currentSubmenu == "Items" && currentMenu == "pickAlly"){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Items";
            currentMenu = "useItem";
            createSubmenu();
            createCursor(game.camera.x+380,game.camera.y+118);
            itemImage = game.add.sprite(game.camera.x+60,game.camera.y+50,Inventory.Items[itemPicked].imageKey);
            itemImage.scale.setTo(0.8);
            itemDescr = game.add.text(game.camera.x+150,game.camera.y+55,Inventory.Items[itemPicked].Description,{fontSize:17,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            itemUse = game.add.text(game.camera.x+420,game.camera.y+120,"Use",{fontSize:17,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            textOS.push(itemImage);
            textOS.push(itemDescr);
            textOS.push(itemUse);
        }
        else if (currentSubmenu == "Weapons" && currentMenu == "pickWeapon"){
            cursor.kill()
            currentCpos = [game.camera.x+570,game.camera.y+151];
            createCursor(currentCpos[0],currentCpos[1]);
            currentMenu = "pauseM";
        }
        else if (currentSubmenu == "Weapons" && currentMenu == "assignWeapon"){
            for (var i = 0; i < textOS.length; i++){
                textOS[i].kill();
            }
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                //Allies[i].hpBar.kill();
                //Allies[i].mpBar.kill();
            }
            cursor.kill();
            currentSubmenu = "Weapons";
            currentMenu = "pickWeapon";
            createSubmenu();
            createCursor(currentCpos[0],currentCpos[1]);
        }
    }
    else if (cursors.x.isUp && pause){
        press[5] =false;
    }
}

function moveMC(){
    if (!fighting && !storyMode && !pause && !inTransition && !displayingTreasure){   
        if(cursors.right.isDown && mc.body.velocity.y == 0 && cursors.left.isUp){
            mc.body.velocity.x = 250;
            mc.animations.play('walkright', 7, true);
            /*if(mc.x >= 1547.5){
                changeState(null,"0");
            }*/
        }
        else if(cursors.left.isDown && mc.body.velocity.y == 0 && cursors.right.isUp){
            mc.body.velocity.x = -250;
            mc.animations.play('walkleft', 7, true);
        }
        /*else{
            mc.animations.stop('walkright');
            mc.animations.stop('walkleft');
            mc.body.velocity.x = 0;
        }*/
        else if(cursors.up.isDown && mc.body.velocity.x == 0 && cursors.down.isUp){
            mc.body.velocity.y = -200;
            mc.animations.play('walkup', 7, true);
        }
        else if(cursors.down.isDown && mc.body.velocity.x == 0 && cursors.up.isUp){
            mc.body.velocity.y = 200;
            mc.animations.play('walkdown', 7, true);
        }
        else{
            mc.animations.stop();
            //mc.animations.stop('walkdown');
            mc.frame = 1;
            mc.body.velocity.y = 0;
            mc.body.velocity.x = 0;
        }
    }
}

function moveCursorBM(){
    if (currentMenu == "mainBM"){
        //currentCpos[0] = textBox.x + 122 + (turn - 1) * 250;
        if(cursors.up.isDown && fighting && !press[2]){
            press[2] = true;
            if (currentCpos[1] > textBox.y+31){
                cursor.kill();
                currentCpos[1] -= 34;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] += 102;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp && fighting){
            press[2] = false;
        }
        if(cursors.down.isDown && fighting && !press[3]){
            press[3] = true;
            if (currentCpos[1] < textBox.y+133){
                cursor.kill();
                currentCpos[1] += 34;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] -= 102;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp && fighting){
            press[3] = false;
        }
    }
}

function moveCursorSM (){
    if (currentMenu == "skillsM"){
        //currentCpos[0] = textBox.x + 122 + (turn - 1) * 250;
        if(cursors.right.isDown && fighting && !press[0]){
            press[0] = true;
            if (skillPicked + 1 < Allies[turn - 1].SkillsLearned.length && (skillPicked + 1) % 5 != 0){
                skillPicked += 1;
                cursor.kill();
                currentCpos[0] += 125;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                skillPicked = Math.floor(skillPicked / 5) * 5;
                cursor.kill();
                currentCpos[0] = textBox.x + 85;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.right.isUp && fighting){
            press[0] = false;
        }
        if(cursors.left.isDown && fighting && !press[1]){
            press[1] = true;
            if (skillPicked % 5 > 0){
                skillPicked -= 1;
                cursor.kill();
                currentCpos[0] -= 125;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (skillPicked + 5 <= Allies[turn - 1].SkillsLearned.length){
                skillPicked += 4;
                cursor.kill();
                currentCpos[0] += 500;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else {
                skillPicked += (Allies[turn - 1].SkillsLearned.length - 1) % 5;
                cursor.kill();
                currentCpos[0] += ((Allies[turn - 1].SkillsLearned.length - 1) % 5) * 125;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.left.isUp && fighting){
            press[1] = false;
        }
        if(cursors.up.isDown && fighting && !press[2]){
            press[2] = true;
            if (skillPicked >= 5){
                skillPicked -= 5;
                cursor.kill();
                currentCpos[1] -= 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (Allies[turn - 1].SkillsLearned.length > 5){
                skillPicked += Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 5;
                cursor.kill();
                currentCpos[1] += Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 29;
                if (skillPicked >= Allies[turn-1].SkillsLearned.length){
                    skillPicked -= 5;
                    currentCpos[1] -= 29;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp && fighting){
            press[2] = false;
        }
        if(cursors.down.isDown && fighting && !press[3]){
            press[3] = true;
            if (skillPicked < Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 5){
                skillPicked += 5;
                cursor.kill();
                currentCpos[1] += 29;
                if (skillPicked >= Allies[turn - 1].SkillsLearned.length){
                    skillPicked -= Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 5;
                    currentCpos[1] -= Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 29;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (Allies[turn - 1].SkillsLearned.length > 5){
                skillPicked -= Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 5;
                cursor.kill();
                currentCpos[1] -= Math.floor(Allies[turn - 1].SkillsLearned.length / 5) * 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp && fighting){
            press[3] = false;
        }
    }
}

function moveCursorIM (){
    if (currentMenu == "itemsM"){
        //currentCpos[0] = textBox.x + 122 + (turn - 1) * 250;
        if(cursors.right.isDown && fighting && !press[0]){
            press[0] = true;
            if (itemPicked + 1 < Inventory.Items.length && (itemPicked + 1) % 3 != 0){
                itemPicked += 1;
                cursor.kill();
                currentCpos[0] += 235;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                itemPicked = Math.floor(itemPicked / 3) * 3;
                cursor.kill();
                currentCpos[0] = textBox.x + 85;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.right.isUp && fighting){
            press[0] = false;
        }
        if(cursors.left.isDown && fighting && !press[1]){
            press[1] = true;
            if (itemPicked % 3 > 0){
                itemPicked -= 1;
                cursor.kill();
                currentCpos[0] -= 235;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (itemPicked + 3 <= Inventory.Items.length){
                itemPicked += 2;
                cursor.kill();
                currentCpos[0] += 470;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else {
                itemPicked += (Inventory.Items.length - 1) % 3;
                cursor.kill();
                currentCpos[0] += ((Inventory.Items.length - 1) % 3) * 235;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.left.isUp && fighting){
            press[1] = false;
        }
        if(cursors.up.isDown && fighting && !press[2]){
            press[2] = true;
            if (itemPicked >= 3){
                itemPicked -= 3;
                cursor.kill();
                currentCpos[1] -= 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (Inventory.Items.length > 3){
                itemPicked += Math.floor(Inventory.Items.length / 3) * 3;
                cursor.kill();
                currentCpos[1] += Math.floor(Inventory.Items.length / 3) * 29;
                if (itemPicked >= Inventory.Items.length){
                    itemPicked -= 3;
                    currentCpos[1] -= 29;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp && fighting){
            press[2] = false;
        }
        if(cursors.down.isDown && fighting && !press[3]){
            press[3] = true;
            if (itemPicked < Math.floor(Inventory.Items.length / 3) * 3){
                itemPicked += 3;
                cursor.kill();
                currentCpos[1] += 29;
                if (itemPicked >= Inventory.Items.length){
                    itemPicked -= Math.floor(Inventory.Items.length / 3) * 3;
                    currentCpos[1] -= Math.floor(Inventory.Items.length / 3) * 29;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else if (Inventory.Items.length > 3){
                itemPicked -= Math.floor(Inventory.Items.length / 3) * 3;
                cursor.kill();
                currentCpos[1] -= Math.floor(Inventory.Items.length / 3) * 29;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp && fighting){
            press[3] = false;
        }
    }
}

function moveCursorEP(EnemyGroup){
    if (currentMenu == "pickEnemy" && firstEnemy != lastEnemy){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (enemyPicked == firstEnemy){
                enemyPicked = EnemyGroup.children.length - 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                while (!EnemyGroup.children[enemyPicked].alive){
                    enemyPicked -= 1;
                    currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                    currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked -= 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                while (!EnemyGroup.children[enemyPicked].alive){
                    enemyPicked -= 1;
                    currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                    currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            if (enemyPicked == lastEnemy){
                enemyPicked = firstEnemy;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                while (!EnemyGroup.children[enemyPicked].alive){
                    enemyPicked += 1;
                    currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                    currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked += 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                while (!EnemyGroup.children[enemyPicked].alive){
                    enemyPicked += 1;
                    currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                    currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                }
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function moveCursorAP(){
    if (currentMenu == "pickAlly" && Allies.length > 1){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (allyPicked == 0){
                allyPicked = Allies.length - 1;
                cursor.kill();
                currentCpos[0] = Allies[allyPicked].chSprite.x - 70;
                currentCpos[1] = Allies[allyPicked].chSprite.y - 30;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                allyPicked -= 1;
                cursor.kill();
                currentCpos[0] = Allies[allyPicked].chSprite.x - 70;
                currentCpos[1] = Allies[allyPicked].chSprite.y - 30;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            if (allyPicked == Allies.length - 1){
                allyPicked = 0;
                cursor.kill();
                currentCpos[0] = Allies[allyPicked].chSprite.x - 70;
                currentCpos[1] = Allies[allyPicked].chSprite.y - 30;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                allyPicked += 1;
                cursor.kill();
                currentCpos[0] = Allies[allyPicked].chSprite.x - 70;
                currentCpos[1] = Allies[allyPicked].chSprite.y - 30;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function setFightStage () {

    textBox = game.add.sprite(game.camera.x+0, game.camera.y+420, 'battle menu');
    textBox.scale.setTo(1.015,0.6);

    currentMenu = "mainBM";
    createMenu();
    currentCpos = [textBox.x+85,textBox.y+31];
    while (Allies[turn - 1].Stats.HP <= 0){
        currentCpos[0] += 150;
        turn += 1;
    }
    createCursor(currentCpos[0],currentCpos[1]);
    
}

function selectBattleActions() {
    if(cursors.z.isDown && fighting && !inTransition && !press[4]){
        press[4] = true;
        if (currentMenu == "mainBM" && cursor.y == textBox.y + 31){
            actionBuilder.push(Allies[turn-1]);
            actionBuilder.push(0);
            currentMenu = "pickEnemy";
            cursor.kill();
            for (var i = 0; i < enemyInBattle.children.length; i++){
                if (enemyInBattle.children[i].alive){
                    currentCpos[0] = enemyInBattle.children[i].x - 30;
                    currentCpos[1] = enemyInBattle.children[i].y;
                    enemyPicked = i;
                    firstEnemy = i;
                    break;
                }
            }
            lastEnemy = enemyInBattle.children.length - 1;
            while (!enemyInBattle.children[lastEnemy].alive){
                lastEnemy -= 1;
            }
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "mainBM" && cursor.y == textBox.y + 65){
            currentMenu = "skillsM";
            skillPicked = 0;
            textOS.destroy();
            cursor.kill();
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                Allies[i].hpBar.kill();
                Allies[i].mpBar.kill();
                Allies[i].hpDisplay.kill();
                Allies[i].mpDisplay.kill();
            }
            currentCpos[0] = textBox.x + 85;
            currentCpos[1] = textBox.y + 31;
            createMenu();
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "mainBM" && cursor.y == textBox.y + 99){
            currentMenu = "itemsM";
            itemPicked = 0;
            textOS.destroy();
            cursor.kill();
            for (var i = 0; i < Allies.length; i++){
                Allies[i].portrait.kill();
                Allies[i].hpBar.kill();
                Allies[i].mpBar.kill();
                Allies[i].hpDisplay.kill();
                Allies[i].mpDisplay.kill();
            }
            currentCpos[0] = textBox.x + 85;
            currentCpos[1] = textBox.y + 31;
            createMenu();
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "mainBM" && cursor.y == textBox.y + 133){
            escapedBattle = true;
            for (var i = 0; i < enemyInBattle.children.length; i++){
                if (enemyInBattle.children[i].Stats.HP > 0 && Allies[turn - 1].Stats.Speed < enemyInBattle.children[i].Stats.Speed){
                    escapedBattle = false;
                }
                else if (enemyInBattle.children[0] == kori || enemyInBattle.children[0] == knight || enemyInBattle.children[0] == swampboss){
                    escapedBattle = false;
                }
            }
            if (escapedBattle){
                textOS.destroy();
                cursor.kill();
                textBox.kill();
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].portrait.kill();
                    Allies[i].hpBar.kill();
                    Allies[i].mpBar.kill();
                    Allies[i].hpDisplay.kill();
                    Allies[i].mpDisplay.kill();
                }
                if (Allies.length > 1){
                    for (var i = 1; i < Allies.length; i++){
                        moveToAndKill(Allies[i].chSprite,mc.x,mc.y);
                    }
                }
                for (var j = 0; j < Allies.length; j++){
                    for (var k in Allies[j].MaxStats){
                        Allies[j].Stats[k] = Allies[j].MaxStats[k];
                    }
                }
                for (var i = 0; i < enemyInBattle.length; i++){
                    if (enemyInBattle.children[i].Stats.HP > 0){
                        moveTo(enemyInBattle.children[i],enemyInBattle.children[i].originalPos[0],enemyInBattle.children[i].originalPos[1]);
                    }
                }
                
                if (enemyInBattle.children[0] == jester){
                    storyMode = true;
                    moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
                    moveCamera.onComplete.add(function(){game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);fighting = false;setStory(["jesterportrait1","See? I told you you were too weak.","Now... where was I?"]);},this);
                }
                else{
                    moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
                    moveCamera.onComplete.add(function(){battleMusic.pause();music.resume();game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);fighting = false;},this);
                }
            }
            else{
                HUD = game.add.sprite(game.camera.x,game.camera.y,'hud');
                HUD.scale.setTo(1.015,0.5);
                HUD.lifespan = 1000;
                text = game.add.text(HUD.x+35,HUD.y+20,"Could not escape",{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                text.lifespan = 1000;
            }
        }
        else if (currentMenu == "skillsM"){
            if (Allies[turn-1].SkillsLearned[skillPicked].Stats.MP <= Allies[turn-1].Stats.MP){
                actionBuilder.push(Allies[turn-1]);
                actionBuilder.push(Allies[turn-1].SkillsLearned[skillPicked]);
                if (Allies[turn-1].SkillsLearned[skillPicked].AreaOfEffect == "All"){
                    actionBuilder.push(0);
                    currentMenu = "None";
                    addBattleAction(actionBuilder);
                }
                else if (Allies[turn-1].SkillsLearned[skillPicked].SkillType == "Attack"){
                    currentMenu = "pickEnemy";
                    cursor.kill();
                    for (var i = 0; i < enemyInBattle.children.length; i++){
                        if (enemyInBattle.children[i].alive){
                            currentCpos[0] = enemyInBattle.children[i].x - 30;
                            currentCpos[1] = enemyInBattle.children[i].y;
                            enemyPicked = i;
                            firstEnemy = i;
                            break;
                        }
                    }
                    lastEnemy = enemyInBattle.children.length - 1;
                    while (!enemyInBattle.children[lastEnemy].alive){
                        lastEnemy -= 1;
                    }
                    createCursor(currentCpos[0],currentCpos[1]);
                }
                else if (Allies[turn-1].SkillsLearned[skillPicked].SkillType == "Support"){
                    currentMenu = "pickAlly";
                    allyPicked = 0;
                    cursor.kill();
                    currentCpos[0] = Allies[0].chSprite.x - 70;
                    currentCpos[1] = Allies[0].chSprite.y - 30;
                    createCursor(currentCpos[0],currentCpos[1]);
                }
            }
            else{
                HUD = game.add.sprite(game.camera.x,game.camera.y,'hud');
                HUD.scale.setTo(1.015,0.5);
                HUD.lifespan = 1000;
                text = game.add.text(HUD.x+35,HUD.y+20,"Not enough MP",{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                text.lifespan = 1000;
            }
        }
        else if (currentMenu == "itemsM"){
            if (Inventory.Items.length > 0){
                if (Inventory.Items[itemPicked].Quantity > 0){
                    actionBuilder.push(Allies[turn-1]);
                    actionBuilder.push(Inventory.Items[itemPicked]);
                    currentMenu = "pickAlly";
                    allyPicked = 0;
                    cursor.kill();
                    currentCpos[0] = Allies[0].chSprite.x - 70;
                    currentCpos[1] = Allies[0].chSprite.y - 30;
                    createCursor(currentCpos[0],currentCpos[1]);
                }
            }
        }
        else if (currentMenu == "pickEnemy"){
            actionBuilder.push(enemyInBattle.children[enemyPicked]);
            currentMenu = "None";
            addBattleAction(actionBuilder);
        }
        else if (currentMenu == "pickAlly"){
            if (Allies[allyPicked].Stats.HP > 0){
                if ([Revitalizer,MediumRevitalizer,LargeRevitalizer].indexOf(actionBuilder[1]) == -1){
                    actionBuilder.push(Allies[allyPicked]);
                    currentMenu = "None";
                    addBattleAction(actionBuilder);
                }
                else {
                    HUD = game.add.sprite(game.camera.x,game.camera.y,'hud');
                    HUD.scale.setTo(1.015,0.5);
                    HUD.lifespan = 1000;
                    text = game.add.text(HUD.x+35,HUD.y+20,"Can't use this on the selected ally",{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                    text.lifespan = 1000;
                }
            }
            else {
                if ([Revitalizer,MediumRevitalizer,LargeRevitalizer].indexOf(actionBuilder[1]) != -1){
                    actionBuilder.push(Allies[allyPicked]);
                    currentMenu = "None";
                    addBattleAction(actionBuilder);
                }
                else {
                    HUD = game.add.sprite(game.camera.x,game.camera.y,'hud');
                    HUD.scale.setTo(1.015,0.5);
                    HUD.lifespan = 1000;
                    text = game.add.text(HUD.x+35,HUD.y+20,"Can't use this on the selected ally",{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
                    text.lifespan = 1000;
                }
            }
        }
        else if (currentMenu == "BattleEnd"){
            ResultDisplayed += 1;
            textHUD.kill();
            if (ResultDisplayed < text.length){
                textHUD = game.add.text(HUD.x+35,HUD.y+20,text[ResultDisplayed],{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            }
            else {
                ResultDisplayed = 0;
                BattleResults = [];
                BattleCoins = 0;
                BattleXP = 0;
                droppedItems = [0,0,0,0,0,0,0,0,0];
                currentMenu = "";
                turn = 1;
                textOS.kill();
                textHUD.kill();
                textBox.kill();
                HUD.kill();
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].portrait.kill();
                    Allies[i].hpBar.kill();
                    Allies[i].mpBar.kill();
                    Allies[i].hpDisplay.kill();
                    Allies[i].mpDisplay.kill();
                }
                if (Allies.length > 1){
                    for (var i = 1; i < Allies.length; i++){
                        moveToAndKill(Allies[i].chSprite,mc.x,mc.y);
                    }
                }
                for (var j = 0; j < Allies.length; j++){
                    for (var k in Allies[j].MaxStats){
                        Allies[j].Stats[k] = Allies[j].MaxStats[k];
                    }
                }
                if (enemyInBattle.children[0] != kori && enemyInBattle.children[0] != jester){
                    moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
                    moveCamera.onComplete.add(function(){battleMusic.pause();music.resume();game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);fighting = false;},this);
                }
                else {
                    fighting = false;
                }
            }
        }
    }
    else if (cursors.z.isUp && fighting){
        press[4] =false;
    }
    if(cursors.x.isDown && fighting && !press[5]){
        press[5] = true;
        if (currentMenu == "pickEnemy"){
            if (actionBuilder[1] == 0){
                currentMenu = "mainBM";
                cursor.kill();
                actionBuilder = [];
                currentCpos[0] = textBox.x + 85 + (turn - 1) * 150;
                currentCpos[1] = textBox.y + 31;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else {
                currentMenu = "skillsM";
                cursor.kill();
                skillPicked = 0;
                actionBuilder.splice(1,1);
                currentCpos[0] = textBox.x + 85;
                currentCpos[1] = textBox.y + 31;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (currentMenu == "skillsM" || currentMenu == "itemsM"){
            currentMenu = "mainBM";
            textOS.destroy();
            cursor.kill();
            actionBuilder = [];
            currentCpos[0] = textBox.x + 85 + (turn - 1) * 150;
            currentCpos[1] = textBox.y + 31;
            createCursor(currentCpos[0],currentCpos[1]);
            createMenu();
        }
        else if (currentMenu == "pickAlly"){
            cursor.kill();
            if (Inventory.Items.indexOf(actionBuilder[1]) != -1){
                currentMenu = "itemsM";
                itemPicked = 0;
                actionBuilder.splice(1,1);
                currentCpos[0] = textBox.x + 85;
                currentCpos[1] = textBox.y + 31;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else {
                currentMenu = "skillsM";
                skillPicked = 0;
                actionBuilder.splice(1,1);
                currentCpos[0] = textBox.x + 85;
                currentCpos[1] = textBox.y + 31;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
    }
    else if (cursors.x.isUp && fighting){
        press[5] =false;
    }
}

function addBattleAction(action) {
    BattleActionStack.push(action);
    actionBuilder = [];
    turn += 1;
    if (turn <= Allies.length){
        while (Allies[turn - 1].Stats.HP <= 0){
            turn += 1;
            if (turn > Allies.length){
                break;
            }       
        }
    }
    if (turn > Allies.length){
        cursor.kill()
        for (var i = 0; i < enemyInBattle.children.length; i++){
            if (enemyInBattle.children[i].alive){
                actionBuilder.push(enemyInBattle.children[i]);
                var AtkOrSkill = Math.round(Math.random()*10);
                if (AtkOrSkill <= 7 && enemyInBattle.children[i].SkillsLearned[0] != undefined){
                    if (enemyInBattle.children[i].Stats.MP >= enemyInBattle.children[i].SkillsLearned[0].Stats.MP){
                        var pickSkill = Math.round(Math.random()*(enemyInBattle.children[i].SkillsLearned.length - 1));
                        while (enemyInBattle.children[i].SkillsLearned[pickSkill].Stats.MP > enemyInBattle.children[i].Stats.MP){
                            pickSkill = Math.round(Math.random()*(enemyInBattle.children[i].SkillsLearned.length - 1));
                        }
                        actionBuilder.push(enemyInBattle.children[i].SkillsLearned[pickSkill]);
                    }
                    else {
                        actionBuilder.push(0);
                    }    
                }
                else{
                    actionBuilder.push(0);
                }
                if (actionBuilder[1] == 0){
                    var pickTarget = Math.round(Math.random()*(Allies.length-1));
                    while (Allies[pickTarget].Stats.HP <= 0){
                        pickTarget += 1;
                        if (pickTarget >= Allies.length){
                            pickTarget = 0;
                        }
                    }
                    actionBuilder.push(Allies[pickTarget]);
                }
                else if (actionBuilder[1].SkillType == "Attack"){
                    var pickTarget = Math.round(Math.random()*(Allies.length-1));
                    while (Allies[pickTarget].Stats.HP <= 0){
                        pickTarget += 1;
                        if (pickTarget >= Allies.length){
                            pickTarget = 0;
                        }
                    }
                    actionBuilder.push(Allies[pickTarget]);
                }
                else {
                    var pickTarget = Math.round(Math.random()*(enemyInBattle.children.length-1));
                    while (enemyInBattle.children[pickTarget].Stats.HP <= 0){
                        pickTarget += 1;
                        if (pickTarget >= enemyInBattle.children.length){
                            pickTarget = 0;
                        }
                    }
                    actionBuilder.push(enemyInBattle.children[pickTarget]);
                }
                BattleActionStack.push(actionBuilder);
                actionBuilder = [];
            }
        }
        sortStack(BattleActionStack);
        console.log(BattleActionStack);
        performBattleActions();
    }
    else {
        textOS.kill();
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait.kill();
            Allies[i].hpBar.kill();
            Allies[i].mpBar.kill();
            Allies[i].hpDisplay.kill();
            Allies[i].mpDisplay.kill();
        }
        currentMenu = "mainBM";
        currentCpos[0] = textBox.x + 85 + (turn - 1) * 150;
        currentCpos[1] = textBox.y + 31;
        cursor.kill();
        createCursor(currentCpos[0],currentCpos[1]);
        createMenu();
    }
}

function performBattleActions(){
    var actionNumber = 0;
    for (var i = 0; i < BattleActionStack.length; i++){
        /*game.time.events.add(Phaser.Timer.SECOND*(i*2.5),function(action){
            console.log(Phaser.Timer.SECOND * actionNumber * 1);
            game.time.events.add(Phaser.Timer.SECOND * actionNumber * 1, performAction, this,action);
            function performAction(action){
                if (action[0].Stats.HP > 0){
                    if (Allies.indexOf(action[0]) != -1){
                        //Use basic attack
                        if (action[1] == 0){
                            moveToAttack(action[0],action[0].chSprite.x+200,action[0].chSprite.y,action[2],0);
                        }
                        //Use skills
                        else if (action[0].SkillsLearned.indexOf(action[1]) != -1){
                            action[1].SkillAnimation(action[2]);
                            action[0].Stats.MP -= action[1].Stats.MP;
                            if (action[0].currentMPRatio != action[0].MPRatio()){
                                action[0].currentMPRatio = action[0].MPRatio();
                                game.add.tween(action[0].mpBar.scale).to({x:0.6*action[0].currentMPRatio},500,null,true);
                                action[0].mpDisplay.kill();
                                action[0].mpDisplay = game.add.text(action[0].portrait.x+80,action[0].mpBar.y,"MP:"+action[0].Stats.MP+"/"+action[0].MaxStats.MP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
                            }
                        }
                        //Use inventory item
                        else if (Inventory.Items.indexOf(action[1]) != -1){
                            action[1].Use(action[2]);
                        }
                    }
                    //handle enemy actions
                    else{
                        console.log("enemy atks");
                        if (action[1] == 0){
                            moveToAttack(action[0],action[0].x-200,action[0].y,action[2],0); 
                        }
                        //in progress
                        else if (Allies.indexOf(action[2]) != -1){
                            action[1].SkillAnimation(action[0],action[2]);
                            action[0].Stats.MP -= action[1].Stats.MP;
                        }
                    }
                    actionNumber++
                }
            }
        },this,BattleActionStack[i]);*/
        
        if (BattleActionStack[i][0].Stats.HP > 0){
            if (Allies.indexOf(BattleActionStack[i][0]) != -1){
                //Use basic attack
                if (BattleActionStack[i][1] == 0){
                    moveToAttack(BattleActionStack[i][0],BattleActionStack[i][0].chSprite.x+200,BattleActionStack[i][0].chSprite.y,BattleActionStack[i][2],0);
                }
                //Use skills
                else if (BattleActionStack[i][0].SkillsLearned.indexOf(BattleActionStack[i][1]) != -1){
                    BattleActionStack[i][1].SkillAnimation(BattleActionStack[i][2]);
                    BattleActionStack[i][0].Stats.MP -= BattleActionStack[i][1].Stats.MP;
                    if (BattleActionStack[i][0].currentMPRatio != BattleActionStack[i][0].MPRatio()){
                        BattleActionStack[i][0].currentMPRatio = BattleActionStack[i][0].MPRatio();
                        if (currentMenu == "mainBM"){
                            game.add.tween(BattleActionStack[i][0].mpBar.scale).to({x:0.6*BattleActionStack[i][0].currentMPRatio},500,null,true);
                            BattleActionStack[i][0].mpDisplay.kill();
                            BattleActionStack[i][0].mpDisplay = game.add.text(BattleActionStack[i][0].portrait.x+80,BattleActionStack[i][0].mpBar.y,"MP:"+BattleActionStack[i][0].Stats.MP+"/"+BattleActionStack[i][0].MaxStats.MP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
                        }
                    }
                }
                //Use inventory item
                else if (Inventory.Items.indexOf(BattleActionStack[i][1]) != -1){
                    BattleActionStack[i][1].Use(BattleActionStack[i][2]);
                }
            }
            //handle enemy actions
            else{
                //Enemy uses basic attack
                if (BattleActionStack[i][1] == 0){
                    moveToAttack(BattleActionStack[i][0],BattleActionStack[i][0].x-200,BattleActionStack[i][0].y,BattleActionStack[i][2],0); 
                }
                //Enemy uses skills
                else {
                    BattleActionStack[i][1].SkillAnimation(BattleActionStack[i][0],BattleActionStack[i][2]);
                    BattleActionStack[i][0].Stats.MP -= BattleActionStack[i][1].Stats.MP;
                }
            }
        }        
    }
    if (currentMenu != "BattleEnd"){
        BattleActionStack=[];
        turn = 1;
        currentMenu = "mainBM";
        textOS.kill();
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait.kill();
            Allies[i].hpBar.kill();
            Allies[i].mpBar.kill();
            Allies[i].hpDisplay.kill();
            Allies[i].mpDisplay.kill();
        }
        createMenu();
    }
    game.time.events.add(Phaser.Timer.SECOND*1.5,function(){
        if (currentMenu != "BattleEnd"){
            currentCpos = [textBox.x+85,textBox.y+31];
            while (Allies[turn - 1].Stats.HP <= 0 && turn < Allies.length){
                currentCpos[0] += 150;
                turn += 1;
            }
            console.log(turn);
            createCursor(currentCpos[0],currentCpos[1]);
        }
    },this);
}

function sortStack(Stack){
    for (var i = Stack.length - 1; i >= 0; i--){
        for (var j = 0; j < i; j++){
            if (Stack[j][0].Stats.Speed < Stack[j+1][0].Stats.Speed){
                var temp = Stack[j];
                Stack[j] = Stack[j+1];
                Stack[j+1] = temp;
            }
        }
    }
}

function makeBscDamage(character,target){
    if (Allies.indexOf(character) != -1){
        checkElementalWkn(character.Weapon,target);
        if (character.Weapon.Stats.PhysAttack != 0){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + character.Weapon.Stats.PhysAttack) - target.Stats.PhysDefense);
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + character.Weapon.Stats.MagAttack) - target.Stats.MagDefense);
        }
        if (Damage > 0 && character.Stats.HP > 0){
            if (target.Stats.HP <= 0){
                var alreadyDead = true;
            }
            target.Stats.HP -= Damage;
            //damageText = "-" + Damage;
            //damageText = game.add.text(target.x,target.y - 20 - Allies.indexOf(character)*20,damageText,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            //damageText.lifespan = 1000;
            multiplierText = game.add.text(target.x + (target.width / 2),target.y - 20 - Allies.indexOf(character)*20,"x "+DamageMultiplier,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            multiplierText.lifespan = 1000;
            if (target.Stats.HP > 0){
                game.add.tween(target.children[1].scale).to({x:target.barXScale*target.Stats.HP/target.MaxStats.HP},500,null,true);
            }
            else {
                game.add.tween(target.children[1].scale).to({x:0},500,null,true);
            }
        }
        else {
            damageText = game.add.text(target.x + (target.width / 2),target.y - 20 - Allies.indexOf(character)*20,"0",{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            damageText.lifespan = 1000;
        }
        if (target.Stats.HP <= 0 && !alreadyDead){
            BattleXP += target.XP;
            BattleCoins += target.Coins;
            dropGenerator();
            if (target == kori){
                Kori.chSprite = kori;
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                currentMenu = "BattleEnd";
                createMenu();
            }
            else if (target == knight || target == jester){
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                if (currentMenu != "BattleEnd"){
                    currentMenu = "BattleEnd";
                    createMenu();
                }
            }
            else {
                target.kill();
                if (enemyInBattle.countLiving() == 0){
                    for (var i = 0; i < Allies.length; i++){
                        Allies[i].XPObtained += BattleXP;
                    }
                    Inventory.Coins += BattleCoins;
                    if (currentMenu != "BattleEnd"){
                        currentMenu = "BattleEnd";
                        createMenu();
                    }
                }
            } 
        }
    }
    else {
        checkElementalWkn(character,target);
        if (character.Stats.PhysAttack > character.Stats.MagAttack){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack) - target.Stats.PhysDefense);
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack) - target.Stats.MagDefense);
        }
        if (Damage > 0 && character.Stats.HP > 0){
            target.Stats.HP -= Damage;
            //damageText = "-" + Damage;
            //damageText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80 - enemyInBattle.children.indexOf(character)*20,damageText,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            //damageText.lifespan = 1000;
            multiplierText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80 - enemyInBattle.children.indexOf(character)*20, "x " + DamageMultiplier, {fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            multiplierText.lifespan = 1000;
        }
        else {
            damageText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80 - enemyInBattle.children.indexOf(character)*20,"0",{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            damageText.lifespan = 1000;
        }
        if (target.Stats.HP <= 0){
            target.Stats.HP = 0;
            LostBattle = true;
            for (var i = 0; i < Allies.length; i++){
                if (Allies[i].Stats.HP > 0){
                    LostBattle = false;
                }
            }
            if (LostBattle){
                game.camera.fade(0x000000,1500);
                game.camera.onFadeComplete.add(function(){battleMusic.destroy();changeState(null,"GameOver");});
            }
        }
        if (target.currentHPRatio != target.HPRatio()){
            target.currentHPRatio = target.HPRatio();
            console.log("change bar");
            game.add.tween(target.hpBar.scale).to({x:0.6*target.currentHPRatio},500,null,true);
            target.hpDisplay.kill();
            target.hpDisplay = game.add.text(target.portrait.x+80,target.hpBar.y,"HP:"+target.Stats.HP+"/"+target.MaxStats.HP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
        }
    }
}

function makeSkillDamage(character,skill,target){
    checkElementalWkn(skill,target);
    if (Allies.indexOf(character) != -1){
        if (skill.Stats.PhysAttack != 0){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + character.Weapon.Stats.PhysAttack + skill.Stats.PhysAttack) - target.Stats.PhysDefense);
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + character.Weapon.Stats.MagAttack + skill.Stats.MagAttack) - target.Stats.MagDefense);
        }
        if (Damage > 0 && character.Stats.HP > 0){
            if (target.Stats.HP <= 0){
                var alreadyDead = true;
            }
            target.Stats.HP -= Damage;
            //damageText = "-" + Damage;
            //damageText = game.add.text(target.x+target._frame.centerX,target.y - 20 - Allies.indexOf(character)*20,damageText,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            //damageText.lifespan = 1000;
            multiplierText = game.add.text(target.x + (target.width / 2),target.y - 20 - Allies.indexOf(character)*20,"x "+DamageMultiplier,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            multiplierText.lifespan = 1000;
            if (target.Stats.HP > 0){
                game.add.tween(target.children[1].scale).to({x:target.barXScale*target.Stats.HP/target.MaxStats.HP},500,null,true);
            }
            else {
                game.add.tween(target.children[1].scale).to({x:0},500,null,true);
            }
        }
        else {
            damageText = game.add.text(target.x + (target.width / 2),target.y - 20 - Allies.indexOf(character)*20,"0",{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            damageText.lifespan = 1000;
        }
        if (target.Stats.HP <= 0 && !alreadyDead){
            BattleXP += target.XP;
            BattleCoins += target.Coins;          
            if (target == kori){
                kori = target;
                Kori.chSprite = kori;
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                currentMenu = "BattleEnd";
                createMenu();
            }
            else if (target == knight || target == jester){
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                if (currentMenu != "BattleEnd"){
                    currentMenu = "BattleEnd";
                    createMenu();
                }
            }
            else {
                target.kill();
                if (enemyInBattle.countLiving() == 0){
                    for (var i = 0; i < Allies.length; i++){
                        Allies[i].XPObtained += BattleXP;
                    }
                    Inventory.Coins += BattleCoins;
                    if (currentMenu != "BattleEnd"){
                        currentMenu = "BattleEnd";
                        createMenu();
                    }
                }
            } 
        }
    }
    else {
        if (skill.Stats.PhysAttack != 0){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + skill.Stats.PhysAttack) - target.Stats.PhysDefense);
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + skill.Stats.MagAttack) - target.Stats.MagDefense);
        }
        if (Damage > 0 && character.Stats.HP > 0){
            target.Stats.HP -= Damage;
            //damageText = "-" + Damage;
            //damageText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80,damageText,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            //damageText.lifespan = 1000;
            multiplierText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80 - enemyInBattle.children.indexOf(character)*20, "x " + DamageMultiplier, {fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            multiplierText.lifespan = 1000;
        }
        else {
            damageText = game.add.text(target.chSprite.x-30,target.chSprite.y - 80,"0",{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
            damageText.lifespan = 1000;
        }
        character.Stats.MP -= skill.Stats.MP;
        if (target.Stats.HP <= 0){
            target.Stats.HP = 0;
            LostBattle = true;
            for (var i = 0; i < Allies.length; i++){
                if (Allies[i].Stats.HP > 0){
                    LostBattle = false;
                }
            }
            if (LostBattle){
                game.camera.fade(0x000000,1500);
                game.camera.onFadeComplete.add(function(){changeState(null,"GameOver");});
            }
        }
        if (target.currentHPRatio != target.HPRatio()){
            target.currentHPRatio = target.HPRatio();
            console.log("change bar");
            game.add.tween(target.hpBar.scale).to({x:0.6*target.currentHPRatio},500,null,true);
            target.hpDisplay.kill();
            target.hpDisplay = game.add.text(target.portrait.x+80,target.hpBar.y,"HP:"+target.Stats.HP+"/"+target.MaxStats.HP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
        }
    }   
}

function checkElementalWkn(character,enemy){
    if (character.Element == "None" || enemy.Element == "None"){
        DamageMultiplier = 1;
    }
    else if ((character.Element == "Fire" && enemy.Element == "Ice") || (character.Element == "Ice" && enemy.Element == "Storm") || (character.Element == "Storm" && enemy.Element == "Fire")){
        DamageMultiplier = 2;
    }
    else if ((character.Element == "Ice" && enemy.Element == "Fire") || (character.Element == "Fire" && enemy.Element == "Storm") || (character.Element == "Storm" && enemy.Element == "Ice")){
        DamageMultiplier = 0.5;
    }
}

function moveTo (character,xpos,ypos){
    
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    inTransition = true;
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        character.animations.play('walkleft',14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }
    else if (dx >= 0){ 
        character.animations.play("walkright",14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }   
}

function killMoveTween(character) {
    character.animations.stop();
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    if (character.x < game.camera.x + 400){
        character.frame = 10;
    }
    else {
        character.frame = 0;
    }
    inTransition = false;
}

function moveToAttack (character,xpos,ypos,target,skill){
    
    inTransition = true;
    if (Allies.indexOf(character) >= 0){
        var chSprite = character.chSprite;
    }
    else{
        var chSprite = character;
    }
    var currentPos = [chSprite.x,chSprite.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        chSprite.animations.play('walkleft',14,true);
        var moveTween = game.add.tween(chSprite).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {contAtkAnimation(character,currentPos[0],currentPos[1],target,skill);},this);
    }
    else if (dx > 0){ 
        chSprite.animations.play("walkright",14,true);
        var moveTween = game.add.tween(chSprite).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {contAtkAnimation(character,currentPos[0],currentPos[1],target,skill);},this);
    }   
}

function contAtkAnimation(character,xpos,ypos,target,skill){
    
    if (Allies.indexOf(character)>=0){
        var chSprite = character.chSprite;
        chSprite.animations.stop();
        if (skill == 0){
            attackAnim = chSprite.animations.play('attack',4,false);
            makeBscDamage(character,target);
        }
        else {
            attackAnim = chSprite.animations.play(skill.AnimKey,3,false);
            if (skill.AreaOfEffect == "All"){
                for (var i = 0; i < enemyInBattle.children.length;i++){
                    if (enemyInBattle.children[i].alive){
                        makeSkillDamage(character,skill,enemyInBattle.children[i]);
                    }
                }
            }
            else {
                makeSkillDamage(character,skill,target);
            }
        }
    }
    else{
        var chSprite = character;
        chSprite.animations.stop();
        if (skill == 0){
            attackAnim = chSprite.animations.play('attack',4,false);
            makeBscDamage(character,target);
        }
        else {
            attackAnim = chSprite.animations.play(skill.AnimKey,3,false);
            makeSkillDamage(character,skill,target);
        }
    }
    
    var currentPos = [chSprite.x,chSprite.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        attackAnim.onComplete.add(function goBack(){chSprite.animations.play('walkleft',14,true)},this);
        var moveTween = game.add.tween(chSprite).to({x:xpos,y:ypos},1000,null,true,1000);
        moveTween.onComplete.add(killMoveTween,this,0,chSprite);
    }
    else if (dx > 0){ 
        attackAnim.onComplete.add(function goBack(){character.animations.play('walkright',14,true)},this);
        var moveTween = game.add.tween(chSprite).to({x:xpos,y:ypos},1000,null,true,1000);
        moveTween.onComplete.add(killMoveTween,this,0,chSprite);
    }   
}

function moveToSkill (character,skill,skillSprite,target){
    
    if (Allies.indexOf(character) != -1){
        var targetx = character.chSprite.x + 300;
        if (skill.AreaOfEffect == "Single"){
            var targety = target.y;
        }
        else if (skill.AreaOfEffect == "All"){
            var targety = skillSprite.y;
        }
    }
    else{
        var targetx = character.x - 300;
        if (skill.AreaOfEffect == "Single"){
            var targety = target.chSprite.y;
        }
        else if (skill.AreaOfEffect == "All"){
            var targety = skillSprite.y;
        }
    }
    var currentPos = [skillSprite.x,skillSprite.y]
    var dx = targetx - currentPos[0];
    
    if (dx < 0){
        var moveTween = game.add.tween(skillSprite).to({x:targetx,y:targety},1000,null,true);
        moveTween.onComplete.add(function() {
            skillSprite.kill();
            if (skill.AreaOfEffect == "Single"){
                makeSkillDamage(character,skill,target);
            }
            else if (skill.AreaOfEffect == "All"){
                console.log("fine here");
                for (var i = 0; i < Allies.length; i++){
                    makeSkillDamage(character,skill,Allies[i]);
                }
            }
        },this);
    }
    else if (dx > 0){ 
        var moveTween = game.add.tween(skillSprite).to({x:targetx,y:targety},1000,null,true);
        moveTween.onComplete.add(function() {
            skillSprite.kill();
            if (skill.AreaOfEffect == "Single"){
                makeSkillDamage(character,skill,target);
            }
            else if (skill.AreaOfEffect == "All"){
                console.log("fine here");
                for (var i = 0; i < enemyInBattle.children.length; i++){
                    makeSkillDamage(character,skill,enemyInBattle.children[i]);
                }
            }
        },this);
    }   
}

function moveToAndKill(character,xpos,ypos){
    
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    inTransition = true;
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        character.animations.play('walkleft',14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {character.kill();inTransition=false;},this);
    }
    else if (dx >= 0){ 
        character.animations.play("walkright",14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {character.kill();inTransition=false;},this);
    }   
}

function dropGenerator (){
    var dropNumber = Math.round(Math.random()*100);
    if (dropNumber <= 20){
        droppedItems[0] += 1;
    }
    else if (dropNumber <= 40){
        droppedItems[1] += 1;
    }
    else if (dropNumber <= 50){
        droppedItems[2] += 1;
    }
    else if (dropNumber <= 62){
        droppedItems[3] += 1;
    }
    else if (dropNumber <= 74){
        droppedItems[4] += 1;
    }
    else if (dropNumber <= 80){
        droppedItems[5] += 1;
    }
    else if (dropNumber <= 88){
        droppedItems[6] += 1;
    }
    else if (dropNumber <= 96){
        droppedItems[7] += 1;
    }
    else {
        droppedItems[8] += 1;
    }
}

function createMenu(){
    
    text = "";
    if (currentMenu == "mainBM"){
        for (var i = 0; i < Allies.length; i++){
            text += "Attack                      ";
        }
        text += "\n";
        for (var i = 0; i < Allies.length; i++){
            text += "Skills                       ";
        }
        text += "\n";
        for (var i = 0; i < Allies.length; i++){
            text += "Item                         ";
        }
        text += "\n";
        for (var i = 0; i < Allies.length; i++){
            text += "Run                          ";
        }
        text += "\n";
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:16,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
        textOS.lineSpacing = 5;
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait = game.add.sprite(textBox.x+550,textBox.y+30+50*i,Allies[i].PortraitKey)
            Allies[i].portrait.scale.setTo(0.2);
            Allies[i].hpBar = game.add.sprite(Allies[i].portrait.x+50,Allies[i].portrait.y,'hpBar')
            Allies[i].hpBar.scale.setTo(0.6*Allies[i].currentHPRatio,0.5);
            Allies[i].hpDisplay = game.add.text(Allies[i].portrait.x+80,Allies[i].hpBar.y,"HP:"+Allies[i].Stats.HP+"/"+Allies[i].MaxStats.HP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
            Allies[i].mpBar = game.add.sprite(Allies[i].portrait.x+50,Allies[i].portrait.y+25,'mpBar')
            Allies[i].mpBar.scale.setTo(0.6*Allies[i].currentMPRatio,0.5);
            Allies[i].mpDisplay = game.add.text(Allies[i].portrait.x+80,Allies[i].mpBar.y,"MP:"+Allies[i].Stats.MP+"/"+Allies[i].MaxStats.MP,{fontSize:12,fill:'#ffffff',stroke:'#000000',strokeThickness:2});
            if (Allies[i].currentHPRatio != Allies[i].HPRatio()){
                Allies[i].currentHPRatio = Allies[i].HPRatio();
                console.log("change bar");
                game.add.tween(Allies[i].hpBar.scale).to({x:0.6*Allies[i].currentHPRatio},500,null,true);
            }
            if (Allies[i].currentMPRatio != Allies[i].MPRatio()){
                Allies[i].currentMPRatio = Allies[i].MPRatio();
                game.add.tween(Allies[i].mpBar.scale).to({x:0.6*Allies[i].currentMPRatio},500,null,true);
            }
        }
    }
    else if (currentMenu == "skillsM"){
        for (var i = 0; i < Allies[turn-1].SkillsLearned.length; i++){
            text += Allies[turn-1].SkillsLearned[i].Name;
            var SpaceBetwn = 20 - Allies[turn-1].SkillsLearned[i].Name.length
            for (var j = 0; j < SpaceBetwn; j++){
                text += " ";
            }
            if ((i + 1) % 5 == 0){
                text += "\n"
            }
        }
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
    }
    else if (currentMenu == "itemsM"){
        for (var i = 0; i < Inventory.Items.length; i++){
            if (Inventory.Items[i].Quantity > 0){
                text += Inventory.Items[i].Name;
                text += " x " + Inventory.Items[i].Quantity;
                var SpaceBetwn = 35 - Inventory.Items[i].Name.length - 3 - Inventory.Items[i].Quantity.toString().length;
                for (var j = 0; j < SpaceBetwn; j++){
                    text += " ";
                }
                if ((i + 1) % 3 == 0){
                    text += "\n"
                } 
            }
        }
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:20,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
    }
    else if (currentMenu == "BattleEnd"){
        cursor.kill();
        BattleResults = [];
        HUD = game.add.sprite(game.camera.x, game.camera.y, 'hud');
        HUD.scale.setTo(1.015,0.5);
        for (var i = 0; i < Allies.length; i++){
            BattleResults.push(Allies[i].LvlUp());
            console.log(i);
            console.log(BattleResults);
        }
        text = [];
        text.push("Obtained " + BattleCoins + " Coins");
        text.push("Obtained " + BattleXP + " XP");
        for (var i = 0; i < droppedItems.length; i++){
            if (droppedItems[i] != 0){
                itemList[i].Add(droppedItems[i]);
                if (droppedItems[i] == 1){
                    text.push("Obtained a " + itemList[i].Name);
                }
                else {
                    text.push("Obtained " + droppedItems[i] + " " + itemList[i].Name + "s");
                }
            }
        }
        for (var i = 0; i < BattleResults.length; i++){
            if (BattleResults[i][0]){
                text.push(Allies[i].Name + " leveled up to Lvl. " + Allies[i].Lvl);
            }
            if (BattleResults[i][1]){
                text.push(Allies[i].Name + " learned " + Allies[i].SkillsLearned[(Allies[i].SkillsLearned.length) - 1].Name);
            }
        }
        textHUD = game.add.text(HUD.x+35,HUD.y+20,text[ResultDisplayed],{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
    }
}

function createCursor(xpos, ypos){
    cursor = game.add.sprite(xpos,ypos,'cursor');
    cursor.scale.setTo(0.5,0.40);
}