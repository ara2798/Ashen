demo.state1000 = function(){};
demo.state1000.prototype = {
    preload: function(){
        //background music
        game.load.audio('background_music', ['assets/audio/main.wav']);
        
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        spellOut(50,250,"TO BE CONTINUED...");
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            text.kill();
            music = game.add.audio('background_music');
            music.play('', 0, 1, true);
            game.add.text(100,50,"Producer\nPaul Toprac\n\nMain Programmer\nAngel Argandona\n\nMain Artist\nJessica Hairston\n\nMain Sound Artist\nEmrose Bhalesha",{fontSize:30,fill:"#ffffff"});
        }, this);
        
        
    },
    update: function(){
        
    }
};