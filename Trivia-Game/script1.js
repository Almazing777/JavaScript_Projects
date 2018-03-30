(function() {  // creates a new scope and doesn't interfere with other codes when copied, //IFEE method

function Question(question, choice, answer){
    this.question = question;
    this.choice = choice;
    this.answer = answer;
}

var one = new Question("What's my name?", ["Almas", "Aliya"], 0);
var two = new Question("What's the best programming language", ["JavaScript", "Python"], 0)
var three = new Question("What's the best front-end framework", ["React", "Angular", "Vue"], 1);
var four = new Question("What's name of the first programming language", ["C++", "Ruby", "Fortran", "Python", "Java"], 2);
var five = new Question("Is Java and Javascript the same thing?", ["Yes", "No"], 1);
var all_questions = [one, two, three, four, five];

function score() {
    var points = 0;
    return function(correct){
        if(correct){
            points++;
        }
        return points;
    }
}

var keepPoints = score();

Question.prototype.displayQuestion = function(){
    console.log(this.question);

    for(var i=0; i < this.choice.length; i++){
        console.log(i + ': ' + this.choice[i]);
    }
}

Question.prototype.checkAnswer = function (ans, callback) {
    var points; 

    if(ans === this.answer){
        console.log("correct");
        points = callback(true);
    } else {
        console.log('wrong');
        points = callback(false);
    }

    this.displayPoints(points);
}

Question.prototype.displayPoints = function(points){
    console.log('Your current score is: ' + points); 
    console.log('------------');
}



function nextQuestion(){

    var n = Math.floor(Math.random() * all_questions.length);
    all_questions[n].displayQuestion();
    var answer = prompt("please select correct answer"); 
    if(answer !== 'exit'){
        all_questions[n].checkAnswer(parseInt(answer), keepPoints); //parseint converts string into integer 
        nextQuestion();
    }
}

nextQuestion(); 

})();

// function constructor

// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job){
//     this.name = name; 
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }


// Person.prototype.calculateAge = function(){
//     console.log(2016 - this.yearOfBirth);
// }

// Person.prototype.lastName = "Smith";

// var john = new Person('John', 1990, 'teacher'); //instantiation
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge(); 

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);

//objects.create
// var personProto = {
//     calculateAge: function(){
//         console.log(2016 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//     name: { value: 'Jane'},
//     yearOfBirth: { value: 1969 },
//     job: { value: 'designer'}
// })

// Primites vs objects

// var a = 23; 
// var b = a; 
// a = 46;
// console.log(a);
// console.log(b);

// var obj1 = {
//     name: 'John',
//     age: 26
// };
// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// //Functions 
// var age = 27;  // primitive - doesnt change 
// var obj = {
//     name: 'Jonas',
//     city: 'Lisbon'
// };

// function change(a, b) {
//     a = 30;
//     b.city = 'San Francisco';
// }

// change(age, obj);

// console.log(age);
// console.log(obj.city);

//passing functions as arguements
// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
//     var arrRes = [];
//     for(var i=0; i<arr.length; i++){
//         arrRes.push(fn(arr[i]));
//     }
//     return arrRes;
// }

// function calculateAge(el) {
//     return 2016 - el;
// }

// function isFullAge(el){
//     return el >= 18; 
// }

// function maxHeartRate(el){
//     if (el >= 18 && el <= 81){
//         return Math.round(206.9 - (0.67 * el));
//     } else {
//         return -1;
//     }
// }

// var ages = arrayCalc(years, calculateAge); //calback functions

// var fullAges = arrayCalc(ages, isFullAge);

// var rates = arrayCalc(ages, maxHeartRate);

// console.log(ages);
// console.log(rates);


// function returning functions  //first class functions
// function interviewQuestion(job){
//     if(job === 'designer'){
//         return function(name){ //anonymous function
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher'){
//         return function(name){
//             console.log('What subject do you teach, ' + name + '?'); 
//         }
//     } else {
//         return function(name){
//             console.log('hello' + name + ', what do you do?');
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher')
// var designerQuestion = interviewQuestion('designer')
// teacherQuestion('John');
// designerQuestion('John');
// designerQuestion('Mark');
// designerQuestion('Mike');

// interviewQuestion('teacher');

//IIFE immediately invoked functions 

// function game() {
//     var score = Math.random() * 10;
//     console.log(score >=5);
// }
// game();

//example of IIFE

// (function() {
//     var score = Math.random() * 10;
//     console.log(score >=5);
// })();

// // console.log(score);

// (function(goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >=5 - goodLuck);
// })(5);

//Closure

// function retirement(retirementAge){
//     var a = ' years left until retirement.';
//     return function(yearOfBirth){
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }

// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);

// retirementGermany(1990);
// retirementUS(1990);
// retirementUS(1990);

// retirement(66)(1990);

// function interviewQuestion(job) {
//     return function(name) {
//         if(job === 'designer') {
//             console.log(name + ', can you please explain what UX design is?');
//         } else if (job === 'teacher'){
//             console.log('What subject do you teach, ' + name + '?'); 
//         } else {
//             console.log('hello ' + name + ', what do you do?');
//         }
//     }
// }

// interviewQuestion('teacher')('John');
// interviewQuestion('designer')('Almas');
// interviewQuestion()('Aliya');

//Bind, call and apply

// var john = {
//     name: 'John',
//     age: 26,
//     job: 'teacher',
//     presentation: function(style, timeOfDay) {
//         if(style === 'formal'){
//             console.log("Good " + timeOfDay + " I'm a " + this.job + " and I'm " + this.age + " years old."); 
//         } else if ( style === 'friendly'){
//             console.log("Hey! What's up? I'm " + this.name + ", I'm a " + this.job + " and I'm " + this.age + " years old. Have a nice " + timeOfDay + ".");
//         }
//     }
// }

// var emily = {
//     name: "Emily",
//     age: 35,
//     job: 'designer'
// };

// john.presentation('formal', 'morning');

// john.presentation.call(emily, 'friendly', 'afternoon'); //method borrowing

// // john.presentation.apply(emily, ['afternoon']);

// var johnFriendly = john.presentation.bind(john, 'friendly'); // bind

// johnFriendly('morning');
// johnFriendly('night'); //currying technique. 

// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');

