import { createContext, useReducer } from "react";

import {createAction} from '../utils/reducer/reducer.util';

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productsToAdd
	const existingCartItem = cartItems.find(
		(cardItem) => cardItem.id == productToAdd.id
	);

	// if found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id == productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	// find the cart item to remove
	// find if cartItems contains itemToRemove
	const existingCartItem = cartItems.find(
		(cardItem) => cardItem.id == cartItemToRemove.id
	);
	// check if quantity is equal to 1, if it is remove that item
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== cartItemToRemove.id
		);
	}

	// return back cartiems with matching cart item with reduced quant
	return cartItems.map((cartItem) =>
		cartItem.id == cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};
// as the actual value you want to access
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS', 
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
	isCartOpen: true,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0
};

const cartReducer = (state, action) => {

	const { type, payload } = action;


	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
		};

		default:
			throw new Error(`unhandled type of ${type} in cartReducer`);
	}
}

export const CartProvider = ({ children }) => {


const [{cartItems, isCartOpen, cartTotal, cartCount}, dispatch] = useReducer(cartReducer, INITIAL_STATE);


	const updateCartItemsReducer = (newCartItmes) => {

		const newCartCount = newCartItmes.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		const newCartTotal = newCartItmes.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);


			dispatch(
				createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
					cartItems: newCartItmes, 
					cartTotal: newCartTotal, 
					cartCount: newCartCount
				})
				);

	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemToCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemToCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
