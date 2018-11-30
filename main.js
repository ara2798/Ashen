var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('0', demo.state0);
game.state.add('graveyard', demo.state1);
game.state.add('lake', demo.state2);
game.state.add('forest', demo.state3);
game.state.add('cave', demo.state4);
game.state.add('castle', demo.state5);
game.state.add('castlebossroom', demo.state6);
game.state.add('cutscene1', demo.state997);
game.state.add('Overworld', demo.state998);
game.state.add('GameOver', demo.state999);
game.state.start('0');