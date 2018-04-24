// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
    //Solution 1
    // const arr = str.split('');
    // arr.reverse();
    // return arr.join('');

    //Solution 2
    // return str.split("").reverse().join(""); //chain method
    //turn string into an array, call reverse method on the array, join the array back into a string

    //Solution 3
    // let reversed = '';

    // for(let character of str){
    //     reversed = character + reversed; 
    // }
    // return reversed; 

    //Solution 4
    debugger;
    return str.split('').reduce((rev, char) => char + rev, ''); //this will wow the interviewer
    //reduce is a helper method reduces the array to a single value
}

reverse('asdf');

module.exports = reverse;
