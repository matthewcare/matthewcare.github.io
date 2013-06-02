var counter = 0;
var limit = 5;
var childCounter = 1;
var inputBoxCounter = 1;

function addTopLevel(){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }       
     else {
          var buttonValue = document.getElementById('addFieldBtn');
          buttonValue.setAttribute('value', 'Add another field');
          addInputAndButton('formInputs', 'anchortopLevel'+ (counter + 1), 'Top Level');
          createList('topLevel'+ (counter + 1), 'mainList')
          counter++;   
     }
}

function addInputAndButton(insertLocation, anchorId, level) {
     var newInput = document.createElement('p');
     var newBtn = document.createElement('input');
     var insertLocation = document.getElementById(insertLocation);
     var newInputField = document.createElement('input');

     newBtn.setAttribute('type', 'button');
     newBtn.setAttribute('value', 'Add sub level');
     newBtn.setAttribute('id', 'subLevelButton' + (counter + 1));
     newBtn.setAttribute('onclick', 'addSubLevel("topLevel' + (counter + 1) + '", "topLevelInput'+ (counter + 1) +'")');

     newInputField.setAttribute('type', 'text');
     newInputField.setAttribute('onkeyup', 'copyText("inputBox' + inputBoxCounter + '", "' + anchorId + '")');
     newInputField.setAttribute('id', 'inputBox' + inputBoxCounter);

     newInput.innerHTML = level + " " + (counter + 1) + ": ";
     newInput.setAttribute('id', 'topLevelInput' + (counter + 1) + 'box');

     newInput.appendChild(newInputField)
     newInput.appendChild(newBtn);
     insertLocation.appendChild(newInput);    

     inputBoxCounter++;
}

function createList(elementId, insertLocation){
     var newList = document.createElement('li');
     var insertLocation = document.getElementById(insertLocation)
     newList.setAttribute('id', elementId);
     insertLocation.appendChild(newList);
     createAnchor(elementId);
}

function createAnchor(elementId){
     var insertLocation = document.getElementById(elementId);
     var newAnchor = document.createElement('a');
     newAnchor.setAttribute('id', 'anchor' + elementId);
     newAnchor.setAttribute('href', '#');
     insertLocation.appendChild(newAnchor);
     newAnchor.innerHTML = "Change Me";
}

function addSubLevel(buttonId, parentId){
     var checkNoChildren = document.createElement('ul');
     var level = document.getElementById(buttonId);
     checkNoChildren.setAttribute('id', 'ul' + buttonId);

     if (level.children.length < 2) {
          level.setAttribute('id', parentId);
          level.appendChild(checkNoChildren);
          createList('sub' + childCounter, 'ul' + buttonId);
          addInputAndButton(parentId + 'box',  'anchorsub'+ childCounter, 'Sub Level');
          childCounter++;
     }
     else {
          createList('sub' + childCounter, 'ul' + buttonId);
          addInputAndButton(parentId + 'box', 'anchorsub'+ childCounter, 'Sub Level');
          childCounter++
     }
}

function copyText(textBoxId, anchorId){
     var source = document.getElementById(textBoxId);
     var destination = document.getElementById(anchorId);
     if (source.value == "") {
          destination.innerHTML = "Change Me";
     }
     else {
          destination.innerHTML = source.value;
     }
}