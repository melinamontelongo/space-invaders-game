import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js"
const canvas = document.getElementById("game");
const ctx= canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src="img/bg.png";

const gradient = ctx.createLinearGradient(0, 0, 300, 400, 0);
gradient.addColorStop(0, "rgb(98, 0, 122)");
gradient.addColorStop(0.5, "rgb(182, 0, 228)");
gradient.addColorStop(1, "rgb(110, 15, 235)");

const playerBulletController = new BulletController(canvas, 10, "red", true)
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
function game(){
    checkGameOver();
    displayGameOver();
    if (!isGameOver){
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver(){
    if (isGameOver){
       let text = didWin ? "You Win!" : "Game Over"; 
       let textOffset = didWin ? 5 : 7;
       ctx.fillStyle = gradient;
       ctx.font = "70px Silkscreen";
       ctx.fillText(text, canvas.width / textOffset, canvas.height/2);
    }
}
function checkGameOver(){
    if(isGameOver){
        return;
    }
    if (enemyBulletController.collideWith(player)){
        isGameOver = true;
    }
    if (enemyController.collideWith(player)){
        isGameOver = true;
    }
    if (enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
}
setInterval(game, 1000/60) //60 times every 1 second
