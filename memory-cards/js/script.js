var cards = [
    {
        id: 1,
        name: "card a",
        image: 'card-a.jpg'
    },
    {
        id: 2,
        name: "card b",
        image: 'card-b.jpg'
    },
    {
        id: 3,
        name: "card c",
        image: 'card-c.jpg'
    }
];

var cardsContainer = document.querySelector('.cards');

init();

function init() {
  for(var i= 0; i < cards.length; i++) {
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.setAttribute('data-card-id', cards[i].id);
    cardsContainer.appendChild(cardDiv);
  }
}

function runMe() {
    for( var i = 0; i < 3; i++ ){
        setTimeout( function() {
            console.log( i );
        }, 1000 );
    }
}
runMe();