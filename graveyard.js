var platforms, fighting=false, currentCpos = [68,705], press = [true,true,true,true,true,true],/*[right,left,up,down,z,x]*/ cursors, currentMenu, nOfAllies = 1, text="";
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
        
        dummy=4;
        
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
        
        Materia = game.add.group();
        Materia.enableBody = true;
        
        for (var i = 0; i < 6; i++){
            var materia = Materia.create(150+i*250, 200,'materia');
            materia.scale.setTo(0.5, 0.5);
        }
        
        game.camera.follow(mc);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 300, 1000);
        
        scoreText = game.add.text(50,50, 'XP: '+ score, {fontSize: '32px', fill: '#fff' });
        
        cursors = game.input.keyboard.addKeys({
            'up':Phaser.KeyCode.UP, 'down':Phaser.KeyCode.DOWN, 'left':Phaser.KeyCode.LEFT, 'right':Phaser.KeyCode.RIGHT, 'z':Phaser.KeyCode.Z, 'x':Phaser.KeyCode.X
        });
    },
    update: function(){
        game.physics.arcade.collide(mc, platforms);
        game.physics.arcade.collide(Materia, platforms);
        var encounter = game.physics.arcade.overlap(mc, Materia, fight, null, this);
        
        if (encounter){
            fighting = true;
            fight(mc, Materia, 254, 347.5);
        }
        
        //Move main character
        if(cursors.right.isDown && !fighting){
            mc.scale.setTo(-0.7, 0.7);
            mc.body.velocity.x = 550;
            mc.animations.play('walk', 14, true);
            if(mc.x >= 1547.5){
                changeState(null,"0");
            }
        }
       else if(cursors.left.isDown && !fighting){
            mc.scale.setTo(0.7, 0.7);
            mc.body.velocity.x = -550;
            mc.animations.play('walk', 14, true);
        }
        else{
            mc.animations.stop('walk');
            mc.frame = 0;
            mc.body.velocity.x = 0;
        }
        if(cursors.up.isDown && !fighting){
            mc.body.velocity.y = -450;
        }
        else if(cursors.down.isDown && !fighting){
            mc.body.velocity.y = 450;
        }
        else{
            mc.body.velocity.y = 0;
        }
        
        //Move cursor in  battle mode
        if(cursors.right.isDown && fighting && !press[0]){
            press[0] = true;
            if (currentCpos[0] < 268){
                cursor.kill();
                currentCpos[0] += 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[0] -= 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.right.isUp && fighting){
            press[0] = false;
        }
        if(cursors.left.isDown && fighting && !press[1]){
            press[1] = true;
            if (currentCpos[0] > 68){
                cursor.kill();
                currentCpos[0] -= 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
            else{
                cursor.kill();
                currentCpos[0] += 200;
                createCursor(currentCpos[0],currentCpos[1]);
            }
        }
        else if (cursors.left.isUp && fighting){
            press[1] = false;
        }
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
        
        //Select actions
        if(cursors.z.isDown && fighting && !press[4]){
            press[4] = true;
            if (currentMenu == "mainBM" && cursor.y == 805){
                currentMenu = "skillsM";
                textOS.destroy();
                createMenu();
            }
        }
        else if (cursors.z.isUp && fighting){
            press[4] =false;
        }
        if(cursors.x.isDown && fighting && !press[5]){
            press[5] = true;
            if (currentMenu == "skillsM"){
                currentMenu = "mainBM";
                textOS.destroy();
                createMenu();
            }
        }
        else if (cursors.z.isUp && fighting){
            press[5] =false;
        }
    }
};

function fight (mc, Materia, xpos, ypos) {
    
    currentPosition = [mc.x, mc.y];
    dx = xpos - currentPosition[0];
    dy = ypos - currentPosition[1];
    
    
    mc.x = xpos;
    mc.y = ypos;

    textBox = game.add.sprite(0, 600, 'text box');
    textBox.scale.setTo(1.55,0.9);
    
    currentMenu = "mainBM";
    createMenu();
    createCursor(68,705);
    
}

function createMenu(){
    
    text = "";
    if (currentMenu == "mainBM"){
        for (var i = 0; i < nOfAllies; i++){
            text += "Attack                      ";
        }
        text += "\n\n\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Skills                      ";
        }
        text += "\n\n\n";
        for (var i = 0; i < nOfAllies; i++){
            text += "Item                        ";
        }
        text += "\n\n\n";
        textOS = game.add.text(120,700,text);
        
    }
    else if (currentMenu == "skillsM"){
        for (var i = 0; i < mcSkillsL.length; i++){
            text += mcSkillsL[i];
            text += "         ";
        }
        textOS = game.add.text(120,700,text);
    }
}

function createCursor(xpos, ypos){
    cursor = game.add.sprite(xpos,ypos,'cursor');
    cursor.scale.setTo(0.12,0.12);
}