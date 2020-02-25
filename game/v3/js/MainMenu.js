TheWalkingLady.MainMenu = function (game) {};

//  Set variables that need to be used
var menuBkgd
var play;
var help;
var about;
var menuMusicIsPlaying = false;
var muted = false;

TheWalkingLady.MainMenu.prototype = {
	create: function () {
		//  Set the screen's background
		menuBkgd = this.add.sprite(0, 0, 'mainMenu');
		
		//  Add play button
		play = this.add.button(10, 230, 'buttonAtlas', startGame, this, 'btn_Play_Hover', 'btn_Play');
		play.frameName = 'btn_Play';
		function startGame() {
			//  Switch to the game state and stop the MainMenu music
			this.state.start('Game');
			backgroundSongs.stop('menuMusic');
		}
		
		//  Add how to play button
		help = this.add.button(10, 335, 'buttonAtlas', helpPlayer, this, 'btn_HowToPlay_Hover', 'btn_HowToPlay');
		help.frameName = 'btn_HowToPlay';
		function helpPlayer() {
			//  Switch to the help state
			this.state.start('Help');
		}
		
		
		//  Add credits button
		about = this.add.button(10, 415, 'buttonAtlas', showCreds, this, 'btn_Credits_Hover', 'btn_Credits');
		about.frameName = 'btn_Credits';
		function showCreds() {
			//  Switch to the about state
			this.state.start('About');
		}
	},
	
	update: function() {
		//  Check if music is playing
		if (menuMusicIsPlaying === false) {
			//  If it isn't, play the music on a loop
			backgroundSongs = this.add.audio('backgroundMusic');
			backgroundSongs.addMarker('menuMusic', 0, 188.09, 1, true);
			backgroundSongs.play('menuMusic');
			//  And set the variable to true so later we can check if it's playing
			menuMusicIsPlaying = true;
		}
	}
};
