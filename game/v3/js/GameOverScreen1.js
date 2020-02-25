TheWalkingLady.GameOverScreen = function (game) {};

var restartButton;
var quitButton;
var scoreText;

TheWalkingLady.GameOverScreen.prototype = {
	create: function () {
		//  Set the screen's background
		this.add.sprite(0, 0, 'gameOverScreen');
		
		//  Stop the game music
		backgroundSongs.stop('gameMusic');
		//  Set the variable so we can check it later
		gameMusicIsPlaying = false;
		//  Play game over sound
		soundEffects = this.add.sound('soundEffects');
		soundEffects.addMarker('gameOver', .72, 3.6, 1, false);
		soundEffects.play('gameOver');
		
		//  Add the restart button
		restartButton = this.add.button(100, 320, 'buttonAtlas', restart, this, 'btn_Restart_Hover', 'btn_Restart');
		restartButton.frameName = 'btn_Restart';
		function restart() {
			//  Reset variables
			score = 0;
			speedNumber = 2;
			lives = 3;
			randArrayNumber = 2;
			//  Cut off the sound effect if it's still playing
			soundEffects.stop('gameOver');
			//  Restart the game
			this.state.start('Game');
		}
		
		
		scoreText = this.add.text(30, 150, score);
		scoreText.font = 'monospace';
		scoreText.fontSize = 100;
		scoreText.fill = '#eab22a'
	}
};
