function handleDarkModeClick(event){
    if(!event.target.closest(".dark-mode-button")) return;
    document.body.classList.toggle("active");
    const captions_DOM = document.querySelectorAll("caption");
    captions_DOM.forEach(caption => caption.classList.toggle("white"));
    const h1_DOM = document.querySelector("h1");
    const note_DOM = document.querySelector(".note");
    h1_DOM.classList.toggle("white");
    note_DOM.classList.toggle("white");
    balanceDisplay_DOM.classList.toggle("white");
    darkMode_DOM.classList.toggle("white");
    const anchors = document.querySelectorAll("a");
    anchors.forEach(anchor => anchor.classList.toggle("white"));
    const footer_DOM = document.querySelector("footer");
    footer_DOM.classList.toggle("white");
}


// Random Id generator
function randomIdGenerator(size = 10){
    let randomId = "a";
    for(let i = 0;i < size;i++){
        randomId += Math.floor(Math.random() * size);
    }
    return randomId
}

function handleIncomeToggler(event){
    expenseFormDiv_DOM.style.display = "none";
    incomeToggler_DOM.style.background = "#57b846";
    incomeFormDiv_DOM.style.display = "block";
    expenseToggler_DOM.style.background = "#fff";
    expenseToggler_DOM.style.color = "#000";  
    incomeToggler_DOM.style.color = "#fff"; 
}

function handleExpenseToggler(event){
    incomeFormDiv_DOM.style.display = "none";
    expenseToggler_DOM.style.background = "#FF5722";
    expenseFormDiv_DOM.style.display = "block";
    incomeToggler_DOM.style.background = "#fff";
    expenseToggler_DOM.style.color = "#fff";
    incomeToggler_DOM.style.color = "#000";
}

function validateForm(category_DOM,source_DOM,amount_DOM){
    let isValidated = true;
    if(!category_DOM.value)isValidated = false;
    let incomeSourceVal = source_DOM.value;
    if(incomeSourceVal.length < 1 || incomeSourceVal.length > 25){
        source_DOM.value = "";
        source_DOM.placeholder =  "should be 1 or >25 char long";
        isValidated = false;
    }
    let incomeAmountVal = +amount_DOM.value;
    if(incomeAmountVal < 1){
        amount_DOM.value = "";
        amount_DOM.placeholder = "amount should be > 0";
        isValidated = false;
    }
    return isValidated;
}

function resetForm(type,category_DOM,source_DOM,amount_DOM){
    category_DOM.value = type === "income" ? "salary" : "smoking";
    source_DOM.style.placeholder = "Source";
    source_DOM.value = "";
    amount_DOM.style.placeholder = "Amount";
    amount_DOM.value = "";
}

function createUI(root,arr = incomeArr,type = "income"){
    root.innerHTML = "";
    let tBodyInnerHtml = arr.map(arrItem => {
        let dateTime = new Date(arrItem["date"]).toString().split(" ");
        return `
            <tr data-id="${arrItem.id}">
                <td class="${type}-date">${dateTime[2]}-${dateTime[1]}-${dateTime[3]}</td>
                <td class="${type}-category">${arrItem.category}</td>
                <td class="${type}-source">${arrItem.source}</td>
                <td class="${type}-amount">${arrItem.amount}</td>
                <td class="${type}-delete"><i class="fas fa-trash"></i></td>
            </tr>
        `
    }).join("")
    root.innerHTML = tBodyInnerHtml;
    balanceDisplay_DOM.innerHTML = `<strong>Balance is : Rs${balance}</strong>`
}