//Toggler
const incomeToggler_DOM = document.querySelector(".income-toggler");
const incomeFormDiv_DOM = document.querySelector(".income-form");

const expenseToggler_DOM = document.querySelector(".expense-toggler");
const expenseFormDiv_DOM = document.querySelector(".expense-form");

//Form elements
const incomeForm_DOM = document.querySelector(".income-form form");
const incomeCategory_DOM = document.querySelector(".income-category");
const incomeSource_DOM = document.querySelector(".income-source");
const incomeAmount_DOM = document.querySelector(".income-amount");
const incomeTbody_DOM = document.querySelector(".income-tbody");

const expenseForm_DOM = document.querySelector(".expense-form form");
const expenseCategory_DOM = document.querySelector(".expense-category");
const expenseSource_DOM = document.querySelector(".expense-source");
const expenseAmount_DOM = document.querySelector(".expense-amount");
const expenseTbody_DOM = document.querySelector(".expense-tbody");



window.addEventListener("load",function(e){
    //Purpose of Toggling
    expenseFormDiv_DOM.style.display = "none";
    incomeToggler_DOM.style.background = "#57b846";
    incomeFormDiv_DOM.style.display = "block";
    expenseToggler_DOM.style.background = "#fff";
    expenseToggler_DOM.style.color = "#000";  
    incomeToggler_DOM.style.color = "#fff";  
    createUI(incomeTbody_DOM,incomeArr,"income");
    createUI(expenseTbody_DOM,expenseArr,"expense");
})

incomeToggler_DOM.addEventListener("click",handleIncomeToggler);
expenseToggler_DOM.addEventListener("click",handleExpenseToggler);

incomeForm_DOM.addEventListener("submit",handleAddIncome);
expenseForm_DOM.addEventListener("submit",handleAddExpense);

document.body.addEventListener("click",function(event){
    handleClickOnIncomeDelete(event); 
    handleClickOnExpenseDelete(event);
})

document.body.addEventListener("dblclick",function(event){
    handleDblClickOnIncomeCategory(event);
    handleDblClickOnExpenseCategory(event);
    handleDblClickOnIncomeSource(event);
    handleDblClickOnExpenseSource(event);
    handleDblClickOnIncomeAmount(event);
    handleDblClickOnExpenseAmount(event);
})

document.body.addEventListener("change",function(event){
    if(!event.target.closest("table .income-category"))return;
    handleChangeOrEnterOnEditOfIncomeCategory(event) //related to handleDblClickOnIncomeCategory   
})

document.body.addEventListener("change",function(event){
    if(!event.target.closest("table .expense-category"))return;
    handleChangeOrEnterOnEditOfExpenseCategory(event) //related to  handleDblClickOnExpenseCategory
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .income-category"))return
    if(event.keyCode !== 13) return;
    handleChangeOrEnterOnEditOfIncomeCategory(event) //related to handleDblClickOnIncomeCategory 
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .expense-category"))return
    if(event.keyCode !== 13) return;
    handleChangeOrEnterOnEditOfExpenseCategory(event) //related to  handleDblClickOnExpenseCategory
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .income-source"))return
    if(event.keyCode !== 13) return;
    handleEnterOnEditOfIncomeSource(event) 
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .expense-source"))return
    if(event.keyCode !== 13) return;
    handleEnterOnEditOfExpenseSource(event) 
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .income-amount"))return;
    if(event.keyCode !== 13)return;
    handleEnterOnEditOfIncomeAmount(event);
})

document.body.addEventListener("keyup",function(event){
    if(!event.target.closest("table .expense-amount"))return;
    if(event.keyCode !== 13)return;
    handleEnterOnEditOfExpenseAmount(event);
})