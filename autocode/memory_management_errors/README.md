# HW-for-Memory-management-errors

## TASK № 1

### Write a function called "cache". It will be a function wrapper, which takes a function and caches its results depending on the arguments, that were applied to the function.
```js
let anyFunction = function(firstArgument, secondArgument) {
	return firstArgument / secondArgument;  // just for example (any logic can be here)
 };

let cachedFunction = cache(anyFunction);
```
### Example:
```js
cachedFunction('foo', 'bar'); // complex function should be executed
cachedFunction('foo', 'bar'); // complex function should not be invoked again,
                      // instead the cached result should be returned
cachedFunction('foo', 'baz'); // should be executed,
            // because the method wasn't invoked before with these arguments
```
<hr>

## TASK № 2

### Develop “parseJSON” function that parses JSON strings. Use “try...catch” to catch incorrect JSON strings and notify client code about error by returning special value. If your function receives incorrect JSON string, it should return “null”; otherwise in should return parsed JSON.

### For example:
```
tryCatchParseJSON('{"name": "John", "age": 30, "isAdmin": false, "courses": ["html","css","js"], "wife": null}'); //=> <object>

tryCatchParseJSON('{name: John, age: 30, isAdmin: false, courses: ["html","css","js"], wife: null}'); //=> null
```
<hr>

## TASK № 3

### Develop “parseJSON” function that parses JSON strings. Use global error handler (window.onerror) to handle errors. Your function has to expect “name” and “company” properties in result object; throw an error, if these properties do not exist. If parser function receives incorrect JSON string, or some other error happens, your code should notify user about error via “console.log(...)”; otherwise it should return parsed JSON.

### For example:
```
windowParseJSON('{"name": "Johnny", "company": "EPAM"}'); //=> <object>

windowParseJSON('{name: John, company: EPAM}'); //=> <error>

windowParseJSON('{"name": "Johnny", "surname": "Bravo"}'); //=> <error>
```
<hr>