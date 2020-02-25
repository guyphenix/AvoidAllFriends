var TheWalkingLady = {};

TheWalkingLady.Boot = function (game) {

};

TheWalkingLady.Boot.prototype = {
    init: function () {
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. I didn't disable it.
        this.stage.disableVisibilityChange = false;
    },
    preload: function () {
        //  Here we load the assets required for our preloader.
		this.load.image('preloaderBar', 'assets/backgrounds/load_LoadingBar.png');
		this.load.image('preloaderBackground', 'assets/backgrounds/load_LoadingScreen.png');
    },
    create: function () {
        //  Start the preloader
        this.state.start('Preloader');
    }
};
