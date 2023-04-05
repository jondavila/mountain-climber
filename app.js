// ========================  GLOBAL VARIABLES ============================= //
const game = document.querySelector('#game');
const ctx = game.getContext('2d');

const gravity = 0.5; // (acceleration) higher number leads to stronger 'gravity'
let user;
let startingPlatform;
const platforms = [];
// ========================  GLOBAL VARIABLES ============================= //




//======================= SET UP FOR CANVAS RENDERING =======================//
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);
//======================= SET UP FOR CANVAS RENDERING =======================//



//=============================== ENTITIES ===================================//
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.dx = 0; // dx (velocity) represents the change of position along x-axis (delta x with movement right being positive)
        this.dy = gravity; // dy (velocity) represents the change of position along y-axis (delta y with movement down being positive)
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 500; //CHANGED TO MAKE TESTING EASIER
        this.height = 10;

        this.render = () => {
            // ctx.fillStyle = green; // cloud sprite will go here using .drawImage() 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
//=============================== ENTITIES ===================================//




//============================= EVENT LISTENERS ===============================//
window.addEventListener('DOMContentLoaded', function () {
    // starting position
    user = new Player(200, 200, 20, 20);
    startingPlatform = new Platform((user.x - 90), (user.y + 30)); // starting platform should be placed under player to avoid instant loss
    platforms.push(startingPlatform);

    // run the game loop
    const runGame = setInterval(gameLoop, 30);
});

document.addEventListener('keydown', movementHandler);
//============================= EVENT LISTENERS ===============================//




//=============================== GAME PROCESSES ===============================//
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    user.dy += gravity; // this allows us to change the rate at which the user rises/falls
    user.y += user.dy;
    user.x += user.dx // changed to positive or negative value depending on keypress
    user.render();

    platforms.forEach((platform) => {
        platform.render();

        let hit = detectHit(user,platform)
    })

    if ((user.x - 5) <= (0 - user.width)) {
        user.x = game.width - user.width  // this provides a "Pac-Man" effect, where the player appears on the other side when heading off-screen
    }
    if (user.x + 5 >= game.width) {
        user.x = 0
    }
}
//=============================== GAME PROCESSES ===============================//




//================================ KEYBOARD LOGIC ===============================//
// This handles horizontal motion
function movementHandler(e) {
    if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
        user.dx = -5;
    } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
        user.dx = 5;
    }
}
//================================ KEYBOARD LOGIC ===============================//




//================================= HIT DETECTION ===============================//
// This mainly handles vertical motion
// TODO: find better values to reduce choppiness ================================================ //
function detectHit(user, platform) {
    // we only want to detect hits from above, as we want the users to pass through plaforms from below
    // TODO: apply to all platforms =========================================================================//

    let hitTest = (
        user.y + user.height > platform.y &&
        user.y < platform.y + platform.height &&
        user.x + user.width > platform.x &&
        user.x < platform.x + platform.width
    );

    if (hitTest) {
        user.dy = -12
    }
}
//================================= HIT DETECTION ===================================================//



//================================= HELPER FUNCTIONS ===============================================//
function createPlatforms(height) {
    let randNum = Math.floor(Math.random() * 6);
    for (let i = 0; i < 1; i++) {
        let randX = Math.floor(Math.random() * game.width);
        let plat = new Platform(110, height);
        platforms.push(plat);
    }
}
createPlatforms(100);
//================================= HELPER FUNCTIONS ===============================================//


// =============================== NOTES ================================================ //
/*
BE SURE TO CLEAN AND ORGANIZE CODE BEFORE SUBMITTING

if the player moves up in y, the platforms move down in y (opposite of this since down is positive in this frame of reference)

gravity (or rather the change in y due to gravity) is constant except when bouncing. dy should change to a negative when bounced, and gradually change back to gravity
    - thinking maybe a while function could work here
        - delay in a while function?? -> set timeout
    - we could have a setInterval function to check dy value
        - if not gravity, add .5 for instance
        - clearInterval when value is reached 
 */