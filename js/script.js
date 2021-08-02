let money = 60000,
    income = "дивиденды",
    addExpenses = "еда, проезд, коммуналка, бензин, интернет, телефон, кафе",
    deposit = true,
    mission = 800000,
    period = 12,
    budgetDay = money / 30,
    expenses1,
    expenses2,
    amount1,
    amount2,
    budgetMonth;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

money = prompt("Ваш месячный доход?");
addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
).split(", ");
console.log(addExpenses);
deposit = confirm("Есть ли у вас депозит в банке?");
expenses1 = prompt("Введите обязательную статью расходов?");
amount1 = prompt("Во сколько это обойдется?");
expenses2 = prompt("Введите обязательную статью расходов?");
amount2 = prompt("Во сколько это обойдется?");
budgetMonth = money - amount1 - amount2;
console.log("Бюджет на месяц составит: ", budgetMonth);
console.log(
    "Цель будет достигнута за " +
        Math.ceil(mission / budgetMonth) +
        " месяцев(-а)"
);
budgetDay = budgetMonth / 30;
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
