import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/check-out/check-out.component";

import Button from "../../components/button/button.component";

import './checkout.styles.scss';

const Checkout = ({ product }) => {
	//const { name, price, imageUrl } = product;
	const { cartItems, addItemToCart, removeItemToCart } = useContext(CartContext);

	return (
		<div className="checkout-container">
			{cartItems.map((cartItem) => {
				const {id, name, quantity } = cartItem;
//				<CheckoutItem key={id} checkoutItem={cartItem} />
			return (
			<div key={id}>
				<h2>{name}</h2>
				<span>{quantity}</span>
				<br />
				<span onClick={() => removeItemToCart(cartItem)}>decrement</span>
				<br />
				<span onClick={() => addItemToCart(cartItem)}>increment</span>				
			</div>
			);
		})}
		</div>
	);
}

export default Checkout;