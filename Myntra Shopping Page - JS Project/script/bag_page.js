let bag_items = [];
let bag_items_count;
let bagCountElement;
let bagElement = document.querySelector('.bag_button');
let itemsContainerElement=document.querySelector('.bag-container');
const CONVENIENCE_FEES=99;

let existingItems= JSON.parse(localStorage.getItem('item'));
    if(existingItems!==null){
    bag_items = existingItems;
    
    bagElement.innerHTML+=`<span class='bag_item_count'> ${bag_items.length}</span>`
    
    } 
    addBagSummary();
    GenerateHTML();
    
    

function GenerateHTML(){
   
let id_value;
itemsContainerElement.innerHTML='';
let innerHTML='';

for(let i=0; i<existingItems.length ; i++){
    id_value=existingItems[i];
    let curr_item={};
    

    for(let j=0; j<items.length;j++){
       
        if(id_value==items[j].id){

          
            curr_item=items[j];
            break;
           
          
        }

    }
  
   
   
    innerHTML+=  ` <div class='bag-item-container'>
    <img src="${curr_item.image}" class="bag_image"> </a>

    <div class="bag-item-details">
    <span class="bag-item-company">  ${curr_item.company} </span>
    <span class="bag-item-name"> ${curr_item.item_name} </span>
    <span class="price-details">  <span class="bag-item-price"> ₹ ${curr_item.current_price}</span>  <span class="bag-item-OGprice"> ${curr_item.original_price}</span>  <span class="bag-item-discount"> ${curr_item.discount_percentage}% OFF </span> </span>
    <span class="return-days"> <img src="./return.svg" class="return-img"> <span class="return-period">${curr_item.return_period} Days </span> Return Available </span>
    <span class="bag-item-delivery_date"> <img src="./tick.svg" class="tick-img"> Delivery By : <span class="delivery-period"> ${curr_item.delivery_date} </span> </span>

    <span class="material-symbols-outlined close-btn" onClick='removeItemFromBag(${curr_item.id});'>
close
</span>
        
    </div>



    </div>
    `;
}

itemsContainerElement.innerHTML=innerHTML;



}

// Function to remove an item from bag

function removeItemFromBag(itemID){
    let itemIndex;
    for(let i=0 ; i<bag_items.length;i++){
        if(bag_items[i]==itemID){
            itemIndex=i;
            break;
        }
    }
    bag_items.splice(`${itemIndex}`,1);
    existingItems=bag_items;
    addBagSummary();
    GenerateHTML();
    updateBagButton();
  
   

}

// Function to generate order summary 

function addBagSummary() {

    let bagSummaryElement = document.querySelector('.bag-summary');

    bagItemObjects = bag_items.map(itemId => {
        for (let i = 0; i < items.length; i++) {
          if (itemId == items[i].id) {
            return items[i];
          }
        }
      });

    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
  
    bagItemObjects.forEach(bagItem => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
    
  
    bagSummaryElement.innerHTML = `
      <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹99</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
    `;
  }


// Function to update the bag icon on removal of an item

function updateBagButton() {

  bagElement.innerHTML= bagElement.innerHTML+=`<span class='bag_item_count'> ${bag_items.length}</span>`
  localStorage.clear();
  localStorage.setItem('item',JSON.stringify(`${bag_items}`));
}