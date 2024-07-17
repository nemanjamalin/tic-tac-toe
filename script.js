let game = (function(){

    //initialize players
    playerX  = createPlayer('X');
    playerO  = createPlayer('O');

    //currentPlayer
    let currentPlayer = playerX;

    //cahce DOM
    const gameContainer = document.querySelector('.container');
    const optionX = document.querySelector('.playerX');
    const optionO = document.querySelector('.playerO');


    //bind events
   gameContainer.addEventListener('click',renderSymbol);


   //events
    function renderSymbol(event){
        const cell = event.target;
        const pair = cell.dataset.cordinate.split();
        if(cell.innerHTML === ""){
            cell.innerHTML = `<h1>${currentPlayer.getSymbol()}</h1>`;
            console.log(currentPlayer.insertPair(pair));
            checkWinner(currentPlayer);
            switchCurrentPlayer();
        }
    }

    function switchCurrentPlayer(){
        currentPlayer === playerX ? currentPlayer = playerO : currentPlayer = playerX;
    }

    function checkWinner(currentPlayer){
        if(currentPlayer.isWinner()){
            currentPlayer.increaseScore();
            alert(`${currentPlayer.getSymbol()} is a winner!`);
            gameContainer.removeEventListener("click", renderSymbol); 
        }
    }

    //create player object
    function createPlayer(symbol){
        //properties
        const pairs = [];

        let score = 0;
        const columns = 0;
        const rows = 1;
        const leftDL = 'LEFT';

        //setters

        const increaseScore = function(){
            score++;
        }
        const insertPair = (pair) => {
            pairs.push(pair);
            return pairs;
        }

        //getters
        const getScore = () => score;

        const getSymbol = () => symbol;

        //conditionals

        const checkWinnerColumns = function(){
            return checkMatchingPairs(columns);
        }

        const checkWinnerRows = function(){
           return checkMatchingPairs(rows);
        }
        const checkWinnerLeftDL = function(){
            return checkMatchingPairs(leftDL);
        }
        function checkMatchingPairs(position){                                                                                                                                                                                                                      
            const counter = {
                0:0,
                1:0,
                2:0,
                4:0
            }

            if(position === "LEFT"){
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
            return false
        }
       

        const isWinner = function(){
            if(checkWinnerRows() || checkWinnerColumns() || checkWinnerLeftDL()) return true;
            return false;
        }

        return {getSymbol,insertPair, getScore, increaseScore, isWinner}

    }

})();