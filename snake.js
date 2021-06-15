
var canvas;
var ctx;
var score;

var head;
var food;
var ball;

var dots;
var food_x;
var food_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RANDX = 59;
const MAX_RANDY = 29;
const DELAY = 100;
const C_HEIGHT = 400;
const C_WIDTH = 700;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   


function init() {
    
    canvas = document.getElementById('stage');
    ctx = canvas.getContext('2d');
    $("#score").text(score);
    
   
    loadImages();
    createSnake();
    locateFood();
    setTimeout("gameCycle()", DELAY);
}    
function bgCanvas(){
    ctx.fillStyle = "red";
    ctx.fillRect(350, 200, 10, 10);
}

function loadImages() {
    
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    food = new Image();
    food.src = 'apple.png'; 
}

function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function doDrawing() {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {

        ctx.drawImage(food, food_x, food_y);

        for (var z = 0; z < dots; z++) {
            
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }    
    } else {

        gameOver();
    }        
}

function gameOver() {
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function checkFood() {

    if ((x[0] == food_x) && (y[0] == food_y)) {

        dots++;
        locateFood();
        score = 1;
        console.log(score );

        score = document.getElementById("score").innerHTML = ;
    }

}

function count(){
    if(head == food_x && head == food_y){
        
        console.log("yay");

        score = document.getElementById("score").innerHTML = score++;
     } 
}


function move() {

    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x[0] += DOT_SIZE;
    }

    if (upDirection) {
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {
        y[0] += DOT_SIZE;
    }
}    

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
      inGame = false;
    }

    if (x[0] < 0) {
      inGame = false;
    }
}

function locateFood() {

    var r = Math.floor(Math.random() * MAX_RANDX);
    food_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RANDY);
    food_y = r * DOT_SIZE;
}    

function gameCycle() {
    
    if (inGame) {

        checkFood();
        checkCollision();
        move();
        count();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
