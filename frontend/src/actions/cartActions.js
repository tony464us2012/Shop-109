import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types'

export const addToCart = (cartItem) => async (dispatch, getState) => {
 
    const { id, name, price, extraPatty, pattySwap, sideSwap, upgradeSide, extras, large, sauce, burger, fryAddOn, instructions } = cartItem

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id,
            name,
            price,
            extraPatty, 
            pattySwap,
            sideSwap,
            upgradeSide,
            extras,
            large,
            sauce, 
            burger,
            fryAddOn,
            instructions
        }
     
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
