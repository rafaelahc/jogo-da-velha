//Variáveis
const xClass = 'x';
const oClass = "o";
let xTurn;

//DOM
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('#board');
const gameEndMessage = document.querySelector('[data-game-end-message]');
const gameEndElement = document.querySelector('#game-end-element');
const restartButton = document.querySelector('#restart-button');

//Array das linhas das células para saber as possibilidades de quem vai ganhar
const lines = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
 
//Chamar as funções
startGame();
handleClick();

//Iniciar o jogo
function startGame() {
    xTurn = true; //é verdade que começamos com a classe X.
    board.classList.add('x'); // então o hover tem que ser o x

    //Em cada célula, nós vamos remover a classe X ou O para que fique tudo zerado.
    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        board.classList.replace('o', 'x'); //substitui para que mesmo se acabe com o, comece sempre com o x.

        cell.addEventListener('click', handleClick, { once: true}) // O atributo oce é para ser clicado apenas 1 vez.
    })

    restartButton.addEventListener('click', startGame);
    gameEndElement.classList.remove('show');
    document.querySelector('main').classList.remove('end');
}

function handleClick(e) {
    let cell = e.target;
    let turnClass = xTurn ? xClass : oClass;

    placeMark(cell, turnClass);

    if(checkWin(turnClass)) {
        endGame(false);
    }else if (checkDraw()) {
        endGame(true);
    }

    swapTurn();
    setBoardHover()
}

function placeMark(cell, turnClass) {
    cell.classList.add(turnClass);
}

function swapTurn() {
   xTurn = !xTurn;
}

function setBoardHover() {
    xTurn ? board.classList.replace('o', 'x') : board.classList.replace('x', 'o')
}

//Vencedor
function checkWin(turnClass) {
    return lines.some(line => { //passando por todas as linhas
        return line.every(index => { //vai retornar a posição das linhs [0,1,2] ...
            return cells[index].classList.contains(turnClass) // contenha a mesma classe em todas as três.
        })
    })
}


//Velha
function checkDraw() {
    return [...cells].every(cell => { //Se todas as células estiverem preenchidas e ninguém ganhar, ele retorna um empate.
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}

function endGame(draw) {
    if (draw) {
        gameEndMessage.innerText = 'Deu Velha!!!';
    }else {
        gameEndMessage.innerText = `${xTurn ? "o X" : "o O"} Venceu!!!` ;
    }

    gameEndElement.classList.add('show');
    document.querySelector('main').classList.add('end');
}