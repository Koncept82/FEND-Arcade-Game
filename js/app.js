let game = true;

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
};

Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 150 * dt;

    if (this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }

    // If enemy collides with player 
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;

        if (player) {
            player.x = 202;
            player.y = 400;

            if (player.lives > 1) {
                player.lives -= 1;
                player.displayLives();

                // Write message that the player died
                document.getElementById("messages").innerHTML = "YOU DIED!";

                //message erased after 2 seconds
                setTimeout(function() {
                    document.getElementById("messages").innerHTML = "";
                }, 2000);

            } else {
                player.lives -= 1;
                player.displayLives();

                // Write message that the game is over
                document.getElementById("messages").innerHTML = "GAME OVER!";
            }
        }

    } else {
        this.collision = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
    this.lives = 3;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
    if (game && player.y < 40) {
        win();
    }
};

// Show number of lives the player has remaining
Player.prototype.displayLives = function() {
    var heart = "<img src='images/Heart.png' height='75px'>";
    document.getElementById("lives").innerHTML = "<div>Lives: </div>";
    for (var i = 0; i < this.lives; i++) {
        document.getElementById("lives").innerHTML += heart;
    }
};

// Player movement
Player.prototype.handleInput = function(direction) {
    const horizontal = 101,
        vertical = 83;

    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'up' && this.y - vertical > 0 - player.height) {
        this.y -= vertical;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    }
}

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


const enemyPosition = [55, 140, 230];
const player = new Player(202, 400, 'images/char-boy.png');
let allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
});

//show player lives remaining
player.displayLives();

function collision(px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < pw + ew)
}

function win() {

    //write message that the player won the game
    document.getElementById("messages").innerHTML = "YOU WON!";

    //message erased after 2 seconds
    setTimeout(function() {
        document.getElementById("messages").innerHTML = "";
    }, 2000);

    reset();
}

function reset() {
    player.x = 202;
    player.y = 400;
    let allEnemies = enemyPosition.map((y, index) => {
        return new Enemy((-200 * (index + 1)), y);
    });
}

// listen for restart button click
document.getElementById("restart-btn").addEventListener("click", function(e) {
    // go back to the instruction page to restart
    window.location = "index.html?";
});