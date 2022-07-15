'use strict';

class Pizza {
    constructor(size, type) {
        const validAmountOfArguments = 2;
        if (arguments.length !== validAmountOfArguments) {
            throw new PizzaException(`Required two arguments, given: ${arguments.length}`);
        }
        if (!isSizeValid(size) && !isTypeValid(type)) {
            throw new PizzaException('Invalid size and type');
        } else if (!isSizeValid(size)) {
            throw new PizzaException('Invalid size');
        } else if (!isTypeValid(type)) {
            throw new PizzaException('Invalid type');
        }
        this.extraIngredients = [];
        this.size = size;
        this.type = type;
    }

    addExtraIngredient(ingredient) {
        if (arguments.length !== 1) {
            throw new PizzaException(`Required one parameter, given: ${arguments.length}`);
        }
        if (!isIngredientValid(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        } else if (ingredientExists(this.extraIngredients, ingredient)) {
            throw new PizzaException('Duplicate ingredient');
        }
        this.extraIngredients.push(ingredient);
    }

    removeExtraIngredient(ingredient) {
        if (arguments.length !== 1) {
            throw new PizzaException(`Required one parameter, given: ${arguments.length}`);
        }
        if (!isIngredientValid(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        } else if (!ingredientExists(this.extraIngredients, ingredient)) {
            throw new PizzaException('Ingredient has not been added');
        }
        const indexOfIngredient = this.extraIngredients.indexOf(ingredient);
        this.extraIngredients.splice(indexOfIngredient, 1);
    }

    getSize() {
        return this.size;
    }

    getPrice() {
        return this.size.price + this.type.price +
            this.extraIngredients.reduce((res, ingredient) => res + ingredient.price, 0);
    }

    getExtraIngredients() {
        return this.extraIngredients;
    }

    getPizzaInfo() {
        return `Size: ${this.size.label}, type: ${this.type.label}; extra ingredients: ${
            this.extraIngredients.map(ingredient => ingredient.label).join(',') || '-'}; price: ${this.getPrice()}UAH.`;
    }
}

function isSizeValid(size) {
    return Pizza.allowedSizes.includes(size);
}

function isTypeValid(type) {
    return Pizza.allowedTypes.includes(type);
}

function isIngredientValid(ingredient) {
    return Pizza.allowedExtraIngredients.includes(ingredient);
}

function ingredientExists(ingredientsArr, ingredient) {
    return ingredientsArr.includes(ingredient);
}

Pizza.SIZE_S = {label: 'SMALL', price: 50};
Pizza.SIZE_M = {label: 'MEDIUM', price: 75};
Pizza.SIZE_L = {label: 'LARGE', price: 100};
Pizza.TYPE_VEGGIE = {label: 'VEGGIE', price: 50};
Pizza.TYPE_MARGHERITA = {label: 'MARGHERITA', price: 60};
Pizza.TYPE_PEPPERONI = {label: 'PEPPERONI', price: 70};
Pizza.EXTRA_CHEESE = {label: 'CHEESE', price: 7};
Pizza.EXTRA_TOMATOES = {label: 'TOMATOES', price: 5};
Pizza.EXTRA_MEAT = {label: 'MEAT', price: 9};

Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_CHEESE, Pizza.EXTRA_TOMATOES, Pizza.EXTRA_MEAT];

class PizzaException {
    constructor(log) {
        this.log = log;
    }
}
