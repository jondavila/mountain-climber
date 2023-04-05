// Global Variables
const game = document.querySelector('#game');
const ctx = game.getContext('2d');

let player;
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
            // ctx.fillStyle = ; // player sprite will go here using .drawImage() => no need for .fillStyle or .fillRect
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


let player1 = new Player(10, 10, 20, 20);
player1.render();
console.log(player1);

let platform1 = new Platform(10, 40, 40, 20);
platform1.render();
console.log(platform1);