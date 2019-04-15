// const sum = (a : number, b : number) => {
//     return a + b;
// }
// const answer = sum(1, 5);

// console.log(answer);

// Types
// boolean
let isBoolean: boolean = true;

// number
let aNumber: number = 30;

//string
let aString: string = 'yellow';
let favouriteQuote: string = `I'm not old, I'm only ${aNumber}`;

// Arrays
let somePets: string[] = ['dog', 'cat', 'mouse'];
let somePets2: Array<string> = ['dog', 'cat', 'horse'];

// Object
let wizard: object = {
    a: 'John'
}

// null and undefined
let notDefined: undefined = undefined;
let aNull: null = null;


// Tuple
let aTuple: [string, number];
aTuple = ['basetball', 5];

// Enum
enum Size { Small = 1, Medium = 2, Large = 3}
let aSize: string = Size[2];
let aSize2: number = Size.Small;
let aSize3: Size = Size.Large;
console.log(aSize, aSize2, aSize3);


// Any --- !!!!!! BE CAREFUL, primarily useful when first switching to typescript.
let anyType: any = 'is an any type';
anyType = 5;
anyType = Size.Small;
anyType = aTuple;

// void, function doesn't return anything.
let sing = (): void => {
    console.log('lalala')
}

// never, a function never returns/ cannot have reachable endpoint, and a variable under a type guard is never true.
let error = (): never => {
    throw Error('an error');
}

// interface, name can be used anywhere
interface RobotArmy {
    count: number,
    type: string,
    magic?: string // ? marks it as optional.
}

// similar but minor differences with primarily with union merge and extending. Also no declaration merging.
type RobotArmy2 = {
    count: number,
    type: string,
    magic: string
}

let fightRobotArmy = (robots: RobotArmy) => {
    console.log(robots.count + ' robots fights');
}

let fightRobotArmy3 = (robots: RobotArmy2) => {
    console.log(robots.count + ' robots fights');
}


// same as above
let fightRobotArmy2 = (robots: {count: number, type: string, magic: string}) => {
    console.log(robots.count + ' robots fight!');
}

// Doesn't need magic as it's optional.
fightRobotArmy({count: 3, type:'a'})
// needs magic as isn't not option in RobotArmy2
fightRobotArmy2({count: 3, magic:'m', type:'a'})


// Type assertions, allows you to override a type.
interface Dogs {
    count: number,
    type: string,
    magic: string
}
// Dangerous, be careful about using.
let dog = {} as Dogs;
dog.count;



// Function
let fightRobotArmy4 = (robots: RobotArmy): void => {
    console.log(robots.count + ' robots fights');
}
let fightRobotArmy5 = (robots: {count: number, type: string, magic: string}): number => {
    console.log(robots.count + ' robots fight!');
    return 1;
}

// Classes
class Animal {
    private sing: string = 'lalala';
    
    constructor(sound: string) {
        this.sing = sound;
    }
    
    greet(): string {
        return `animal sing ${this.sing}`;
    }
}

let lion = new Animal("roar");
// doesn't work with private.
// console.log(lion.sing);
console.log(lion.greet());


// Union type
let confused: string | number = 'a';
confused = 0;

// type inference
let x = 3;
// does not work as it infers x is a number.
//x = 's'