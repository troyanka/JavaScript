const banners = [
    {
        id: 1,
        'img' : 'https://www.w3schools.com/howto/img_nature_wide.jpg',
        'title': '1 Banner'
    },
    {
        id: 2,
        'img' : 'https://www.w3schools.com/howto/img_snow_wide.jpg',
        'title': '2 Banner'
    },
    {
         id: 3,
        'img' : 'https://www.w3schools.com/howto/img_lights_wide.jpg',
        'title': '3 Banner'
    },
    {
        id: 4,
       'img' : 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
       'title': '4 Banner'
   }
];

let slideIndex = 1;
const firstToBeShown = banners.find( item => item.id == slideIndex);
const arrows = document.querySelectorAll('.arrow');
const dots = document.querySelector('.dots');

function showSlider(  ) {
    const temp = banners.find( item => item.id == slideIndex);
    dots.querySelector('span.relevantDot') && dots.querySelector('span.relevantDot').classList.remove('relevantDot');
    dots.querySelector('.relevantDot') && dots.querySelector('.relevantDot').classList.remove('.relevantDot');
    const dot = dots.querySelectorAll('.dot')[slideIndex - 1];
    dot.classList.add("relevantDot");
    document.querySelector('.mySlides img').setAttribute('src', temp.img );
    document.querySelector('.mySlides .text').innerHTML = temp.title;
    document.querySelector('.mySlides .numberText #myNumber').innerHTML = temp.id;
    
    //console.log(dot);
}

function eventHandler ( e ){
    if (this.classList.contains('next')){
        slideIndex == banners.length ? slideIndex = 1 : slideIndex++;
    }
    else if(this.classList.contains('prev')){
        slideIndex == 1 ? slideIndex = banners.length : slideIndex--;
    }
    else if(this.classList.contains('dot')){
        slideIndex = this.dataset.position;   
    }

    showSlider();
}


document.querySelector('.mySlides .numberText #numberFrom').innerHTML = banners.length;


for (var i = 0; i< banners.length; i++){
    const dot = document.createElement('span');
    dot.dataset.position = i + 1;
    dot.className = 'dot';
    dots.appendChild( dot );
}

showSlider();

//Setting event listener for the arrows
arrows.forEach(arrow => arrow.addEventListener('click', eventHandler));
dots.querySelectorAll('span').forEach(dot => dot.addEventListener('click', eventHandler));


