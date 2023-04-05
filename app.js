// Global Variables
const game = document.querySelector('#game');
const ctx = game.getContext('2d');

let user;
let startingPlatform;
let cloud; // theme of platforms will be clouds (??)


// Set up for canvas rendering
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

console.log('game width', game.width);
console.log('game height', game.height);

// Entities
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = () => {
            ctx.fillStyle = 'black'; // player sprite will go here using .drawImage() => no need for .fillStyle or .fillRect
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.render = () => {
            // ctx.fillStyle = green; // cloud sprite will go here using .drawImage() 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function () {
    // starting position
    user = new Player(200, 200, 20, 20);
    startingPlatform = new Platform((user.x-10), (user.y+30), 40, 10); // starting platform should be placed under player to avoid instant loss
    user.render();
    startingPlatform.render();

    // run the game loop
    const runGame = setInterval(gameLoop, 30);
});

document.addEventListener('keydown', movementHandler);

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    user.render();
    startingPlatform.render();
}


function movementHandler(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if ((user.x - 5) >= 0 ) {
            user.x -= 5;
        }
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if ((user.x + 5 <= (game.width - user.width))) {
            user.x += 5;
        }
    }
}


// if the player moves up in y, the platforms move down in y (opposite of this since down is positive in this frame of reference)