import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import { CartDown, EmptyMessage, CartItems } from "./cart-dropdown.styles";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigate = useNavigate();
	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};

	return (
		<CartDown>
			<CartItems>
				{CartItem.length ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item} />
					))
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDown>
	);
};

export default CartDropdown;
