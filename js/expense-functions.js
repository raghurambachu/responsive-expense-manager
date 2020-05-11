//attached to eventlistener
function handleAddExpense(event){
    event.preventDefault();
   
    if(!validateForm(expenseCategory_DOM,expenseSource_DOM,expenseAmount_DOM))return;
    
    expenseArr.push({
        date: Date.now(),
        category:expenseCategory_DOM.value, 
        source:expenseSource_DOM.value,
        amount:+expenseAmount_DOM.value,
        id: randomIdGenerator()
    })

    balance = balance - +expenseAmount_DOM.value;
    localStorage.setItem("balance",balance);
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    createUI(expenseTbody_DOM,expenseArr,"expense");
    resetForm("expense",expenseCategory_DOM,expenseSource_DOM,expenseAmount_DOM);
}

//attached to body eventlistener
function handleClickOnExpenseDelete(event){
    if(!(event.target.closest(".expense-delete")))return;
    const element = event.target.closest(".expense-delete");
    const getId = element.parentElement.dataset.id;
    const expenseItemToBeDeleted = expenseArr.find(expenseItem => expenseItem.id === getId);
    expenseArr = expenseArr.filter(expenseItem => expenseItem.id !== getId)
    balance = balance + +expenseItemToBeDeleted.amount;
    localStorage.setItem("balance",balance);
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    createUI(expenseTbody_DOM,expenseArr,"expense");
    resetForm("expense",expenseCategory_DOM,expenseSource_DOM,expenseAmount_DOM);
}

function handleDblClickOnExpenseCategory(event){
    if(!(event.target.closest(".expense-category")))return;
    let element = event.target.closest(".expense-category");
    let getId = element.parentElement.dataset.id;
    let selectTag = document.createElement("select");
    selectTag.name = "expense-category";
    selectTag.className = "expense-category";

    let options = ["miscellanous","bills","charity","clothes","education","electronics","food","fuel","general","travel","gift","health","shopping","recurring deposit"];
    selectInnerHtml = options.map(option => {
        return `
            <option value="${option}">${option[0].toUpperCase() + option.slice(1)}</option>
        `
    }).join("");
    selectTag.innerHTML = selectInnerHtml;
    let parentElement = element.parentElement;
    parentElement.replaceChild(selectTag,element);
}

function handleChangeOrEnterOnEditOfExpenseCategory(event){
    let td = document.createElement("td");
    td.className = "expense-category";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = expenseArr.findIndex(expenseItem => expenseItem.id === getId);
    expenseArr[findIndex].category = event.target.value;
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    parentElement.replaceChild(td,oldElement);
    createUI(expenseTbody_DOM,expenseArr,"expense");
}

function handleDblClickOnExpenseSource(event){
    if(!(event.target.closest(".expense-source")))return;
    let element = event.target.closest(".expense-source");
    let inputTag = document.createElement("input");
    inputTag.name = "expense-source";
    inputTag.className = "expense-source";
    inputTag.value = event.target.innerText;
  
    let parentElement = element.parentElement;
    parentElement.replaceChild(inputTag,element);
}

function handleEnterOnEditOfExpenseSource(event){
    let td = document.createElement("td");
    td.className = "expense-source";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = expenseArr.findIndex(expenseItem => expenseItem.id === getId);
    expenseArr[findIndex].source = event.target.value;
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    parentElement.replaceChild(td,oldElement);
    createUI(expenseTbody_DOM,expenseArr,"expense");
}


function handleDblClickOnExpenseAmount(event){
    if(!(event.target.closest(".expense-amount"))) return;
    let element = event.target.closest(".expense-amount");
    let inputTag = document.createElement("input");
    inputTag.type = "number";
    inputTag.name = "expense-amount";
    inputTag.className = "expense-amount";
    inputTag.value = event.target.innerText;
  
    let parentElement = element.parentElement;
    parentElement.replaceChild(inputTag,element);
}

function handleEnterOnEditOfExpenseAmount(event){
    let td = document.createElement("td");
    td.className = "expense-amount";
    td.innerText = event.target.value;
    let parentElement = event.target.parentElement;
    let oldElement = event.target;
    let getId = parentElement.dataset.id;
    let findIndex = expenseArr.findIndex(expenseItem => expenseItem.id === getId);
    const oldAmount = expenseArr[findIndex].amount;
    if(+event.target.value < 1){
        td.innerText = expenseArr[findIndex].amount;
        parentElement.replaceChild(td,oldElement);
        return;
    }
    expenseArr[findIndex].amount = +event.target.value;
    balance = +balance + oldAmount - +event.target.value
    localStorage.setItem("balance",balance)
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    parentElement.replaceChild(td,oldElement);
    createUI(expenseTbody_DOM,expenseArr,"expense");
}