const $size = document.querySelector('#size');
const $name = document.querySelector('#player_name');
const $bot = document.querySelector('#bot');
const $selx = document.querySelector('.selx');
const $selo = document.querySelector('.selo');
const $btnOk = document.querySelector('#ok');
const $btnEndGame = document.querySelector('#okk');
const $res = document.querySelector('#reset');
const $board = document.querySelector('#game');
const clickAudio = document.querySelector('.click_audio');
const gameOver = document.querySelector('.gameover');
const gameWiner = document.querySelector('.winer')
const form = document.querySelector('.form')
let step = 0;
let arr = [];
let arr1 = [];

function bord() {
    $board.innerHTML = '';
    let n = $size.value;
    $size.setAttribute('disabled', 'true')
    let width = n * 100;
    let height = n * 100;
    $board.style.width = width + 'px';
    $board.style.height = height + 'px';
    let k = 0;


    for (let i = 0; i < n; i++) {
        arr[i] = [];

        for (let j = 0; j < n; j++) {
            let item = `<div class="block" data-i="${i}" data-j="${j}"></div>`;
            $board.innerHTML += item;
            arr[i].push('');
            arr1[k] = [i,j];
            k++;
        }
    }
}

function gameStep() {
    $board.onclick = function (event) {
        clickAudio.play();
        let i = event.target.attributes['data-i'].value;
        let j = event.target.attributes['data-j'].value;
        if (event.target.className === 'block') {

                event.target.innerHTML = 'x';
                arr[i][j] = 'x';

                let remowedIndex = arr1.findIndex(item => (item[0] == i && item[1] == j));
                arr1.splice(remowedIndex,1)

                let cellIndex = getRandomIntInclusive(0,arr1.length);
                let cell = arr1[cellIndex];
                console.log(cell,arr1);
                
                let cellBlock = document.querySelector(`[data-i="${cell[0]}"][data-j="${cell[1]}"]`);

                cellBlock.innerHTML = 'o';
                arr[cell[0]][cell[1]] = 'o';
            
               arr1.splice(cellIndex,1)
               step++
               winner(arr, i, j)
        }
    }
}

function winner(arr, i, j) {
    let win = 1;
    let n = $size.value;
    winerText = 'SCORE' + step-1;
    for (let j = 0; j < n; j++) {
        if (arr[i][j] !== 'x') win = 0;
    }
    if (win) {
        let winerText = document.createElement('div');
        winerText.innerHTML = `<h3> score ${step} </div>`
        winerText.classList.add('wintext');
        gameWiner.classList.add('active');
        // winerText.classList.add('wintext');
        gameWiner.appendChild(winerText);
        winerText = '0';
        // gameWiner.innerHTML = `<h3> ${step-1} </h3>`;
        gameOver.play();
        
        return
    } 

    let winJ = 1;

    for (let i = 0; i < n; i++) {
        if (arr[i][j] !== 'x') winJ = 0;
    }
    if (winJ) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }

    let winG = 1;
    for (let i = 0; i < n; i++) {
        if (arr[i][i] !== 'x') winG = 0;
    }
    if (winG) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }

    let winO = 1;

    for (let i = 0; i < n; i++) {
        if (arr[i][arr.length - 1 - i] !== 'x') winO = 0;
    }
    if (winO) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }

    let winH = 1;

    for (let i = 0, j = i; i < n; i++) {
        if (arr[i][j] !== 'x') winH = 0;
    }
    if (winH) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }
    
    // o

    let wino = 1

    for (let j = 0; j < n; j++) {
        if (arr[i][j] !== 'o') wino = 0;
    }
    if (wino) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }
    let winoJ = 1;

    for (let i = 0; i < n; i++) {
        if (arr[i][j] !== 'o') winoJ = 0;
    }
    if (winoJ) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }
    let winoG = 1;
    for (let i = 0; i < n; i++) {
        if (arr[i][i] !== 'o') winoG = 0;
    }
    if (winoG) {
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }
    let winoO = 1;

    for (let i = 0; i < n; i++) {
        if (arr[i][arr.length - 1 - i] !== 'o') winoO = 0;
    }
    if (winO){
        gameWiner.classList.add('active');
        gameOver.play();
        return
    }
    let winoH = 1;

    for (let i = 0, j = i; i < n; i++) {
        if (arr[i][j] !== 'o') winoH = 0;
    }
    if (winoH) {
        gameWiner.classList.add('active');
        gameOver.play();
        return;
    }
}

$btnOk.addEventListener('click', function () {
    bord();
    gameStep();
    wineText = '';
});

$res.onclick = function() {
    bord();
    $size.removeAttribute('disabled')
    // form.reset();
}

$btnEndGame.onclick = function() {
    bord();
    $size.removeAttribute('disabled')
    gameWiner.classList.remove('active');

    // form.reset();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - 1));
}