
function registerHAndlers(){
    var as = document.getElementsByTagName('a');
    for(var i = 0; i < as.length; i++){
        (function (innerI){
            as[innerI].onclick = function(){
                alert(innerI);
                return false;
            }
        })(i);
    }
}
registerHAndlers();