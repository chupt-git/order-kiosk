import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_NAME_INPUT,
  CHANGE_PHONE_INPUT,
  REMOVE_ONE_FROM_CART
} from './kioskActions'

const initialState = {
  menu: [],
  loading: false,
  error: null,
  cart: [
    {type: 'Entrees', items:[]},
    {type: 'Sides', items:[]},
    {type: 'Drinks', items:[]},
    {type: 'Meals', items:[]}
  ],
  name: '',
  number: ''
}

export default function productReducer(state = initialState, action) {
  let newCart = state.cart.map((item) => Object.assign({}, item))
  switch(action.type) {
   case FETCH_PRODUCTS_BEGIN:
     return {
       ...state,
       loading: true,
       error: null
     };

   case FETCH_PRODUCTS_SUCCESS:
     return {
       ...state,
       loading: false,
       menu: action.payload
     };

   case FETCH_PRODUCTS_FAILURE:
     return {
       ...state,
       loading: false,
       error: action.payload.error,
       menu: []
     };

   case ADD_TO_CART:
      newCart.forEach((x) => {
        if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()){
          inCart = x.items.find(i => i.item_id == action.payload.item.item_id)
          if (inCart) {
            inCart.count += 1
          }
          else{
            action.payload.item.count = 1
            x.items.push(action.payload.item)
          }
        }
      })
       return {
         ...state,
         cart: newCart
     }

   case REMOVE_ONE_FROM_CART:
       newCart.forEach((x) => {
         if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
           inCart = x.items.find(i => i.item_id == action.payload.item.item_id)
           if (inCart.count > 1){
             inCart.count -= 1
          }
         }
      })
       return {
         ...state,
         cart: newCart
     }

   case REMOVE_FROM_CART:
       newCart.forEach((x) => {
         if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
           index = x.items.findIndex(i => i.item_id == action.payload.item.item_id)
           console.log(x.items[index])
           x.items.splice(index, 1)
         }
      })
       return {
         ...state,
         cart: newCart
     };

   case CHANGE_NAME_INPUT:
    return {
      ...state,
      name: action.payload
     }

   case CHANGE_PHONE_INPUT:
   return {
     ...state,
     number: action.payload
   }

   default:
     return state;
  }
}
