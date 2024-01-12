const state = {
    view: {    
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        tries: 3,
        gameover: 0,
    },
    action: {
        countDownTimerId: setInterval(countDown,1000),
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent =  state.values.currentTime;

    if((state.values.currentTime <= 0) || (state.values.tries < 1)) {
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.values.timerId);


        state.values.gameover = 1;
        alert("Game Over! You scored " + state.values.result);
        
    }
}

function randomSquare() {
    state.view.squares.forEach((square)=> {
       square.classList.remove("enemy");
    });

    /** Rola um numero de 1 - 9 */
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);

}

function playAudio(){
    let sound = new Audio("./src/audios/hit.m4a");
    
    sound.volume = 0.2;
    sound.play();

}


function addListenerHitBox(){
    
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;

                playAudio();
            }
            else{
                if(state.values.gameover === 0){
                    state.values.tries--;
                    state.view.lives.textContent = "x"+state.values.tries;
                }
            }
        });
     });
}

function main() {
    
   moveEnemy();
   addListenerHitBox();

}

main();