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
        
        throneroom = game.add.sprite(0,0,'castlebossroom');       
        
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
            darken.onComplete.add(function(){spellOut(100, 200, "But then, a mysterious knight appeared, and with his\narmy from the underworld, he brought destruction and\nwrath upon the kingdom...");throneroom.kill();}, this);                  
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
            darken.onComplete.add(function(){spellOut(100, 200, "He took the throne and the prince tried to escape\nwith the princess...");castleinterior.kill();}, this);
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
        
        game.time.events.add(Phaser.Timer.SECOND * 27.5, createText4, this); 
        
        function createText4(){
            textfade = game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            textfade.onComplete.add(function(){text.kill();spellOut(100, 200, "The prince, Ash, decided to stay behind and seek\nrevenge for his sister’s death")},this);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 33.5, change, this);
        
        function change(){
            changeState(null,"graveyard");
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