var text;
demo.state997 = function(){};
demo.state997.prototype = {
    preload: function(){
        //game.load.script('webfont','//fonts.googleapis.com/css?family=Press+Start+2P')
        game.load.spritesheet('mc', 'assets/spritesheets/ashspritesheet.png', 90, 90);
        game.load.spritesheet('sister', "assets/spritesheets/ash's_sister.png", 90, 90);
        game.load.spritesheet('kori', 'assets/spritesheets/korispritesheet.png', 90, 90);
        game.load.spritesheet('king', 'assets/spritesheets/king.png', 135, 135);
        game.load.spritesheet('knight', 'assets/spritesheets/knightspritesheet.png', 135, 135);
        game.load.spritesheet('skeleton', 'assets/spritesheets/skeleton.png', 128, 128);
        game.load.spritesheet('jester', 'assets/spritesheets/jesterspritesheet.png', 128, 128);
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
        
        ash = game.add.sprite(400, 280, 'mc');
        ash.anchor.setTo(0.5,0.5);
        ash.scale.setTo(1.5, 1.5);
        ash.animations.add('walkleft', [6,7,8]);
        ash.animations.play('walkleft',18,true);
        sister = game.add.sprite(390, 310, 'sister');
        sister.anchor.setTo(0.5,0.5);
        sister.scale.setTo(1.2, 0.8);
        sister.animations.add('walkleft', [0,1,2,3]);
        sister.animations.play('walkleft',16,true);
        
        castleinterior = game.add.sprite(-410,-1400,'castle');
        knight2 = game.add.sprite(380,300,'knight');
        knight2.frame = 6;
        knight2.anchor.setTo(0.5);
        knight2.scale.setTo(1.2);
        skeleton21 = game.add.sprite(100,270,'skeleton');
        skeleton22 = game.add.sprite(700,270,'skeleton');
        skeleton22.scale.setTo(-1,1);
        skeleton23 = game.add.sprite(300,520,'skeleton');
        
        throneroom = game.add.sprite(0,0,'castlebossroom');
        ash1 = game.add.sprite(240, 220, 'mc');
        ash1.frame = 7;
        ash1.scale.setTo(-1.5,1.5);
        sister1 = game.add.sprite(250, 275, 'sister');
        sister1.frame = 1;
        sister1.scale.setTo(1.2,0.8);
        kori1 = game.add.sprite(600,220,'kori');
        kori1.scale.setTo(1.4);
        kori1.frame = 1;
        king1 = game.add.sprite(335,5,'king');
        king1.scale.setTo(1,1.1);
        
        var darkBg = game.add.sprite(0,0,'square');
        darkBg.scale.setTo(8,6);
        
        spellOut(100,200,"A long time ago, there was peace in the kingdom...");
        
        game.time.events.add(Phaser.Timer.SECOND * 3, fadeText1, this);    

        function fadeText1(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            console.log("change");
            //changeState(null,'graveyard');
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 6.5, createText1, this);

        function createText1(){
            darken = game.add.tween(darkBg).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            darken.onComplete.add(function(){spellOut(100, 200, "But then, a mysterious knight appeared, and with his\narmy from the underworld, he brought destruction and\nwrath upon the kingdom...");throneroom.kill();ash1.kill();sister1.kill();kori1.kill();king1.kill();}, this);                  
            //changeState(null,'graveyard');
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 14, fadeText2, this);    

        function fadeText2(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 17, createText2, this);    

        function createText2(){
            darken = game.add.tween(darkBg).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            darken.onComplete.add(function(){spellOut(100, 200, "He took the throne and the prince tried to escape\nwith the princess...");castleinterior.kill();knight2.kill();skeleton21.kill();skeleton22.kill();skeleton23.kill();}, this);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 21.5, fadeText3, this);    

        function fadeText3(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();},this);
            game.add.tween(darkBg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 24, createText3, this); 
        
        function createText3(){
            darken = game.add.tween(darkBg).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            darken.onComplete.add(function(){spellOut(100, 200, "But in the mayhem, the princess was brutally killed...");ash.kill();sister.kill();}, this);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 28, createText4, this); 
        
        function createText4(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();spellOut(100, 200, "The prince, Ash, decided to stay behind and seek\nrevenge for his sister’s death...")},this);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 34, fadeText4, this);    

        function fadeText4(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();changeState(null,"graveyard");},this);
        }
        
    },
    update: function(){
        
        
    }
};

function spellOut(x,y,lines){
    text = game.add.text(x,y,'',{fontSize:23,fill:'#ffffff',stroke:'#000000',strokeThickness:4});
    var loop = game.time.events.loop(40,addChar);
    var index = 0;
    
    function addChar(){
        text.text += lines[index];
        if (index >= lines.length - 1){
            game.time.events.remove(loop);
        }
        index++;
    }
}