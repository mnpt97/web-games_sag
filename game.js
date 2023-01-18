const blue = "blue"; // blue circle
const red = "red"; // red circle
const free = "free";

let currentPlayer;
// ein 2D-Array welches das Spielfeld darstellt --> alle Felder sind zu Beginn noch frei
let gameField = [
    [free, free, free],
    [free, free, free],
    [free, free, free]
]

let gameCells = [
    document.querySelectorAll('tr.row1>td.cell>div'), // siehe index.html Zeile 19-29
    document.querySelectorAll('tr.row2>td.cell>div'), // siehe index.html Zeile 30-40 
    document.querySelectorAll('tr.row3>td.cell>div')  // siehe index.html Zeile 41-51
]

let notificationWrap = document.getElementById("notification-wrapper")
let gameFieldElem = document.getElementById('game-field')
let noteElement;

function checkWinner(rowIndex, colIndex){
    let col = 0, row = 0, diag = 0, rdiag = 0
    const n = 3 // Anzahl Spalten bzw. Zeilen
    let isWinner = false;
    for(let i = 0; i < n; i++){
        if(gameField[rowIndex][i] === currentPlayer) col++; // Überprüft ob Spieler alle Felder in einer Spalte belegt
        if(gameField[i][colIndex] === currentPlayer) row++; // Überprüft ob Spieler alle Felder in einer Zeile belegt
        if(gameField[i][i] === currentPlayer) diag++; // Überprüft ob Spieler alle Felder in der Diagonalen von oben links nach unten rechts belegt
        if(gameField[i][n-i-1] === currentPlayer) rdiag++; // Überprüft ob Spieler alle Felder in der Diagonalen von unten links nach oben rechts belegt
    }
    if( row === n || col === n || diag === n || rdiag === n) isWinner = true; // Falls Spieler 3 alle Felder einer Zeile, Spalte oder Diagonalen belegt; dann isWinner=true  
    return isWinner
}

function checkTie(){
    let isTie = true;
    gameField.flat().forEach(cell => {
        if(cell === free){
            isTie = false;
        }
    })
    return isTie
}

function showNotification(winner){
    
    let noteTextElem = noteElement.querySelector('#notification-text')
    let notePlayerElem = noteElement.querySelector('#winner-player-color')
    notePlayerElem.classList = []
    if(winner){
        noteTextElem.innerText = "Hat gewonnen!"
        notePlayerElem.classList.add(currentPlayer)
    }else{
        noteTextElem.innerText = "Unentschieden!"   
    }
    gameFieldElem.append(notificationWrap)
}


function cellClick(cell, rowIndex, colIndex){
    console.log('click', cell, rowIndex, colIndex);
    if(gameField[rowIndex][colIndex] !== free) return;

    gameField[rowIndex][colIndex] = currentPlayer
    gameCells[rowIndex][colIndex].classList.remove(free)
    gameCells[rowIndex][colIndex].classList.add(currentPlayer)

    if(checkWinner(rowIndex, colIndex)){
        showNotification(currentPlayer)
    } else if(checkTie()){
        showNotification()
    } else{
        currentPlayer === blue ? currentPlayer = red : currentPlayer = blue
        setPlayerIndicator()
    }
}

gameCells.forEach((cellRow, rowIndex) => {
    cellRow.forEach((cell, colIndex) => {
        cell.addEventListener('click', () => cellClick(cell, rowIndex, colIndex))
    })
})

function setPlayerIndicator(){
    let playerIndicator = document.getElementById('curr-player-color')
    playerIndicator.classList = []
    playerIndicator.classList.add(currentPlayer)
}

function resetAndStartGame(){
    noteElement = notificationWrap.querySelector('#notification');
    notificationWrap.remove()
    gameField = gameField.map(row => row.map(cell => free))
    gameCells.forEach(
        cellRow => cellRow.forEach(cell => {
            cell.classList = []
            cell.classList.add(free)
        })
    )
    // Math.random(): zufällige Zahl zwischen 0 und 1
    //wie: if(Math.random() > 0.5){ currentPlayer = blue } else{ currentPlayer = red }
    Math.random() > 0.5 ? currentPlayer = blue : currentPlayer = red
    setPlayerIndicator()
}

function init(){
    resetAndStartGame()
}
// Wenn das Browser Fenster geladen ist (onload) wird die Funktion "init" aufgerufen
window.onload = init






