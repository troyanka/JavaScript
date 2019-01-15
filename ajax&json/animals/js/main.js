var pageCounter = 1;
var btn = document.getElementById('getAnimals');
var animalContainer = document.getElementById('animal-info');

btn.addEventListener('click', function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);
    ourRequest.onload = function () {
        var outData = JSON.parse(ourRequest.responseText);
        renderHtml(outData);
    };
    ourRequest.send();
});

function renderHtml(data) {
    var htmlString = "";

    for (var i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + 'that likes to eat: ';

        for (var j = 0; j < data[i].foods.likes.length; j++) {
            if (j == 0) {
                htmlString += data[i].foods.likes[j];
            } else {
                htmlString += ' and ' + data[i].foods.likes[j];
            }
        }

        htmlString += '. Dislikes: ';

        for (var k = 0; k < data[i].foods.dislikes.length; k++) {
            if (k == 0) {
                htmlString += data[i].foods.dislikes[k];
            } else {
                htmlString += ' and ' + data[i].foods.dislikes[k];
            }
        }
    }

    htmlString += "</p>";

    animalContainer.insertAdjacentHTML('beforeend', htmlString);


    pageCounter++;

    if (pageCounter > 3) {
        btn.classList.add('hide-me');
    }
}


// https://learnwebcode.github.io/json-example/animals-1.json
// https://learnwebcode.github.io/json-example/animals-2.json
// https://learnwebcode.github.io/json-example/animals-3.json