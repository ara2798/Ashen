var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, mc, road, EnemyGroup1, EnemyGroup2, EnemyGroup3, EnemyGroup4, text;
var Slash = {Name: "Slash", PhysAttack : 20, MagAttack : 0, Element: "None", AreaOfEffect: "1"};
var Fire = {Name: "Fire", PhysAttack : 0, MagAttack : 20, Element: "Fire", AreaOfEffect: "1"};
var Cyclone = {Name: "Cyclone", PhysAttack : 15, MagAttack : 0, Element: "None", AreaOfEffect: "all"};
var Explosion = {Name: "Explosion", PhysAttack : 0, MagAttack : 50, Element: "Fire", AreaOfEffect: "all"};
var Ash = {
    Stats : {HP:500, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Mana:60},
    Level : 5,
    ExpCurve : 5,
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion]
}
var Cinderella = {
    Stats : {HP:400, PhysAttack:20,PhysDefense:15,MagAttack:50,MagDefense:30,Mana:100},
    Level : 5,
    ExpCurve : 5,
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion]
}
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
    addKeyCallback(Phaser.Keyboard.ENTER, changeState, "graveyard");
}