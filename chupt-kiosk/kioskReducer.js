import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_NAME_INPUT,
    CHANGE_PHONE_INPUT,
    REMOVE_ONE_FROM_CART,
    CHANGE_ITEM_NUMBER,
    CHANGE_PICKUPTYPE_INPUT,
    TOGGLE_CHECKED,
    POPULATE_MODS
} from './kioskActions'
import {NavigationActions} from "react-navigation";
import OptionMod from "./screens/ModifyItem";

const initialState = {
    menu: [],
    loading: false,
    error: null,
    cart: [
        {type: 'Entrees', items: []},
        {type: 'Sides', items: []},
        {type: 'Drinks', items: []},
        {type: 'Meals', items: []}
    ],
    name: '',
    number: '',
    pickupType: '',
    checked: []
}

export default function productReducer(state = initialState, action) {
    let newCart = state.cart.map((item) => Object.assign({}, item))
    let newChecked = state.checked.map((item) => Object.assign({}, item))
    switch (action.type) {
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
                if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
                    const inCart = x.items.find(i => i.item_id == action.payload.item.item_id)
                    if (inCart) {
                        inCart.count += 1
                    } else {
                        action.payload.item.count = 1
                        x.items.push(action.payload.item)
                    }
                }
            })
            return {
                ...state,
                cart: newCart
            }

        case TOGGLE_CHECKED:
            const itemID = action.itemID
            const data = action.option
            if (!state.checked.includes(itemID)) {
                newChecked.push({itemID:[data]})
                console.log(newChecked)
                console.log("checked")
            } else {
                console.log(itemID)
                const test = data.items.find(i => i.item_id == itemID)
                console.log(test)
            }

            return {
                ...state,
            }

        case POPULATE_MODS:
            const inChecked = newChecked.find(x => x.id === action.payload.item.item_id)

            if (!inChecked) {
                const option = []
                const choice = []
                action.payload.item.mods.forEach((x) => {
                    switch (x.mod_type) {
                        case 'option':
                            option.push({[x.name]: x.default})
                            break;
                        case 'choice':
                            choice.push({[x.name]: x.default})
                    }
                })

                newChecked.push({
                    id: action.payload.item.item_id, options: option, choices: choice})
            }else {
                console.log(inChecked)
            }
            return {
                ...state,
                checked: newChecked
            }

        case REMOVE_ONE_FROM_CART:
            newCart.forEach((x) => {
                if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
                    inCart = x.items.find(i => i.item_id == action.payload.item.item_id)
                    if (inCart.count > 1) {
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
                    x.items.splice(index, 1)
                }
            })
            return {
                ...state,
                cart: newCart
            };

        case CHANGE_ITEM_NUMBER:
            newCart.forEach((x) => {
                if (x.type.toLowerCase() == action.item.item.type.toLowerCase()) {
                    index = x.items.findIndex(i => i.item_id == action.item.item.item_id)
                    if (action.number.number == '') {
                        x.items.splice(index, 1)
                    } else {
                        x.items[index].count = Number(action.number.number.replace(/[^0-9]/g, ''))
                    }
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

        case CHANGE_PICKUPTYPE_INPUT:
            return {
                ...state,
                pickupType: action.payload
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
