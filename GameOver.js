demo.state999 = function(){};
demo.state999.prototype = {
    preload: function(){
        //background music
        game.load.audio('background_music', ['assets/audio/credits.wav']);
        
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        console.log('state999');
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, true);
        
        game.add.text(centerX,centerY,"YOU DIED",{fontSize:25,fill:"#ffffff",font:'Press Start 2P'});
    },
    update: function(){
        
    }
};