const board = document.getElementById('board');
const squareNumbers = 750;
const colors = ['red', 'green', 'blue', 'yellow', 'gray', 'tomato', 'brown', 'pink', 'purple'];


for(let i = 0; i < squareNumbers; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', ()=> setColor(square));
    square.addEventListener('mouseleave', ()=> removeColor(square));
    board.append(square);
}



function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d';
}


function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}