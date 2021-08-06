"use strict";

let money;

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

let appData = {
    income: {},
    addIncome: [],
    ecpenses: {},
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
    },
};

// Функция определения типа данных
let showTypeOf = function (data) {
    return data, typeof data;
};
console.log(showTypeOf(money));
console.log(showTypeOf(appData.income));
console.log(showTypeOf(appData.deposit));

let expenses = [];

// Функция запроса и подсчета обязательных расходов за месяц
const getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов?");

        let input;
        while (!isNumber(input)) {
            input = prompt("Во сколько это обойдется?");
        }
        sum += +input;
    }
    return sum;
};

let expensesAmount = getExpensesMonth();
console.log("Расходы за месяц: " + expensesAmount);

// Функция подсчета срока достижения цели
const getTargetMonth = function (target, accum) {
    let result = Math.ceil(target / accum);
    if (result > 0) {
        console.log("Цель будет достигнута");
    } else {
        console.log("Цель не будет достигнута");
    }
    return result;
};

// Функция подсчета накоплений за месяц
const getAccumulatedMonth = function () {
    return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

// Расчет бюджета на день
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день составит: ", Math.floor(budgetDay));

// Вызов функция подсчета срока достижения цели и вывод в консоль
let targetMonth = getTargetMonth(appData.mission, accumulatedMonth);
console.log(targetMonth);
// Функция вычисления уровня дохода
let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return "У вас высокий уровень дохода";
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return "У вас средний уровень дохода";
    } else if (budgetDay > 0 && budgetDay < 600) {
        return "К сожалению у вас уровень дохода ниже среднего";
    } else if (budgetDay <= 0) {
        return "Что то пошло не так";
    }
};

console.log(getStatusIncome());
