// Global Variables
const game = document.querySelector('#game');
const ctx = game.getContext('2d');


const gravity = 0.5;
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
        this.dx = 0; // dx represents the change of position along x-axis (delta x with movement right being positive)
        this.dy = gravity; // dy represents the change of position along y-axis (delta y with movement down being positive)
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
    user.y += user.dy; // this allows us to change the rate at which the user rises/falls
    user.render();
    startingPlatform.render();
    let hit = detectHit(user,startingPlatform);
}

// Keyboard Logic - horizontal motion
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

// vertical motion

function bounce() {
    // will need to connect with hit function
    // is this even needed? Can we add bounce to if statemnt in detectHit
}

function detectHit(user, platform) {
    // we only want to detect hits from above, as we want the users to pass through plaforms from below
    // todo: set an if statment for dy
    let hitTest = (
        user.y + user.height === platform.y
    );

    if (hitTest) {
        user.dy = 0;
    } 
}





// =============================== NOTES ================================================ //
/*
BE SURE TO CLEAN AND ORGANIZE CODE BEFORE SUBMITTING

if the player moves up in y, the platforms move down in y (opposite of this since down is positive in this frame of reference)

gravity (or rather the change in y due to gravity) is constant except when bouncing. dy should change to 
 */