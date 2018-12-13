demo.state1000 = function(){};
demo.state1000.prototype = {
    preload: function(){
        game.load.image('hud', 'assets/sprites/hud.png');
        game.load.image('ashportrait1','assets/sprites/ashportrait.png');
        
        //background music
        game.load.audio('background_music', ['assets/audio/main.wav']);
        
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        dialogueBox = game.add.sprite(game.camera.x,game.camera.y,'hud');
        dialogueBox.scale.setTo(1,1.5);
        portrait = game.add.sprite(dialogueBox.x+30,dialogueBox.y+40,'ashportrait1');
        portrait.scale.setTo(0.5);
        text = game.add.text(dialogueBox.x+150,dialogueBox.y+40,'Huh... where am I?',{fontSize:18,fill:'#ffffff',stroke:'#000000',strokeThickness:4,font:'Press Start 2P'});
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            dialogueBoxFade = game.add.tween(dialogueBox).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            portraitFade = game.add.tween(portrait).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textFade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textFade.onComplete.add(function(){text.kill();portrait.kill();dialogueBox.kill();spellOut(50,250,"TO BE CONTINUED...");},this);
            
        }, this);
        
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            text.kill();
            music = game.add.audio('background_music');
            music.play('', 0, 1, true);
            game.add.text(60,70,"Producer\nPaul Toprac\n\nMain Programmer\nAngel Argandona\n\nMain Artist\nJessica Hairston\n\nMain Sound Artist\nEmrose Bhalesha",{fontSize:25,fill:"#ffffff",font:'Press Start 2P'});
        }, this);
        
        
    },
    update: function(){
        
    }
};