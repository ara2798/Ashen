var platforms, fighting=false, inTransition = false, pickingEnemy = false, attacking = false, enemyInBattle, enemyPicked = 0, currentCpos = [], press = [true,true,true,true,true,true],/*[right,left,up,down,z,x]*/ cursors, currentMenu, nOfAllies = 1, turn = 1, actionBuilder = [], BattleActionStack = [], DamageMultiplier = 1, originalPosX, originalPosY, Damage, BattleXP = 0, Allies=[Ash];
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 45, 90);
        game.load.image('graveyard', 'assets/backgrounds/graveyard.png');
        game.load.image('road', 'assets/backgrounds/road.png');
        game.load.image('zombie', 'assets/sprites/zomsprie.png');
        game.load.image('text box', 'assets/sprites/battleinit.png');
        game.load.image('cursor', 'assets/sprites/cursor.png');
        game.load.image('mcsword', 'assets/sprites/ashmcattack.png');
        game.load.image('mcfire', 'assets/sprites/ashmcspell.png');
        game.load.image('zombieatk', 'assets/sprites/zombattack.png');
        game.load.image('fire1', 'assets/sprites/skillfire1.png');
        game.load.image('sword1', 'assets/sprites/skillsword1.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        game.world.setBounds(0, 0, 1600, 1202);
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
        
        mc = game.add.sprite(100, centerY, 'mc');
        mc.anchor.setTo(0.5,0.5);
        mc.scale.setTo(1.1, 1.1);
        game.physics.enable(mc);
        mc.body.collideWorldBounds = true;
        mc.animations.add('walkleft', [6,7,8]);
        mc.animations.add('walkright', [9,10,11]);
        mc.animations.add('walkdown', [0,1,2]);
        mc.animations.add('walkup', [3,4,5]);
        
        EnemyGroup1 = game.add.group();
        EnemyGroup1.enableBody = true;     
        
        var zombie = EnemyGroup1.create(1362, 318,'zombie');
        zombie.scale.setTo(1);
        zombie.animations.add('walkleft',[0]);
        zombie.animations.add('walkright',[0]);
        Zombie(zombie,5);
        var zombie = EnemyGroup1.create(1364, 518,'zombie');
        zombie.scale.setTo(1);
        zombie.animations.add('walkleft',[0]);
        zombie.animations.add('walkright',[0]);
        Zombie(zombie,5);
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X
        });
    },
    update: function(){
        //game.physics.arcade.collide(mc, platforms);
        //game.physics.arcade.collide(EnemyGroup1, platforms);
        var encounter1 = game.physics.arcade.overlap(mc, EnemyGroup1, null, null, this);

        if (encounter1 && !inTransition && !attacking){
            fighting = true;
            moveTo(mc,game.camera.x+150,game.camera.y+200);
            for (var i = 0; i < EnemyGroup1.children.length; i++){
                moveTo(EnemyGroup1.children[i],game.camera.x+650,game.camera.y+100+200*i);
            }
            setFightStage();
            enemyInBattle = EnemyGroup1;
        }
        
        //Move main character
        moveMC();
        
        //Move cursor in  battle mode
        moveCursorBM();

        //Move cursor in skills menu
        //moveCursorSM();
        
        //Pick enemy
        moveCursorEP(enemyInBattle);
        
        //Select actions
        selectBattleActions();
    }
};

function moveMC(){
    if (!fighting){   
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
        currentCpos[0] = textBox.x + 122 + (turn - 1) * 250;
        if(cursors.up.isDown && fighting && !press[2]){
            press[2] = true;
            if (currentCpos[1] > textBox.y+31){
                cursor.kill();
                currentCpos[1] -= 35;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] += 105;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.up.isUp && fighting){
            press[2] = false;
        }
        if(cursors.down.isDown && fighting && !press[3]){
            press[3] = true;
            if (currentCpos[1] < textBox.y+136){
                cursor.kill();
                currentCpos[1] += 35;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[1] -= 105;
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

function moveCursorEP(EnemyGroup){
    if (pickingEnemy){
        if(cursors.up.isDown && !press[2]){
            press[2] = true;
            if (enemyPicked == 0){
                enemyPicked = EnemyGroup.children.length - 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked -= 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
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
                currentCpos[0] = EnemyGroup.children[enemyPicked].x -30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                enemyPicked += 1;
                cursor.kill();
                currentCpos[0] = EnemyGroup.children[enemyPicked].x - 30;
                currentCpos[1] = EnemyGroup.children[enemyPicked].y;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.down.isUp){
            press[3] = false;
        }
    }
}

function setFightStage () {

    textBox = game.add.sprite(game.camera.x+0, game.camera.y+400, 'text box');
    textBox.scale.setTo(1.16,0.65);

    currentMenu = "mainBM";
    createMenu();
    currentCpos = [textBox.x+122,textBox.y+31];
    createCursor(currentCpos[0],currentCpos[1]);
    
}

function selectBattleActions () {
    if(cursors.z.isDown && fighting && !press[4]){
        press[4] = true;
        if (currentMenu == "mainBM" && cursor.y == textBox.y + 31){
            if (cursor.x == textBox.x+122) {
                console.log("Attack");
                actionBuilder.push(mc);
                actionBuilder.push(Ash);
            }
            else if (cursor.x == textBox.x+222){
                actionBuilder.push(ally1);
                actionBuilder.push(Cinderella);
            }
            pickingEnemy = true;
            currentMenu = "pickEnemy";
            cursor.kill();
            currentCpos[0] = enemyInBattle.children[0].x - 30;
            currentCpos[1] = enemyInBattle.children[0].y;
            createCursor(currentCpos[0],currentCpos[1]);
        }
        else if (currentMenu == "mainBM" && cursor.y == textBox.y + 66){
            if (cursor.x == textBox.x+122){
                currentMenu = "skillsMAsh";
                textOS.destroy();
                createMenu();
            }
            else if (cursor.x == textBox.x+222){
                currentMenu = "skillsMAlly1";
                textOS.destroy();
                createMenu();
            }
        }
        else if (currentMenu == "skillsMAsh"){
            
        }
        else if (currentMenu == "pickEnemy"){
            for (var i = 0; i < enemyInBattle.children.length; i++){
                if ((currentCpos[0] == enemyInBattle.children[i].x - 30) && (currentCpos[1]== enemyInBattle.children[i].y)){
                    actionBuilder.push(enemyInBattle.children[i]);
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

function addBattleAction(character,action,enemy) {
    BattleActionStack.push([character,action,enemy]);
    turn += 1;
    if (turn > nOfAllies){
        cursor.kill()
        performBattleActions();
        turn -= 1;
    }
    else {
        currentMenu = "mainBM";
        currentCpos[0] = textBox.x + 122 + (turn - 1) * 100;;
        currentCpos[1] = textBox.y + 31;
        cursor.kill();
        createCursor(currentCpos[0],currentCpos[1]);
        createMenu();
    }
}

function performBattleActions(){
    for (var i = 0; i < BattleActionStack.length; i++){
        attacking = true;
        if (BattleActionStack[i][1]==Ash || BattleActionStack[i][1]==Cinderella){
            originalPosX = BattleActionStack[i][0].x;
            originalPosY = BattleActionStack[i][0].y;
            console.log(originalPosX);
            moveToAttack(BattleActionStack[i][0],BattleActionStack[i][2].x - 30,BattleActionStack[i][2].y);
            makeBscDamage(BattleActionStack[i][1],BattleActionStack[i][2]);
            console.log("Next");
            console.log(BattleActionStack[i][2].Stats.HP);
            if (BattleActionStack[i][2].Stats.HP <= 0){
                BattleXP += BattleActionStack[i][2].XP;
                BattleActionStack[i][2].kill();
                if (enemyInBattle.countLiving == 0){
                    break;
                }
            }
        }
        else if (BattleActionStack[i][2] != 0){
            console.log("Use skill");
        }
        else {console.log("Use inventory")}
    }
    if (enemyInBattle.countLiving == 0){
        currentMenu = "BattleEnd";
    }
    else if (Ash.HP == 0){
        
    }
    else {
        for (var i = 0; i < EnemyGroup1.children.length; i++){
            
        }
        actionBuilder=[];
        BattleActionStack=[];
        currentMenu = "mainBM";
        textOS.kill();
        createMenu();
        currentCpos = [textBox.x+122,textBox.y+31];
        createCursor(currentCpos[0],currentCpos[1]);
    }
    
}

function makeBscDamage(character,enemy){
    checkElementalWkn(character,enemy);
    if (character.Weapon.WeapType == "Physical"){
        console.log(DamageMultiplier*(character.Stats.PhysAttack + character.Weapon.Stats.PhysAttack) - enemy.Stats.PhysDefense);
        Damage = Math.round(DamageMultiplier*(character.Stats.PhysAttack + character.Weapon.Stats.PhysAttack) - enemy.Stats.PhysDefense);
        enemy.Stats.HP -= Damage;
    }
    else if (character.Weapon.WeapType == "Magical"){
        Damage = Math.round(DamageMultiplier*(character.Stats.MagAttack + character.Weapon.Stats.MagAttack) - enemy.Stats.MagDefense);
        enemy.Stats.HP -= Damage;
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
        console.log("endframe10");
        character.frame = 10;
    }
    else {
        console.log("endframe0");
        character.frame = 0;
    }
    inTransition = false;
}

function moveToAttack (character,xpos,ypos){
    
    inTransition = true;
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        character.animations.play('walkleft',14,true);
        console.log("MTAL");
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {contAtkAnimation(character,currentPos[0],currentPos[1]);},this);
    }
    else if (dx > 0){ 
        character.animations.play("walkright",14,true);
        console.log("MTAR");
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(function() {contAtkAnimation(character,currentPos[0],currentPos[1]);},this);
    }   
}

function contAtkAnimation(character,xpos,ypos){
    console.log("insideCAA");
    console.log(xpos);
    character.animations.play('attack',20,true);
    character.animations.stop()
    
    var currentPos = [character.x,character.y]
    var dx = xpos - currentPos[0];
    
    if (dx < 0){
        character.animations.play('walkleft',14,true);
        console.log("CAAL");
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }
    else if (dx > 0){ 
        character.animations.play("walkright",14,true);
        console.log("CAAR");
        var moveTween = game.add.tween(character).to({x:xpos,y:ypos},1000,null,true);
        moveTween.onComplete.add(killMoveTween,this,0,character);
    }   
}

function createMenu(){
    
    text = "";
    if (currentMenu == "mainBM"){
        for (var i = 0; i < nOfAllies; i++){
            text += "Attack                      ";
        }
        text += "\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Skills                       ";
        }
        text += "\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Item                         ";
        }
        text += "\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Run                          ";
        }
        text += "\n";
        textOS = game.add.text(game.camera.x+160,game.camera.y+432,text,{fontSize:20});
        
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
    cursor.scale.setTo(0.5,0.40);
}