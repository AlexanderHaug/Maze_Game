/*jshint esversion: 6 */ 
const MAZE = document.querySelectorAll("td");
const MOVECOUNTER = document.querySelector(".move-counter p");
const RESETBUTTON = document.querySelector(".reset-button");

var currentSpace;
var mazeModifier = getMazeModifier();
var startingPoint = getInitalStartingPoint();
var counter = 0;
var gameRunning = true;

// Movement Functions
function move() {
    if (gameRunning === true) {
        if (event.code == "ArrowUp") {moveUp(currentSpace);}
        else if (event.code == "ArrowLeft") {moveLeft(currentSpace);}
        else if (event.code == "ArrowRight") {moveRight(currentSpace);}
        else if (event.code == "ArrowDown") {moveDown(currentSpace);}
    }
    else {
        window.confirm("You Win!! Do you want to play again?");
        if (confirm) {
            reset();
        }
    }
}

function moveUp(currentPosition) {
    let newPosition = currentPosition - mazeModifier;
    if (newPosition < 0) {}
    else {
        let [currentSquare, upSquare] = getSquareClasses(currentPosition, newPosition);
        if (currentSquare.includes("top") || upSquare.includes("bottom")) {}
        else {
            changeCurrentPosition(currentPosition, newPosition);
        } 
    }  
}

function moveDown(currentPosition) {
    let newPosition = currentPosition + mazeModifier;
    if (newPosition >= MAZE.length) {}
    else {
        let [currentSquare, downSquare] = getSquareClasses(currentPosition, newPosition);    
        if (currentSquare.includes("bottom") || downSquare.includes("top")) {}
        else {
            changeCurrentPosition(currentPosition, newPosition);
        }  
    }
}

function moveLeft(currentPosition) {
    if (currentPosition % mazeModifier === 0) {}
    else {
        let [currentSquare, leftSquare] = getSquareClasses(currentPosition, currentPosition - 1);
        if (currentSquare.includes("left") || leftSquare.includes("right")) {}
        else {
            changeCurrentPosition(currentPosition, currentPosition - 1);
        } 
    }  
}

function moveRight(currentPosition) {
    if (currentPosition % mazeModifier === mazeModifier-1) {}
    else {
        let [currentSquare, rightSquare] = getSquareClasses(currentPosition, currentPosition + 1);
        if (currentSquare.includes("right") || rightSquare.includes("left")) {}
        else {
            changeCurrentPosition(currentPosition, currentPosition + 1);
        }
    }  
}
// Helper Functions
function isGameOver(position) {
    let space = MAZE[position];
    if (space.className.includes("exit") && space.className.includes("current")) {
        gameRunning = false;
    }
}

function getMazeModifier() {
    for (let x = 2; MAZE.length; x++) {
        if (MAZE.length % x === 0) {return x;}
    }
}

function getInitalStartingPoint() {
    for (let x = 0; x < MAZE.length; x++) {
        let classes = MAZE[x].className.split(" "); 
        if (classes[classes.length-1] == "current") {return x;}
    }
    return 0;
}

function getSquareClasses(currentPosition, newPosition) {
    let currentSquare = MAZE[currentPosition].className.split(" ")[0];
    let newSquare = MAZE[newPosition].className.split(" ")[0];
    return [currentSquare, newSquare];
}

function changeCurrentPosition(currentPosition, newPosition) {
    MAZE[currentPosition].classList.remove("current");
    MAZE[newPosition].classList.add("current");
    counter++;
    MOVECOUNTER.innerHTML = counter;
    currentSpace = newPosition;
    isGameOver(currentSpace);
}
// Reset Function
function reset() {
    changeCurrentPosition(currentSpace, startingPoint);
    counter = 0;
    MOVECOUNTER.innerHTML = counter;
    gameRunning = true;
}



currentSpace = startingPoint;
window.addEventListener("keyup", move, false);
RESETBUTTON.addEventListener("click", reset, false);