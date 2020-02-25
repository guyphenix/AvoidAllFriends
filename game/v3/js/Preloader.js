
TheWalkingLady.Preloader = function (game) {
	this.ready = false;
};

TheWalkingLady.Preloader.prototype = {
	preload: function () {
		//	Set preloader bar stuff
		this.preloaderBackground = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(100, 200, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		
		//  Load sprites
		this.load.spritesheet('lady', 'assets/sprites/sh_Lady.png', 20, 31);
		this.load.image('floor', 'assets/sprites/spr_Floor.png');
		this.load.atlasJSONHash('spriteAtlas', 'assets/sprites/SpritesSpritesheet.png', 'assets/sprites/SpritesSpritesheet.json');
		this.load.image('scoreHolder', 'assets/sprites/scoreBox.png');
		
		// Load buttons
		this.load.atlasJSONHash('buttonAtlas', 'assets/sprites/ButtonSpritesheet.png', 'assets/sprites/ButtonSpritesheet.json');
		
		//  Load Backgrounds
		this.load.image('creditsMenu', 'assets/backgrounds/bkgd_CreditsMenu.png');
		this.load.image('howToPlayMenu', 'assets/backgrounds/bkgd_HowToPlayMenu.png');
		this.load.image('mainMenu', 'assets/backgrounds/bkgd_MainMenu.png');
		this.load.image('gameScreen', 'assets/backgrounds/bkgd_GameScreen.png');
		this.load.image('gameOverScreen', 'assets/backgrounds/bkgd_GameOver.png');
		
		//  Load music/sound effects
		this.load.audio('backgroundMusic', 'assets/audio/phenix_2.wav', 'assets/audio/phenix_2.wav');
		this.load.audio('soundEffects', 'assets/audio/soundEffects.ogg', 'assets/audio/soundEffects.mp3');
	},

	create: function () {
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes.
		//this.preloadBar.cropEnabled = false;
	},

	update: function () {
		//	Basically this will wait for our audio file to be decoded before proceeding to the MainMenu.
		if (this.cache.isSoundDecoded('backgroundMusic') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
