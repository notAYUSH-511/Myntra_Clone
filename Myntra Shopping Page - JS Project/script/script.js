let itemsContainerElement = document.querySelector('.items-container');

itemsContainerElement.innerHTML= '';

let innerHtml=[];

items.forEach( item => {
innerHtml+= `<div class="product-container">
<img src="${item.image}">
<div class="rating">
   ${item.rating.stars}⭐ | ${item.rating.count}
</div>
<div class="company-name">
    ${item.company}
</div>
<div class="product-name">
    ${item.item_name}
</div>
<div class="price">
   <span class="current-price"> ${item.current_price}  </span> 
   <span class="original-price"> ${item.original_price} </span>
   <span class="discount"> (${item.discount_percentage} % OFF) </span>
</div>
<button class="bag-btn" onClick=" performBagAdd(${item.id}) ; ">Add to Bag </button>
</div>`;
})

itemsContainerElement.innerHTML= innerHtml;


// Bag Adding Function
let bag_items = [];
let bag_items_count;
let bagCountElement;
let bagElement = document.querySelector('.bag_button');


let existingItems= JSON.parse(localStorage.getItem('item'));
    if(existingItems!==null){
    bag_items = existingItems;
    
    bagElement.innerHTML+=`<span class='bag_item_count'> ${bag_items.length}</span>`
    bagCountElement = document.querySelector('.bag_item_count');

    }


function performBagAdd(id) {
    
    let idAlreadyPresent=false;
    for(let i=0;i<bag_items.length;i++){
        if(bag_items[i]===id){
            idAlreadyPresent=true;
            break;
        }
    }

    if(!idAlreadyPresent){
    bag_items.push(id);
    localStorage.setItem('item',JSON.stringify(bag_items));
}


    
    bag_items_count=bag_items.length;
    
    if(bag_items_count==1 && !idAlreadyPresent ){

    bagElement.innerHTML+=`<span class='bag_item_count'> ${bag_items_count}</span>`

    bagCountElement = document.querySelector('.bag_item_count');
}
    else if(idAlreadyPresent){
        return ;
    }

    else{
       
       bagCountElement.innerText=bag_items.length;
    }

}