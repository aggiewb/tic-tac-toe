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
    element.removeEventListener('click', handleClick);
}

function addCross(element){
    var cross = document.createElement('img');
    cross.setAttribute('src', 'media/cross.png');
    element.appendChild(cross);
    element.removeEventListener('click', handleClick);
}

function handleBoardClick(event){
    //event is the object that represents the event fired
    //target is an object that represents the element that fired the event
    //cannot use elements[i] since when the event is fired, i will always be outside of the elements' NodeList indexes
    addNought(event.target);
}

function handleSelectionClick(event){
    var userMarker = event.target.id;
    var selectionDiv = event.target.parentNode.parentNode;
    selectionDiv.innerHTML = "";
}

addElementListener(document.getElementsByTagName('div'));
