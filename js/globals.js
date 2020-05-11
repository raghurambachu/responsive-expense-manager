//Globals
let expenseArr = JSON.parse(localStorage.getItem("expenseArr")) || [];
let incomeArr = JSON.parse(localStorage.getItem("incomeArr")) || [];
let balance = +localStorage.getItem("balance") || 0;
let defaultBackground = "#f5f5f5";