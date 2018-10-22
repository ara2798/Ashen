var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('0', demo.state0);
game.state.add('graveyard', demo.state1);
game.state.add('lake', demo.state2);
game.state.add('Overworld', demo.state998);
game.state.add('GameOver', demo.state999);
game.state.start('0');