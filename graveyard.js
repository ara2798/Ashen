var /*platforms,*/pause = false, storyMode=false, story1Completed=false, story, storyElement, portraitL=["ashportrait1"], fighting=false, inTransition = false, escapedBattle = false, enemyInBattle, firstEnemy = 0, lastEnemy = 5, enemyPicked = 0, skillPicked = 0, itemPicked = 0, allyPicked = 0, currentCpos = [], press = [true,true,true,true,true,true,true],/*[right,left,up,down,z,x,p]*/ cursors, currentMenu, currentSubmenu, turn = 1, actionBuilder = [], BattleActionStack = [], DamageMultiplier = 1, Damage, LostBattle = false, WonBattle = false, BattleXP = 0, BattleCoins = 0, BattleResults = [], ResultDisplayed = 0, Allies=[Ash], currentHPRatio = [], currentMPRatio = [];
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.image('graveyard', 'assets/backgrounds/graveyard.png');
        game.load.image('pause menu', 'assets/sprites/real pause.png');
        game.load.image('battle menu', 'assets/sprites/battle.png');
        game.load.image('hud', 'assets/sprites/hud.png');
        game.load.image('cursor', 'assets/sprites/cursor.png');
        game.load.image('ashportrait1','assets/sprites/ashportrait.png');
        game.load.image('hpBar','assets/sprites/hp.png');
        game.load.image('mpBar','assets/sprites/mp.png');
        game.load.spritesheet('ghoul', 'assets/spritesheets/ghoulspritesheet.png', 100, 45);
        game.load.image('fire1', 'assets/sprites/skillfire1.png');
        game.load.image('sword1', 'assets/sprites/skillsword1.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/graveyard_background_music.ogg', 'assets/audio/graveyard_background_music.mp3']);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, true);
        
        game.world.setBounds(0, 0, 1620, 1260);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'graveyard');
        
        /*platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, 900, 'road');
        ground.body.immovable = true;
        var ledge = platforms.create(600,700, 'road');
        ledge.scale.setTo(0.3,0.5);
        ledge.body.immovable = true;
        ledge = platforms.create(1000, 500, 'road');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.3,0.5);*/
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
        mc.animations.add('walkleft', [6,7,8]);
        mc.animations.add('walkright', [9,10,11]);
        mc.animations.add('walkdown', [0,1,2]);
        mc.animations.add('walkup', [3,4,5]);
        mc.animations.add('attack', [10,12,10]);
        mc.animations.add('firespell', [13,10]);
        mc.animations.add('slash',[10,12,10]);
        Ash.chSprite = mc;
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var ghoul = EnemyGroup1.create(212, 232,'ghoul');
        ghoul.anchor.setTo(0.5);
        ghoul.scale.setTo(1.2);
        ghoul.animations.add('walkleft',[0]);
        ghoul.animations.add('walkright',[0]);
        ghoul.animations.add('attack',[0,1]);
        Ghoul(ghoul,5);
        var ghoul = EnemyGroup1.create(1100, 375,'ghoul');
        ghoul.anchor.setTo(0.5);
        ghoul.scale.setTo(1.2);
        ghoul.animations.add('walkleft',[0]);
        ghoul.animations.add('walkright',[0]);
        ghoul.animations.add('attack',[0,1]);
        Ghoul(ghoul,5);
        //var move3 = game.add.tween(ghoul).to({x:315,y:550},4500,null,true,0);
        //move3.onRepeat.add(function(){ghoul.scale.setTo(1.2);console.log("fort");});
        //var move4 = game.add.tween(ghoul).from({x:315,y:550},4500,null,true,0);
        //move4.onStart.add(function(){ghoul.scale.setTo(-1.2,1.2);console.log("baack");});
        //move3.chain(move4);
        //move3.repeatAll(-1);
        //move3.start();
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X,'p':Phaser.KeyCode.P
        });
    },
    update: function(){
        //game.physics.arcade.collide(mc, platforms);
        //game.physics.arcade.collide(EnemyGroup1, platforms);
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);

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
        
        if (Ash.chSprite.x >= 1208 && Ash.chSprite.y >= 1210){
            previousState = "graveyard";
            changeState(null,'Overworld');
        }
        
        //Intro to story
        if (!story1Completed && game.camera.x == 72){
            story1Completed = true;
            storyMode = true;
            mc.frame = 4;
            setStory(["ashportrait1","Rest in peace, my beloved sister. I brought your \nfavorite flowers...","I’m sorry... I should’ve been able to save you. \nIt’s all my fault...","All I have left of you is your old teddy \nbear -- he keeps me warm...","Almost like you’re still here.","...","I know you wouldn’t approve, but I have to make \nthis right.","...I’ll do whatever it takes."]);
        }
        
        //Progress through the story
        continueStory();
        
        //Create pause menu
        createPauseM();
        
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

function setStory(storyL){
    dialogueBox = game.add.sprite(game.camera.x,game.camera.y,'hud');
    dialogueBox.scale.setTo(1,1.5);
    portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,storyL[0]);
    portrait.scale.setTo(0.5,0.5);
    text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,storyL[1]);
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
                storyElement += 1;
            }
            text.kill();
            text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,story[storyElement]);
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
        if (cursors.p.isDown && !press[6] && currentMenu != "pauseM"){
            press[6] = true;
            pause = true;
            currentMenu = "pauseM";
            pauseM = game.add.sprite(game.camera.x,game.camera.y,'pause menu');
            pauseMtext = game.add.text(game.camera.x+610,game.camera.y+40,"Stats\nInventory\nSkills");
            currentCpos = [game.camera.x+570,game.camera.y+43]
            createCursor(currentCpos[0],currentCpos[1]);
            currentSubmenu = "Stats";
            createSubmenu();
        }
        else if (cursors.p.isDown && !press[6] && currentMenu == "pauseM"){
            press[6] = true;
            pause = false;
            currentMenu = null;
            pauseM.kill();
            pauseMtext.kill();
            textOS.kill();
            cursor.kill();
            Ash.portrait.kill();
        }
        else if (cursors.p.isUp){
            press[6] = false;
        }
    }
}

function createSubmenu(){
    if (currentSubmenu == "Stats"){
        text = "";
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait = game.add.sprite(game.camera.x+50,game.camera.y+50+200*i,Allies[i].PortraitKey);
            Allies[i].portrait.scale.setTo(0.7);
            text += "Lvl. " + Allies[i].Lvl + "\n";
            text += "HP: " + Allies[i].Stats.HP + "/" + Allies[i].MaxStats.HP + "\n";
            text += "MP: " + Allies[i].Stats.MP + "/" + Allies[i].MaxStats.MP + "\n";
            text += "Phys. Attack: " + Allies[i].Stats.PhysAttack + "\n";
            text += "Phys. Defense: " + Allies[i].Stats.PhysDefense + "\n";
            text += "Mag. Attack: " + Allies[i].Stats.MagAttack + "\n";
            text += "Mag. Defense: " + Allies[i].Stats.MagDefense + "\n";
            text += "Speed: " + Allies[i].Stats.Speed + "\n";
            Allies[i].XPCurve();
            text += "Exp. Points: " + Allies[i].XPObtained + "/" + Allies[i].XPNeeded;
            textOS = game.add.text(Allies[i].portrait.x + 160, Allies[i].portrait.y,text,{fontSize:15});
        }
    }
}

function moveMC(){
    if (!fighting && !storyMode && !pause){   
        if(cursors.right.isDown && mc.body.velocity.y == 0){
            mc.body.velocity.x = 550;
            mc.animations.play('walkright', 14, true);
            /*if(mc.x >= 1547.5){
                changeState(null,"0");
            }*/
        }
        else if(cursors.left.isDown && mc.body.velocity.y == 0){
            mc.body.velocity.x = -550;
            mc.animations.play('walkleft', 14, true);
        }
        /*else{
            mc.animations.stop('walkright');
            mc.animations.stop('walkleft');
            mc.body.velocity.x = 0;
        }*/
        else if(cursors.up.isDown){
            mc.body.velocity.y = -450;
            mc.animations.play('walkup', 14, true);
        }
        else if(cursors.down.isDown){
            mc.body.velocity.y = 450;
            mc.animations.play('walkdown', 14, true);
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
        currentCpos[0] += 100;
        turn += 1;
    }
    createCursor(currentCpos[0],currentCpos[1]);
    
}

function selectBattleActions () {
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
            }
            if (escapedBattle){
                textOS.destroy();
                cursor.kill();
                textBox.kill();
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].portrait.kill();
                    Allies[i].hpBar.kill();
                    Allies[i].mpBar.kill();
                }
                moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
                moveCamera.onComplete.add(function(){game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);fighting = false;},this);
            }
            else{
                HUD = game.add.sprite(game.camera.x,game.camera.y,'hud');
                HUD.scale.setTo(1.015,0.5);
                HUD.lifespan = 1000;
                text = game.add.text(HUD.x+35,HUD.y+20,"Could not escape",{fontSize:20});
                text.lifespan = 1000;
            }
        }
        else if (currentMenu == "skillsM"){
            if (Allies[turn-1].SkillsLearned[skillPicked].Stats.MP <= Allies[turn-1].Stats.MP){
                actionBuilder.push(Allies[turn-1]);
                actionBuilder.push(Allies[turn-1].SkillsLearned[skillPicked]);
                if (Allies[turn-1].SkillsLearned[skillPicked].SkillType == "Attack"){
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
                else if (Allies[turn-1].SkillsLearned[skillPicked].SkillType == "Boost"){
                    //select ally
                }
            }       
        }
        else if (currentMenu == "itemsM"){
            if (Inventory.Items[itemPicked].Quantity > 0){
                actionBuilder.push(Allies[turn-1]);
                actionBuilder.push(Inventory.Items[itemPicked]);
                currentMenu = "pickAlly";
                cursor.kill();
                currentCpos[0] = Allies[0].chSprite.x - 70;
                currentCpos[1] = Allies[0].chSprite.y - 30;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (currentMenu == "pickEnemy"){
            actionBuilder.push(enemyInBattle.children[enemyPicked]);
            currentMenu = "None";
            addBattleAction(actionBuilder);
        }
        else if (currentMenu == "pickAlly"){
            if (Allies[allyPicked].Stats.HP > 0){
                actionBuilder.push(Allies[allyPicked]);
                currentMenu = "None";
                addBattleAction(actionBuilder);
            }
            else if ([Revive].indexOf(actionBuilder[1]) != -1){
                actionBuilder.push(Allies[allyPicked]);
                currentMenu = "None";
                addBattleAction(actionBuilder);
            }
        }
        else if (currentMenu == "BattleEnd"){
            ResultDisplayed += 1;
            textHUD.kill();
            if (ResultDisplayed < text.length){
                textHUD = game.add.text(HUD.x+35,HUD.y+20,text[ResultDisplayed],{fontSize:20});
            }
            else {
                ResultDisplayed = 0;
                BattleResults = [];
                BattleCoins = 0;
                BattleXP = 0;
                textOS.kill();
                textHUD.kill();
                textBox.kill();
                HUD.kill();
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].portrait.kill();
                    Allies[i].hpBar.kill();
                    Allies[i].mpBar.kill();
                }
                moveCamera = game.add.tween(game.camera).to({x:mc.x-400,y:mc.y-300},500,null,true);
                moveCamera.onComplete.add(function(){game.camera.follow(mc);game.camera.deadzone = new Phaser.Rectangle(250, 250, 300, 100);fighting = false;},this);
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
                currentCpos[0] = textBox.x + 85 + (turn - 1) * 100;;
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
            currentCpos[0] = textBox.x + 85;
            currentCpos[1] = textBox.y + 31;
            createCursor(currentCpos[0],currentCpos[1]);
            createMenu();
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
        for (var i = firstEnemy; i <= lastEnemy; i++){
            if (enemyInBattle.children[i].alive){
                actionBuilder.push(enemyInBattle.children[i]);
                var pickTarget = Math.round(Math.random()*(Allies.length-1));
                while (Allies[pickTarget].Stats.HP <= 0){
                    pickTarget += 1;
                    if (pickTarget >= Allies.length){
                        pickTarget = 0;
                    }
                }
                var AtkOrSkill = Math.round(Math.random());
                if (AtkOrSkill == 1 && enemyInBattle.children[i].SkillsLearned[0] != undefined){
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
                actionBuilder.push(Allies[pickTarget]);
                BattleActionStack.push(actionBuilder);
                actionBuilder = [];
            }
        }
        sortStack(BattleActionStack);
        performBattleActions();
        turn = 1;
    }
    else {
        currentMenu = "mainBM";
        currentCpos[0] = textBox.x + 85 + (turn - 1) * 100;
        currentCpos[1] = textBox.y + 31;
        cursor.kill();
        createCursor(currentCpos[0],currentCpos[1]);
        createMenu();
    }
}

function performBattleActions(){
    for (var i = 0; i < BattleActionStack.length; i++){
        if (Allies.indexOf(BattleActionStack[i][0]) != -1){
            //Use basic attack
            console.log("player atks");
            if (BattleActionStack[i][1] == 0){
                moveToAttack(BattleActionStack[i][0],BattleActionStack[i][0].chSprite.x+200,BattleActionStack[i][0].chSprite.y,BattleActionStack[i][2],0);
            }
            //Use attack skills
            else if (Allies.indexOf(BattleActionStack[i][2]) == -1){
                BattleActionStack[i][1].SkillAnimation(BattleActionStack[i][2]);
            }
            //Use boost skill
            else if (Inventory.Items.indexOf(BattleActionStack[i][1]) == -1){
                console.log("Used boost skill");
            }
            //Use inventory item
            else {
                BattleActionStack[i][1].Use(BattleActionStack[i][2]);
            }
        }
        //handle enemy actions
        else{
            console.log("enemy atks");
            if (BattleActionStack[i][1] == 0){
                moveToAttack(BattleActionStack[i][0],BattleActionStack[i][0].x-200,BattleActionStack[i][0].y,BattleActionStack[i][2],0); 
            }
            //in progress
            else if (Allies.indexOf(BattleActionStack[i][2]) == -1){
                BattleActionStack[i][1].SkillAnimation(BattleActionStack[i][2]);
            }
        }        
    }
    BattleActionStack=[];
    currentMenu = "mainBM";
    textOS.kill();
    for (var i = 0; i < Allies.length; i++){
        Allies[i].portrait.kill();
        Allies[i].hpBar.kill();
        Allies[i].mpBar.kill();
    }
    createMenu();
    currentCpos = [textBox.x+85,textBox.y+31];
    createCursor(currentCpos[0],currentCpos[1]);
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
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }            
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + character.Weapon.Stats.MagAttack) - target.Stats.MagDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
        }
        if (target.Stats.HP <= 0){
            BattleXP += target.XP;
            BattleCoins += target.Coins;
            target.kill();
            if (enemyInBattle.countLiving() == 0){
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                currentMenu = "BattleEnd";
                createMenu();
            } 
        }
    }
    else {
        checkElementalWkn(character,target);
        if (character.Stats.PhysAttack > character.Stats.MagAttack){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack) - target.Stats.PhysDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack) - target.Stats.MagDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
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
                game.camera.onFadeComplete.add(function(){changeState(null,"GameOver");});
            }
        }
        if (target.currentHPRatio != target.HPRatio()){
            target.currentHPRatio = target.HPRatio();
            console.log("change bar");
            game.add.tween(target.hpBar.scale).to({x:0.6*target.currentHPRatio},500,null,true);
        }
    }
}

function makeSkillDamage(character,skill,target){
    checkElementalWkn(skill,target);
    if (Allies.indexOf(character) != -1){
        if (skill.Stats.PhysAttack != 0){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + character.Weapon.Stats.PhysAttack + skill.Stats.PhysAttack) - target.Stats.PhysDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
            character.Stats.MP -= skill.Stats.MP;
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + character.Weapon.Stats.MagAttack + skill.Stats.MagAttack) - target.Stats.MagDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
            character.Stats.MP -= skill.Stats.MP;
        }
        if (character.currentMPRatio != character.MPRatio()){
            character.currentMPRatio = character.MPRatio();
            game.add.tween(character.mpBar.scale).to({x:0.6*character.currentMPRatio},500,null,true);
        }
        if (target.Stats.HP <= 0){
            BattleXP += target.XP;
            BattleCoins += target.Coins;
            target.kill();
            if (enemyInBattle.countLiving() == 0){
                for (var i = 0; i < Allies.length; i++){
                    Allies[i].XPObtained += BattleXP;
                }
                Inventory.Coins += BattleCoins;
                currentMenu = "BattleEnd";
                createMenu();
            } 
        }
    }
    else {
        if (skill.Stats.PhysAttack != 0){
            Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + skill.Stats.PhysAttack) - target.Stats.PhysDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
            character.Stats.MP -= skill.Stats.MP;
        }
        else {
            Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + skill.Stats.MagAttack) - target.Stats.MagDefense);
            if (Damage > 0){
                target.Stats.HP -= Damage;
            }
            character.Stats.MP -= skill.Stats.MP;
        }
        if (target.Stats.HP <= 0){
            target[i][2].Stats.HP = 0;
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
        }
    }   
}

function checkElementalWkn(character,enemy){
    if (character.Element == "None" || enemy.Element == "None"){
        DamageMultiplier = 1;
    }
    else if ((character.Element == "Fire" && enemy.Element == "Ice") || (character.Element == "Ice" && enemy.Element == "Lightning") || (character.Element == "Lightning" && enemy.Element == "Fire")){
        DamageMultiplierMultiplier = 1.5;
    }
    else if ((character.Element == "Ice" && enemy.Element == "Fire") || (character.Element == "Fire" && enemy.Element == "Lightning") || (character.Element == "Lightning" && enemy.Element == "Ice")){
        DamageMultiplierMultiplier = 0.5;
    }
}

function moveTo (character,xpos,ypos){
    
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    inTransition = true;
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    character.animations.play('walk',14,true);
    
    if (dx < 0){
        character.animations.play('walkleft',14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }
    else if (dx > 0){ 
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
        if (character.Stats.HP > 0){
            chSprite.animations.stop();
            if (skill == 0){
                attackAnim = chSprite.animations.play('attack',3,false);
                makeBscDamage(character,target);
            }
            else {
                attackAnim = chSprite.animations.play(skill.AnimKey,3,false);
                makeSkillDamage(character,skill,target);
            }
        }
    }
    else{
        var chSprite = character;
        if (character.Stats.HP > 0){
            chSprite.animations.stop();
            if (skill == 0){
                attackAnim = chSprite.animations.play('attack',3,false);
                makeBscDamage(character,target);
            }
            else {
                attackAnim = chSprite.animations.play(skill.AnimKey,3,false);
                makeSkillDamage(character,skill,target);
            }
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
    
    if (Allies.indexOf(character) >= 0){
        var targetx = character.chSprite.x + 300;
        var targety = target.y;
    }
    else{
        var targetx = character.x - 300;
        var targety = target.y;
    }
    var currentPos = [skillSprite.x,skillSprite.y]
    var dx = targetx - currentPos[0];
    
    if (dx < 0){
        var moveTween = game.add.tween(skillSprite).to({x:targetx,y:targety},1000,null,true);
        moveTween.onComplete.add(function() {skillSprite.kill();makeSkillDamage(character,skill,target);},this);
    }
    else if (dx > 0){ 
        var moveTween = game.add.tween(skillSprite).to({x:targetx,y:targety},1000,null,true);
        moveTween.onComplete.add(function() {skillSprite.kill();makeSkillDamage(character,skill,target);},this);
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
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:20});
        textOS.lineSpacing = 5;
        for (var i = 0; i < Allies.length; i++){
            Allies[i].portrait = game.add.sprite(textBox.x+550,textBox.y+30+50*i,Allies[i].PortraitKey)
            Allies[i].portrait.scale.setTo(0.2);
            Allies[i].hpBar = game.add.sprite(Allies[i].portrait.x+50,Allies[i].portrait.y,'hpBar')
            Allies[i].hpBar.scale.setTo(0.6*Allies[i].currentHPRatio,0.5);
            Allies[i].mpBar = game.add.sprite(Allies[i].portrait.x+50,Allies[i].portrait.y+25,'mpBar')
            Allies[i].mpBar.scale.setTo(0.6*Allies[i].currentMPRatio,0.5);
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
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:20});
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
        textOS = game.add.text(textBox.x + 120,textBox.y + 31,text,{fontSize:20});
    }
    else if (currentMenu == "BattleEnd"){
        cursor.kill();
        HUD = game.add.sprite(game.camera.x, game.camera.y, 'hud');
        HUD.scale.setTo(1.015,0.5);
        for (var i = 0; i < Allies.length; i++){
            BattleResults.push(Allies[i].LvlUp());
        }
        text = [];
        text.push("Obtained " + BattleCoins + " Coins");
        text.push("Obtained " + BattleXP + " XP");
        for (var i = 0; i < BattleResults.length; i++){
            if (BattleResults[i][0]){
                text.push(Allies[i].Name + " leveled up to Lvl. " + Allies[i].Lvl);
            }
            if (BattleResults[i][1]){
                text.push(Allies[i].Name + " learned " + Allies[i].SkillsLearned[(Allies[i].SkillsLearned.length) - 1].Name);
            }
        }
        textHUD = game.add.text(HUD.x+35,HUD.y+20,text[ResultDisplayed],{fontSize:20});
    }
}

function createCursor(xpos, ypos){
    cursor = game.add.sprite(xpos,ypos,'cursor');
    cursor.scale.setTo(0.5,0.40);
}