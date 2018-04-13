// Coding Challenge #5

class Element {
    constructor(name, yearBuild){
        this.name = name;
        this.yearBuild = yearBuild;
    }
}

class Park extends Element {
    constructor(name, yearBuild, area, tree) {
        super(name, yearBuild)
        this.area = area;
        this.tree = tree;
    }
    
    //1. tree density of each park in the town
    calculateDensity(){
        let density = this.tree / this.area;
        console.log(`${this.name} has a tree density of ${density} per square km`);
    }
    
}

class Street extends Element {
    constructor(name, yearBuild, length, size=3) {
        super(name, yearBuild);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.yearBuild}, is a ${classification.get(this.size)} street`)
    }
}

const allParks = [
    new Park('Green Park', 1950, 0.2, 215),
    new Park('National Park', 1990, 2.9, 3541),
    new Park('Oak Park', 1950, 0.4, 949)
];

const allStreets = [ 
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergreen Street', 2008, 2.7, 2),
    new Street('4th Street', 2015, 0.8),
    new Street('Sunse Boulevard', 1982, 2.5, 5)
];

function calc(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0); 
    // [3,5,6], prev will be 0+3, next will be 3+5 etc. So we reduced all elements of array to a single value
    return [sum, sum / arr.length];
}

function reportParks(p){
    console.log(`----------Parks report--------------- `);
    //density 
    p.forEach(el => el.calculateDensity()); //loops through each element

    //average age 
    const ages = p.map(el => new Date().getFullYear() - el.yearBuild)
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

    //which park has more trees 
    const i = p.map(el => el.tree).findIndex(el => el >= 1000); //from current element we want to read tree property
    console.log(`${p[i].name} has more than 1000 trees`);
}

function reportStreets(s){
    console.log(`----------Streets report--------------- `);
    //total and average length of the town's streets 
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets havea total length of ${totalLength} km, with an average of ${avgLength} km.`);

    //classify sizes
    s.forEach(el => el.classifyStreet());

}

reportParks(allParks);
reportStreets(allStreets);

