demo.state997 = function(){};
demo.state997.prototype = {
    preload: function(){
        //game.load.script('webfont','//fonts.googleapis.com/css?family=Press+Start+2P')
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.image('square','assets/sprites/square2.png');
        game.load.image('castle', 'assets/backgrounds/castleinterior.png');
        game.load.image('castlebossroom', 'assets/backgrounds/castlebossroom.png');
        
        //background music
        game.load.audio('cutscene1', ['assets/audio/cutscene1.wav']);
        
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //plays background music
        music = game.add.audio('cutscene1');
        music.play('', 0, 1, true);
        
        ash = game.add.sprite(380, 270, 'mc');
        ash.anchor.setTo(0.5,0.5);
        ash.scale.setTo(1.5, 1.5);
        ash.animations.add('walkleft', [6,7,8]);
        ash.animations.play('walkleft',18,true);
        
        throneroom = game.add.sprite(0,0,'castlebossroom');
        
        
        var darkBg = game.add.sprite(0,0,'square');
        darkBg.scale.setTo(8,6);
        var text = game.add.text(100, 200, "A long time ago, there was peace in the kingdom...",{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4});        
        
        game.time.events.add(Phaser.Timer.SECOND * 4, fadeText, this);    

        function fadeText(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            changeState(null,'graveyard');
        }
        /*
        game.time.events.add(Phaser.Timer.SECOND * 9, removeTween, this);

        function removeTween(){
            logo.kill();
            music = game.add.audio('title');
            music.play('', 0, 1, true);
            var emitter = game.add.emitter(200, -200, 80);
            emitter.width = 600;
            emitter.angle = 10;
            emitter.makeParticles('rain');
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 5);
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.start(false, 1000, 5, 0);
        }*/
        
    },
    update: function(){
        
        
    }
};