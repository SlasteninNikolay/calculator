"use strict";

const countButton = document.getElementById("start");
const salaryAmount = document.querySelector(".salary-amount");
const addIncomeButton = document.getElementsByTagName("button")[0];
const addExpensesButton = document.getElementsByTagName("button")[1];
const additionalIncomeItem = document.querySelectorAll(".additional_income-item");
const budgetMonthValue = document.getElementsByClassName("budget_month-value")[0];
const budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
const expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0];
const additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0];
const additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0];
const incomePeriodValue = document.getElementsByClassName("income_period-value")[0];
const targetMonthValue = document.getElementsByClassName("target_month-value")[0];
let expensesItems = document.querySelectorAll(".expenses-items");
const additionalExpensesItem = document.querySelector(".additional_expenses-item");
const depositCheck = document.querySelector("#deposit-check");
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll(".income-items");
const periodAmount = document.querySelector(".period-amount");
const inputDataAll = document.querySelectorAll(".data input:not(.period-select)");
const inputResultAll = document.querySelectorAll(".result input");
const cancelButton = document.querySelector("#cancel");
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

// Объект с данными
class AppData {
    constructor() {
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
    }

    // Функция проверки ввода числа
    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // Функция проверки ввода строки
    static isString(str) {
        return isNaN(str) && !isFinite(str) && str !== null && str !== "";
    }
    start() {
        inputDataAll.forEach((item) => {
            item.disabled = true;
        }); // блокируем инпуты
        depositBank.style.pointerEvents = "none"; // блокируем селект
        countButton.style.display = "none"; // скрываем кнопку "Расчитать"
        cancelButton.style.display = "block"; // выводим кнопку "Сбросить"
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDepsit();

        this.getBudget();
        this.getTargetMonth();

        this.showResult();
    }
    reset() {
        countButton.removeEventListener("mouseover", this.percentBlock);
        depositPercent.removeEventListener("input", this.percentUnblock);
        depositCheck.checked = false;
        this.depositHandler();
        // разблокировываем инпуты
        inputDataAll.forEach((item) => {
            item.disabled = false;
        });

        depositBank.style.pointerEvents = ""; // разблокировываем селект

        // скрываем кнопку "Расчитать"
        cancelButton.style.display = "none";

        //выводим кнопку "Сбросить"
        countButton.style.display = "block";

        //обнуляем инпуты кроме period
        const inputAll = document.querySelectorAll("input:not(.period-select)");
        inputAll.forEach((item) => {
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
        Object.assign(this, new this.constructor());

        // Убираем дополнительные поля ввода в расходах
        expensesItems = document.getElementsByClassName("expenses-items");
        Array.from(expensesItems).forEach((item) => {
            if (expensesItems.length > 1) {
                item.remove();
            } else {
                addExpensesButton.style.display = "block";
                return;
            }
        });

        // Убираем дополнительные поля ввода в доходах
        incomeItems = document.getElementsByClassName("income-items");
        Array.from(incomeItems).forEach((item) => {
            if (incomeItems.length > 1) {
                item.remove();
            } else {
                addIncomeButton.style.display = "block";
                return;
            }
        });
    }
    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        const cloneExpensesInputs = cloneExpensesItems.querySelectorAll("input"); //находим инпуты клона и очищаем
        cloneExpensesInputs.forEach((item) => {
            item.value = "";
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesButton);
        expensesItems = document.querySelectorAll(".expenses-items");
        if (expensesItems.length === 3) {
            addExpensesButton.style.display = "none";
        }
    }
    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        const cloneIncomeInputs = cloneIncomeItems.querySelectorAll("input"); //находим инпуты клона и очищаем
        cloneIncomeInputs.forEach((item) => {
            item.value = "";
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeButton);
        incomeItems = document.querySelectorAll(".income-items");
        if (incomeItems.length === 3) {
            addIncomeButton.style.display = "none";
        }
    }

    getExpenses() {
        Array.from(expensesItems).forEach((item) => {
            const itemExpenses = item.querySelector(".expenses-title").value;
            const cashExpenses = item.querySelector(".expenses-amount").value;
            if (itemExpenses !== "" && cashExpenses !== "") {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {
        Array.from(incomeItems).forEach((item) => {
            const itemIncome = item.querySelector(".income-title").value;
            const cashIncome = item.querySelector(".income-amount").value;
            if (itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    setPeriod() {
        periodAmount.innerHTML = periodSelect.value;
    }

    showResult() {
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
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    }

    getBudget() {
        const monthDeposit = (this.moneyDeposit * (this.percentDeposit / 100)) / 12;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay > 0 && this.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else if (this.budgetDay <= 0) {
            return "Что то пошло не так";
        }
    }

    getInfoDepsit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === "other") {
            depositPercent.style.display = "inline-block";
        } else {
            depositPercent.value = valueSelect;
        }
    }

    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    countButtonBlock(event) {
        if (salaryAmount.value === "") {
            event.target.disabled = true;
        }
    }
    percentBlock() {
        if (depositCheck.checked) {
            if (!AppData.isNumber(depositPercent.value)) {
                alert("Введите корректное значение в поле проценты");
            }
            if (depositPercent.value > 100 || depositPercent.value < 0) {
                alert("Введите корректное значение в поле проценты");
            }
            if (!AppData.isNumber(depositAmount.value)) {
                alert("Введите сумму вашего депозита");
            }
        }
    }

    countButtonUnblock() {
        if (salaryAmount.value !== "") {
            countButton.disabled = false;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener("change", this.changePercent);
            countButton.addEventListener("mouseover", this.percentBlock);
            depositPercent.addEventListener("input", this.percentUnblock);
        } else {
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositPercent.style.display = "none";
            depositBank.value = "";
            depositAmount.value = "";
            this.deposit = false;
            depositBank.removeEventListener("change", this.changePercent);
        }
    }

    eventListeners() {
        countButton.addEventListener("mouseover", this.countButtonBlock);
        salaryAmount.addEventListener("input", this.countButtonUnblock);
        countButton.addEventListener("click", () => {
            this.start();
        });
        cancelButton.addEventListener("click", () => {
            this.reset();
        });
        addExpensesButton.addEventListener("click", this.addExpensesBlock);
        addIncomeButton.addEventListener("click", this.addIncomeBlock);
        periodSelect.addEventListener("input", this.setPeriod);
        depositCheck.addEventListener("change", this.depositHandler.bind(this));
    }
}

const appData = new AppData();

appData.eventListeners();
