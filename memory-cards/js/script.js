var cards = [
    {
        id: 1,
        name: "card a",
        image: '1.png'
    },
    {
        id: 2,
        name: "card b",
        image: '2.png'
    },
    {
        id: 6,
        name: "card c",
        image: '6.png'
    },
    {
        id: 7,
        name: "card c",
        image: '7.png'
    }
];

var cardsContainer = document.querySelector('.cards');

let duplicatedArray = cards.concat(cards);
duplicatedArray.sort(() => 0.5 - Math.random());

duplicatedArray.forEach(element => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.dataset.cardId = element.id;
    let backgroundImg = element.image;
    cardDiv.style.backgroundImage = `url(pic/${backgroundImg})`;
    cardsContainer.appendChild(cardDiv);
});

cardsContainer.addEventListener("click", selectCard);

let counter = 0;
let firstSelectedId = ' ';
let isAlreadySelected = false;
let secondSelectedId = ' ';
let delay = 200;
// console.log("firstSelectedId", typeof firstSelectedId);

function selectCard(e) {
    let clicked = event.target;
    
    let selectedId = clicked.dataset.cardId;
    //console.log("selectedId", selectedId);

    // Do not allow the container div itself to be selected; only select divs inside
    if(clicked.className == 'cards'){return;}

    if(counter < 2){
        counter++;

        if(counter === 1){
            firstSelectedId = selectedId;
        }
        else{
                secondSelectedId = selectedId; 
                if(clicked.classList.contains('selected')){
                    isAlreadySelected = !isAlreadySelected;
                } 
        }
        clicked.classList.add('selected');

        if(firstSelectedId != ' ' && secondSelectedId != ' '){
            if(firstSelectedId == secondSelectedId && !isAlreadySelected){
                //Same cards
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
             }
             else{
                //Different cards
                 setTimeout(resetGuesses, delay);
                 isAlreadySelected = !isAlreadySelected;
             }
        }
    }
  
}

const resetGuesses = () => {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(selectedItem=>{
                selectedItem.classList.remove('selected');
    });

    firstSelectedId, secondSelectedId = ' ';
    counter = 0;
}

const match = () => {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(selectedItem=>{
        selectedItem.classList.add('match');
     });
}