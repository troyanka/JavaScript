var ul = document.querySelector('ul');

ul.addEventListener('click', function(event) {

    if( event.target.tagName == 'BUTTON' ){
        if( event.target.className == 'up' ){
            var li = event.target.parentNode;
            var prev = li.previousElementSibling;
            if( prev ) {
                ul.insertBefore(li, prev);
            }
        } else if( event.target.className == 'down'){
            var li = event.target.parentNode;
            var next = li.nextElementSibling;
            if( next ) {
                ul.insertBefore(next, li);
            }
        }
    }

});