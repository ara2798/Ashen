var demo = {}, centerX = 800 / 2, centerY = 600 / 2, mc, EnemyGroup1, EnemyGroup2, EnemyGroup3, EnemyGroup4, itemImage, itemDescr, itemUse, text, kori,knight, swampboss, jester;

//ALLY SKILLS
//****Ash****
var Slash = {Name:"Slash", Stats:{PhysAttack:20, MagAttack:0, MP:10},Description:"Regular Phys. Attack", SkillType:"Attack", Element:"None", AreaOfEffect:"Single", AnimKey:"slash",
            SkillAnimation: function SkillAnimation(target){
                moveToAttack(Ash,Ash.chSprite.x+200,Ash.chSprite.y,target,Slash);
            }};
var Fireball = {Name:"Fireball", Stats:{PhysAttack:0, MagAttack:20, MP:10},Description:"Fire Magic Attack", SkillType:"Attack", Element:"Fire", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                var fireball = game.add.sprite(Ash.chSprite.x+30,Ash.chSprite.y - 40,"fireball");
                Ash.chSprite.animations.play("firespell",2,false);
                moveToSkill(Ash,Fireball,fireball,target);
            }};
var Ignite = {Name:"Ignite", Stats:{MP:15},Description:"Phys./Mag. Attack Buff", SkillType:"Support", Element:"Fire", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                Ash.chSprite.animations.play("ignite",2,false);
                var IgnPhysAmnt = Math.round(target.MaxStats.PhysAttack*0.1);
                var IgnMagAmnt = Math.round(target.MaxStats.MagAttack*0.1);
                target.Stats.PhysAttack += IgnPhysAmnt;
                target.Stats.MagAttack += IgnMagAmnt;
                AtckBuff = game.add.sprite(target.chSprite.x+5,target.chSprite.y-65,"attackbuff");
                AtckBuff.scale.setTo(1.4);
                AtckBuff.animations.add('act',[0,1,2,3]);
                AtckBuff.animations.play('act',8,false);
                AtckBuff.lifespan = 1000;
            }};
var FireSlash = {Name:"Fireslash", Stats:{PhysAttack:20, MagAttack:0, MP:15},Description:"Fire Physical Attack", SkillType:"Attack", Element:"Fire", AreaOfEffect:"Single", AnimKey:"fireslash",
            SkillAnimation: function SkillAnimation(target){
                moveToAttack(Ash,Ash.chSprite.x+200,Ash.chSprite.y,target,FireSlash);
            }};
var BladeBlitz = {Name:"Bladeblitz",Stats:{PhysAttack:15, MagAttack:0, MP:20},Description:"Regular Phys. AoE", SkillType:"Attack",Element:"None",AreaOfEffect:"All",AnimKey: "bladeblitz",
            SkillAnimation: function SkillAnimation(target){
                moveToAttack(Ash,Ash.chSprite.x+400,Ash.chSprite.y,target,BladeBlitz);
            }};
var Explosion = {Name:"Explosion", Stats:{PhysAttack:0, MagAttack:50, MP:25},Description:"Fire Magic AoE", SkillType:"Attack", Element:"Fire", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(target){
                var explosion = game.add.sprite(game.camera.x+400,game.camera.y+75,"explosion");
                explosion.scale.setTo(2.5,3);
                explosion.animations.add('act',[0,1,2]);
                explosion.animations.play('act',5,true);
                explosion.lifespan = 2000;
                Ash.chSprite.animations.play("firespell",2,false);
                for (var i = 0; i < enemyInBattle.children.length; i++){
                    makeSkillDamage(Ash,Explosion,enemyInBattle.children[i]);
                }
            }};
var Hellfire = {Name:"Hellfire",Stats:{PhysAttack:50, MagAttack:0, MP:35},Description:"Fire Physical AoE",SkillType:"Attack",Element:"Fire",AreaOfEffect:"All",AnimKey: "hellfire",
            SkillAnimation: function SkillAnimation(target){
                var hellfire = game.add.sprite(Ash.chSprite.x+30,Ash.chSprite.y - 40,"hellfire");
                hellfire.scale.setTo(3);
                Ash.chSprite.animations.play("hellfire",6,false);
                moveToSkill(Ash,Hellfire,hellfire,target);
            }};
//****Kori****
var Ice = {Name:"Ice", Stats:{PhysAttack:0, MagAttack:20, MP:10},Description:"Ice Magic Attack", SkillType:"Attack", Element:"Ice", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                var ice1 = game.add.sprite(Kori.chSprite.x-30,Kori.chSprite.y,"icespikes");
                Kori.chSprite.animations.play("icespell",2,false);
                moveToSkill(Kori,Ice,ice1,target);
            }};
var Heal = {Name:"Heal", Stats:{MP:10},Description:"Heal 25% Max HP", SkillType:"Support", Element:"None", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                Kori.chSprite.animations.play("heal",2,false);
                var healAmount = Math.round(target.MaxStats.HP/4);
                target.Stats.HP += healAmount;
                if (target.Stats.HP > target.MaxStats.HP){
                    target.Stats.HP = target.MaxStats.HP;
                }
                healDisplay = game.add.sprite(target.chSprite.x-50,target.chSprite.y-60,"heal");
                healDisplay.lifespan = 1000;
            }};
var GlacialBarrier = {Name:"Glacial Barrier", Stats:{MP:15},Description:"Phys./Mag. Def. Buff", SkillType:"Support", Element:"Ice", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                Kori.chSprite.animations.play("heal",2,false);
                var GBPhysAmnt = Math.round(target.MaxStats.PhysDefense*0.1);
                var GBMagAmnt = Math.round(target.MaxStats.MagDefense*0.1);
                target.Stats.PhysDefense += GBPhysAmnt;
                target.Stats.MagDefense += GBMagAmnt;
                DefnsBuff = game.add.sprite(target.chSprite.x-20,target.chSprite.y-65,"defensebuff");
                DefnsBuff.scale.setTo(1.4);
                DefnsBuff.lifespan = 1000;
            }};
var Hailstorm = {Name:"Hailstorm", Stats:{PhysAttack:0, MagAttack:35, MP:25},Description:"Ice Magic AoE", SkillType:"Attack", Element:"Ice", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(target){
                Kori.chSprite.animations.play("icespell",2,false);
                var hailstorm = game.add.sprite(game.camera.x+400,game.camera.y+75,"hailstorm");
                hailstorm.scale.setTo(2);
                hailstorm.animations.add('act',[0,1,2,3]);
                hailstorm.animations.play('act',8,false)
                hailstorm.lifespan = 500;
                for (var i = 0; i < enemyInBattle.children.length; i++) {
                    makeSkillDamage(Kori,Hailstorm,enemyInBattle.children[i]);
                }
            }};
var Purify = {Name:"Purify", Stats:{MP:20},Description:"Heal Party 50% Max HP", SkillType:"Support", Element:"None", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(target){
                Kori.chSprite.animations.play("heal",2,false);
                for (var i = 0; i < Allies.length; i++){
                    var healAmount = Math.round(Allies[i].MaxStats.HP/2);
                    Allies[i].Stats.HP += healAmount;
                    if (Allies[i].Stats.HP > Allies[i].MaxStats.HP){
                        Allies[i].Stats.HP = Allies[i].MaxStats.HP;
                    }
                    healDisplay = game.add.sprite(Allies[i].chSprite.x-50,Allies[i].chSprite.y-60,"heal");
                    healDisplay.lifespan = 1000;
                }
            }};
var ArcticBlast = {Name:"Arctic Blast", Stats:{PhysAttack:0, MagAttack:50, MP:35},Description:"Ice Magic AoE", SkillType:"Attack", Element:"Ice", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(target){
                Kori.chSprite.animations.play("icespell",2,false);
                for (var i = 0; i < enemyInBattle.children.length; i++) {
                    var arcticblast = game.add.sprite(enemyInBattle.children[i].x,enemyInBattle.children[i].y-30,"arcticblast");
                    arcticblast.animations.add('act',[0,1,2,3]);
                    arcticblast.animations.play('act',8,false)
                    arcticblast.lifespan = 500;
                    makeSkillDamage(Kori,ArcticBlast,enemyInBattle.children[i]);
                }
                
            }};
//****ENEMY SKILLS****
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
var IceEnmy = {Name:"Ice", Stats:{PhysAttack:0, MagAttack:20, MP:10}, SkillType:"Attack", Element:"Ice", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(character,target){
                var ice1 = game.add.sprite(character.x-30,character.y,"icespikes");
                character.animations.play("icespell",2,false);
                moveToSkill(character,IceEnmy,ice1,target);
            }};
var HealEnmy = {Name:"Heal", Stats:{MP:15}, SkillType:"Support", Element:"None", AreaOfEffect:"Single",
            SkillAnimation: function SkillAnimation(character,target){
                character.animations.play("heal",2,false);
                console.log("healing");
                console.log(target);
                var healAmount = Math.round(target.MaxStats.HP/8);
                target.Stats.HP += healAmount;
                if (target.Stats.HP > target.MaxStats.HP){
                    target.Stats.HP = target.MaxStats.HP;
                }
                healDisplay = game.add.sprite(target.x-50,target.y-60,"heal");
                healDisplay.lifespan = 1000;
                game.add.tween(target.children[1].scale).to({x:target.barXScale*target.Stats.HP/target.MaxStats.HP},500,null,true);
            }};
var KnightFire = {Name:"Fire", Stats:{PhysAttack:0, MagAttack:40, MP:10}, SkillType:"Attack", Element:"Fire", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(character,target){
                character.animations.play("firespell",8,false);
                var knightfire = game.add.sprite(character.x,character.y-150,"knightfire");
                knightfire.anchor.setTo(1,0);
                knightfire.scale.setTo(2.5,2.5);
                knightfire.animations.add('act',[0,1,2,3,4]);
                knightfire.animations.play('act',5,false);
                moveToSkill(character,KnightFire,knightfire,target);
            }};
var KnightIce = {Name:"Ice", Stats:{PhysAttack:0, MagAttack:40, MP:10}, SkillType:"Attack", Element:"Ice", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(character,target){
                character.animations.play("icespell",8,false);
                var knightice = game.add.sprite(character.x-470,character.y-120,"knightice");
                knightice.scale.setTo(2.5,2.5);
                knightice.animations.add('act',[0,1,2,3]);
                knightice.animations.play('act',4,false);
                knightice.lifespan = 1200;
                for (var i = 0; i < Allies.length; i++){
                    makeSkillDamage(character,KnightIce,Allies[i]);
                }
            }};
var KnightStorm = {Name:"Storm", Stats:{PhysAttack:0, MagAttack:40, MP:10}, SkillType:"Attack", Element:"Ice", AreaOfEffect:"All",
            SkillAnimation: function SkillAnimation(character,target){
                character.animations.play("stormspell",8,false);
                var knightstorm = game.add.sprite(character.x,character.y-170,"knightstorm");
                knightstorm.anchor.setTo(1,0);
                knightstorm.scale.setTo(2.5,2.5);
                knightstorm.animations.add('act',[0,1,2,3]);
                knightstorm.animations.play('act',8,true);
                moveToSkill(character,KnightStorm,knightstorm,target);
            }};

//ITEM OBJECTS
var WoodSword = {Name:"Wood Sword", Stats:{PhysAttack:10, MagAttack:0}, WeapType:"Sword", Element:"None", Category:"Weapon"};
var WoodStaff = {Name:"Wood Staff", Stats:{PhysAttack:0, MagAttack:10}, WeapType:"Staff",Element:"None", Category:"Weapon"};
var ScorchingSword = {Name:"Scorching Sword", Stats:{PhysAttack:20, MagAttack:0}, WeapType:"Sword", Element:"Fire", Category:"Weapon"};
var FlameStaff = {Name:"Flame Staff", Stats:{PhysAttack:0, MagAttack:20}, WeapType:"Staff",Element:"Fire", Category:"Weapon"};
var FrozenSword = {Name:"Frozen Sword", Stats:{PhysAttack:20, MagAttack:0}, WeapType:"Sword", Element:"Ice", Category:"Weapon"};
var FrostStaff = {Name:"Frost Staff", Stats:{PhysAttack:0, MagAttack:20}, WeapType:"Staff",Element:"Ice", Category:"Weapon"};
var ThunderousSword = {Name:"Thunderous Sword", Stats:{PhysAttack:20, MagAttack:0}, WeapType:"Sword", Element:"Storm", Category:"Weapon"};
var CycloneStaff = {Name:"Cyclone Staff", Stats:{PhysAttack:0, MagAttack:20}, WeapType:"Staff",Element:"Storm", Category:"Weapon"};
var Excalibur = {Name:"Excalibur", Stats:{PhysAttack:60, MagAttack:0}, WeapType:"Sword", Element:"None", Category:"Weapon"};
var AncientStaff = {Name:"Ancient Staff", Stats:{PhysAttack:0, MagAttack:60}, WeapType:"Staff",Element:"None", Category:"Weapon"};
var Potion = {Name:"Small Potion",Description:"Restores 25% HP", Quantity: 2, Price: 10, imageKey:"smallHP", Category:"Item",
             Use: function Use(character){
                 Potion.Quantity -= 1;
                 character.Stats.HP += Math.round(character.MaxStats.HP/4);
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
var MediumPotion = {Name:"Medium Potion",Description:"Restores 50% HP", Quantity: 0, Price: 30, imageKey:"mediumHP", Category:"Item",
             Use: function Use(character){
                 MediumPotion.Quantity -= 1;
                 character.Stats.HP += Math.round(character.MaxStats.HP/2);
                 if (character.MaxStats.HP < character.Stats.HP){
                     character.Stats.HP = character.MaxStats.HP;
                 }
                 if (MediumPotion.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(MediumPotion),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(MediumPotion) == -1){
                     Inventory.Items.push(MediumPotion);
                 }
                 MediumPotion.Quantity += num;
             }};
var LargePotion = {Name:"Large Potion",Description:"Restores 100% HP", Quantity: 0, Price: 50, imageKey:"largeHP", Category:"Item",
             Use: function Use(character){
                 LargePotion.Quantity -= 1;
                 character.Stats.HP += character.MaxStats.HP;
                 if (character.MaxStats.HP < character.Stats.HP){
                     character.Stats.HP = character.MaxStats.HP;
                 }
                 if (LargePotion.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(LargePotion),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(LargePotion) == -1){
                     Inventory.Items.push(LargePotion);
                 }
                 LargePotion.Quantity += num;
             }};
var Ether = {Name:"Small Ether",Description:"Restores 25% MP", Quantity: 0, Price: 10, imageKey:"smallMP", Category:"Item",
             Use: function Use(character){
                 Ether.Quantity -= 1;
                 character.Stats.MP += Math.round(character.MaxStats.MP/4);
                 if (character.MaxStats.MP < character.Stats.MP){
                     character.Stats.MP = character.MaxStats.MP;
                 }
                 if (Ether.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(Ether),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(Ether) == -1){
                     Inventory.Items.push(Ether);
                 }
                 Ether.Quantity += num;
             }};
var MediumEther = {Name:"Medium Ether",Description:"Restores 50% MP", Quantity: 0, Price: 30, imageKey:"mediumMP", Category:"Item",
             Use: function Use(character){
                 MediumEther.Quantity -= 1;
                 character.Stats.MP += Math.round(character.MaxStats.MP/2);
                 if (character.MaxStats.MP < character.Stats.MP){
                     character.Stats.MP = character.MaxStats.MP;
                 }
                 if (MediumEther.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(MediumEther),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(MediumEther) == -1){
                     Inventory.Items.push(MediumEther);
                 }
                 MediumEther.Quantity += num;
             }};
var LargeEther = {Name:"Large Ether",Description:"Restores 100% MP", Quantity: 0, Price: 50, imageKey:"largeMP", Category:"Item",
             Use: function Use(character){
                 LargeEther.Quantity -= 1;
                 character.Stats.MP += character.MaxStats.MP;
                 if (character.MaxStats.MP < character.Stats.MP){
                     character.Stats.MP = character.MaxStats.MP;
                 }
                 if (LargeEther.Quantity == 0){
                     Inventory.Items.splice(Inventory.Items.indexOf(LargeEther),1);
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(LargeEther) == -1){
                     Inventory.Items.push(LargeEther);
                 }
                 LargeEther.Quantity += num;
             }};
var Revitalizer = {Name:"Revitalizer",Description:"Revive with 25% HP", Quantity: 0, Price: 30, imageKey:"smallRevitalizer", Category:"Item",
             Use: function Use(character){
                 if (character.Stats.HP <= 0){
                     Revitalizer.Quantity -= 1;
                     character.Stats.HP += Math.round(character.MaxStats.HP/4);
                     if (character.MaxStats.HP < character.Stats.HP){
                         character.Stats.HP = character.MaxStats.HP;
                     }
                     if (Revitalizer.Quantity == 0){
                         Inventory.Items.splice(Inventory.Items.indexOf(Revitalizer),1);
                     }
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(Revitalizer) == -1){
                     Inventory.Items.push(Revitalizer);
                 }
                 Revitalizer.Quantity += num;
             }};
var MediumRevitalizer = {Name:"Medium Revitalizer",Description:"Revive with 50% HP", Quantity: 0, Price: 50, imageKey:"mediumRevitalizer", Category:"Item",
             Use: function Use(character){
                 if (character.Stats.HP <= 0){
                     MediumRevitalizer.Quantity -= 1;
                     character.Stats.HP += Math.round(character.MaxStats.HP/2);
                     if (character.MaxStats.HP < character.Stats.HP){
                         character.Stats.HP = character.MaxStats.HP;
                     }
                     if (MediumRevitalizer.Quantity == 0){
                         Inventory.Items.splice(Inventory.Items.indexOf(MediumRevitalizer),1);
                     }
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(MediumRevitalizer) == -1){
                     Inventory.Items.push(MediumRevitalizer);
                 }
                 MediumRevitalizer.Quantity += num;
             }};
var LargeRevitalizer = {Name:"Large Revitalizer",Description:"Revive with 100% HP", Quantity: 0, Price: 100, imageKey:"largeRevitalizer", Category:"Item",
             Use: function Use(character){
                 if (character.Stats.HP <= 0){
                     LargeRevitalizer.Quantity -= 1;
                     character.Stats.HP += character.MaxStats.HP;
                     if (character.MaxStats.HP < character.Stats.HP){
                         character.Stats.HP = character.MaxStats.HP;
                     }
                     if (LargeRevitalizer.Quantity == 0){
                         Inventory.Items.splice(Inventory.Items.indexOf(LargeRevitalizer),1);
                     }
                 }
             },
             Add: function Add(num){
                 if (Inventory.Items.indexOf(LargeRevitalizer) == -1){
                     Inventory.Items.push(LargeRevitalizer);
                 }
                 LargeRevitalizer.Quantity += num;
             }};
var itemList = [Potion,Ether,Revitalizer,MediumPotion,MediumEther,MediumRevitalizer,LargePotion,LargeEther,LargeRevitalizer];
var droppedItems = [0,0,0,0,0,0,0,0,0];
var Inventory = {
    Weapons : [WoodSword],
    Items : [Potion],
    Coins : 0
}
//CHARACTER OBJECTS
var Ash = {
    Name : "Ash",
    PortraitKey : "ashportrait1",
    Stats : {HP:200, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Speed:20,MP:20},
    MaxStats : {HP:200, PhysAttack:50,PhysDefense:30,MagAttack:10,MagDefense:15,Speed:20,MP:20},
    Element: "Fire",
    UpdtStats : function UpdtStats(){
        Ash.MaxStats.HP += Math.round(Math.random()*(105-100)+100);
        Ash.MaxStats.PhysAttack += Math.round(Math.random()*(10-8)+8);
        Ash.MaxStats.PhysDefense += Math.round(Math.random()*(8-5)+5);
        Ash.MaxStats.MagAttack += Math.round(Math.random()*(4-2)+2);
        Ash.MaxStats.MagDefense += Math.round(Math.random()*(5-3)+3);
        Ash.MaxStats.Speed += Math.round(Math.random()*(6-4)+4);
        Ash.MaxStats.MP += Math.round(Math.random()*(10-5)+5);
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
    SkillLvl : [5,8,11,15,17],
    SkillsLearned : [Slash,Fireball/*,Ignite,FireSlash,BladeBlitz,Explosion,Hellfire*/],
    SkillsToLearn : [Ignite,FireSlash,BladeBlitz,Explosion,Hellfire],
    Weapon : WoodSword
};

var Kori = {
    Name : "Kori",
    PortraitKey : "koriportrait1",
    Element: "Ice",
    Stats : {HP:150, PhysAttack:5,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:25},
    MaxStats : {HP:150, PhysAttack:5,PhysDefense:15,MagAttack:50,MagDefense:30,Speed:25,MP:25},
    UpdtStats : function UpdtStats(){
        Kori.MaxStats.HP += Math.round(Math.random()*(90-80)+80);
        Kori.MaxStats.PhysAttack += Math.round(Math.random()*(4-2)+2);
        Kori.MaxStats.PhysDefense += Math.round(Math.random()*(5-3)+3);
        Kori.MaxStats.MagAttack += Math.round(Math.random()*(10-8)+8);
        Kori.MaxStats.MagDefense += Math.round(Math.random()*(8-5)+5);
        Kori.MaxStats.Speed += Math.round(Math.random()*(7-5)+5);
        Kori.MaxStats.MP += Math.round(Math.random()*(15-10)+10);
        for (var i in Kori.MaxStats){
            Kori.Stats[i] = Kori.MaxStats[i];
        }
    },
    Lvl : 1,
    currentHPRatio : 1,
    currentMPRatio : 1,
    HPRatio: function(){return Kori.Stats.HP/Kori.MaxStats.HP},
    MPRatio: function(){return Kori.Stats.MP/Kori.MaxStats.MP},
    XPObtained : 1210,
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
    SkillLvl: [8,10,13/*,16*/],
    SkillsLearned : [Ice,Heal/*,GlacialBarrier,Hailstorm,Purify,ArcticBlast*/],
    SkillsToLearn : [GlacialBarrier,Hailstorm,Purify/*,ArcticBlast*/],
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
    enemyObject.Stats = {HP:10+15*level, PhysAttack:3+3*level, PhysDefense:1+2*level, MagAttack:1+15*level, MagDefense:1+5*level, Speed:1+5*level, MP:3+15*level};
    enemyObject.MaxStats = {HP:10+15*level, PhysAttack:3+3*level, PhysDefense:1+2*level, MagAttack:1+15*level, MagDefense:1+5*level, Speed:1+5*level, MP:3+15*level};
    enemyObject.Level = level;
    enemyObject.XP = level*8;
    enemyObject.Coins = level*15;
    enemyObject.Element = "Ice";
    enemyObject.SkillsLearned = [IceSpikes];
}

function Flasher(enemyObject,level) {
    enemyObject.Stats = {HP:10+15*level, PhysAttack:3+1*level, PhysDefense:1+40*level, MagAttack:1+15*level, MagDefense:1+2*level, Speed:1+15*level, MP:3+15*level};
    enemyObject.MaxStats = {HP:10+15*level, PhysAttack:3+1*level, PhysDefense:1+40*level, MagAttack:1+15*level, MagDefense:1+2*level, Speed:1+15*level, MP:3+15*level};
    enemyObject.Level = level;
    enemyObject.XP = level*10;
    enemyObject.Coins = level*15;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [ShadowBeam];
}

function Swampboss(enemyObject,level) {
    enemyObject.Stats = {HP:10+40*level, PhysAttack:3+20*level, PhysDefense:1+5*level, MagAttack:1+20*level, MagDefense:1+6*level, Speed:1+5*level, MP:3+20*level};
    enemyObject.MaxStats = {HP:10+40*level, PhysAttack:3+20*level, PhysDefense:1+3*level, MagAttack:1+20*level, MagDefense:1+6*level, Speed:1+5*level, MP:3+20*level};
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
    enemyObject.Stats = {HP:150+80*level, PhysAttack:5+2*level,PhysDefense:15+3*level,MagAttack:50+12*level,MagDefense:30+5*level,Speed:25+5*level,MP:10+20*level};
    enemyObject.MaxStats = {HP:150+80*level, PhysAttack:5+2*level,PhysDefense:15+3*level,MagAttack:50+12*level,MagDefense:30+5*level,Speed:25+5*level,MP:10+20*level};
    enemyObject.Level = level;
    enemyObject.XP = level*40;
    enemyObject.Coins = level*40;
    enemyObject.Element = "Ice";
    enemyObject.SkillsLearned = [IceEnmy,HealEnmy];
}

function Snek(enemyObject,level) {
    enemyObject.Stats = {HP:10+25*level, PhysAttack:3+10*level, PhysDefense:3+5*level, MagAttack:1+2*level, MagDefense:1+5*level, Speed:1+20*level, MP:3+10*level};
    enemyObject.MaxStats = {HP:10+25*level, PhysAttack:3+10*level, PhysDefense:3+5*level, MagAttack:1+2*level, MagDefense:1+5*level, Speed:1+20*level, MP:3+10*level};
    enemyObject.Level = level;
    enemyObject.XP = level*30;
    enemyObject.Coins = level*25;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [];
}

function Jester(enemyObject,level) {
    enemyObject.Stats = {HP:100+35*level, PhysAttack:50+15*level, PhysDefense:1+3*level, MagAttack:50+15*level, MagDefense:1+3*level, Speed:1+10*level, MP:3+30*level};
    enemyObject.MaxStats = {HP:100+35*level, PhysAttack:50+15*level, PhysDefense:1+3*level, MagAttack:50+15*level, MagDefense:1+3*level, Speed:1+10*level, MP:3+30*level};
    enemyObject.Level = level;
    enemyObject.XP = level*40;
    enemyObject.Coins = level*35;
    enemyObject.Element = "Fire";
    enemyObject.SkillsLearned = [];
}

function Skeleton(enemyObject,level) {
    enemyObject.Stats = {HP:10+25*level, PhysAttack:3+15*level, PhysDefense:1+2*level, MagAttack:1+2*level, MagDefense:1+2*level, Speed:1+15*level, MP:3+10*level};
    enemyObject.MaxStats = {HP:10+25*level, PhysAttack:3+15*level, PhysDefense:1+2*level, MagAttack:1+2*level, MagDefense:1+2*level, Speed:1+15*level, MP:3+10*level};
    enemyObject.Level = level;
    enemyObject.XP = level*20;
    enemyObject.Coins = level*25;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [];
}

function Knight(enemyObject,level) {
    enemyObject.Stats = {HP:170+90*level, PhysAttack:50+8*level,PhysDefense:30+5*level,MagAttack:50+8*level,MagDefense:30+5*level,Speed:25+5*level,MP:100+50*level};
    enemyObject.MaxStats = {HP:170+90*level, PhysAttack:50+8*level,PhysDefense:30+5*level,MagAttack:50+8*level,MagDefense:30+5*level,Speed:25+5*level,MP:100+50*level};
    enemyObject.Level = level;
    enemyObject.XP = level*80;
    enemyObject.Coins = level*80;
    enemyObject.Element = "None";
    enemyObject.SkillsLearned = [KnightFire,KnightIce,KnightStorm];
}
/*WebFontConfig= {
    google: {families: ['Press Start 2P']}
};*/
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        //game.load.script('webfont','//fonts.googleapis.com/css?family=Press+Start+2P')
        game.load.image('logo', 'assets/backgrounds/first screen.png');
        game.load.image('title', 'assets/backgrounds/title.png');
        game.load.spritesheet('rain','assets/sprites/rain.png', 10, 17);
        
        //background music
        game.load.audio('logo', ['assets/audio/logo.wav']);
        game.load.audio('title', ['assets/audio/title.wav']);
        
    },
    create: function(){
        game.add.sprite(0, 0, 'title');
        console.log('state0');
        
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //plays background music
        music = game.add.audio('logo');
        music.play('', 0, 1, false);
        
        var logo = game.add.sprite(0, 0, "logo");
        /*logo.scale.setTo(1.5);
        logo.anchor.setTo(0.5,0.5);
        team = game.add.sprite(centerX,centerY+100,"team name");
        team.scale.setTo(1.2);
        team.anchor.setTo(0.5,0.5);*/
        
        //text = "8-bitz Studioz"
        //game.add.text(450,550, text, {fontSize: '100px', fill: '#ffffff', font: 'Press Start 2P' });
        
        game.time.events.add(Phaser.Timer.SECOND * 2, fadeLogo, this);    

        function fadeLogo(){
            game.add.tween(logo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }

        game.time.events.add(Phaser.Timer.SECOND * 4, removeTween, this);

        function removeTween(){
            logo.kill();
            music.destroy();
            music = game.add.audio('title');
            music.play('', 0, 1, true);
            var emitter = game.add.emitter(200, -200, 80);
            emitter.width = 600;
            emitter.angle = 10;
            emitter.makeParticles('rain');
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 5);
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.start(false, 1000, 5, 0);
            addChangeStateEventListeners();
        }
        
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
    addKeyCallback(Phaser.Keyboard.ENTER, changeState, 'cutscene1');
}