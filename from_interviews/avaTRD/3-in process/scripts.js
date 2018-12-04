
var allDivs = document.getElementsByTagName('div');
function appendChildren(decorateDivFunction){

       console.log(allDivs);
       console.log('-------------');
       console.log(allDivs.length);

        for(let i = 0; i < 10 ; i++){
            console.log("allDivs.length", allDivs.length);
            var divToAppend = (function(myi){
                    console.log("myi", myi);
                    var newDiv = document.createElement('div');
                    newDiv = decorateDivFunction(newDiv);
                    allDivs[myi].appendChild(newDiv);
            })(i);
            // console.log("divToAppend", divToAppend);
            
        }
}

//Example case
document.body.innerHTML = `
<div id="a">
   <div id="b">
   </div>
</div>`;

appendChildren(function(div){return div});
console.log(document.body.innerHTML);