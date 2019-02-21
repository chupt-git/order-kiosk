import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_NAME_INPUT,
  CHANGE_PHONE_INPUT
} from './kioskActions'

const initialState = {
  menu: [],
  loading: false,
  error: null,
  cart: [],
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
      newCart.push(action.payload)
       return {
         ...state,
         cart: newCart
     };

   case REMOVE_FROM_CART:
    index = state.cart.findIndex(x => x.item== action.payload.item.item)
    newCart.splice(index, 1)
      console.log(newCart);
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
