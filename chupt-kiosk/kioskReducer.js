import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_LOCKERS_BEGIN,
    FETCH_LOCKERS_SUCCESS,
    FETCH_LOCKERS_FAILURE,
    FETCH_ORDER_SUCCESS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ONE_FROM_CART,
    CHANGE_ITEM_NUMBER,
    TOGGLE_CHECKED,
    POPULATE_MODS,
    CHANGE_SIDE,
    QUICK_DELETE_CART,
    TOGGLE_MODAL_DISPLAY,
    CLEAR_MODDED_SIDE,
    CLEAR_CHECKED,
    ADD_ONE_TO_CART,
    REMOVE_POPUP,
    PHONE_INPUT_VALIDATION,
    CONTACT_CHANGE,
    CLEAR_STATE,
    FETCH_AUTH_CODE_SUCCESS
} from './kioskActions'

const initialState = {
    menu: [],
    lockers: [],
    checked: [],
    moddedSide: [],
    cart: [
        {type: 'Entrees', items: []},
        {type: 'Sides', items: []},
        {type: 'Drinks', items: []},
        {type: 'Meals', items: []}
    ],
    number: {
      num: '',
      unvalid: true
    },
    contact: {
      name: {
        input:'',
        valid: false
      },
      number: {
        input:'',
        valid: false
      },
      email: {
        input:'',
        valid: false
      },
    },
    display: false,
    loading: false,
    error: null,
    amount: 0,
    showPopup: false,
    orderAndContact: {},
    token: ''
}

export default function productReducer(state = initialState, action) {
    let newCart = JSON.parse(JSON.stringify(state.cart))
    let newChecked = state.checked.map((item) => Object.assign({}, item))
    let newModdedSide = state.moddedSide.map((item) => Object.assign({}, item))
    let newAmount = state.amount
    let newNumber = JSON.parse(JSON.stringify(state.number))
    let newContact = JSON.parse(JSON.stringify(state.contact))
    let newInitialState = JSON.parse(JSON.stringify(initialState))

    function compare(a, b) {
        const newA = JSON.parse(JSON.stringify(a))
        const newB = JSON.parse(JSON.stringify(b))

        newA.count = 0
        newB.count = 0

       if (newB.items){
           newB.items.forEach(x=> {
                x.count = 0
        })}
       if ( newA.items){
           newA.items.forEach(x=> {
               x.count = 0
           })
       }

        return JSON.stringify(newA) === JSON.stringify(newB);
    }

    function validatePhoneNumber(elementValue){
      let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      return re.test(elementValue);
    }

    function validateEmail(emailInput) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(emailInput.trim()).toLowerCase());
    }

    function validateName(nameInput) {
      let re = /^[A-Za-z\s]+$/
      return re.test(nameInput)
    }

    switch (action.type) {

        case CLEAR_STATE:
          newInitialState.menu = state.menu
          return newInitialState;

        case CONTACT_CHANGE:
          newContact[action.contactType.contactType].input = action.input.input
          switch (action.contactType.contactType) {
            case 'name':
              newContact[action.contactType.contactType].valid = validateName(action.input.input)
              break;
            case 'email':
              newContact[action.contactType.contactType].valid = validateEmail(action.input.input)
              break;
            case 'number':
                newContact[action.contactType.contactType].valid = validatePhoneNumber(action.input.input)
              break;
            default:
          }

          return {
              ...state,
              contact: newContact
          }

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

        case FETCH_LOCKERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_LOCKERS_SUCCESS:
            return {
                ...state,
                loading: false,
                lockers: action.payload.lockers
            };

        case FETCH_LOCKERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                menu: []
            };

        case FETCH_ORDER_SUCCESS:
          let newOrderInfo = JSON.parse(JSON.stringify(action.payload.orderAndContact.items))
          let newItems = []


          Object.keys(newOrderInfo).forEach(x => {
            newItems.push({items:newOrderInfo[x], type: x, changedMod: []})
          })

          action.payload.orderAndContact.items = newItems

          return {
              ...state,
              orderAndContact: action.payload
          }

        case FETCH_AUTH_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.authCode
            };

        case CLEAR_MODDED_SIDE:
            return {
                ...state,
                moddedSide: []
            }

        case CLEAR_CHECKED:
            return {
                ...state,
                checked: []
            }

        case ADD_ONE_TO_CART:
            const menuType = newCart.find(x=> x.type.toLowerCase() === action.payload.item.type.toLowerCase())
            const CartItems = menuType.items.filter(x => x.item_id === action.payload.item.item_id)
            for (let i = 0; i < CartItems.length; i ++) {
                if (compare(CartItems[i], action.payload.item)) {
                    item = CartItems[i]
                    break
                }
            }
            if (!item) {
                action.payload.item.count = 1
                menuType.items.push(action.payload.item)
            } else {
                item.count += 1
            }

            newAmount += action.payload.item.amount

            return {
                ...state,
                cart: newCart,
                amount: newAmount
            }

        case ADD_TO_CART:
            const cartType = newCart.find(x=> x.type.toLowerCase() === action.payload.item.type.toLowerCase())
            const inCart = cartType.items.filter(x => x.item_id === action.payload.item.item_id)
            let item
            const revertItem = JSON.parse(JSON.stringify(action.payload.item))
            const checked = newChecked.find(x => x.id === revertItem.item_id)

            revertItem.changedMod = action.payload.item.changedMod = []
            if (checked) {
                if (revertItem.items) {
                    // MULTI
                    revertItem.items.forEach(x => {
                        const itemMods = checked.items.find(y=> y.id === x.item_id)

                        itemMods.options.forEach(y => {
                            const singleMod = x.mods.find(i => i.name === y.name)
                            if (singleMod.value !== y.value) {
                                singleMod.value = y.value
                                if (y.value === false) {
                                    revertItem.changedMod.push('No ' + y.name)
                                } else if  (y.value === true){
                                    revertItem.changedMod.push('Add ' + y.name)
                                }
                            }
                        })

                        itemMods.choices.forEach(y => {
                            const singleMod = x.mods.find(i => i.name === y.name)

                            if (singleMod.value !== y.value) {
                                singleMod.value = y.value
                                revertItem.changedMod.push(y.name + ' Is ' + y.value.charAt(0).toUpperCase() + y.value.slice(1))
                            }
                        })
                    })

                } else {
                    // Single
                    checked.options.forEach(y => {
                        const singleMod = revertItem.mods.find(i => i.name === y.name)
                        if (singleMod.value !== y.value) {
                            singleMod.value = y.value
                            if (y.value === false) {
                                revertItem.changedMod.push('No ' + y.name)
                            } else if  (y.value === true){
                                revertItem.changedMod.push('Add ' + y.name)
                            }
                        }
                    })

                    checked.choices.forEach(y=> {
                        const singleMod = revertItem.mods.find(i => i.name === y.name)

                        if (singleMod.value !== y.value) {
                            singleMod.value = y.value
                            revertItem.changedMod.push(y.name + ' Is ' + y.value.charAt(0).toUpperCase() + y.value.slice(1))
                        }
                    })
                }
            }

            for (let i = 0; i < inCart.length; i ++) {
                if (compare(inCart[i], revertItem)) {
                    item = inCart[i]
                    break
                }
            }

            if (!item) {
                revertItem.count = 1
                cartType.items.push(revertItem)
            } else {
                item.count += 1
            }

            newAmount += revertItem.amount

            return {
                ...state,
                cart: newCart,
                showPopup: true,
                amount: newAmount
            }

        case TOGGLE_CHECKED:
            const checkedItem = newChecked.find(x => x.id === action.item.item)

            if (!checkedItem.items) {
                //Single
                const val = checkedItem[action.mod.mod].find(x=> x.name === action.name.name)
                switch (action.mod.mod){
                    case 'choices':
                        val.value = action.itemName.itemName.toLowerCase()
                        break
                    case 'options':
                        val.value = !(/true/i).test(val.value)
                        break
                }
            } else {
                // meal item
                let mealItem = checkedItem.items.find(x=>x.id === action.itemName.itemName)
                let val = mealItem[action.name.name].find(x=> x.name === action.mod.mod)
                switch (action.name.name){
                    case 'choices':
                        val.value = action.choiceID.choiceID.toLowerCase()
                        break
                    case 'options':
                        val.value = !(/true/i).test(val.value)
                        break
                }
            }

            return {
                ...state,
                checked: newChecked
            }

        case CHANGE_SIDE:
            const newProducts = JSON.parse(JSON.stringify(state.menu.products.meals))
            const meal = newProducts.find(x => x.item_id === action.mealId.mealId)
            const index = meal.items.findIndex(x => x.item_type === 'side')
            let newName = ''
            let newDec = ''

            meal.items.splice(index, 1)
            meal.items.push(action.item.item)
            newModdedSide = []
            newModdedSide.push(meal)

            newModdedSide[0].items.forEach((x, y) => {
                if (y > 0) {
                    newName += 'and ' + x.name
                    newDec += ' ' + x.description
                } else {
                    newName += x.name
                    newDec += x.description
                }
            })

            newModdedSide[0].name = newName
            newModdedSide[0].description = newDec

            return {
                ...state,
                moddedSide: newModdedSide
            }

        case POPULATE_MODS:
            const inChecked = newChecked.find(x => x.item_id === action.productID.productID)
            const swappedSide = newModdedSide.find(x => x.item_id === action.productID.productID)
            let clearChecked = []

            if (!inChecked) {
                switch (action.mealType.mealType) {
                    case 'multi':
                        let meal
                        if (swappedSide){
                            meal = swappedSide
                        } else {
                            let newProd = state.menu.products.meals.map((item) => Object.assign({}, item))
                            meal = newProd.find(x => x.item_id === action.productID.productID)
                        }
                        let mealOptions = []

                        meal.items.forEach(x=>{
                            let option = []
                            let choice = []
                            x.mods.forEach(y=>{
                                if (y.mod_type == 'option') {
                                    option.push({name: y.name, value: y.default})
                                } else if (y.mod_type === 'choice'){
                                    choice.push({name: y.name, value: y.default, choices: y.choices})
                                }
                            })
                            mealOptions.push({
                                type: x.item_type,
                                id: x.item_id,
                                options: option,
                                choices: choice
                            })
                        })
                        clearChecked.push({
                            id: action.productID.productID,
                            items: mealOptions
                        })
                        break
                    case 'single':
                        let option = []
                        let choice = []
                        action.item.item.mods.forEach((x) => {
                            switch (x.mod_type) {
                                case 'option':
                                    option.push({name: x.name, value: x.default})
                                    break;
                                case 'choice':
                                    choice.push({name: x.name, value: x.default, choices: x.choices})
                            }
                        })
                        clearChecked.push({
                            id: action.item.item.item_id,
                            options: option,
                            choices: choice
                        })
                        break
                }
            }

            return {
                ...state,
                checked: clearChecked
            }

        case REMOVE_ONE_FROM_CART:

            newCart.forEach((x) => {
                if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
                    const inCart = x.items.find(i => i.item_id == action.payload.item.item_id)
                    if (inCart.count > 1) {
                        inCart.count -= 1
                    }
                }
            })
            newAmount -= action.payload.item.amount
            return {
                ...state,
                cart: newCart,
                amount: newAmount
            }

        case REMOVE_FROM_CART:
            newCart.forEach((x) => {
                if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
                    const index = x.items.findIndex(i => i.item_id == action.payload.item.item_id)
                    x.items.splice(index, 1)
                }
            })
            const deleteAmount = action.payload.item.amount * action.payload.item.count
            newAmount -= deleteAmount
            return {
                ...state,
                cart: newCart,
                amount: newAmount
            };

        case CHANGE_ITEM_NUMBER:
            newCart.forEach((x) => {
                if (x.type.toLowerCase() == action.item.item.type.toLowerCase()) {
                    const index = x.items.findIndex(i => i.item_id == action.item.item.item_id)
                    if (action.number.number == '') {
                        x.items.splice(index, 1)
                    } else {
                        x.items[index].count = Number(action.number.number.replace(/[^0-9]/g, ''))
                    }
                }
            })
            const toggleAmount = action.item.item.amount * action.number.number
            const delAmount = action.item.item.amount * action.item.item.count
            newAmount -= delAmount
            newAmount += toggleAmount

            return {
                ...state,
                cart: newCart,
                amount: newAmount
            };

        case PHONE_INPUT_VALIDATION:
            const isValid = !validatePhoneNumber(action.payload.item)
            newNumber = {
              number: action.payload.item,
              unvalid: isValid
            }
            return {
                ...state,
                number: newNumber
            }

        case QUICK_DELETE_CART:
            newCart.forEach(x => {
                x.items = []
            })
            return {
                ...state,
                cart: newCart,
                amount: 0
            }

        case TOGGLE_MODAL_DISPLAY:
            return {
                ...state,
                display: !state.display
            }

        case REMOVE_POPUP:
            return {
                ...state,
                showPopup: false
            }



        default:
            return state;
    }
}
