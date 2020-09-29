/******************************************************************************************************************
* @description          Primary file used by the index.html page to handle the logic for the Tic-Tac-Toe game.
* @createdDate          05/21/2020
* @author               Aggie Wheeler Bateman
*******************************************************************************************************************
* Modification Log
* Developer name        Date                Description of changes
* Steven Bateman        05/23/2020          Modified the computerMove function to check if the HardMode class's
*                                           isEnabled property is true and, if so, use that class's computerMove
*                                           logic to determine where to place the computer's marker
* Aggie Wheeler Bateman 05/24/2020          Add if/else block to checkVictory function for different calls of
*                                           gameOver function when HardMore.isEnabled
* Aggie Wheeler Bateman 07/03/2020          Update to use ES6 syntax and new Array function, and update to use
*                                           more functional programming
******************************************************************************************************************/
(function(){
    'use strict';
    //global variables to use in multiple functions
    let userMarker;
    let isComputerTurn = false;
    const pElementMessageToUser = document.querySelector('p');
    let isGameOver = false;

    //add element listeners to board and user marker selection selection
    function addElementListener(elements){
        Array.from(elements).forEach(function(element) {
            if(element.id.includes('box')){
                element.addEventListener('click', handleBoardClick);
            } else if(element.id.includes('cross') || element.id.includes('nought')){
                element.addEventListener('click', handleSelectionClick);
            } else if(element.type === 'button'){
                element.addEventListener('click', playAgain);
            }
        });
    }

    //add event listeners on page load
    addElementListener(document.getElementsByTagName('div'));
    addElementListener(document.getElementsByTagName('button'));

    function handleSelectionClick(event){
        userMarker = event.currentTarget.id;
        const selectionDiv = event.currentTarget.parentNode; //outer div containing selection images
        pElementMessageToUser.textContent = 'Good Luck!';
        document.body.setAttribute('id', 'body-after'); //adjust grid layout to remove selection grid
        selectionDiv.innerHTML = ''; //remove outer div containing selection images
        document.getElementById('board-hide').setAttribute('id', 'game-board');
        HardMode.toggleHardModeSliderVisibility();
        initialMove();
    }

    function chooseFirstPlayer(){
        const players = ['You', 'Computer'];
        const firstPlayer = players[Math.floor(Math.random() * 2)]; //randomly chooses which player will go first
        if(firstPlayer === 'You'){
            pElementMessageToUser.textContent = firstPlayer + ' move first!';
        } else {
            pElementMessageToUser.textContent = firstPlayer + ' has the first move!';
        }
        return firstPlayer;
    }

    //function to be called after user marker selection is made
    function initialMove(){
        const player = chooseFirstPlayer();
        if(player === 'Computer'){
            isComputerTurn = true;
            computerMove();
        }
    }

    function handleBoardClick(event){
    //cannot use elements[i] since when the event is fired, i will always be outside of the elements' NodeList indexes
        if(userMarker === 'nought'){
            addMark(event.target, 'nought');
        } else {
            addMark(event.target, 'cross');
        }
        isComputerTurn = true; //set computer to play after user plays
        //check to see if a win has been achieved before the computer makes its move,
        //and prevent it from doing so if there is a win or draw
        if(isGameOver){
            return;
        }
        computerMove();
    }

    function computerMove(){
        let computerMove;
        if (!HardMode.isEnabled) {
            const unmarkedBoxes = document.getElementsByClassName('unmarked'); //all div boxes that haven't been used
            computerMove = unmarkedBoxes[Math.floor(Math.random() * unmarkedBoxes.length)]; //selection of random unused div element box
        } else {
            computerMove = HardMode.computerMove();
        }
        if(userMarker === 'nought'){
            addMark(computerMove, 'cross');
        } else {
            addMark(computerMove, 'nought');
        }
        isComputerTurn = false; //set user to play after computer plays
    }

    //function to add either a cross or nought mark
    function addMark(element, mark){
        const markImageElement = createElement('img', 'src', `media/${mark}.png`);
        element.appendChild(markImageElement);
        element.removeEventListener('click', handleBoardClick);
        element.removeAttribute('class'); //remove class of 'unmarked'
        //check for victory after each marker placement
        element.setAttribute('class', mark);
        const markElements = document.querySelectorAll('.' + mark);
        checkVictory(markElements);
    }

    function checkVictory(markedElements){
    //check for a draw by looking to see if all elements have been marked;
        const winningElements = [['a-box', 'b-box', 'c-box'], ['d-box', 'e-box', 'f-box'], ['g-box', 'h-box', 'i-box'], //rows
            ['a-box', 'd-box', 'g-box'], ['b-box', 'e-box', 'h-box'], ['c-box', 'f-box', 'i-box'], //columns
            ['a-box', 'e-box', 'i-box'], ['c-box', 'e-box', 'g-box']]; //diagonals

        //adds all elements that have been marked of a players mark type to an array
        const markedIds = Array.from(markedElements).map(markedElement => markedElement.id);

        //checks each array in winningElement to see if one matches the markedIds
        for(let i = 0; i < winningElements.length; i++){
            let count = 0;
            for(let j = 0; j < 3; j++){
                if(markedIds.includes(winningElements[i][j])){
                    count++;
                }
            }

            //checks for a matching 3 array elements at the end of each winningElement array check
            if(count === 3 && isComputerTurn){
                if(HardMode.isEnabled){
                    gameOver('I win, inferior human.');
                } else {
                    gameOver('The computer wins!');
                }
                return;
            } else if(count === 3 && !isComputerTurn){
                gameOver('You win!');
                return;
            } else if(document.querySelectorAll('.unmarked').length === 0 && i === winningElements.length - 1){
                if(HardMode.isEnabled){
                    gameOver('Mediocre try, inferior human.');
                } else {
                    gameOver('It\'s a draw');
                }
            }
        }
    }

    //called when there is a winning condition or a draw
    function gameOver(userMessage){
        isGameOver = true;
        pElementMessageToUser.textContent = userMessage;
        document.querySelector('button').removeAttribute('id');
        HardMode.toggleHardModeSliderVisibility();
        removeListenerAfterWin();
    }


    function removeListenerAfterWin(){
        const unmarkedElements = Array.from(document.getElementsByClassName('unmarked'));
        unmarkedElements.forEach(unmarkedElement => unmarkedElement.removeEventListener('click', handleBoardClick));
    }

    //next three functions reset the board state, selection state, and adds/removes playAgain button which has an eventListener
    function playAgain(){
        document.querySelector('button').setAttribute('id', 'button-hide'); //remove play again button
        resetSelectionState();
        resetGameBoardState();
        addElementListener(document.getElementsByTagName('div')); //reapply board event listeners
        addElementListener(document.getElementsByTagName('button')); //apply replay button event listener

        const gameBoard = document.getElementById('game-board'); //remove game board
        gameBoard.removeAttribute('id');
        gameBoard.setAttribute('id', 'board-hide');

        isGameOver = false;
    }

    function resetSelectionState(){
        pElementMessageToUser.textContent = 'Select cross or nought:'; //add selection div and contents
        document.body.removeAttribute('id');
        const selectionDiv = document.getElementById('selection');
        const crossImageElement = createElement('div', 'id', 'cross');
        const noughtImageElement = createElement('div', 'id', 'nought');
        crossImageElement.appendChild(createElement('img', 'src', 'media/cross.png'));
        noughtImageElement.appendChild(createElement('img', 'src', 'media/nought.png'));
        selectionDiv.appendChild(crossImageElement);
        selectionDiv.appendChild(noughtImageElement);
    }

    function resetGameBoardState(){
        const crossElements = document.getElementsByClassName('cross');
        //use a while loop since getElementsByClassName is a LIVE NodeList and it dynamically changes the list each time setAttribute changes the class value
        while(crossElements.length){
            crossElements[0].setAttribute('class', 'unmarked');
        }

        const noughtElements = document.getElementsByClassName('nought');
        //use a while loop since getElementsByClassName is a LIVE NodeList and it dynamically changes the list each time setAttribute changes the class value
        while(noughtElements.length){
            noughtElements[0].setAttribute('class', 'unmarked');
        }

        const resetGameBoardElements = document.getElementsByClassName('unmarked');
        for(let i = 0; i < resetGameBoardElements.length; i++){
            if(resetGameBoardElements[i].querySelector('img') !== null){
                resetGameBoardElements[i].removeChild(resetGameBoardElements[i].querySelector('img'));
            }
        }
    }

    function createElement(type, attributeKey, attributeValue){
        const element = document.createElement(type);
        element.setAttribute(attributeKey, attributeValue);
        return element;
    }

    const date = new Date();
    document.querySelector('footer').innerHTML = 'Aggie Wheeler Bateman &copy; ' +  date.getFullYear() + '<a href=\'https://www.aggiewb.com\' target=\'_blank\'>Personal Portfolio</a>';
})();