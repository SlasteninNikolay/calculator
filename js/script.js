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
let inputDataAll = document.querySelectorAll(".data input:not(.period-select)");
let inputResultAll = document.querySelectorAll(".result input");
let cancelButton = document.querySelector("#cancel");

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
    reset: function () {
        // разблокировываем инпуты
        inputDataAll.forEach(function (item) {
            item.disabled = false;
        }, this);

        // скрываем кнопку "Расчитать"
        cancelButton.style.display = "none";

        //выводим кнопку "Сбросить"
        countButton.style.display = "block";

        //обнуляем инпуты кроме period
        let inputAll = document.querySelectorAll("input:not(.period-select)");
        inputAll.forEach(function (item) {
            if (isNaN) {
                item.value = "";
            } else {
                item.value = 0;
            }
        });
        // Обнуляем period
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;

        // Обнуляем данные
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        // Убираем дополнительные поля ввода в расходах
        expensesItems.forEach(function (item) {
            expensesItems = document.querySelectorAll(".expenses-items");
            if (expensesItems.length > 1) {
                item.remove();
            } else {
                addExpensesButton.style.display = "block";
                return;
            }
        });
        // Убираем дополнительные поля ввода в доходах
        incomeItems.forEach(function (item) {
            incomeItems = document.querySelectorAll(".income-items");
            if (incomeItems.length > 1) {
                item.remove();
            } else {
                addIncomeButton.style.display = "block";
                return;
            }
        });
    },
    start: function () {
        inputDataAll.forEach(function (item) {
            item.disabled = true;
        }, this); // блокируем инпуты
        countButton.style.display = "none"; // скрываем кнопку "Расчитать"
        cancelButton.style.display = "block"; // выводим кнопку "Сбросить"
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    },
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        let cloneExpensesInputs = cloneExpensesItems.querySelectorAll("input"); //находим инпуты клона и очищаем
        cloneExpensesInputs.forEach((item) => {
            item.value = "";
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesButton);
        expensesItems = document.querySelectorAll(".expenses-items");
        if (expensesItems.length === 3) {
            addExpensesButton.style.display = "none";
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        let cloneIncomeInputs = cloneIncomeItems.querySelectorAll("input"); //находим инпуты клона и очищаем
        cloneIncomeInputs.forEach((item) => {
            item.value = "";
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
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if (itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = cashIncome;
            }
        }, this);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    setPeriod: function () {
        periodAmount.innerHTML = periodSelect.value;
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSaveMoney();
        periodSelect.addEventListener("input", () => {
            incomePeriodValue.value = +periodSelect.value * this.budgetMonth;
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (const key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay > 0 && this.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else if (this.budgetDay <= 0) {
            return "Что то пошло не так";
        }
    },
    getInfoDepsit: function () {
        if (this.deposit) {
            let persentDeposit;
            while (!isNumber(persentDeposit)) {
                persentDeposit = prompt("Какой годовой процент?");
            }
            this.percentDeposit = persentDeposit;

            let moneyDeposit;
            while (!isNumber(moneyDeposit)) {
                moneyDeposit = prompt("Какая сумма заложена?");
            }
            this.moneyDeposit = moneyDeposit;
        }
    },
    calcSaveMoney: function () {
        return this.budgetMonth * periodSelect.value;
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
};
countButton.addEventListener("mouseover", appData.countButtonBlock.bind(appData));
salaryAmount.addEventListener("input", appData.countButtonUnblock.bind(appData));
countButton.addEventListener("click", appData.start.bind(appData));
cancelButton.addEventListener("click", appData.reset.bind(appData));
addExpensesButton.addEventListener("click", appData.addExpensesBlock.bind(appData));
addIncomeButton.addEventListener("click", appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener("input", appData.setPeriod.bind(appData));
