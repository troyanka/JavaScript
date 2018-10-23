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

cards.forEach(element => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.dataset.cardId = element.id;
    let backgroundImg = element.image;
    cardDiv.style.backgroundImage = `url(pic/${backgroundImg})`;
    

    console.log(backgroundImg);

    //cardDiv.appendChild(backgroundImg);
    cardsContainer.appendChild(cardDiv);
});




// init();

// function init() {
//   for(var i= 0; i < cards.length; i++) {
//     var cardDiv = document.createElement('div');
//     cardDiv.className = 'card-item';
//     cardDiv.setAttribute('data-card-id', cards[i].id);

//     var backgroundImg = document.createElement('img');
//     backgroundImg.setAttribute('src', 'pic/back.png');
//     cardDiv.appendChild(backgroundImg);
//     cardsContainer.appendChild(cardDiv);
//   }
// }

cardsContainer.addEventListener("click", showCard);

function showCard(e) {
    var cardId = event.target.parentElement.dataset.cardId;
    console.log(cardId);
    //var imgToShow = cards.cardId
    //console.log(imgToShow);
}

// function runMe() {
//     for( var i = 0; i < 3; i++ ){
//         setTimeout( function() {
//             console.log( i );
//         }, 1000 );
//     }
// }
// runMe();