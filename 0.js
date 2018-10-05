var demo = {}, centerX = 800 / 2, centerY = 600 / 2, mc, road, EnemyGroup1, EnemyGroup2, EnemyGroup3, EnemyGroup4, text;
var Slash = {Name: "Slash", PhysAttack : 20, MagAttack : 0, Element: "None", AreaOfEffect: "single"};
var Fire = {Name: "Fire", Stats:{PhysAttack : 0, MagAttack : 20}, Element: "Fire", AreaOfEffect: "single"};
var Cyclone = {Name: "Cyclone", Stats:{PhysAttack : 15, MagAttack : 0}, Element: "None", AreaOfEffect: "all"};
var Explosion = {Name: "Explosion", Stats:{PhysAttack : 0, MagAttack : 50}, Element: "Fire", AreaOfEffect: "all"};
var WoodSword = {Name: "Wood Sword", Stats:{PhysAttack : 10, MagAttack : 0}, WeapType: "Physical"};
var Staff = {Name: "Staff", Stats:{PhysAttack : 0, MagAttack : 10}, WeapType: "Magical"};
var Ash = {
    Stats : {HP:200, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Mana:60},
    MaxStats : {HP:200, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Mana:60},
    UpdtStats : function UpdtStats(){
        Ash.MaxStats.HP += Math.round(Math.random()*(105-100)+100);
        Ash.MaxStats.PhysAttack += Math.round(Math.random()*(10-8)+8);
        Ash.MaxStats.PhysDefense += Math.round(Math.random()*(8-5)+5);
        Ash.MaxStats.MagAttack += Math.round(Math.random()*(4-2)+2);
        Ash.MaxStats.MagDefense += Math.round(Math.random()*(5-3)+3);
        Ash.MaxStats.Mana += Math.round(Math.random()*(20-15)+15);
        for (var i in Ash.MaxStats){
            Ash.Stats[i] = Ash.MaxStats[i];
        }
    },
    Element : "Fire",
    AreaOfEffect: "single",
    Lvl : 1,
    XPObtained : 0,
    XPCurve : function XPCurve(){
        Ash.XPNeeded = Math.round(1.3*Math.exp(Ash.level)+5);
    },
    LvlUp : function LvlUp() {
        Ash.XPCurve();
        if (Ash.XPObtained >= Ash.XPNeeded){
            Ash.XPObtained -= Ash.XPNeeded;
            Ash.Lvl += 1;
            Ash.UpdtStats();
        }
        Ash.XPCurve();
    },
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion],
    Weapon : WoodSword
}

var Cinderella = {
    Stats : {HP:400, PhysAttack:20,PhysDefense:15,MagAttack:50,MagDefense:30,Mana:100},
    MaxStats : {HP:400, PhysAttack:20,PhysDefense:15,MagAttack:50,MagDefense:30,Mana:100},
    UpdtStats : function UpdtStats(){
        Cinderella.MaxStats.HP += Math.round(Math.random()*(90-80)+80);
        Cinderella.MaxStats.PhysAttack += Math.round(Math.random()*(4-2)+2);
        Cinderella.MaxStats.PhysDefense += Math.round(Math.random()*(5-3)+3);
        Cinderella.MaxStats.MagAttack += Math.round(Math.random()*(10-8)+8);
        Cinderella.MaxStats.MagDefense += Math.round(Math.random()*(8-5)+5);
        Cinderella.MaxStats.Mana += Math.round(Math.random()*(30-25)+25);
        for (var i in Cinderella.MaxStats){
            Cinderella.Stats[i] = Cinderella.MaxStats[i];
        }
    },
    Element : "Ice",
    AreaOfEffect: "single",
    Lvl : 1,
    XPObtained : 0,
    XPCurve : function XPCurve(){
        Cinderella.XPNeeded = Math.round(1.1*Math.exp(Cinderella.level)+4);
    },
    LvlUp : function LvlUp() {
        Cinderella.XPCurve();
        if (Cinderella.XPObtained >= Cinderella.XPNeeded){
            Cinderella.XPObtained -= Cinderella.XPNeeded;
            Cinderella.Lvl += 1;
            Cinderella.UpdtStats();
        }
        Cinderella.XPCurve();
    },
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion],
    Weapon : Staff
}

function Zombie(enemyObject,level) {
    enemyObject.Stats = {HP:10+20*level, PhysAttack:3+5*level,PhysDefense:1,MagAttack:1,MagDefense:1,Mana:3};
    enemyObject.Level = level;
    enemyObject.XP = level*5;
    enemyObject.Element = "None";
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