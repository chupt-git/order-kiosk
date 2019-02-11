import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART
} from './kioskActions';

const initialState = {
  menu: [],
  loading: false,
  error: null,
  cart: []
};

export default function productReducer(state = initialState, action) {
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

   default:
     return state;
  }
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cart: [
          ...state.cart,
        ]
      })
    default:
      return state
  }
}
