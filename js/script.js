"use strict";
let money = +prompt("Ваш месячный доход?");
let income = "депозит";
let addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 800000;
let period = 12;

// Функция определения типа данных
let showTypeOf = function (data) {
    return data, typeof data;
};
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

// Запрос информации у пользователя
let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

// Функция подсчета обязательных расходов за месяц
const getExpensesMonth = function (exp1, exp2) {
    return exp1 + exp2;
};
let expensesMonth = getExpensesMonth(amount1, amount2);
console.log(expensesMonth);

// Вывод возможных расходов в виде массива
console.log(addExpenses.split(", "));

// Функция подсчета срока достижения цели
const getTargetMonth = function (target, accum) {
    return Math.ceil(target / accum);
};

// Функция подсчета накоплений за месяц
const getAccumulatedMonth = function (money, expenses) {
    return money - expenses;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

// Расчет бюджета на день
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день составит: ", Math.floor(budgetDay));

// Вызов функция подсчета срока достижения цели и вывод в консоль
let targetMonth = getTargetMonth(mission, accumulatedMonth);
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
