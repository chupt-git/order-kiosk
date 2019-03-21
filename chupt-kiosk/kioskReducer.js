import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_LOCKERS_BEGIN,
    FETCH_LOCKERS_SUCCESS,
    FETCH_LOCKERS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_NAME_INPUT,
    CHANGE_PHONE_INPUT,
    REMOVE_ONE_FROM_CART,
    CHANGE_ITEM_NUMBER,
    CHANGE_PICKUPTYPE_INPUT,
    TOGGLE_CHECKED,
    POPULATE_MODS,
    CHANGE_SIDE,
    QUICK_DELETE_CART,
    TOGGLE_MODAL_DISPLAY,
    CLEAR_MODDED_SIDE
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
    name: '',
    number: '',
    pickupType: '',
    display: false,
    loading: false,
    error: null,
    amount: 0
}

export default function productReducer(state = initialState, action) {
    let newCart = JSON.parse(JSON.stringify(state.cart))
    let newChecked = state.checked.map((item) => Object.assign({}, item))
    let newModdedSide = state.moddedSide.map((item) => Object.assign({}, item))
    let newAmount = state.amount

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

        case CLEAR_MODDED_SIDE:
            return {
                ...state,
                moddedSide: []
            }

        case ADD_TO_CART:
            newCart.forEach((x) => {
                let finish = false
                if (x.type.toLowerCase() == action.payload.item.type.toLowerCase()) {
                    const inCart = x.items.filter(i => i.item_id == action.payload.item.item_id)

                    if (inCart.length || finish) {
                        let finalItem
                        const test = []
                        const testTwo = []
                        inCart.forEach(y => {
                            if (action.payload.item.items){
                                action.payload.item.items.forEach(z=>test.push(z.item_id))
                                y.items.forEach(z=>testTwo.push(z.item_id))
                                finalItem = y}
                            else {
                                finalItem = x.items.find(x=>x.item_id === action.payload.item.item_id)
                            }
                        })
                        const finalTest = test.filter((item) => { return !testTwo.includes(item)})
                        if (finalTest.length >= 1){
                            action.payload.item.count = 1
                            x.items.push(action.payload.item)
                            finish= true
                        } else {
                            finalItem.count += 1
                            finish = true
                        }
                    } else {
                        action.payload.item.count = 1
                        x.items.push(action.payload.item)
                    }
                }
            })

            newAmount += action.payload.item.amount
            return {
                ...state,
                cart: newCart,
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
            meal.items.splice(index, 1)
            meal.items.push(action.item.item)
            newModdedSide = []
            newModdedSide.push(meal)
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

        default:
            return state;
    }
}
