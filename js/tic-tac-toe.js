var userMarker;
var isComputerTurn = false;

function addElementListener(elements){
    for(var i = 0; i < elements.length; i++){
        if(elements[i].id.includes('box')){
            elements[i].addEventListener('click', handleBoardClick);
        } else if(elements[i].id.includes('cross') || elements[i].id.includes('nought')){
            elements[i].addEventListener('click', handleSelectionClick);
        }
    }
}

function addNought(element){
    var nought = document.createElement('img');
    nought.setAttribute('src', 'media/nought.png');
    element.appendChild(nought);
    element.removeEventListener('click', handleBoardClick);
    element.removeAttribute('class');
    element.setAttribute('class', 'nought');
    var noughtElements = document.querySelectorAll('.nought');
    checkVictory(noughtElements);
}

function addCross(element){
    var cross = document.createElement('img');
    cross.setAttribute('src', 'media/cross.png');
    element.appendChild(cross);
    element.removeEventListener('click', handleBoardClick);
    element.removeAttribute('class');
    element.setAttribute('class', 'cross');
    var crossElements = document.querySelectorAll('.cross');
    checkVictory(crossElements);
}

function handleBoardClick(event){
    //event is the object that represents the event fired
    //target is an object that represents the element that fired the event
    //cannot use elements[i] since when the event is fired, i will always be outside of the elements' NodeList indexes
    if(userMarker === 'nought'){
        addNought(event.target);
    } else {
        addCross(event.target);
    }
    isComputerTurn = true;
    computerMove();
}

function handleSelectionClick(event){
    userMarker = event.currentTarget.id;
    var selectionDiv = event.currentTarget.parentNode; //outer div containing selection images
    var directionsPTag = document.querySelector('p'); //p element with directions
    directionsPTag.textContent = "Good Luck!";
    document.body.setAttribute('id', 'bodyAfter'); //adjust grid layout
    selectionDiv.innerHTML = ""; //remove outer div containing selection images
    document.getElementById('hide').setAttribute('id', 'game-board');
    initialMove();
}

function choosePlayer(){
    var players = ['You', 'Computer'];
    var firstPlayer = players[Math.floor(Math.random() * 2)];
    if(firstPlayer === 'You'){
        document.querySelector('p').textContent = firstPlayer + " move first!";
    } else {
        document.querySelector('p').textContent = firstPlayer + " has the first move!";
    }
    return firstPlayer;
}

function computerMove(){
    var unmarkedBoxes = document.getElementsByClassName('unmarked');
    var computerMove = unmarkedBoxes[Math.floor(Math.random() * unmarkedBoxes.length)]
    computerMove.removeAttribute('class');
    if(userMarker === 'cross'){
        addNought(computerMove);
    } else {
        addCross(computerMove);
    }
    isComputerTurn = false;
}


function initialMove(){
    var player = choosePlayer();
    if(player === "Computer"){
        isComputerTurn = true;
        computerMove();
    }
}

function checkVictory(markedElements){
    var winningElements = [['a-box', 'b-box', 'c-box'], ['d-box', 'e-box', 'f-box'], ['g-box', 'h-box', 'i-box'], //rows
                           ['a-box', 'd-box', 'g-box'], ['b-box', 'e-box', 'h-box'], ['c-box', 'f-box', 'i-box'], //columns
                           ['a-box', 'e-box', 'i-box'], ['c-box', 'e-box', 'g-box']]; //diagonals
    
    var markedIds = [];
    for(var i = 0; i < markedElements.length; i++){
        markedIds.push(markedElements[i].id);
    }
    console.log(isComputerTurn);
    console.log(markedIds);
    for(var i = 0; i < winningElements.length; i++){
        var count = 0;
        for(var j = 0; j < 3; j++){
            if(markedIds.includes(winningElements[i][j])){
                count++;
            }
        }

        if(count === 3 && isComputerTurn){
            console.log("computer won!");
            document.querySelector('p').textContent = "The computer wins!";
        } else if(count === 3 && !isComputerTurn){
            document.querySelector('p').textContent = "You win!";
        }
    }
}

addElementListener(document.getElementsByTagName('div'));

