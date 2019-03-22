export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_LOCKERS_BEGIN   = 'FETCH_LOCKERS_BEGIN'
export const FETCH_LOCKERS_SUCCESS = 'FETCH_LOCKERS_SUCCESS'
export const FETCH_LOCKERS_FAILURE = 'FETCH_LOCKERS_FAILURE'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_NAME_INPUT = 'CHANGE_NAME_INPUT'
export const CHANGE_PHONE_INPUT = 'CHANGE_PHONE_INPUT'
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART'
export const CHANGE_ITEM_NUMBER = 'CHANGE_ITEM_NUMBER'
export const CHANGE_PICKUPTYPE_INPUT = 'CHANGE_PICKUPTYPE_INPUT'
export const TOGGLE_CHECKED = 'TOGGLE_CHECKED'
export const  POPULATE_MODS = 'POPULATE_MODS'
export const CHANGE_SIDE = 'CHANGE_SIDE'
export  const QUICK_DELETE_CART = 'QUICK_DELETE_CART'
export const TOGGLE_MODAL_DISPLAY = 'TOGGLE_MODAL_DISPLAY'
export const CLEAR_MODDED_SIDE = 'CLEAR_MODDED_SIDE'
export const ADD_ONE_TO_CART = 'ADD_ONE_TO_CART'

export const toggleModalDisplay = () => ({
  type: TOGGLE_MODAL_DISPLAY
})

export const clearModdedSide = () => ({
  type: CLEAR_MODDED_SIDE
})

export const quickDeleteCart = () => ({
  type: QUICK_DELETE_CART
})

export const changeSide = (item, mealId) => ({
  type: CHANGE_SIDE,
  item: { item },
  mealId: { mealId }
})

export const  populateMods = (item, mealType, productID) => ({
  type: POPULATE_MODS,
  item: {item},
  mealType: {mealType},
  productID: {productID}
})

export const addOneToCart = item => ({
  type: ADD_ONE_TO_CART,
  payload: { item }
})

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
})

export const changeNameInput = name => ({
  type: CHANGE_NAME_INPUT,
  payload: { name }
});

export const changePhoneInput = number => ({
  type: CHANGE_PHONE_INPUT,
  payload: { number }
});

export const changePickupTypeInput = pickupType => ({
  type: CHANGE_PICKUPTYPE_INPUT,
  payload: { pickupType }
})

export const toggleChecked = (item, mod, name, itemName, choiceID) => ({
  type: TOGGLE_CHECKED,
  item: {item},
  mod: {mod},
  name: {name},
  itemName: {itemName},
  choiceID: {choiceID}
})

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
})

export const fetchLockersBegin = () => ({
  type: FETCH_LOCKERS_BEGIN
})

export const fetchLockersSuccess = lockers => ({
  type: FETCH_LOCKERS_SUCCESS,
  payload: { lockers }
})

export const fetchLockersFailure = error => ({
  type: FETCH_LOCKERS_FAILURE,
  payload: { error }
})

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch('https://chupt-dev-4.appspot.com/pods/DApm5HLNDrE4vpFjanQR65/menu')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.menu))
        return json.menu
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  };
}

export function fetchPickup() {
  return dispatch => {
    dispatch(fetchLockersBegin());
    return fetch('https://chupt-dev-4.appspot.com/carts/1')
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchLockersSuccess(json.lockers))
          return json.lockers
        })
        .catch(error => dispatch(fetchLockersFailure(error)))
  };
}

export function sendOrder(cart, contact) {
  return dispatch => {
    dispatch(fetchProductsBegin())
    let items={}
    let currentCategory = ''

    console.log(cart, contact)

    cart.forEach((dataItem) => {
      if (currentCategory !== dataItem.type) {
        delete dataItem.items.type
        items[dataItem.type] = dataItem.items
        currentCategory = dataItem.type
      }
    })
    
    return fetch('http://192.168.1.9:5000/orders', {
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
