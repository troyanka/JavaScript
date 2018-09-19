// display all existing notes
function init() {
    if(localStorage.getItem('notes') !== null ){
        var existingNotes = JSON.parse(localStorage.getItem('notes'));

        existingNotes.forEach(function(note) {
            displayNote(note.id, note.text, note.date);
        });
    }
}
init();


function addNote(){
    var myNote = document.getElementById('myNote').value;
    var chosenDate = document.querySelector('input[type="date"]').value;

    var id= saveToLS(myNote, chosenDate);
    //console.log(id);
    displayNote(id, myNote, chosenDate);

}

function displayNote(id, myNote, chosenDate) {
    var savedNotes = document.getElementsByClassName('notes')[0];
    var divForNote = document.createElement('div');

    divForNote.className = 'note';
    divForNote.innerHTML = myNote + " " + chosenDate;
    divForNote.setAttribute("data-note-id", id);

    //create delete button and add to the DOM
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete note';
    deleteButton.className="delete-note";
    deleteButton.setAttribute("data-note-id", id);
    deleteButton.onclick = removeNote;
    divForNote.appendChild(deleteButton);

    savedNotes.appendChild(divForNote);
}

function removeNote(event){
    var noteToRemoveId = event.target.dataset.noteId;
    console.log(noteToRemoveId);

    //delete the div from the Local storage
    var existingNotes = JSON.parse(localStorage.getItem('notes'));

    var indexOfRemoverElem = existingNotes.findIndex(obj => obj.timeStamp == noteToRemoveId);

    console.log(existingNotes);
    console.log('index to delte:', indexOfRemoverElem);
    var result = existingNotes.find(obj => {
        return obj.timeStamp == noteToRemoveId
    })
    console.log("result", result);
    existingNotes.splice(indexOfRemoverElem, 1);
    console.log("after delte", existingNotes);

    localStorage.setItem('notes', JSON.stringify(existingNotes));

    //delete the div from the DOM
    var noteToRemoveDiv = event.target.parentElement.remove();
    
}

function saveToLS(noteText, date) {
    var timeStamp = new Date().getTime();
    if(localStorage.getItem('notes') !== null ){
        var existingNotes = JSON.parse(localStorage.getItem('notes'));
        existingNotes.push( { text: noteText, date, timeStamp } );
        localStorage.setItem('notes', JSON.stringify(existingNotes));
    }
    else{
        var newNote = [];
        newNote.push( { text: noteText, date, timeStamp } );
        localStorage.setItem('notes', JSON.stringify(newNote) );
    }
        // should return the id
    return timeStamp;
}