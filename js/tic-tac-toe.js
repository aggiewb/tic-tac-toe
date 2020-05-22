var userMarker;

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
}

function addCross(element){
    var cross = document.createElement('img');
    cross.setAttribute('src', 'media/cross.png');
    element.appendChild(cross);
    element.removeEventListener('click', handleBoardClick);
    element.removeAttribute('class');
}

function handleBoardClick(event){
    //event is the object that represents the event fired
    //target is an object that represents the element that fired the event
    //cannot use elements[i] since when the event is fired, i will always be outside of the elements' NodeList indexes
    addNought(event.target);
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
    if(userMarker === 'cross'){
        addNought(computerMove);
    } else {
        addCross(computerMove);
    }
    computerMove.removeAttribute('class');
}


function initialMove(){
    var player = choosePlayer();
    if(player === "Computer"){
        computerMove();
    }
}

addElementListener(document.getElementsByTagName('div'));

