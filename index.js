const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartbtn");
const alertBox = document.querySelector(".alertBox");

let currentPlayer = "X";
let nextPlayer = "O";

let playerTurn = currentPlayer;

 player1.textContent =` Player1 : ${currentPlayer}`;
 player2.textContent =` Player2 : ${nextPlayer}`;

// startgame 


const startGame = () => {
  gameCells.forEach(cell  => {
    cell.addEventListener("click", handleClick)
  })
}
  

const handleClick =(e) => {
  // console.log(e.target);
  if(e.target.textContent === "") {
    e.target.textContent = playerTurn;
    if(checkWin()) {
      // console.log(`${playerTurn} is a winner`);
      showalert(`${playerTurn} is a winner!`);
      disableCells();
    }else if(checkTie()){
          //  console.log("it's tie");
          showalert("It's tie")
           disableCells();
    }else {
      changePlayerTurn();
      showalert(`PlayerTurn : ${playerTurn}`);

    }
    

  }
  
}




//  to change player turn

const changePlayerTurn = () => {
  if(playerTurn === currentPlayer) {
    playerTurn = nextPlayer;
  }else{
    playerTurn = currentPlayer;

  }
}


//  winning possiblity 

const checkWin = () => {
  const winningCondition = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

  ];

  for(let i=0; i< winningCondition.length; i++) {
    const [pos1,pos2,pos3] =winningCondition[i];

    if(gameCells[pos1].textContent !== "" && 
    gameCells[pos1].textContent === gameCells[pos2].textContent  &&
    gameCells[pos2].textContent === gameCells[pos3].textContent) {
      return true;
    }
  }

  return false;


}

//  function to check tie 

const checkTie = () => {
  let emptyCellsCount = 0;
  gameCells.forEach(cell => {
    if(cell.textContent === "") {
      emptyCellsCount++;
    }
  });

  return emptyCellsCount === 0 &&  !checkWin(); 
}



//  disabled game board after win or tie

const disableCells = () => {
  gameCells.forEach(cell => {
    cell.removeEventListener("click",handleClick);
    cell.classList.add("disabled");
  })
}


// restartbutton

const restartGame = () => {
  gameCells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  })
  startGame();
}

restartBtn.addEventListener("click",restartGame);


//  alertbox 

const showalert = (msg) => {
  alertBox.textContent= msg;
  alertBox.style.display ="block";

  setTimeout(() => {
    alertBox.style.display ="none";
  
  },5000);
}






startGame();
