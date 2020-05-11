//attached to eventlistener
function handleAddIncome(event){
    event.preventDefault();
   
    if(!validateForm(incomeCategory_DOM,incomeSource_DOM,incomeAmount_DOM))return;
    
    incomeArr.push({
        date: Date.now(),
        category:incomeCategory_DOM.value, 
        source:incomeSource_DOM.value,
        amount:+incomeAmount_DOM.value,
        id: randomIdGenerator()
    })

    balance = balance + +incomeAmount_DOM.value;
    localStorage.setItem("balance",balance);
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    createUI(incomeTbody_DOM,incomeArr,"income");
    resetForm("income",incomeCategory_DOM,incomeSource_DOM,incomeAmount_DOM);
}

//attached to body eventlistener
function handleClickOnIncomeDelete(event){
    if(!(event.target.closest(".income-delete")))return;
    const element = event.target.closest(".income-delete");
    const getId = element.parentElement.dataset.id;
    const incomeItemToBeDeleted = incomeArr.find(incomeItem => incomeItem.id === getId);
    incomeArr = incomeArr.filter(incomeItem => incomeItem.id !== getId)
    balance = balance - +incomeItemToBeDeleted.amount;
    localStorage.setItem("balance",balance);
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    createUI(incomeTbody_DOM,incomeArr,"income");
    resetForm("income",incomeCategory_DOM,incomeSource_DOM,incomeAmount_DOM);
}

function handleDblClickOnIncomeCategory(event){
    if(!(event.target.closest(".income-category")))return;
    let element = event.target.closest(".income-category");
    let getId = element.parentElement.dataset.id;
    let selectTag = document.createElement("select");
    selectTag.name = "income-category";
    selectTag.className = "income-category";

    let options = ["salary","deposit","purse","dividend","savings"];
    selectInnerHtml = options.map(option => {
        return `
            <option value="${option}">${option[0].toUpperCase() + option.slice(1)}</option>
        `
    }).join("");
    selectTag.innerHTML = selectInnerHtml;
    let parentElement = element.parentElement;
    parentElement.replaceChild(selectTag,element);
}

function handleChangeOrEnterOnEditOfIncomeCategory(event){
    let td = document.createElement("td");
    td.className = "income-category";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = incomeArr.findIndex(incomeItem => incomeItem.id === getId);
    incomeArr[findIndex].category = event.target.value;
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    parentElement.replaceChild(td,oldElement);
    createUI(incomeTbody_DOM,incomeArr,"income");
}

function handleDblClickOnIncomeSource(event){
    if(!(event.target.closest(".income-source")))return;
    let element = event.target.closest(".income-source");
    let inputTag = document.createElement("input");
    inputTag.name = "income-source";
    inputTag.className = "income-source";
    inputTag.value = event.target.innerText;
  
    let parentElement = element.parentElement;
    parentElement.replaceChild(inputTag,element);
}

function handleEnterOnEditOfIncomeSource(event){
    let td = document.createElement("td");
    td.className = "income-source";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = incomeArr.findIndex(incomeItem => incomeItem.id === getId);
    incomeArr[findIndex].source = event.target.value;
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    parentElement.replaceChild(td,oldElement);
    createUI(incomeTbody_DOM,incomeArr,"income");
}

function handleDblClickOnIncomeAmount(event){
    if(!(event.target.closest(".income-amount"))) return;
    let element = event.target.closest(".income-amount");
    let inputTag = document.createElement("input");
    inputTag.type = "number";
    inputTag.name = "income-amount";
    inputTag.className = "income-amount";
    inputTag.value = event.target.innerText;
  
    let parentElement = element.parentElement;
    parentElement.replaceChild(inputTag,element);
}

function handleEnterOnEditOfIncomeAmount(event){
    let td = document.createElement("td");
    td.className = "income-amount";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = incomeArr.findIndex(incomeItem => incomeItem.id === getId);
    const oldAmount = incomeArr[findIndex].amount;
    incomeArr[findIndex].amount = +event.target.value;
    balance = +balance - oldAmount + +event.target.value
    localStorage.setItem("balance",balance)
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    parentElement.replaceChild(td,oldElement);
    createUI(incomeTbody_DOM,incomeArr,"income");
}

