var demo = {}, centerX = 800 / 2, centerY = 600 / 2, mc, road, EnemyGroup1, EnemyGroup2, EnemyGroup3, EnemyGroup4, text;
var Slash = {Name: "Slash", PhysAttack : 20, MagAttack : 0, Element: "None", AreaOfEffect: "single"};
var Fire = {Name: "Fire", Stats:{PhysAttack : 0, MagAttack : 20}, Element: "Fire", AreaOfEffect: "single"};
var Cyclone = {Name: "Cyclone", Stats:{PhysAttack : 15, MagAttack : 0}, Element: "None", AreaOfEffect: "all"};
var Explosion = {Name: "Explosion", Stats:{PhysAttack : 0, MagAttack : 50}, Element: "Fire", AreaOfEffect: "all"};
var Ash = {
    Stats : {HP:500, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Mana:60},
    Element : "Fire",
    AreaOfEffect: "single",
    Level : 5,
    ExpCurve : 5,
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion]
}
function Zombie(enemyObject,level) {
    enemyObject.Stats = {HP:10+20*level, PhysAttack:3+5*level,PhysDefense:1,MagAttack:1,MagDefense:1,Mana:3};
    enemyObject.Level = level;
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
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        logo = game.add.sprite(centerX,centerY,"logo");
        logo.scale.setTo(1.5);
        logo.anchor.setTo(0.5,0.5);
        team = game.add.sprite(centerX,centerY+100,"team name");
        team.scale.setTo(1.2);
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