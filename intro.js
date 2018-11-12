preload: function(){
        game.load.image('logo', 'assets/sprites/first screen.png');
        game.load.image('title', 'assets/backgrounds/title.png');
    },

    create: function(){
        game.add.sprite(0, 0, 'title');
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 800, 600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var logo = game.add.sprite(0, 0, "logo");
        /*logo.scale.setTo(1.5);
        logo.anchor.setTo(0.5,0.5);
        team = game.add.sprite(centerX,centerY+100,"team name");
        team.scale.setTo(1.2);
        team.anchor.setTo(0.5,0.5);*/
        
        game.time.events.add(Phaser.Timer.SECOND * 2, fadeLogo, this);
        
        function fadeLogo(){
            
            game.add.tween(logo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }
        
        game.time.events.add(Phaser.Timer.SECOND * 4, removeTween, this);
        
        function removeTween(){
            
            logo.kill();
            
        }