const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const title = document.querySelector("#h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

let numSquares = 6;
let colors;
let pickedColor;

function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function generateRandomColors(number) {
    const generatedColors = [];

    for (let i = 0; i < number; i++) {
        generatedColors.push(randomColor());
    }

    return generatedColors;
}

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].style.opacity = "1";
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    title.style.backgroundColor = "transparent";
    resetButton.textContent = "Nuevos Colores";

    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.opacity = "1";
        } else {
            squares[i].style.display = "none";
        }
    }
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            for (let j = 0; j < modeButtons.length; j++) {
                modeButtons[j].classList.remove("selected");
            }

            this.classList.add("selected");
            numSquares = this.textContent.trim() === "EASY" ? 3 : 6;
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Correcto!";
                changeColors(pickedColor);
                title.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.opacity = "0";
                messageDisplay.textContent = "Intentalo Nuevamente";
            }
        });
    }
}

function setupResetButton() {
    resetButton.addEventListener("click", reset);
    reset();
}

function init() {
    setupSquares();
    setupModeButtons();
    setupResetButton();
}

init();
