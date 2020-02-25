
TheWalkingLady.Game = function (game) {};

//  Set up our variables
var score = 0;
var scoreText;
var faller;
var soundEffects;
var gameMusicIsPlaying = false;
var powerup;
//  speedNumber controls the walk speed. 1 = slow, 2 = normal, 3 = fast.
var speedNumber = 2;
var powerupSpawnInterval = [8000, 9000, 13000];
var badItemSpawnInterval = [6000, 11000, 15000];
var itemSpawnInterval = [90, 120, 250];
var randArrayNumber = 2;
var lives = 3;
var heart1;
var heart2;
var heart3;
var pauseButton;
var paused = false;
var quitBtn;
var resumeBtn;
var restartBtn;
var itemSpawner;
var powerupSpawner;
var badItemSpawner;
var scoreHolder;

function collectItem(lady, item) {
//  Take away a life
	lives -= 1;
	//  Destroy the item
	item.kill();
	//  Check to see if player is dead
	if (lives === 0) {
		//  Start the game over state
		soundEffects = this.add.audio('soundEffects');
		soundEffects.addMarker('lifeLost', 4.42, .1, 1, false);
		soundEffects.play('lifeLost');
		this.state.start('GameOverScreen', true);
	}
	if (lives === 2) {
		//  Take away a heart
		heart3.destroy();
		soundEffects = this.add.audio('soundEffects');
		soundEffects.addMarker('lifeLost', 4.42, .1, 1, false);
		soundEffects.play('lifeLost');
	}
	if (lives === 1) {
		//  Take away a heart
		heart2.destroy();
		soundEffects = this.add.audio('soundEffects');
		soundEffects.addMarker('lifeLost', 4.42, .1, 1, false);
		soundEffects.play('lifeLost');
	}
	
}

function createFaller() {
	//  Set up an array with all the different types of items we're going to choose from
	//  Add the item at a random position
	faller = this.add.sprite(Math.floor(Math.random() * 889), -50, 'spriteAtlas');
	var itemsArray = ['spr_BagOfFlour', 'spr_Cupcake', 'spr_Donut', 'spr_Muffin', 'spr_Pretzel', 'spr_Roll'];
	faller.frameName = itemsArray[Math.floor(Math.random() * 6)];
	
	//  Start physics on the item
	this.physics.enable(faller, Phaser.Physics.ARCADE);
	//  Add the item to the 'items' group
	items.add(faller);
	//  Set the gravity for the item
	faller.body.gravity.y = 100 + score;
	//  Randomize the interval
	randArrayNumber = Math.floor(Math.random() * 2);
	//  Set the scale and smoothing
	faller.scale.setTo(2, 2);
	faller.smoothed = false;
}

function createPowerup() {
	//  Add the powerup at a random position
	powerup = this.add.sprite(Math.floor(Math.random() * 899), -50, 'spriteAtlas');
	powerup.frameName = ['spr_Powerup', 'spr_BagOfFlour', 'spr_Cupcake', 'spr_Donut', 'spr_Muffin', 'spr_Pretzel', 'spr_Roll'];
	//  Start physics on the item
	this.physics.enable(powerup, Phaser.Physics.ARCADE);
	//  Add the item to the powerupGroup group
	powerupGroup.add(powerup);
	//  Set the gravity for the item
	powerup.body.gravity.y = 300;
	//  Randomize the interval
	randArrayNumber = Math.floor(Math.random() * 2);
	powerup.scale.setTo(2, 2);
	powerup.smoothed = false;
}

function createBadItem() {
	//  Add the bad item at a random positon
	badItem = this.add.sprite(Math.floor(Math.random() * 899), -50, 'spriteAtlas');
	badItem.frameName = ['spr_BadItem', 'spr_BagOfFlour', 'spr_Cupcake', 'spr_Donut', 'spr_Muffin', 'spr_Pretzel', 'spr_Roll'];
	//  Start physics on it
	this.physics.enable(badItem, Phaser.Physics.ARCADE);
	//  Add the item to the badItemGroup group
	badItemGroup.add(badItem);
	//  Set the gravity for the item
	badItem.body.gravity.y = 300;
	//  Randomize the interval
	randArrayNumber = Math.floor(Math.random() * 2);
	badItem.scale.setTo(2, 2);
	badItem.smoothed = false;
}

function checkLives(floor, item) {
	//  Play a sound
	soundEffects = this.add.audio('soundEffects');
	soundEffects.addMarker('collectItem', .42, .2, 1, false);
	soundEffects.play('collectItem');
	//  Destroy the item
	item.kill();
	//  Add 10 the the score
	score += 10;
	//  Update the score counter in the upper left
	scoreText.text = score;
	//  Update the gravity
	faller.body.gravity.y = 100 + score;
}

function pauseGame() {
	//  Check if the game is paused or not
	if (paused === false) {
		//  Pause the physics engine
		this.physics.arcade.isPaused = true;
		//  Add the resume button
		resumeBtn = this.add.button(100, 150, 'buttonAtlas', resumeGame, this, 'btn_Resume_Hover', 'btn_Resume');
		resumeBtn.frameName = 'btn_Resume';
		//  Add the restart button
		restartBtn = this.add.button(100, 235, 'buttonAtlas', restartGame, this, 'btn_Restart_Hover', 'btn_Restart');
		restartBtn.frameName = 'btn_Restart';
		//  Add the quit button
		quitBtn = this.add.button(100, 320, 'buttonAtlas', quitGame, this, 'btn_Quit_Hover', 'btn_Quit');
		quitBtn.frameName = 'btn_Quit';
		//  Stop animations
		lady.animations.stop();
		lady.frame = 7;
		//  Pause the timers
		itemSpawner.pause();
		powerupSpawner.pause();
		badItemSpawner.pause();
		//  Set the variable
		paused = true;
	} else {
		//  Destroy the buttons
		resumeBtn.destroy();
		restartBtn.destroy();
		quitBtn.destroy();
		//  Unpause the physics
		this.physics.arcade.isPaused = false;
		//  Unpause the timers
		itemSpawner.resume();
		powerupSpawner.resume();
		badItemSpawner.resume();
		//  Set the variable
		paused = false;
	}
}
function resumeGame() {
	//  Destroy the buttons
	resumeBtn.destroy();
	restartBtn.destroy();
	quitBtn.destroy();
	//  Unpause the physics
	this.physics.arcade.isPaused = false;
	//  Unpause the timers
	itemSpawner.resume();
	powerupSpawner.resume();
	badItemSpawner.resume();
	//  Set the variable
	paused = false;
}

function restartGame() {
	//  Reset variables
	score = 0;
	speedNumber = 2;
	lives = 3;
	randArrayNumber = 2;
	//  Restart the game
	this.state.start('Game');
	//  Set the variable
	paused = false;
}

function quitGame() {
	//  Reset variables
	score = 0;
	speedNumber = 2;
	lives = 3;
	randArrayNumber = 2;
	//  Stop the game music
	backgroundSongs.stop('gameMusic');
	gameMusicIsPlaying = false;
	//  Play the main menu music on a loop
	backgroundSongs = this.add.audio('backgroundMusic');
	backgroundSongs.addMarker('menuMusic', 0, 188.09, 1, true);
	backgroundSongs.play('menuMusic');
	//  Set the variable so we can check it later
	menuMusicIsPlaying = true;
	//  Go to the main menu
	this.state.start('MainMenu');
	//  Set the variable
	paused = false;
}

TheWalkingLady.Game.prototype = {
	create: function () {
		//  Set the screen's background
		this.add.sprite(0, 0, 'gameScreen');
		
		//  Start the physics system
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		//  Add the floor
		floor = this.add.sprite(0, this.world.height - 32, 'floor');
		//  Enable physics on it
		this.physics.arcade.enable(floor);
		//  Make the floor a static object so it doesn't fall when the lady is on it
		floor.body.immovable = true;
		//  Double the floor size and keep it pixel-y
		floor.scale.setTo(2, 2);
		floor.smoothed = false;

		//  Add the lady
		lady = this.add.sprite(this.world.width / 2, this.world.height - 94, 'lady');
		lady.anchor.set(0.5, 0);
		//  Make her twice as big
		lady.scale.setTo(2, 2);
		//  Turn off smoothing so the pixel art looks nice
		lady.smoothed = false;
		//  Setup physics for the lady
		this.physics.arcade.enable(lady);
		lady.body.gravity.y = 300;
		lady.body.collideWorldBounds = true;
		//  Add her animations
		lady.animations.add('left', [10, 9, 11, 9], 7, true);
		lady.animations.add('right', [4, 5, 3], 7, true);

		//  Create a group for all the falling items
		items = this.add.group();
		//  Enable physics on them
		items.enableBody = true;
		
		//  Create a group for all the powerups
		powerupGroup = this.add.group();
		//  Enable physics on them
		powerupGroup.enableBody = true;
		
		//  Create a group for all the bad items
		badItemGroup = this.add.group();
		//  Enable physics on them
		badItemGroup.enableBody = true;

		//  Add the scoreholder
		scoreHolder = this.add.sprite(3, 3, 'scoreHolder');
		scoreHolder.scale.setTo(2);
		scoreHolder.smoothed = false;
		//  Add the score text in the upper left
		scoreText = this.add.text(80, 10, '0', {fontSize: '14px', fill: '#f0b411'});
				
		//  Add the main item spawn timer. This runs the createFaller function every 2 seconds. It only repeats 1000 times,
		//  which should be more than enough. The player should lose before it reaches 1000.
		itemSpawner = this.time.create(false);
		itemSpawner.loop(itemSpawnInterval[randArrayNumber], createFaller, this);
		itemSpawner.start();
		
		//  Add the powerup item spawn timer. It runs the createPowerup function every once in a while.
		powerupSpawner = this.time.create(false);
		powerupSpawner.loop(powerupSpawnInterval[randArrayNumber], createPowerup, this)
		powerupSpawner.start();

		//  Add the bad item spawn timer. It runs the createBadItem function every once in a while.
		badItemSpawner = this.time.create(false);
		badItemSpawner.loop(badItemSpawnInterval[randArrayNumber], createBadItem, this)
		badItemSpawner.start();
			
		//  Render Hearts
		heart1 = this.add.sprite(154, 5, 'spriteAtlas');
		heart1.frameName = 'spr_Heart';
		heart1.scale.setTo(2, 2);
		heart1.smoothed = false;
		heart2 = this.add.sprite(184, 5, 'spriteAtlas');
		heart2.frameName = 'spr_Heart';
		heart2.scale.setTo(2, 2);
		heart2.smoothed = false;
		heart3 = this.add.sprite(214, 5, 'spriteAtlas');
		heart3.frameName = 'spr_Heart';
		heart3.scale.setTo(2, 2);
		heart3.smoothed = false;
		
		//  Add pause button
		pauseButton = this.add.button(374, 10, 'buttonAtlas', pauseGame, this);
		pauseButton.frameName = 'btn_Pause';
	},
	
	update: function () {
		//  Reset the lady's movement
		lady.body.velocity.x = 0;
		
		if (paused === false) {
			//  Key events
			cursors = this.input.keyboard.createCursorKeys();
			//  Check the speed number
			switch (speedNumber) {
			case 1:
				//  Slow speed controls
				if (cursors.left.isDown) {
					lady.body.velocity.x = -50;
					lady.animations.play('left');
				} else if (cursors.right.isDown) {
					lady.body.velocity.x = 50;
					lady.animations.play('right');
				} else {
					lady.animations.stop();
					lady.frame = 7;
				}
				break;
			case 2:
				//  Normal speed controls
				if (cursors.left.isDown) {
					lady.body.velocity.x = -200;
					lady.animations.play('left');
				} else if (cursors.right.isDown) {
					lady.body.velocity.x = 200;
					lady.animations.play('right');
				} else {
					lady.animations.stop();
					lady.frame = 7;
				}
				break;
			case 3:
				//  Fast speed controls
				if (cursors.left.isDown) {
					lady.body.velocity.x = -400;
					lady.animations.play('left');
				} else if (cursors.right.isDown) {
					lady.body.velocity.x = 400;
					lady.animations.play('right');
				} else {
					lady.animations.stop();
					lady.frame = 7;
				}
				break;
			}
		}
		
		//  Collision checking
		//  Run the collectItem function when the lady catches an item
		this.physics.arcade.overlap(lady, items, collectItem, null, this);
		
		//  Run the checkLives runction when an item touches the floor
		this.physics.arcade.collide(items, floor, checkLives, null, this);
		
		//  Run this function when a powerup touches the floor
		this.physics.arcade.overlap(powerupGroup, floor, function (floor, powerupOnGround) {
			//  Destroy the powerup
			powerupOnGround.kill();
		}, null, this);
		
		//  Run this function when the lady catches a powerup
		this.physics.arcade.overlap(powerupGroup, lady, function (lady, powerupCaught) {
			//  Destroy the powerup
			powerupCaught.kill();
			//  Play the powerup sound
			soundEffects = this.add.audio('soundEffects');
			soundEffects.addMarker('powerupSound', 4.62, .1, 1, false);
			soundEffects.play('powerupSound');
			//  Increase the speed
			speedNumber = 3;
			//  Wait 6 seconds, then reset the speed back to normal
			this.time.events.add(Phaser.Timer.SECOND * 6, function () {
				speedNumber = 2;
			}, this);
		}, null, this);
		
		//  Run this function when a bad item touches the floor
		this.physics.arcade.overlap(badItemGroup, floor, function (floor, badItemOnGround) {
			//  Destroy the bad item
			badItemOnGround.kill();
		}, null, this);
		
		//  Run this function when the lady catches a bad item
		this.physics.arcade.overlap(badItemGroup, lady, function (lady, badItemCaught) {
			//  Destroy the bad item
			badItemCaught.kill();
			//  Play the bad item sound
			soundEffects = this.add.audio('soundEffects');
			soundEffects.addMarker('badItemSound', 0, .3, 1, false);
			soundEffects.play('badItemSound');
			//  Decrease the speed
			speedNumber = 1;
			//  Wait 6 seconds, then reset the speed back to normal
			this.time.events.add(Phaser.Timer.SECOND * 6, function () {
				speedNumber = 2;
			}, this);
		}, null, this);

		//  Make the lady and the floor collide
		this.physics.arcade.collide(lady, floor);
		
		//  Check if music isn't already playing
		if (gameMusicIsPlaying === false) {
			// Play the music on a loop
			backgroundSongs = this.add.audio('backgroundMusic');
			backgroundSongs.addMarker('gameMusic', 189, 207.7, 1, true);
			backgroundSongs.play('gameMusic');
			//  Set the variable so we can check it later
			gameMusicIsPlaying = true;
		}
    }
};
