// ========================  GLOBAL VARIABLES ============================= //
const game = document.querySelector('#game');
const ctx = game.getContext('2d');
const score = document.querySelector('#score');
const highScore = document.querySelector('#high-score');
const newHighScore = document.createElement('h3');
const playButton = document.querySelector('#play');
const easyButton = document.querySelector('#easy');
const mediumButton = document.querySelector('#medium');
const titleText = document.getElementsByTagName('h1')[0];
const hardButton = document.querySelector('#hard');
const resetButton = document.querySelector('#reset');
const instructions = document.querySelector('.instructions');
const gameOver = document.querySelector('.game-over');
const gameOverText = document.querySelector('#game-over-text');


let gravity = 0.62; // higher number leads to stronger 'gravity'
let platforms = [];
let user;
let startingPlatform;
let doubleJump = false;
let scoreNum = 0;
let roundedScore = 0;
let highScoreNum = 0;
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
            // ctx.fillStyle = 'black'; // player sprite will go here using .drawImage() => no need for .fillStyle or .fillRect
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.width = 45;
        this.height = 10;

        this.render = () => {
            // ctx.fillStyle = 'white'; // cloud sprite will go here using .drawImage() 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
//=============================== ENTITIES ===================================//




//============================= EVENT LISTENERS ===============================//
window.addEventListener('DOMContentLoaded', function () {
    // starting position and platfrom
    user = new Player((game.width / 2), (game.height - 70), 20, 20);
    startingPlatforms(user);

    // run the game loop after easy is clicked
    easyButton.addEventListener('click', ()=> {
        let runGame = setInterval(gameLoop, 22);
        gravity = 0.52;
        titleText.textContent = 'Mountain Climber - Easy';
        instructions.classList.toggle('hidden');
    });

    // run the game loop after medium is clicked
    mediumButton.addEventListener('click', ()=> {
        let runGame = setInterval(gameLoop, 22);
        gravity = 0.62;
        titleText.textContent = 'Mountain Climber - Medium';
        instructions.classList.toggle('hidden');
    });

    // run the game loop after hard is clicked
    hardButton.addEventListener('click', ()=> {
        let runGame = setInterval(gameLoop, 22);
        gravity = 0.73;
        titleText.textContent = 'Mountain Climber - Hard';
        instructions.classList.toggle('hidden');
    });
});

document.addEventListener('keydown', movementHandler);

resetButton.addEventListener('click', function() {
    // removes existing platfroms and creates a new player
    platforms = [];
    user = new Player((game.width / 2), (game.height - 70), 20, 20);
    startingPlatforms(user);

    // resets scores for next game
    scoreNum = 0;
    roundedScore = 0;
    score.textContent = 'Score: 0'

    // hides game over box and deletes new high score alert
    gameOver.classList.toggle('hidden');
    newHighScore.remove();
});

document.addEventListener('keydown', function(e) {
    if(e.code === 'KeyR') {
        // removes existing platfroms and creates a new player
        platforms = [];
        user = new Player((game.width / 2), (game.height - 70), 20, 20);
        startingPlatforms(user);

        // resets scores for next game
        scoreNum = 0;
        roundedScore = 0;
        score.textContent = 'Score: 0'

        // hides game over box and deletes new high score alert
        gameOver.classList.add('hidden');
        newHighScore.remove();
    }else if(e.code === 'Space') {
        if (doubleJump) {
            user.dy = -8;
            doubleJump = false;
        }
    }
});

//============================= EVENT LISTENERS ===============================//




//=============================== GAME PROCESSES ===============================//
function gameLoop() {
    // checks losing condition each time gameLoop() is ran
    playerLost();

    if (user.alive) {
        ctx.clearRect(0, 0, game.width, game.height);
        positionUpdate();

        platforms.forEach((platform) => {
            platform.render();
            detectHit(user, platform)
            platform.y += platform.dy;

            // as the user reaches the top of the screen, the platforms move down 
            if (user.y < 400) {
                platform.dy = 7;
            } else if (user.y > 80) {
                platform.dy = 0;
            }

            // if the platform is below game height, the platform is deleted to save space
            // remove platform from array to lessen platforms.length (see generateNewPlatforms())
            if (platform.y > (game.height)) {
                let platformIndex = platforms.indexOf(platform)
                platforms.splice(platformIndex, 1);
            }

            if (platform.dy !== 0) {
                scoreKeeper();
            }
        })

        generateNewPlatforms();

        horizontalLoop();
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
function detectHit(user, platform) {
    // we only want to detect hits from above, as we want the users to pass through plaforms from below
    let hitTest = (
        user.y + user.height > platform.y &&
        user.y < platform.y + platform.height &&
        user.x + user.width > platform.x &&
        user.x < platform.x + platform.width &&
        user.dy > 1
    );

    if (hitTest) {
        user.dy = -12
        doubleJump = true;
    }
}
//================================= HIT DETECTION ===================================================//


//=================================== PLATFORM GENERATING ============================================//
function createPlatforms(y) {
    // we want the platforms to be randomly placed along the width of the game
    let randX = Math.floor(Math.random() * (game.width - 40));
    let plat = new Platform(randX, y);
    platforms.push(plat);
}

// create initial platforms that exist inside of the canvas window
function startingPlatforms(user) {
    let randX = Math.floor(Math.random() * (game.width - 40));
    // starting platform should be placed under player to avoid instant loss
    startingPlatform = new Platform((user.x - 5), (user.y + 30));
    platforms.push(startingPlatform);

    createPlatforms(user.y - 30);
    createPlatforms(user.y - 90);
    createPlatforms(user.y - 150);
    createPlatforms(user.y - 220);
    createPlatforms(user.y - 270);
    createPlatforms(user.y - 310);
    createPlatforms(user.y - 350);
    createPlatforms(user.y - 400);
    createPlatforms(user.y - 460);
    createPlatforms(user.y - 500);
    createPlatforms(user.y - 550);
    createPlatforms(user.y - 600);
    createPlatforms(user.y - 660);

}

// creates a new platform as one leaves the canvas
function generateNewPlatforms() {
    let onScreen = platforms.length;
    if (onScreen < 12) {
        createPlatforms(-10);
    }
}
//=================================== PLATFORM GENERATING ============================================//



//=================================== PLAYER LOST ====================================================//
function playerLost() {
    // losing condition
    if (user.y > game.height) {
        user.alive = false
        gameOverText.textContent = `Game Over - Score: ${roundedScore}`;
        gameOver.classList.remove('hidden');
        if(roundedScore > highScoreNum) {
            highScore.textContent = `High Score: ${roundedScore}`;
            highScoreNum = roundedScore;
            newHighScore.textContent = 'NEW HIGH SCORE!';
            gameOver.insertBefore(newHighScore,resetButton);
        }

    }
}
//=================================== PLAYER LOST ====================================================// 



//================================= HELPER FUNCTIONS ===============================================//
function positionUpdate() {
    user.dy += gravity; // this allows us to change the rate at which the user rises/falls
    user.y += user.dy;
    user.x += user.dx; // changed to positive or negative value depending on keypress
    user.render();
}

function horizontalLoop() {
    if ((user.x - 5) <= (0 - user.width)) {
        user.x = game.width - user.width  // this provides a "Pac-Man" effect, where the player appears on the other side when heading off-screen
    }
    if (user.x + 5 >= game.width) {
        user.x = 0
    }
}

function scoreKeeper() {
    scoreNum += 0.2; // less than 1 to not have an inflated score
    roundedScore = Math.floor(scoreNum)
    score.textContent = `Score: ${roundedScore}`
}
//================================= HELPER FUNCTIONS ===============================================//