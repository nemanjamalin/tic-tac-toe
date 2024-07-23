let game = (function(){

    //initialize players
    playerX  = createPlayer('X');
    playerO  = createPlayer('O');

    //initialize default names
    playerX.setName('player1');
    playerO.setName('player2');

    //currentPlayer
    let currentPlayer = playerX;

    //cahce DOM
    const gameContainer = document.querySelector('.container');
    const startingPlayerOptions = document.querySelector('.options');
    const optionX = document.querySelector('.playerX');
    const optionO = document.querySelector('.playerO');
    const nameInput = document.querySelector('.names');

    //bind events
   gameContainer.addEventListener('click',renderSymbol);
   startingPlayerOptions.addEventListener('click',chooseStartingPlayer);
   nameInput.addEventListener('keydown',setPlayerName);


   //events
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
        if(option.innerHTML === "X"){
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
            gameContainer.removeEventListener("click", renderSymbol); 
        }
    }

    function setPlayerName(event){
        const keyCode = event.keyCode;
        const rightKeyCode = keyCode === 13;
        const playerNameInput = event.target;
        const name = playerNameInput.value || playerNameInput.placeholder;


        if(playerNameInput.classList.contains('nameX') && rightKeyCode){
            playerX.setName(name);
            playerNameInput.blur();
            playerNameInput.classList.add('non-editable');
        } 
        if(playerNameInput.classList.contains('nameO') && rightKeyCode){
            playerO.setName(name);
            playerNameInput.blur();
            playerNameInput.classList.add('non-editable');
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
                4:0
            }

            if(position === "diagonal"){
                pairs.forEach((pair)=>{
                    counter[Number(pair[0][0]) + Number(pair[0][1])]++;
                });
            }

            if(typeof position === "number"){
                pairs.forEach((pair)=>{
                    counter[pair[0][position]]++;
                    
                });
            }
            
          
           
            if(counter[0] > 2 || counter[1] > 2 || counter[2] > 2) return true; // check rows/columns
            if(counter[0] === 1 && counter[2] === 1 && counter[4] === 1) return true;
            if(counter[2] === 3) return true;
            return false
        }
       

        const isWinner = function(){
            if(checkWinnerRows() || checkWinnerColumns() || checkWinnerDL()) return true;
            return false;
        }

        return {getSymbol,insertPair, getScore, increaseScore, isWinner,setName,getName}

    }

})();