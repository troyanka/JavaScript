// https://wsvincent.com/javascript-currying/ - need to read about it
function add(x){
    return function(y){
      return x + y;
    };
  }
  
  var addFew = add(add);
  
  console.log(addFew);
  var res = addFew(2)(3); 
  console.log(res);
//   console.log(addFew(1)(3)(7)); 
