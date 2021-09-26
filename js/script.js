"use strict";

let countButton = document.getElementById("start");
let salaryAmount = document.querySelector(".salary-amount");
let addIncomeButton = document.getElementsByTagName("button")[0];
let addExpensesButton = document.getElementsByTagName("button")[1];
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let budgetMonthValue = document.getElementsByClassName("budget_month-value")[0];
let budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
let expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0];
let additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0];
let additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0];
let incomePeriodValue = document.getElementsByClassName("income_period-value")[0];
let targetMonthValue = document.getElementsByClassName("target_month-value")[0];
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(".additional_expenses-item");
let depositCheck = document.querySelector("#deposit-check");
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll(".income-items");
let periodAmount = document.querySelector(".period-amount");
// Функция проверки ввода числа
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция проверки ввода строки
let isString = function (str) {
    return isNaN(str) && !isFinite(str) && str !== null && str !== "";
};

// Объект с данными
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

        // appData.getTargetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDepsit();
    },
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        cloneExpensesItems.childNodes.forEach((e) => {
            if (e.tagName === "INPUT") {
                e.value = "";
            }
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesButton);
        expensesItems = document.querySelectorAll(".expenses-items");
        if (expensesItems.length === 3) {
            addExpensesButton.style.display = "none";
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.childNodes.forEach((e) => {
            if (e.tagName === "INPUT") {
                e.value = "";
            }
        });

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeButton);
        incomeItems = document.querySelectorAll(".income-items");
        if (incomeItems.length === 3) {
            addIncomeButton.style.display = "none";
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if (itemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if (itemIncome !== "" && cashIncome !== "") {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    setPeriod: function () {
        periodAmount.innerHTML = periodSelect.value;
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(", ");
        additionalIncomeValue.value = appData.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSaveMoney();
        periodSelect.addEventListener("input", function () {
            incomePeriodValue.value = periodSelect.value * appData.budgetMonth;
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (const key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
            let persentDeposit;
            while (!isNumber(persentDeposit)) {
                persentDeposit = prompt("Какой годовой процент?");
            }
            appData.percentDeposit = persentDeposit;

            let moneyDeposit;
            while (!isNumber(moneyDeposit)) {
                moneyDeposit = prompt("Какая сумма заложена?");
            }
            appData.moneyDeposit = moneyDeposit;
        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    countButtonBlock: function (event) {
        if (salaryAmount.value === "") {
            event.target.disabled = true;
        }
    },
    countButtonUnblock: function () {
        if (salaryAmount.value !== "") {
            countButton.disabled = false;
        }
    },
    checkInputs: function (e) {
        const target = e.target;
        if (target.placeholder === "Наименование") {
            target.value = target.value.replace(/[^а-яё\s\.,:!;"'\?]/gi, "");
        }
        if (target.placeholder === "Сумма") {
            target.value = target.value.replace(/[\D]/gi, "");
        }
    },
};
countButton.addEventListener("mouseover", appData.countButtonBlock);
salaryAmount.addEventListener("input", appData.countButtonUnblock);
countButton.addEventListener("click", appData.start);
addExpensesButton.addEventListener("click", appData.addExpensesBlock);
addIncomeButton.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.setPeriod);
document.body.addEventListener("input", appData.checkInputs);
