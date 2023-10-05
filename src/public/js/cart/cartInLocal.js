const cartInLocal = 'cart'

const getCart = () => {
    return localStorage.getItem(cartInLocal)
}

const cartExists = (cartAttempt) => {
    return getCart() === cartAttempt
}

const addCart = (cartId) => {
    localStorage.set(cartInLocal, cartId)
}

const removeCart = () => {
    localStorage.removeItem(cartInLocal)
}

