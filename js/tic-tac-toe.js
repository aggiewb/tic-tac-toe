function addElementListener(elements){
    for(var i = 1; i < elements.length; i++){
        //event is the object that represents the event fired
        //target is an object that represents the element that fire the event
        //cannot use elements[i].id since when the event is fired, i will always be outside of the elements NodeList indexes
        elements[i].addEventListener('click', function(event){addNought(event.target.id);});
    }
}

addElementListener(document.getElementsByTagName('div'));
