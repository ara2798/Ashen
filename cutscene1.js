var text;
demo.state997 = function(){};
demo.state997.prototype = {
    preload: function(){
        //game.load.script('webfont','//fonts.googleapis.com/css?family=Press+Start+2P')
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 80, 90);
        game.load.spritesheet('sister', "assets/spritesheets/ash's_sister.png", 90, 90);
        game.load.spritesheet('knight', 'assets/spritesheets/knightspritesheet.png', 135, 135);
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
        sister = game.add.sprite(370, 300, 'sister');
        sister.anchor.setTo(0.5,0.5);
        sister.scale.setTo(1.2, 0.8);
        sister.animations.add('walkleft', [0,1,2,3]);
        sister.animations.play('walkleft',16,true);
        
        castleinterior = game.add.sprite(-410,-1400,'castle');
        
        throneroom = game.add.sprite(0,0,'castlebossroom');       
        
        var darkBg = game.add.sprite(0,0,'square');
        darkBg.scale.setTo(8,6);
        var text = game.add.text(100, 200, "A long time ago, there was peace in the kingdom...",{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4});        
        
        game.time.events.add(Phaser.Timer.SECOND * 2.5, fadeText1, this);    

        function fadeText1(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            console.log("change");
            changeState(null,'graveyard');
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 6, createText1, this);

        function createText1(){
            darken = game.add.tween(darkBg).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            darken.onComplete.add(function(){text = game.add.text(100, 200, "But then, a mysterious knight appeared, and with his\narmy from the underworld, he brought destruction and\nwrath upon the kingdom.",{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4});throneroom.kill();}, this);                  
            //changeState(null,'graveyard');
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 12, fadeText2, this);    

        function fadeText2(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 12, fadeText, this);    

        function fadeText(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
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