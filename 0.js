var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, mc, speed = 30, road, Materia, text, mcStats = {HP:500, Attack:50,Defense:30,Magic:10,MagicDefense:15,Mana:60}, mcLevel=5,mcSkillsL = ["Slash","Fire"];
/*WebFontConfig= {
    google: {families: ['Press Start 2P']}
};*/
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        //game.load.script('webfont','//fonts.googleapis.com/css?family=Press+Start+2P')
        game.load.image('logo', 'assets/sprites/logo.png');
        game.load.image('team name', 'assets/sprites/team name.png');
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 1600, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        logo = game.add.sprite(centerX,centerY-100,"logo");
        logo.scale.setTo(3);
        logo.anchor.setTo(0.5,0.5);
        team = game.add.sprite(centerX,centerY+100,"team name");
        team.scale.setTo(3);
        team.anchor.setTo(0.5,0.5);
        
        //text = "8-bitz Studioz"
        //game.add.text(450,550, text, {fontSize: '100px', fill: '#ffffff', font: 'Press Start 2P' });
    },
    update: function(){
        
        
    }
};

function changeState(i, stateID){
    game.state.start(stateID);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, "0");
    addKeyCallback(Phaser.Keyboard.ONE, changeState, "graveyard");
}