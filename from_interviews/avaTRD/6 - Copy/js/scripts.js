/*function process(arr) {
    return arr.reduce(function (processed, toProcess) {
        return processed.concat(Array.isArray(toProcess) ? process(toProcess) : toProcess);
    }, []);
}

var arr = process([1,2, [4,5]]);
console.log(arr);*/

/*var a = {},
    b = { key: 'b'},
    c = { key: 'c'}


console.log(a[b]);
a[b] = 123;
a[c] = 456;
console.log("a[c]", a[c]);
console.log("a", a);
console.log(a[b]);*/


function add(x){
    return function(y){
      return x + y;
    };
  }
  
  var addTwo = add(2);
  
  console.log(addTwo(4)); // true
  console.log(add(3)(4)); // true
