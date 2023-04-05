// ========================  GLOBAL VARIABLES ============================= //
const game = document.querySelector('#game');
const ctx = game.getContext('2d');

const gravity = 2.5;
let user;
let startingPlatform;
let startingPlatform1;
let startingPlatform2
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
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
    startingPlatform = new Platform((user.x - 10), (user.y + 30)); // starting platform should be placed under player to avoid instant loss
    startingPlatform1 = new Platform(410, (user.y + 30));
    startingPlatform2 = new Platform(10, (user.y + 30));
    user.render();
    startingPlatform.render();

    // run the game loop
    const runGame = setInterval(gameLoop, 30);
});

document.addEventListener('keydown', movementHandler);
//============================= EVENT LISTENERS ===============================//




//=============================== GAME PROCESSES ===============================//
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    user.y += user.dy; // this allows us to change the rate at which the user rises/falls
    user.render();
    startingPlatform.render();
    startingPlatform1.render();
    startingPlatform2.render();

    let hit = detectHit(user, startingPlatform);

    for (let i = 0; i < platforms.length; i++) {
        platforms[i].render();
    }
}
//=============================== GAME PROCESSES ===============================//




//================================ KEYBOARD LOGIC ===============================//
// This handles horizontal motion
function movementHandler(e) {
    if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
        if ((user.x - 5) <= (0 - user.width)) {
            user.x = game.width - user.width  // this provides a "Pac-Man" effect, where the player appears on the other side when heading off-screen
        } else {
            user.x -= 5;
        }
    } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
        if (user.x + 5 >= game.width) {
            user.x = 0
        } else {
            user.x += 5;
        }
    }

}
//================================ KEYBOARD LOGIC ===============================//




//================================= HIT DETECTION ===============================//
// This mainly handles vertical motion
// TODO: find better values to reduce choppiness ================================================ //
function detectHit(user, platform) {
    // we only want to detect hits from above, as we want the users to pass through plaforms from below
    // TODO: set an if statment for dy motion ===============================================================//
    // TODO: apply to all platforms =========================================================================//

    let hitTest = (
        user.y + user.height > platform.y &&
        user.y < platform.y + platform.height &&
        user.x + user.width > platform.x &&
        user.x < platform.x + platform.width
    );

    if (hitTest) {
        user.dy = -2.7;
        setTimeout(() => {
            user.dy = -2.2
        }, 600)
        setTimeout(resetGravity, 1000);
    }
}
//================================= HIT DETECTION ===================================================//





//================================= HELPER FUNCTIONS ===============================================//
function resetGravity() {
    // gradual change to gravity for a more natural acceleration (reduces choppiness)
    user.dy = gravity - .5;
    setTimeout(() => {
        user.dy = gravity
    }, 400)
}

let randNum = Math.round(Math.random() * 5);
function createPlatforms () {
    for (let i = 0; i < randNum; i++) {
        let randX = Math.floor(Math.random() * game.width);
        let plat = new Platform(randX, 15);
        platforms.push(plat);
    }
}
createPlatforms();
console.log('platforms', platforms);
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