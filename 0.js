var demo = {}, centerX = 800 / 2, centerY = 600 / 2, mc, EnemyGroup1, EnemyGroup2, EnemyGroup3, EnemyGroup4, itemImage, itemDescr, itemUse, text, previousState = "intro",kori,fboss;

//ALLY SKILLS
var Slash = {Name:"Slash", Stats:{PhysAttack:20, MagAttack:0, MP:10}, SkillType:"Attack", Element:"None", AreaOfEffect:"Single", AnimKey:"slash",
            SkillAnimation: function SkillAnimation(target){
                moveToAttack(Ash,Ash.chSprite.x+200,Ash.chSprite.y,target,Slash);
            }};
var Fire = {Name:"Fire", Stats:{PhysAttack:0, MagAttack:20, MP:10}, SkillType:"Attack", Element:"Fire", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                var fire1 = game.add.sprite(Ash.chSprite.x+30,Ash.chSprite.y - 40,"fire1");
                Ash.chSprite.animations.play("firespell",2,false);
                moveToSkill(Ash,Fire,fire1,target);
            }};
var Cyclone = {Name:"Cyclone",Stats:{PhysAttack:15, MagAttack:0, MP:20},SkillType:"Attack",Element:"None",AreaOfEffect:"All",AnimKey: "cyclone",
            SkillAnimation: function SkillAnimation(target){
                moveToAttack(Ash,Ash.chSprite.x+200,Ash.chSprite.y,target,Cyclone);
            }};
var Explosion = {Name:"Explosion", Stats:{PhysAttack:0, MagAttack:50, MP:35}, SkillType:"Attack", Element:"Fire", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(target){
                var fire3 = game.add.sprite(500,300,"fire3");
                Ash.chSprite.animations.play("firespell",2,false);
                moveToSkill(Ash,Explosion,fire3,target);
            }};

//ENEMY SKILLS
var IceSpikes = {Name:"Ice Spikes", Stats:{PhysAttack:0, MagAttack:20, MP:10}, SkillType:"Attack", Element:"Ice", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(character,target){
                var icespikes1 = game.add.sprite(character.x-30,character.y,"icespikes");
                character.animations.play("icespikes",3,false);
                moveToSkill(character,IceSpikes,icespikes1,target);
            }};
var ShadowBeam = {Name:"Shadow Beam", Stats:{PhysAttack:0, MagAttack:20, MP:10}, SkillType:"Attack", Element:"None", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(character,target){
                var shadowbeam1 = game.add.sprite(character.x-30,character.y,"shadowbeam");
                character.animations.play("shadowbeam",3,false);
                moveToSkill(character,ShadowBeam,shadowbeam1,target);
            }};
var TidalWave = {Name:"Tidal Wave", Stats:{PhysAttack:0, MagAttack:20, MP:10}, SkillType:"Attack", Element:"Ice", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(character,target){
                var tidalwave1 = game.add.sprite(character.x-30,game.camera.y,"tidalwave");
                tidalwave1.scale.setTo(2,4);
                character.animations.play("tidalwave",3,false);
                moveToSkill(character,TidalWave,tidalwave1,target);
            }};

//ITEM OBJECTS
var WoodSword = {Name:"Wood Sword", Stats:{PhysAttack:10, MagAttack:0}, WeapType:"Sword", Element:"None"};
var WoodStaff = {Name:"Wood Staff", Stats:{PhysAttack:0, MagAttack:10}, WeapType:"Staff",Element:"None"};
var Potion = {Name:"Potion",Description:"Restores 25 HP", Quantity: 2, Price: 10, imageKey:"item",
             Use: function Use(character){
                 Potion.Quantity -= 1;
                 character.Stats.HP += 25;
                 if (character.MaxStats.HP < character.Stats.HP){
                     character.Stats.HP = character.MaxStats.HP;
                 }
                 if (Potion.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(Potion),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(Potion) == -1){
                     Inventory.Items.push(Potion);
                 }
                 Potion.Quantity += num;
             }};
var Inventory = {
    Weapons : [WoodSword],
    Items : [Potion],
    Coins : 0
}

//CHARACTER OBJECTS
var Ash = {
    Name : "Ash",
    PortraitKey : "ashportrait1",
    Stats : {HP:200, PhysAttack:50000,PhysDefense:3000,MagAttack:10,MagDefense:1500,Speed:20,MP:60},
    MaxStats : {HP:200, PhysAttack:50000,PhysDefense:3000,MagAttack:10,MagDefense:1500,Speed:20,MP:60},
    UpdtStats : function UpdtStats(){
        Ash.MaxStats.HP += Math.round(Math.random()*(105-100)+100);
        Ash.MaxStats.PhysAttack += Math.round(Math.random()*(10-8)+8);
        Ash.MaxStats.PhysDefense += Math.round(Math.random()*(8-5)+5);
        Ash.MaxStats.MagAttack += Math.round(Math.random()*(4-2)+2);
        Ash.MaxStats.MagDefense += Math.round(Math.random()*(5-3)+3);
        Ash.MaxStats.Speed += Math.round(Math.random()*(6-4)+4);
        Ash.MaxStats.MP += Math.round(Math.random()*(20-15)+15);
        for (var i in Ash.MaxStats){
            Ash.Stats[i] = Ash.MaxStats[i];
        }
    },
    Lvl : 1,
    currentHPRatio : 1,
    currentMPRatio : 1,
    HPRatio: function(){return Ash.Stats.HP/Ash.MaxStats.HP},
    MPRatio: function(){return Ash.Stats.MP/Ash.MaxStats.MP},
    XPObtained : 0,
    XPNeeded : 0,
    XPCurve : function XPCurve(){
        Ash.XPNeeded = Math.round(1.3*Math.exp(Ash.Lvl)+5);
    },
    LvlUp : function LvlUp() {
        Ash.XPCurve();
        Ash.leveledUp = false;
        Ash.learnedSkill = false;
        while (Ash.XPObtained >= Ash.XPNeeded){
            Ash.Lvl += 1;
            if (Ash.SkillLvl.indexOf(Ash.Lvl) != -1){
                Ash.SkillsLearned.push(Ash.SkillsToLearn[Ash.SkillLvl.indexOf(Ash.Lvl)]);
                Ash.learnedSkill = true;
            }
            Ash.UpdtStats();
            Ash.XPCurve();
            Ash.leveledUp = true;
        }
        return [Ash.leveledUp,Ash.learnedSkill];
    },
    SkillLvl : [5,8,14,18,23,27,35],
    SkillsLearned : [Slash,Fire],
    SkillsToLearn : [Cyclone,Explosion],
    Weapon : WoodSword
}

var Kori = {
    Name : "Kori",
    PortraitKey : "koriportrait1",
    Stats : {HP:150, PhysAttack:5,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:100},
    MaxStats : {HP:150, PhysAttack:5,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:100},
    UpdtStats : function UpdtStats(){
        Kori.MaxStats.HP += Math.round(Math.random()*(90-80)+80);
        Kori.MaxStats.PhysAttack += Math.round(Math.random()*(4-2)+2);
        Kori.MaxStats.PhysDefense += Math.round(Math.random()*(5-3)+3);
        Kori.MaxStats.MagAttack += Math.round(Math.random()*(10-8)+8);
        Kori.MaxStats.MagDefense += Math.round(Math.random()*(8-5)+5);
        Kori.MaxStats.Speed += Math.round(Math.random()*(7-5)+5);
        Kori.MaxStats.MP += Math.round(Math.random()*(30-25)+25);
        for (var i in Kori.MaxStats){
            Kori.Stats[i] = Kori.MaxStats[i];
        }
    },
    Lvl : 1,
    currentHPRatio : 1,
    currentMPRatio : 1,
    HPRatio: function(){return Kori.Stats.HP/Kori.MaxStats.HP},
    MPRatio: function(){return Kori.Stats.MP/Kori.MaxStats.MP},
    XPObtained : 3283,
    XPNeeded : 0,
    XPCurve : function XPCurve(){
        Kori.XPNeeded = Math.round(1.1*Math.exp(Kori.Lvl)+4);
    },
    LvlUp : function LvlUp() {
        Kori.XPCurve();
        Kori.leveledUp = false;
        Kori.learnedSkill = false;
        while (Kori.XPObtained >= Kori.XPNeeded){
            Kori.Lvl += 1;
            if (Kori.SkillLvl.indexOf(Kori.Lvl) != -1){
                Kori.SkillsLearned.push(Kori.SkillsToLearn[Kori.SkillLvl.indexOf(Kori.Lvl)]);
                Kori.learnedSkill = true;
            }
            Kori.UpdtStats();
            Kori.XPCurve();
            Kori.leveledUp = true;
        }
        return [Kori.leveledUp,Kori.learnedSkill];
    },
    SkillLvl: [5,40],
    SkillsLearned : [Slash],
    SkillsToLearn : [Cyclone,Explosion],
    Weapon : WoodStaff
}

//ENEMY OBJECTS (MODIFIER FUNCTIONS)
function Ghoul(enemyObject,level) {
    enemyObject.Stats = {HP:10+20*level, PhysAttack:3+6*level, PhysDefense:1+2*level, MagAttack:1+2*level, MagDefense:1+2*level, Speed:1+2*level, MP:3+5*level};
    enemyObject.MaxStats = {HP:10+20*level, PhysAttack:3+6*level, PhysDefense:1+2*level, MagAttack:1+2*level, MagDefense:1+2*level, Speed:1+2*level, MP:3+5*level};
    enemyObject.Level = level;
    enemyObject.XP = level*5;
    enemyObject.Coins = level*20;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [];
}

function Swamplady(enemyObject,level) {
    enemyObject.Stats = {HP:10+15*level, PhysAttack:3+3*level, PhysDefense:1+2*level, MagAttack:1+6*level, MagDefense:1+5*level, Speed:1+5*level, MP:3+15*level};
    enemyObject.MaxStats = {HP:10+15*level, PhysAttack:3+3*level, PhysDefense:1+2*level, MagAttack:1+6*level, MagDefense:1+5*level, Speed:1+5*level, MP:3+15*level};
    enemyObject.Level = level;
    enemyObject.XP = level*8;
    enemyObject.Coins = level*15;
    enemyObject.Element = "Ice";
    enemyObject.SkillsLearned = [IceSpikes];
}

function Flasher(enemyObject,level) {
    enemyObject.Stats = {HP:10+15*level, PhysAttack:3+1*level, PhysDefense:1+1*level, MagAttack:1+15*level, MagDefense:1+4*level, Speed:1+15*level, MP:3+15*level};
    enemyObject.MaxStats = {HP:10+15*level, PhysAttack:3+1*level, PhysDefense:1+1*level, MagAttack:1+15*level, MagDefense:1+4*level, Speed:1+15*level, MP:3+15*level};
    enemyObject.Level = level;
    enemyObject.XP = level*10;
    enemyObject.Coins = level*15;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [ShadowBeam];
}

function Swampboss(enemyObject,level) {
    enemyObject.Stats = {HP:10+30*level, PhysAttack:3+10*level, PhysDefense:1+3*level, MagAttack:1+5*level, MagDefense:1+6*level, Speed:1+5*level, MP:3+20*level};
    enemyObject.MaxStats = {HP:10+30*level, PhysAttack:3+10*level, PhysDefense:1+3*level, MagAttack:1+5*level, MagDefense:1+6*level, Speed:1+5*level, MP:3+20*level};
    enemyObject.Level = level;
    enemyObject.XP = level*30;
    enemyObject.Coins = level*30;
    enemyObject.Element = "Ice";
    enemyObject.SkillsLearned = [TidalWave];
}

function Weasel(enemyObject,level) {
    enemyObject.Stats = {HP:10+22*level, PhysAttack:3+7*level, PhysDefense:1+5*level, MagAttack:1+2*level, MagDefense:1+3*level, Speed:1+15*level, MP:3+10*level};
    enemyObject.MaxStats = {HP:10+20*level, PhysAttack:3+7*level, PhysDefense:1+5*level, MagAttack:1+2*level, MagDefense:1+3*level, Speed:1+15*level, MP:3+10*level};
    enemyObject.Level = level;
    enemyObject.XP = level*10;
    enemyObject.Coins = level*25;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [];
}

function Harpie(enemyObject,level) {
    enemyObject.Stats = {HP:10+15*level, PhysAttack:3+6*level, PhysDefense:1+5*level, MagAttack:1+10*level, MagDefense:1+13*level, Speed:1+10*level, MP:3+15*level};
    enemyObject.MaxStats = {HP:10+15*level, PhysAttack:3+6*level, PhysDefense:1+5*level, MagAttack:1+10*level, MagDefense:1+13*level, Speed:1+10*level, MP:3+15*level};
    enemyObject.Level = level;
    enemyObject.XP = level*25;
    enemyObject.Coins = level*5;
    enemyObject.Element = "Storm";
    enemyObject.SkillsLearned = [];
}

function Koriboss(enemyObject,level) {
    enemyObject.Stats = {HP:400, PhysAttack:20,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:100};
    enemyObject.MaxStats = {HP:400, PhysAttack:20,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:100};
    enemyObject.Level = level;
    enemyObject.XP = level*40;
    enemyObject.Coins = level*40;
    enemyObject.Element = "Ice";
    enemyObject.SkillsLearned = [Slash];
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
        //background music
        game.load.audio('background_music', ['assets/audio/logo.wav']); 
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //plays background music
        music = game.add.audio('background_music');
        music.play('', 0, 1, false);
        
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
    music.destroy();
    game.state.start(stateID);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ENTER, changeState, 'graveyard');
}