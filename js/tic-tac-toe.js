function addElementListener(elements){
    for(var i = 1; i < elements.length; i++){
        elements[i].addEventListener('click', handleClick);
    }
}

function addNought(selectedElementId){
    var nought = document.createElement('img');
    nought.setAttribute('src', 'media/nought.png');
    var element = document.getElementById(selectedElementId);
    element.appendChild(nought);
    element.removeEventListener('click', handleClick);
}

function addCross(selectedElementId){
    var cross = document.createElement('img');
    cross.setAttribute('src', 'media/cross.png');
    var element = document.getElementById(selectedElementId);
    element.appendChild(cross);
    element.removeEventListener('click', handleClick);
}

function handleClick(event){
    //event is the object that represents the event fired
    //target is an object that represents the element that fire the event
    //cannot use elements[i].id since when the event is fired, i will always be outside of the elements NodeList indexes
    addNought(event.target.id);
}

addElementListener(document.getElementsByTagName('div'));
