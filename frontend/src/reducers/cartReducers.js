import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload 
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
        case CART_REMOVE_ITEM: 
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload)
            }
            default: 
                return state
    }
}