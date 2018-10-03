var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('0', demo.state0);
game.state.add('graveyard', demo.state1);
game.state.start('0');