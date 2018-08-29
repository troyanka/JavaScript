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

function removeNote() { 

 }

function displayNote(id, myNote, chosenDate) {
    var savedNotes = document.getElementById('notes');
    var divForNote = document.createElement('div');

    divForNote.className = 'note';
    divForNote.innerHTML = myNote + " " + chosenDate;
    //vika - to check
    divForNote.setAttribute("data-note-id", id);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete note';
    deleteButton.className="delete-note";
    deleteButton.setAttribute("data-note-id", id);
    deleteButton.onclick = removeNote;
    //deleteButton.setAttribute("onclick", "deleteNote()");

    // var trashDIV = document.createElement("div");
    // trashDIV.innerHTML = "DELETE";
    // trashDIV.className = 'trash';
    // trashDIV.onclick = removeNote;
    
    divForNote.appendChild(deleteButton);

    savedNotes.appendChild(divForNote);
}

function removeNote(event){
    var noteToRemoveId = event.target.dataset.noteId;
    console.log(noteToRemoveId);

    var noteToRemoveDiv = event.target.parentElement;
    //var divToDelete = document.getElementsByTagName('div')['data-note-id' = noteToRemoveId];
    console.log(noteToRemoveDiv);
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

// var buttons = document.getElementsByClassName("delete-note");
// var buttonsNum = buttons.length;

// for(var i = 0; i< buttonsNum; i ++){
//     buttons[i].addEventListener
// }
