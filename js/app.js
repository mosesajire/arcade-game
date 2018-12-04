// This section defines the enemies our player must avoid
let Enemy = function(x, y, p) {

    // horizontal position of enemy
    this.x = x;

    // vertical position of enemy
    this.y = y;

    // pace of movement of enemy
    this.p = p;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // This ensures that the game runs at the same pace on different computers
    this.x += this.p * dt;

    // This resets the position of the enemy once it goes outside the screen
    if (this.x > 525) {

        this.x= -80;

        this.p = 100 + Math.floor(Math.random() * 230);
    }

    // This resets the player to the beginning if it collides with the enemy
    if ((player.x < this.x + 75 && player.x + 55 > this.x) &&
        (player.y < this.y + 30 && player.y + 35 > this.y))
    {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x, y, p) {

    // Horizontal location of the player
    this.x = x;

    // vertical location of the player
    this.y = y;

    // pace of movement of the player
    this.p = p;

    // sprite image of the player
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function() {
    // This section retricts the movement of the player
    if (this.y > 400) { this.y = 400; }

    if (this.x > 410) { this.x = 410; }

    if (this.x < 0) { this.x = 0; }

    // If the player reaches the water, congratulate the player and reset its position to the initial spot.
    if (this.y < 0) {

        alert('Congratulations! You have won! \nPlay again.');

        this.x = 200;

        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This section handles keypress.
Player.prototype.handleInput = function(keyPress) {

        if (keyPress == 'left') { this.x -= this.p + 60; }

        if (keyPress == 'right') { this.x += this.p + 60; }

        if (keyPress == 'up') { this.y -= this.p + 32; }

        if (keyPress == 'down') { this.x += this.p + 32; }
};

// This section instantiates both the enemy and player objects
let allEnemies = [];

// Initial vertical spot of the enemies
let enemySpot = [65, 145, 230];

// Instantiate the player object
let player = new Player(200, 400, 50);

// Define the enemy variable
let enemy;

enemySpot.forEach(function(eSpot) {

    enemy = new Enemy(0, eSpot, 80 + Math.floor(Math.random() * 230));

    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
