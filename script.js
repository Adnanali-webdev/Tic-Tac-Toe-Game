console.log("Welcome to Tic Tac Toe");

const boxes = document.querySelectorAll(".box");
const container = document.getElementsByClassName("container")[0];
const info = document.querySelector(".info");
const ting = new Audio("ting.mp3");
const gameOver = new Audio("gameover.mp3");
const winGame = new Audio("music.mp3");
const reset = document.getElementById("reset");
let isGameOver = false;
let  modal = document.querySelector(".modal");
let winMessage = document.getElementById('winMessage');
let playAgain = document.getElementById('playAgain');
let line = document.querySelector('.line')


let turn = "X";
const changeTurn = () => {
    turn = turn === "X" ? "0" : "X";
}

boxes.forEach((box, i) => {
    box.addEventListener('click', (e) => {

        if (e.target.innerHTML === "" && !isGameOver) {
            e.target.innerHTML = turn;
            changeTurn();
            ting.play();
            info.innerText = `Turn for ${turn}`;
            iswinner()
             checkForDraw()
            // isGameOver = false;

        } else if(isGameOver = true){
                
                        const div = document.createElement("div");
            div.classList.add("game-end");
            div.innerText = "Game Has Ended!", iswinner();
            container.appendChild(div);
            gameOver.play();

        
        


        } else {
            const div = document.createElement("div");
            div.classList.add("popUp");
            div.innerText = "Sorry! You Cannot Undo Your Move";
            container.appendChild(div);
            gameOver.play();
        }

    })
})

const iswinner = () => {
    const win = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, -45]
    ]

    for(let i=0; i< win.length; i++){
        let indexes = win[i]
        if(boxes[indexes?.[0]].innerHTML=== boxes[indexes?.[1]].innerHTML &&  // we dont need optional chaining here since we have used for loop so it will check first for indexes[0,1,2] then next and so on..
           boxes[indexes?.[1]].innerHTML=== boxes[indexes?.[2]].innerHTML && 
           boxes[indexes?.[0]].innerHTML !== ""
        ){
             
             let wonPlayer = boxes[indexes?.[0]].innerHTML ;
              info.innerText = `Winner is ${wonPlayer}`;
              console.log( wonPlayer, "is win");
                isGameOver = true;

                winGame.play();
              winGame.currentTime = 0;

              winGame.addEventListener("timeupdate", () => {
                if(winGame.currentTime >= 30){
                    winGame.currentTime = 0;
                    winGame.play();
                }
              })
              
              // line 
              line.style.transform = `translate(${indexes?.[3]}vw, ${indexes?.[4]}vw) rotate(${indexes?.[5]}deg)`;
              line.style.width = "30vw";

              // open modal
              modal.style.display= "flex";
              winMessage.innerText = `Player ${wonPlayer} Wins! 🎉`;
              playAgain.addEventListener("click", resetFunction)

}
    
}}


const checkForDraw = () => {
    let anyBoxEmpty = false;
    for(i=0; i< boxes.length; i++){
        if(boxes[i].innerHTML === "" ){
            anyBoxEmpty = true;
            break;
        }

    }
    if(anyBoxEmpty){
        return;
    }
    // both are false representing with ! means false
    if(!anyBoxEmpty && !isGameOver){
        modal.style.display= "flex";
        winMessage.innerText = `It's a Draw! 🤝`;
        playAgain.addEventListener("click", resetFunction)

    } 
    gameOver.play();                                          
}

const resetFunction = ()=>{
boxes.forEach((box, i) => {
        box.innerHTML = "";

    })
    turn = "X"
   isGameOver = false;
   info.innerText = `Turn for ${turn}`;
    winGame.pause();
    winGame.currentTime = 0; 
    modal.style.display = "none";
    line.style.width = "0vw";


}

reset.addEventListener("click", () => {
    resetFunction()
})

