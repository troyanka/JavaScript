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
let firstSelectedId;
// console.log("firstSelectedId", typeof firstSelectedId);

function selectCard(e) {
    let clicked = event.target;
    
    let selectedId = clicked.dataset.cardId;
    console.log("selectedId", selectedId);

    // Do not allow the container div itself to be selected; only select divs inside
    if(clicked.className == 'cards'){return;}

    if(counter < 2){

        if(typeof firstSelectedId != "undefined"){ 
            console.log(firstSelectedId, selectedId);
            if(firstSelectedId == selectedId){
              var selectedCards = document.querySelectorAll(`[data-card-id='${firstSelectedId}']`);
              selectedCards.forEach(card => {
                 card.style.visibility = 'hidden';
                 firstSelectedId;
              });
            }
        }
        else firstSelectedId = selectedId;

        counter++;
        // Add selected class
        clicked.classList.add('selected');
    }
  
}

