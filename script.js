let game = (function(){

    //initialize players
    playerX  = createPlayer('X');
    playerO  = createPlayer('O');

    //initialize default names
    playerX.setName('player1');
    playerO.setName('player2');

    //currentPlayer
    let currentPlayer = playerX;

    //default board template
    let emptyGameBoard = `<div class="cell" data-cordinate="00"></div>
            <div class="cell" data-cordinate="01"></div>
            <div class="cell" data-cordinate="02"></div>
            <div class="cell" data-cordinate="10"></div>
            <div class="cell" data-cordinate="11"></div>
            <div class="cell" data-cordinate="12"></div>
            <div class="cell" data-cordinate="20"></div>
            <div class="cell" data-cordinate="21"></div>
            <div class="cell" data-cordinate="22"></div>`;

    //cahce DOM
    const gameContainer = document.querySelector('.container');
    const startingPlayerOptions = document.querySelector('.options');
    const optionX = document.querySelector('.playerX');
    const optionO = document.querySelector('.playerO');
    const nameInput = document.querySelector('.names');
    const scoreBoard = document.querySelector('.scoreboard');
    const resetGame = document.querySelector('.resetGame');

    //bind events
    function bindEvents(){
        gameContainer.addEventListener('click',renderSymbol);
        startingPlayerOptions.addEventListener('click',chooseStartingPlayer);
        nameInput.addEventListener('keyup',setPlayerName);
        resetGame.addEventListener('click', restartGame);
    }   
    bindEvents();


   //events
    function restartGame(){
        gameContainer.innerHTML = emptyGameBoard;
        playerX.clearPairs();
        playerO.clearPairs();
        highlightChosenPlayer(currentPlayer.getSymbol());
        bindEvents();
    }

    function renderSymbol(event){
        startingPlayerOptions.removeEventListener("click", chooseStartingPlayer); // once game started (symbol is placed) prevent players from changing current player on their own
        const cell = event.target;
        const pair = cell.dataset.cordinate.split();
        if(cell.innerHTML === ""){
            cell.innerHTML = `<h1>${currentPlayer.getSymbol()}</h1>`;
            console.log(currentPlayer.insertPair(pair));
            checkWinner(currentPlayer);
            switchCurrentPlayer();
        }
    }

    function chooseStartingPlayer(event){
        let option = event.target;
        highlightChosenPlayer(option.innerHTML);
    }

    function highlightChosenPlayer(option){
        if(option === "X"){
            optionX.classList.add('active');
            optionO.classList.remove('active');
            currentPlayer = playerX;
        }else{
            optionX.classList.remove('active');
            optionO.classList.add('active');
            currentPlayer = playerO;
        }
    }

    function switchCurrentPlayer(){
        currentPlayer === playerX ? currentPlayer = playerO : currentPlayer = playerX;
    }

    function checkWinner(currentPlayer){
        if(currentPlayer.isWinner()){
            currentPlayer.increaseScore();
            alert(`${currentPlayer.getName()} is a winner!`);
            scoreBoard.innerHTML=`
                Player ${playerX.getName()}: ${playerX.getScore()}
                <br>
                Player ${playerO.getName()}: ${playerO.getScore()}                
                `;
            gameContainer.removeEventListener("click", renderSymbol); 
        }
    }

    function setPlayerName(event){
        const playerNameInput = event.target;
        const name = playerNameInput.value || playerNameInput.placeholder;


        if(playerNameInput.classList.contains('nameX')){
            playerX.setName(name);
            // playerNameInput.blur();
            // playerNameInput.classList.add('non-editable');
        } 
        if(playerNameInput.classList.contains('nameO')){
            playerO.setName(name);
            // playerNameInput.blur();
            // playerNameInput.classList.add('non-editable');
        } 
    }

    //create player object
    function createPlayer(symbol){
        //properties
        const pairs = [];

        let score = 0;
        const columns = 0;
        const rows = 1;
        const diagonals = 'diagonal';
        let playerName;

        //setters

        const clearPairs = function(){
            pairs.length = 0;
        }

        const increaseScore = function(){
            score++;
        }
        const insertPair = (pair) => {
            pairs.push(pair);
            return pairs;
        }

        const setName = function(name){
            playerName = name;
        }

        //getters
        const getScore = () => score;

        const getSymbol = () => symbol;

        const getName = () => playerName;

        //conditionals

        const checkWinnerColumns = function(){
            return checkMatchingPairs(columns);
        }

        const checkWinnerRows = function(){
           return checkMatchingPairs(rows);
        }
        const checkWinnerDL = function(){
            return checkMatchingPairs(diagonals);
        }
        function checkMatchingPairs(position){                                                                                                                                                                                                                      
            const counter = {
                0:0,
                1:0,
                2:0,
                4:0,
                'leftMatch':0,
                'rightMatch':0
            }

            if(position === "diagonal"){
                pairs.forEach((pair)=>{
                    counter[Number(pair[0][0]) + Number(pair[0][1])]++;
                    if(Number(pair[0][0]) + Number(pair[0][1]) === 2) counter['rightMatch']++;
                    if(Number(pair[0][0]) === Number(pair[0][1])) counter['leftMatch']++;
                });
            }

            if(typeof position === "number"){
                pairs.forEach((pair)=>{
                    counter[pair[0][position]]++;
                    
                });
            }
            
          
           
            if(counter[0] > 2 || counter[1] > 2 || counter[2] > 2) return true; // check rows/columns
            if(counter['leftMatch'] === 3) return true;
            if(counter['rightMatch'] === 3) return true;
            return false
        }
       

        const isWinner = function(){
            if(checkWinnerRows() || checkWinnerColumns() || checkWinnerDL()) return true;
            return false;
        }

        return {getSymbol,insertPair, getScore, increaseScore, isWinner,setName,getName,clearPairs}

    }

})();