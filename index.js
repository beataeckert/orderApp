import {menuArray, itemsArray} from "./data.js"


/* --------------- Creating Menu's HTML --------------------------- */

function getFeedHtml() {
let feedHtml = ''
menuArray.forEach((item) => {
    feedHtml += `
                <div class="menu" id="menu">
                    <div class="item_info">
                        <h3>${item.name}</h2>
                        <p>${item.ingredients}</p>
                        <h4>$${item.price}</h3>
                    </div>
                    <button class="add_to_order" data-add="${item.id}">&#43</button>
                </div>`
    })
    return feedHtml
}

/* -------------------- Rendering Menu -------------------------- */

function renderMenu() {
    document.getElementById("first_section").innerHTML = getFeedHtml()
}
renderMenu()


/* --------------- Creating Order's HTML --------------------------- */

function getOrderHtml() {
    let orderHtml = ''
        orderHtml += `
            <div class="hidden" id="order">
                <h3 class="title-section">Your order</h3>
            </div>`    
        
        itemsArray.forEach((orderedItem) => {
        orderHtml +=`
            <div class="ordered-item-details" id="ordered-item-details">
                <div class="ordered-item-option">
                    <h3>${orderedItem.name}</h3>
                    <p data-remove="${orderedItem.id}">remove</p>
                </div>
                <h4>$${orderedItem.price}</h4>
            </div>`
        })
        
        orderHtml +=
            `<div class="hidden" id="ordered-price">
                <div class="hidden total-price-details" id="total-price-details">
                    <h3>Total price</h3>
                    <h4>$${totalPrice()}</h4>
                </div>
                <button class="hidden complete-order-btn" id="complete-order-btn" data-order="order" >Complete order</button>
            </div>`
            
    return orderHtml
}

/* -------------------- Rendering Order -------------------------- */

function renderOrder() {
    document.getElementById("order_section").innerHTML = getOrderHtml()
    if(itemsArray.length > 0) {
        toggleOrder()
    }
}

/*--------------------------- Buttons' Event Listener ------------------------------------*/

document.addEventListener("click", (e) => {
    if(e.target.dataset.add){
        addItemToOrder(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if (e.target.dataset.order) {
    toggleOrderForm()
    toggleButtons(true)
    }    
})


/* -------------- Adding an item to the order ---------------- */

function addItemToOrder(itemId){
   const itemObj = menuArray.filter((item) => {
        return (item.id == itemId)
   })[0]
   itemsArray.push(itemObj)
   renderOrder()
}

/* -------------- Removing an item from the order ---------------- */

function removeItem(itemId){
    const newElem = itemsArray.filter((item) => {
        return (item.id == itemId)      
    })[0]
    const index = itemsArray.indexOf(newElem)
    itemsArray.splice(index, 1)

    if(itemsArray.length == 0){
        toggleOrder()
    }
     renderOrder()
}


/* ----------------- Toggle Order -------------------- */

function toggleOrder() {
    document.getElementById("order").classList.toggle("hidden")
    document.getElementById("ordered-price").classList.toggle("hidden")
    document.getElementById("total-price-details").classList.toggle("hidden");
    document.getElementById("complete-order-btn").classList.toggle("hidden");
}


/*--------------------- The total price of the ordered items ------------------------*/

function totalPrice(){
    let total = 0
    itemsArray.forEach((orderedItem) => {
        total += orderedItem.price
    })
    return total
}

document.addEventListener("submit", (event) => {
  event.preventDefault()
  toggleOrderForm()
  getConfirmation()
})

/* ----------------- Toggle order form -------------------- */

function toggleOrderForm() {
  document.getElementById("payment-form").classList.toggle("hidden");
}

document.getElementById("close-btn").addEventListener("click", () => {
    toggleOrderForm(false);
    toggleButtons(false)
})


/* ----------------- Toggle buttons -------------------- */

function toggleButtons(bool) {
  const addBtns = document.querySelectorAll(".add_to_order")
  const orderBtn = document.getElementById("complete-order-btn")
  const isDisabled = bool == true;

    addBtns.forEach(addBtn => {
        addBtn.disabled = isDisabled
    })
    orderBtn.disabled = isDisabled
}


/* ----------------- Confirmation section -------------------- */

function getConfirmation() {
    const getConfirmationEl = document.getElementById("confirmation")
    
    getConfirmationEl.innerHTML = `
    <div class="confirmation">
        <h3>Thank you ${document.getElementById("name").value}! <span>Your order is on the way!</span></h3>
    </div>
    `
    document.getElementById("order_section").classList.toggle("hidden")
    return getConfirmationEl
}
