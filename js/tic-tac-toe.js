//global variables to use in mutiple functions
var userMarker;
var isComputerTurn = false;

//add element listeners to board and user marker selection selection
function addElementListener(elements){
    for(var i = 0; i < elements.length; i++){
        if(elements[i].id.includes('box')){
            elements[i].addEventListener('click', handleBoardClick);
        } else if(elements[i].id.includes('cross') || elements[i].id.includes('nought')){
            elements[i].addEventListener('click', handleSelectionClick);
        }
    }
}

//add event listeners on page load
addElementListener(document.getElementsByTagName('div'));

function handleSelectionClick(event){
    userMarker = event.currentTarget.id;
    var selectionDiv = event.currentTarget.parentNode; //outer div containing selection images
    document.querySelector('p').textContent = "Good Luck!";
    document.body.setAttribute('id', 'bodyAfter'); //adjust grid layout to remove selection grid
    selectionDiv.innerHTML = ""; //remove outer div containing selection images
    document.getElementById('hide').setAttribute('id', 'game-board');
    initialMove();
}

function chooseFirstPlayer(){
    var players = ['You', 'Computer'];
    var firstPlayer = players[Math.floor(Math.random() * 2)]; //randomly chooses which player will go first
    if(firstPlayer === 'You'){
        document.querySelector('p').textContent = firstPlayer + " move first!";
    } else {
        document.querySelector('p').textContent = firstPlayer + " has the first move!";
    }
    return firstPlayer;
}

//function to be called after user marker selection is made
function initialMove(){
    var player = chooseFirstPlayer();
    if(player === "Computer"){
        isComputerTurn = true;
        computerMove();
    }
}

function handleBoardClick(event){
    //event is the object that represents the event fired
    //target is an object that represents the element that fired the event
    //cannot use elements[i] since when the event is fired, i will always be outside of the elements' NodeList indexes
    if(userMarker === 'nought'){
        addMark(event.target, 'nought');
    } else {
        addMark(event.target, 'cross');
    }
    isComputerTurn = true; //set computer to play after user plays
    computerMove();
}

function computerMove(){
    var unmarkedBoxes = document.getElementsByClassName('unmarked'); //all div boxes that haven't been used
    var computerMove = unmarkedBoxes[Math.floor(Math.random() * unmarkedBoxes.length)] //selection of random unused div element box
    if(userMarker === 'nought'){
        addMark(computerMove, 'cross');
    } else {
        addMark(computerMove, 'nought');
    }
    isComputerTurn = false; //set user to play after computer plays
}

//function to add either a cross or nought mark
function addMark(element, mark){
    var markImageElement = document.createElement('img');
    markImageElement.setAttribute('src', 'media/' + mark + '.png');
    element.appendChild(markImageElement);
    element.removeEventListener('click', handleBoardClick);
    element.removeAttribute('class'); //remove class of 'unmarked'
    //check for victory after each marker placement
    element.setAttribute('class', mark);
    var markElements = document.querySelectorAll('.' + mark);
    checkVictory(markElements);
}

function checkVictory(markedElements){
    var winningElements = [['a-box', 'b-box', 'c-box'], ['d-box', 'e-box', 'f-box'], ['g-box', 'h-box', 'i-box'], //rows
                           ['a-box', 'd-box', 'g-box'], ['b-box', 'e-box', 'h-box'], ['c-box', 'f-box', 'i-box'], //columns
                           ['a-box', 'e-box', 'i-box'], ['c-box', 'e-box', 'g-box']]; //diagonals
    
    var markedIds = [];

    //adds all elements that have been marked of a players mark type passed in to an empty array
    for(var i = 0; i < markedElements.length; i++){
        markedIds.push(markedElements[i].id);
    }
    
    //checks each array in winningElement to see if one matches the markedIds
    for(var i = 0; i < winningElements.length; i++){
        var count = 0;
        for(var j = 0; j < 3; j++){
            if(markedIds.includes(winningElements[i][j])){
                count++;
            }
        }

        //checks for a matching 3 array elements at the end of each winningElement array check
        if(count === 3 && isComputerTurn){
            console.log("computer won!");
            document.querySelector('p').textContent = "The computer wins!";
        } else if(count === 3 && !isComputerTurn){
            document.querySelector('p').textContent = "You win!";
        }
    }
}

