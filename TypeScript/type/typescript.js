// const sum = (a : number, b : number) => {
//     return a + b;
// }
// const answer = sum(1, 5);
// console.log(answer);
// Types
// boolean
var isBoolean = true;
// number
var aNumber = 30;
//string
var aString = 'yellow';
var favouriteQuote = "I'm not old, I'm only " + aNumber;
// Arrays
var somePets = ['dog', 'cat', 'mouse'];
var somePets2 = ['dog', 'cat', 'horse'];
// Object
var wizard = {
    a: 'John'
};
// null and undefined
var notDefined = undefined;
var aNull = null;
// Tuple
var aTuple;
aTuple = ['basetball', 5];
// Enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
var aSize = Size[2];
var aSize2 = Size.Small;
var aSize3 = Size.Large;
console.log(aSize, aSize2, aSize3);
// Any --- !!!!!! BE CAREFUL, primarily useful when first switching to typescript.
var anyType = 'is an any type';
anyType = 5;
anyType = Size.Small;
anyType = aTuple;
// void, function doesn't return anything.
var sing = function () {
    console.log('lalala');
};
// never, a function never returns/ cannot have reachable endpoint, and a variable under a type guard is never true.
var error = function () {
    throw Error('an error');
};
var fightRobotArmy = function (robots) {
    console.log(robots.count + ' robots fights');
};
var fightRobotArmy3 = function (robots) {
    console.log(robots.count + ' robots fights');
};
// same as above
var fightRobotArmy2 = function (robots) {
    console.log(robots.count + ' robots fight!');
};
// Doesn't need magic as it's optional.
fightRobotArmy({ count: 3, type: 'a' });
// needs magic as isn't not option in RobotArmy2
fightRobotArmy2({ count: 3, magic: 'm', type: 'a' });
// Dangerous, be careful about using.
var dog = {};
dog.count;
// Function
var fightRobotArmy4 = function (robots) {
    console.log(robots.count + ' robots fights');
};
var fightRobotArmy5 = function (robots) {
    console.log(robots.count + ' robots fight!');
    return 1;
};
// Classes
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = 'lalala';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "animal sing " + this.sing;
    };
    return Animal;
}());
var lion = new Animal("roar");
// doesn't work with private.
// console.log(lion.sing);
console.log(lion.greet());
// Union type
var confused = 'a';
confused = 0;
// type inference
var x = 3;
// does not work as it infers x is a number.
//x = 's'
