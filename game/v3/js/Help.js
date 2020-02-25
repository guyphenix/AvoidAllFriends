TheWalkingLady.Help = function (game) {};

var howToPlayBackground;

function gotoMenu() {
	//  Start the MainMenu state
	this.state.start('MainMenu');
}

TheWalkingLady.Help.prototype = {
	create: function () {
		//  Set the screen background
		howToPlayBackground = this.add.sprite(0, 0, 'howToPlayMenu');
		
		//  Add the back button
		var backButton = this.add.button(100, 410, 'buttonAtlas', gotoMenu, this, 'btn_Back_Hover', 'btn_Back');
		backButton.frameName = 'btn_Back';
	}
};
