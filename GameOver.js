demo.state999 = function(){};
demo.state999.prototype = {
    preload: function(){
        
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        console.log('state999');
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        game.add.text(centerX,centerY,"GAME OVER",{fontSize:30,fill:"#ffffff"});
    },
    update: function(){
        
    }
};