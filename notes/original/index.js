var notesElem = document.getElementById("notes");
var date = document.getElementById("date");
var content = document.getElementById("textarea");
var notesArray = [];


init();
// display all existing notes
function init() {
    if( localStorage.getItem( 'notes' ) !== null ) {
        // parse the notes string into array of objects
        notesArray = JSON.parse( localStorage.getItem( 'notes' ) );
        for( var i = 0; i < notesArray.length; i++ ){
            displayNote( notesArray[i] );
        }
    }
}
// note object
function Note( _id, _text, _date) {
    this.id = _id;
    this.text = _text;
    this.date = _date;
}

function saveNote() {
    var GivenText = content.value;
    var GivenDate = date.value;
    var errorMsg = '';
    if( GivenText.length === 0  ) {
        errorMsg = 'Please enter your note';
    } else if( GivenDate.length === 0  ) {
        errorMsg = 'Please enter a valid Date ( e.g mm/dd/yyyy )';
    }

    var errorObj = document.getElementById("error");
    if( errorMsg.length > 0 ){
        errorObj.innerHTML = errorMsg;
        errorObj.style.display = 'block';
    } else {
        var noteID = 1;
        if( notesArray.length > 0 ) {
            noteID = notesArray[notesArray.length - 1].id + 1;
        }
        var noteObject = new Note( noteID, GivenText, GivenDate );
        displayNote( noteObject );
        saveToStorage( noteObject );

        content.value = '';
        date.value = '';
        errorObj.innerHTML = '';
        errorObj.style.display = 'none';
    }

}

// save note to local storage
function saveToStorage( noteObject ) {
    if( localStorage.getItem( 'notes' ) !== null ) {
        // parse the notes string into array of objects
        notesArray = JSON.parse( localStorage.getItem( 'notes' ) );
    }
    notesArray.push( noteObject );
    // save the notes array as a string
    localStorage.setItem( 'notes', JSON.stringify( notesArray ) )
}

function displayNote( noteObject ) {
    //create div for text and time

    var noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.dataset.note_id = noteObject.id;
    setTimeout( function(){
        noteDiv.style.opacity = '1';
    }, 200 );


    var contentDiv = document.createElement("div");
    contentDiv.className = 'content';

    var textDIV = document.createElement("p");
    textDIV.innerHTML = noteObject.text;


    var dateDIV = document.createElement("div");
    dateDIV.innerHTML = noteObject.date;

    var trashDIV = document.createElement("div");
    trashDIV.innerHTML = "DELETE";
    trashDIV.className = 'trash';
    trashDIV.onclick = removeNote;


    contentDiv.appendChild( textDIV );
    contentDiv.appendChild( dateDIV );

    noteDiv.appendChild( contentDiv );
    noteDiv.appendChild( trashDIV );

    notesElem.appendChild( noteDiv );
}

function removeNote( event ) {
    // the parent of thue button is the note div
    var noteToRemove = event.target.parentNode;
    noteToRemove.style.opacity = 0;
    // remove from html
    setTimeout( function() {
        notesElem.removeChild( noteToRemove );
    }, 1000 );

    //console.log( 'HTML ELEM:', noteToRemove.dataset.note_id );

    // remove the note from the array notes
    for( var i = 0; i < notesArray.length ; i++ ){
        // console.log( notesArray[i].id );
        if( parseInt( noteToRemove.dataset.note_id ) === notesArray[i].id ) {
            notesArray.splice( i, 1 );
            break;
        }
    }
    console.log( notesArray );
    // save the notes array back to local storage
    localStorage.setItem( 'notes', JSON.stringify( notesArray ) );
}

