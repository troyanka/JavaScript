function process(arr) {
    return arr.reduce(function (processed, toProcess) {
        return processed.concat(Array.isArray(toProcess) ? process(toProcess) : toProcess);
    }, []);
}

var processedArray = process([1,2, [5, 6], [[35,45], 14]]);
console.log(processedArray);