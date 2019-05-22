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
export const POPULATE_MODS = 'POPULATE_MODS'
export const CHANGE_SIDE = 'CHANGE_SIDE'
export const QUICK_DELETE_CART = 'QUICK_DELETE_CART'
export const TOGGLE_MODAL_DISPLAY = 'TOGGLE_MODAL_DISPLAY'
export const CLEAR_MODDED_SIDE = 'CLEAR_MODDED_SIDE'
export const CLEAR_CHECKED = 'CLEAR_CHECKED'
export const ADD_ONE_TO_CART = 'ADD_ONE_TO_CART'
export const REMOVE_POPUP = 'REMOVE_POPUP'
export const PHONE_INPUT_VALIDATION = 'PHONE_INPUT_VALIDATION'
export const CHANGE_CONTACT_INPUT = 'CHANGE_CONTACT_INPUT'
export const CONTACT_CHANGE = 'CONTACT_CHANGE'
export const CLEAR_STATE = 'CLEAR_STATE'
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'
export const FETCH_AUTH_CODE_SUCCESS = 'FETCH_AUTH_CODE_SUCCESS'

export const contactChange = (input, contactType) => ({
  type: CONTACT_CHANGE,
  input: {input},
  contactType: {contactType}
})

export const removePopup = () => ({
  type: REMOVE_POPUP
})

export const toggleModalDisplay = () => ({
  type: TOGGLE_MODAL_DISPLAY
})

export const clearModdedSide = () => ({
  type: CLEAR_MODDED_SIDE
})

export const clearChecked = () => ({
  type: CLEAR_CHECKED
})

export const clearState = () => ({
  type: CLEAR_STATE
})

export const quickDeleteCart = () => ({
  type: QUICK_DELETE_CART
})

export const changeSide = (item, mealId) => ({
  type: CHANGE_SIDE,
  item: { item },
  mealId: { mealId }
})

export const populateMods = (item, mealType, productID) => ({
  type: POPULATE_MODS,
  item: {item},
  mealType: {mealType},
  productID: {productID}
})

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: { item }
})

export const addOneToCart = item => ({
  type: ADD_ONE_TO_CART,
  payload: { item }
})

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  payload: { item }
})

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

export const phoneInputValidation  = item => ({
  type: PHONE_INPUT_VALIDATION,
  payload: { item }
})

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

export const fetchOrderSuccess = orderAndContact => ({
  type: FETCH_ORDER_SUCCESS,
  payload: { orderAndContact }
})

export const fetchAuthCodeSuccess = authCode => ({
  type: FETCH_AUTH_CODE_SUCCESS,
  payload: { authCode }
})

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch('https://chupt-dev-4.appspot.com/pods/DApm5HLNDrE4vpFjanQR65/menu')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.menu))
        return json.orderAndContact
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  };
}

export function fetchPickup() {
  return dispatch => {
    dispatch(fetchLockersBegin());
    return fetch('https://chupt-dev-4.appspot.com/pods/DApm5HLNDrE4vpFjanQR65/status')
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchLockersSuccess(json.lockers))
          return json.lockers
        })
        .catch(error => dispatch(fetchLockersFailure(error)))
  };
}

export function fetchOrder(order_id) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch('https://chupt-dev-4.appspot.com/orders/'+ order_id)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchOrderSuccess(json))
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  };
}

export function getAuthCode() {
  return dispatch => {
    dispatch(fetchLockersBegin());
    return fetch('https://access-token-949d4.firebaseio.com/tokens.json')
        .then(handleErrors)
        .then(res => {
          return res.json()
        })
        .then(json => {
          dispatch(fetchAuthCodeSuccess(json.accessToken))
          return json.accessToken
        })
        .catch(error => dispatch(fetchLockersFailure(error)))
  }
}

export function refreshAuthCode() {
  return dispatch => {
    dispatch(fetchLockersBegin());
    return fetch('https://connect.squareup.com/oauth2/token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 'sq0idp-EEr0UerVULRXtF1xdh3zLw',
        client_secret:'sq0csp-TBFE6x2YOWPmYOloBF0_gdFZ1mA2dXRhW56zxTl5kEM',
        grant_type: 'refresh_token',
        refresh_token: 'EQAAEIj1L02P5t2yhYZMONQmA_SqY_wl_h--UIhAE-1cBObahPrSBt72LUKpmewg'
      })
    }
  }
}

export function sendOrder(cart, contact, amount) {
  return dispatch => {
    dispatch(fetchProductsBegin())
    let items = {}
    let currentCategory = ''
    let current_item = {}
    let newMods = []
    const uuidv1 = require('uuid/v1');

    cart.forEach((dataItem) => {
      if (currentCategory !== dataItem.type) {
        items[dataItem.type.toLowerCase()] = []
        dataItem.items.forEach((item) => {
          if (item.items) {
            let multiItems = []
            // IF MULTI

            item.items.forEach(x => {
              x.mods.forEach(y => {
                newMods.push({name: y.name, value: y.value})
              })
              multiItems.push(
                {
                  item_id: x.item_id,
                  item_type: x.item_type,
                  mods: newMods,
                  name: x.name
                }
              )
            })

            items[dataItem.type.toLowerCase()].push({
              item_id: item.item_id,
              item_type: item.item_type,
              amount: item.amount,
              count: item.count,
              items: multiItems,
              name: item.name
            })
          } else {
            // IF SINGLE
            item.mods.forEach(y => {
              newMods.push({name: y.name, value: y.value})
            })

            items[dataItem.type.toLowerCase()].push({
                item_id: item.item_id,
                item_type: item.item_type,
                mods: newMods,
                count: item.count,
                amount: item.amount,
                name: item.name
              })

          }
        })

        currentCategory = dataItem.type
      }
    })

    return fetch('https://chupt-dev-4.appspot.com/orders/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pod_id: 'DApm5HLNDrE4vpFjanQR65',
        name: contact.name.input,
        phone: contact.number.input,
        pickup_pin: contact.number.input,
        customer_uid: uuidv1(),
        placer_uid: uuidv1(),
        source: "pod",
        pickup_type: "locker",
        items: items,
        payment: {
          cards: [
            {
              "amount": amount,
              "agent": "square",
              "agent_ref": "neY5J5msqrPH5ZbiurXNwQ",
              "card_type": "visa debit",
              "card_num": "xxxx",
              "name": contact.name.input,
              "expiration": "01/20",
              "ccv": "345"
            }
          ]
        }
      }),
    })
    .then((response) => response.json())
    .then((responseData) => {

        console.log("Response:", responseData);
     })
     .catch((error) => {
        console.log('problem while adding data');
      })
    .done()
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
