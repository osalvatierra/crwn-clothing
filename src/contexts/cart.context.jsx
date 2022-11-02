import { createContext, useState, useEffect } from "react";

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
	if(existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	}

	// return back cartiems with matching cart item with reduced quant
	return cartItems.map((cartItem) =>
		cartItem.id == cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);

}

// as the actual value you want to access
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect( () => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setCartCount(newCartCount);
	}, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemToCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, cartCount };

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
