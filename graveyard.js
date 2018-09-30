var platforms, fighting=false, inTransition = false, pickingEnemy = false, enemyInBattle, enemyPicked = 0, currentCpos = [68,705], press = [true,true,true,true,true,true],/*[right,left,up,down,z,x]*/ cursors, currentMenu, nOfAllies = 1, turn = 1, actionBuilder = [], BattleActionStack = [];
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/Cloud spritesheet.png', 150, 250);
        game.load.image('night', 'assets/backgrounds/night.png');
        game.load.image('road', 'assets/backgrounds/road.png');
        game.load.image('materia', 'assets/sprites/materia.png');
        game.load.image('text box', 'assets/sprites/text box.png');
        game.load.image('cursor', 'assets/sprites/cursor.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        game.world.setBounds(0, 0, 1600, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0, 0, 'night');
        
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, 900, 'road');
        ground.body.immovable = true;
        var ledge = platforms.create(600,700, 'road');
        ledge.scale.setTo(0.3,0.5);
        ledge.body.immovable = true;
        ledge = platforms.create(1000, 500, 'road');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.3,0.5);
        
        mc = game.add.sprite(100, centerY+300, 'mc');
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(-0.7, 0.7);
        game.physics.enable(mc);
        mc.body.collideWorldBounds = true;
        mc.animations.add('walk', [0,1,2]);
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;
        EnemyGroup1.battlePos = [];
        EnemyGroup1.alliesPos = [[254, 347.5],[254,547.5]];
        
        for (var i = 0; i < 3; i++){
            var materia = EnemyGroup1.create(150+i*250, 200,'materia');
            materia.scale.setTo(0.5, 0.5);
            materia.animations.add('walk',[0]);
            EnemyGroup1.battlePos[i] = [900,200+i*200];
        }
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 300, 1000);
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X
        });
    },
    update: function(){
        game.physics.arcade.collide(mc, platforms);
        game.physics.arcade.collide(EnemyGroup1, platforms);
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);

        if (encounter1 && !inTransition){
            console.log("Hello");
            fighting = true;
            moveTo(mc,EnemyGroup1.alliesPos[0][0],EnemyGroup1.alliesPos[0][1]);
            for (var i = 0; i < EnemyGroup1.children.length; i++){
                moveTo(EnemyGroup1.children[i],EnemyGroup1.battlePos[i][0],EnemyGroup1.battlePos[i][1]);
            }
            setFightStage(mc, EnemyGroup1);
            enemyInBattle = EnemyGroup1;
        }
        
        //Move main character
        moveMC();
        
        //Move cursor in  battle mode
        moveCursorBM();

        //Move cursor in skills menu
        //moveCursorSM();
        
        //Pick enemy
        pickEnemy(enemyInBattle);
        
        //Select actions
        selectBattleActions();
    }
};

function moveMC(){
    if (!fighting){   
        if(cursors.right.isDown){
            mc.scale.setTo(-0.7, 0.7);
            mc.body.velocity.x = 550;
            mc.animations.play('walk', 14, true);
            if(mc.x >= 1547.5){
                changeState(null,"0");
            }
        }
        else if(cursors.left.isDown){
            mc.scale.setTo(0.7, 0.7);
            mc.body.velocity.x = -550;
            mc.animations.play('walk', 14, true);
        }
        else{
            mc.animations.stop('walk');
            mc.frame = 0;
            mc.body.velocity.x = 0;
        }
        if(cursors.up.isDown){
            mc.body.velocity.y = -450;
        }
        else if(cursors.down.isDown){
            mc.body.velocity.y = 450;
        }
        else{
            mc.body.velocity.y = 0;
        }
    }
}

function moveCursorBM(){
    if (currentMenu == "mainBM"){
        currentCpos[0] = 68 + (turn - 1) * 250
        if(cursors.up.isDown && fighting && !press[2]){
            press[2] = true;
            if (currentCpos[1] > 705){
                cursor.kill();
                currentCpos[1] -= 100;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] += 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp && fighting){
            press[2] = false;
        }
        if(cursors.down.isDown && fighting && !press[3]){
            press[3] = true;
            if (currentCpos[1] < 905){
                cursor.kill();
                currentCpos[1] += 100;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] -= 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp && fighting){
            press[3] = false;
        }
    }
}

function moveCursorSM (){
    
}

function setFightStage (mc, EnemyGroup) {

    textBox = game.add.sprite(0, 600, 'text box');
    textBox.scale.setTo(1.55,0.9);
    
    currentMenu = "mainBM";
    createMenu();
    createCursor(68,705);
    
}

function selectBattleActions () {
    if(cursors.z.isDown && fighting && !press[4]){
        press[4] = true;
        if (currentMenu == "mainBM" && cursor.y == 705){
            if (cursor.x == 68) {
                console.log("Ay");
                actionBuilder.push(mc);
                actionBuilder.push(Ash);
            }
            else if (cursor.x == 268){
                actionBuilder.push(ally1);
                actionBuilder.push(Cinderella);
            }
            pickingEnemy = true;
            currentMenu = "pickEnemy";
            cursor.kill();
            currentCpos[0] = enemyInBattle.battlePos[0][0];
            currentCpos[1] = enemyInBattle.battlePos[0][1] - 50;
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "mainBM" && cursor.y == 805){
            if (cursor.x == 68){
                currentMenu = "skillsMAsh";
                textOS.destroy();
                createMenu();
            }
            else if (cursor.x == 268){
                currentMenu = "skillsMAlly1";
                textOS.destroy();
                createMenu();
            }
        }
        else if (currentMenu == "skillsMAsh"){
            console.log("ByeBye");
        }
        else if (currentMenu == "pickEnemy"){
            console.log([currentCpos[0],currentCpos[1]+50]);
            for (var i = 0; i < enemyInBattle.battlePos.length; i++){
                if ((currentCpos[0] == enemyInBattle.battlePos[i][0]) && (currentCpos[1] + 50 == enemyInBattle.battlePos[i][1])){
                    actionBuilder.push(enemyInBattle.battlePos[i]);
                    break;
                }
            }
            pickingEnemy = false;
            addBattleAction(actionBuilder[0],actionBuilder[1],actionBuilder[2]);
        }
    }
    else if (cursors.z.isUp && fighting){
        press[4] =false;
    }
    if(cursors.x.isDown && fighting && !press[5]){
        press[5] = true;
        if (currentMenu == "skillsMAsh" || currentMenu == "skillsMCindy"){
            currentMenu = "mainBM";
            textOS.destroy();
            createMenu();
        }
    }
    else if (cursors.z.isUp && fighting){
        press[5] =false;
    }
}

function pickEnemy(EnemyGroup){
    if (pickingEnemy){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (enemyPicked == 0){
                enemyPicked = EnemyGroup.children.length - 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.battlePos[enemyPicked][0];
                currentCpos[1] = EnemyGroup.battlePos[enemyPicked][1] - 50;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked -= 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.battlePos[enemyPicked][0];
                currentCpos[1] = EnemyGroup.battlePos[enemyPicked][1] - 50;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp){
            press[2] = false;
        }
        if(cursors.down.isDown && !press[3]){
            press[3] = true;
            if (enemyPicked == EnemyGroup.children.length - 1){
                enemyPicked = 0;
                cursor.kill();
                currentCpos[0] = EnemyGroup.battlePos[enemyPicked][0];
                currentCpos[1] = EnemyGroup.battlePos[enemyPicked][1] - 50;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked += 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.battlePos[enemyPicked][0];
                currentCpos[1] = EnemyGroup.battlePos[enemyPicked][1] - 50;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function addBattleAction(character,attack,enemy) {
    BattleActionStack.push([character,attack,enemy]);
    turn += 1;
    if (turn > nOfAllies){
        performBattleActions();
    }
    else {
        currentMenu = "mainBM";
        currentCpos[0] += 250;
        currentCpos[1] = 705;
        cursor.kill();
        createCursor(currentCpos[0],currentCpos[1]);
        createMenu();
    }
}

function performBattleActions(){
    for (var i = 0; i < BattleActionStack.length; i++){
        moveTo(BattleActionStack[i][0],BattleActionStack[i][2][0],BattleActionStack[i][2][1]);
    }
}

function moveTo (character,xpos,ypos){
    
    inTransition = true;
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    var dy = ypos - currentPos[1];
    character.animations.play('walk',14,true);
    
    if (dx < 0){
        character.animations.play('walk',14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},2000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }
    else if (dx > 0){ 
        character.scale.setTo(-0.7, 0.7);
        character.animations.play("walk",14,true);
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},2000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }
    
}

function killMoveTween(character) {
    console.log("Bye");
    character.animations.stop('walk');
    character.frame = 0;
    character.scale.setTo(-0.7, 0.7);
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    inTransition = false;
}

function createMenu(){
    
    text = "";
    if (currentMenu == "mainBM"){
        for (var i = 0; i < nOfAllies; i++){
            text += "Attack                      ";
        }
        text += "\n\n\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Skills                       ";
        }
        text += "\n\n\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Item                         ";
        }
        text += "\n\n\n";
        textOS = game.add.text(120,700,text);
        
    }
    else if (currentMenu == "skillsMAsh"){
        for (var i = 0; i < Ash.SkillsLearned.length; i++){
            text += Ash.SkillsLearned[i].Name;
            text += "         ";
        }
        textOS = game.add.text(120,700,text);
    }
    else if (currentMenu == "skillsMCindy"){
        for (var i = 0; i < Cinderella.SkillsLearned.length; i++){
            text += Cinderella.SkillsLearned[i].Name;
            text += "         ";
        }
        textOS = game.add.text(120,700,text);
    }
}

function createCursor(xpos, ypos){
    cursor = game.add.sprite(xpos,ypos,'cursor');
    cursor.scale.setTo(0.12,0.12);
}