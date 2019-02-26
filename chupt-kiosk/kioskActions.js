export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_NAME_INPUT = 'CHANGE_NAME_INPUT'
export const CHANGE_PHONE_INPUT = 'CHANGE_PHONE_INPUT'
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART'
export const CHANGE_ITEM_NUMBER = 'CHANGE_ITEM_NUMBER'

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: { item }

});

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  payload: { item }
});

export const changeItemNumber = (number, item) => ({
  type: CHANGE_ITEM_NUMBER,
  number: {number},
  item: {item}
});

export const changeNameInput = name => ({
  type: CHANGE_NAME_INPUT,
  payload: { name }
});

export const changePhoneInput = number => ({
  type: CHANGE_PHONE_INPUT,
  payload: { number }
});

export const removeOneFromCart = item => ({
  type: REMOVE_ONE_FROM_CART,
  payload: {item}
})

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch('http://192.168.1.9:5000/pods/DApm5HLNDrE4vpFjanQR65/menu')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.menu));
        return json.menu;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export function sendOrder() {
  return dispatch => {
    dispatch(fetchProductsBegin())
    items= {}
    let currentCategory = ''
    cart.forEach((dataItem) => {
      if (currentCategory !== dataItem.item.type) {
        items[dataItem.item.type] = dataItem.item
        currentCategory = dataItem.item.type
      }
    })
    return fetch('http://192.168.1.115:5000/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pod_id: 'DApm5HLNDrE4vpFjanQR65',
        items,

      }),
    })
  }
}


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
