let money = +prompt("Ваш месячный доход?");
let income = "депозит";
let addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 800000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.split(", "));

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = money - amount1 - amount2;
console.log("Бюджет на месяц составит: ", budgetMonth);
console.log(
    "Цель будет достигнута за " +
        Math.ceil(mission / budgetMonth) +
        " месяцев(-а)"
);
let budgetDay = budgetMonth / 30;
console.log("Бюджет на день составит: ", Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
} else if (budgetDay > 0 && budgetDay < 600) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay <= 0) {
    console.log("Что то пошло не так");
}
