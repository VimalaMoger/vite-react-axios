/*const StorageSetCart = (cartItems) =>{
    sessionStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
} 
const StorageSetCount = (cartCount) => {
    sessionStorage.setItem('count', JSON.stringify(cartCount > 0 ? cartCount : 0));
}
const StorageSetTotal = (cartTotal) => {
    sessionStorage.setItem('total', JSON.stringify(cartTotal > 0 ? cartTotal : 0));
}

export const CartReducer = (state, action) =>{

    //debugger;
    let index = -1;

    if(action.payload){
        index = state.cartItems.findIndex(x => x.id === action.payload.id);
    } 
    let newItems = [...state.cartItems];
    let count = state.cartCount;
    let total = state.cartTotal;

    switch(action.type) {
        case "ADD":
        case "INCREASEQTY":
            if (index === -1) {
                newItems.push({ ...action.payload, quantity: 1});
                const newItemIndex = newItems.findIndex(x => x.id === action.payload.id);
                if (newItems[newItemIndex].stockLevel > 0) {
                    newItems[newItemIndex].stockLevel--; 
                    count = count + 1;
                    total = total + action.payload.price;
                }
            } else {                
                if (newItems[index].stockLevel > 0) {                    
        
                    if (action.payload.userSelectQuantity > 0) {
                        const itemQuantity = (action.payload.userSelectQuantity - newItems[index].quantity);
                        newItems[index].stockLevel = newItems[index].stockLevel - itemQuantity;
                        count = count +  itemQuantity;
                        newItems[index].quantity = action.payload.userSelectQuantity;                        
                        total = total + (action.payload.price * itemQuantity);
                    } else {
                        newItems[index].stockLevel--;
                        newItems[index].quantity++;
                        count = count + 1;
                        total = total + (newItems[index].price);
                    }
                }
            }
            break;

        case "REMOVE":
            if (index > -1) {
                count = count-(newItems[index].quantity);
                total = total - ((newItems[index].price) * (newItems[index].quantity));  
                newItems = state.cartItems.filter((item) => item.id !== action.payload.id);        
            }       
            break;
        
        case "DECREASEQTY":
            if(index > -1) {
                if (newItems[index].quantity > 1) {
                    newItems[index].quantity--;
                    count = count - 1; 
                    total = total - newItems[index].price;
                    newItems[index].stockLevel++;
                }
            }      
            break;
        
        case "CLEAR":
            newItems = []; 
            count = 0;    
            total = 0;     
            break;
        
        default:
    }
    state.cartItems = newItems;
    state.cartCount = count;
    state.cartTotal = total;
    StorageSetCart(newItems);
    StorageSetCount(count);
    StorageSetTotal(total);  
    return state;
}
    */