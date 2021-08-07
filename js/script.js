"use strict";

let money;
let expenses = [];
let expensesAmount;

// Функция проверки ввода числа
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция запроса ежемесячного дохода
let start = function () {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
};
start();

// Объект с данными
let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 800000,
    period: 12,
    asking: function () {
        let addExpenses = prompt(
            "Перечислите возможные расходы за рассчитываемый период через запятую"
        );
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let keys = [];
        let values = [];
        for (let i = 0; i <= 1; i++) {
            keys[i] = prompt("Введите обязательную статью расходов?");
            while (!isNumber(values[i])) {
                values[i] = prompt("Во сколько это обойдется?");
            }
            appData.expenses[keys[i]] = values[i];
        }
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (const key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
        console.log("appData.expensesMonth: ", appData.expensesMonth);
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        console.log("appData.budgetMonth: ", appData.budgetMonth);
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        console.log("Бюджет на день составит: ", appData.budgetDay);
    },
    getTargetMonth: function () {
        let result = Math.ceil(appData.mission / appData.budgetMonth);
        if (result > 0) {
            console.log("Цель будет достигнута");
        } else {
            console.log("Цель не будет достигнута");
        }
        return result;
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else if (appData.budgetDay <= 0) {
            return "Что то пошло не так";
        }
    },
};

appData.asking();
appData.getExpensesMonth();

// expensesAmount = appData.getExpensesMonth();
// console.log("Расходы за месяц: " + expensesAmount);

let accumulatedMonth = appData.getBudget();

let targetMonth = appData.getTargetMonth(appData.mission, accumulatedMonth);
console.log(targetMonth);

console.log(appData.getStatusIncome());
