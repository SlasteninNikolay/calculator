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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 800000,
    period: 12,
    asking: function () {
        if (confirm("Есть ли у вас дополнительный источник дохода?")) {
            let itemIncome = prompt(
                "Какой у вас дополнительный источник доходов?",
                "Таксую"
            );
            let cashIncome = prompt(
                "Сколько в месяц вы на этом зарабатываете?",
                10000
            );
            appData.income[itemIncome] = cashIncome;
        }
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
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        let result = Math.ceil(appData.mission / appData.budgetMonth);
        if (result > 0) {
            return "Цель будет достигнута за " + result;
        } else {
            return "Цель не будет достигнута";
        }
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
    getInfoDepsit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt("Какой годовой процент?", "10");
            appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Расходы за месяц: ", appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (const key in appData) {
    console.log(
        "Наша программа включает в себя данные: ",
        key + "-" + appData[key]
    );
}
