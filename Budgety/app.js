// 1. add event handler 
// get input values
// add the new item to our data structures
// add the new item to the UI
// calculate budget 
// update the UI


//independent Controllers - no interraction, seperation of concerns.


//budget controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description; 
        this.value = value; 
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percetage = -1;
        }
    };


    Expense.prototype.getPercentages = function(){
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description; 
        this.value = value; 
    };

    var calculateTotal = function(type){
        var sum = 0; 
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
        
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, desc, val){
            var newItem, ID;

            //new id created
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id+1; 
            } else {
                ID = 0;
            }

            // new item based on 'inc', or 'exp' type
            if(type === 'exp'){ 
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, desc, val);
            }

            //push into our data strcture
            data.allItems[type].push(newItem);

            //return the new element
            return newItem; 
        },

        deleteItem: function(type, id){
            var ids, index;

            var ids = data.allItems[type].map(function(current){ //map return brand new array
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){

            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; 
            }
        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentages();
            });
            return allPerc;
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    };
})();



//UI controller
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    
    var formatNumber = function(num, type) {
        num = Math.abs(num);
        num = num.toFixed(2); //converts into objects and puts 2 decimal numbers

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length); //input 2300, output 2,310
        }
        
        dec = numSplit[1];

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec; 
    };

    
    var nodeListForEach = function(list, callback){
        for(var i=0; i<list.length; i++){
            callback(list[i], i);
        }
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // converts string into number
            };
        },

        addListItem: function(obj, type){

            //HTML string with placeholder text
            var html, newHtml, element; 

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = 
                `<div class="item clearfix" id="inc-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = 
                `<div class="item clearfix" id="exp-%id%">
                    <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`
            }

            //replace the placeholder text with some actual data 
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);

            el.parentNode.removeChild(el);

        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus(); //focus method, puts the cursor back into input box
        },

        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            // document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = percentages[index] + '---';
                }
                
            })
        },

        displayMonth: function(){
            var now, month, months, year;
            var now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();

//global app controller
var controller = (function(budgetCtrl, UICtrl) {

    //event listener functions
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) { //which is for older browsers
                ctrlAddItem();
            }
        });  

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);

    };

    var updateBudget = function(){
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        //3. display the budget on the UI 
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function(){
        //1. calculate percentages
        budgetCtrl.calculatePercentages();

        //2. read percentages from the budget controller 
        var percentages = budgetCtrl.getPercentages();

        //3. update the UI with the new percentages
        UIController.displayPercentages(percentages);
    }

    var ctrlAddItem = function(){
        var input, newItem;

        // 1. get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {   //input fields cant be empty, non number, or zero
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);
        
            //4. clear the fields 
            UICtrl.clearFields();
        
            //5. Calculate and update budget
            updateBudget();

            //6 calculate and update percentages;
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. delete item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. delete item from the UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBudget();

            //4 calculate and update percentages;
            updatePercentages();


        }
    }

    return {
        init: function(){ 
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();