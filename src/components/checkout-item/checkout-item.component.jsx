import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	ImageContainer,
	NameQuantPrice,
	QArrow,
	QValue,
	RemoveButton,
} from "./checkoutitem.styles";

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { clearItemFromCart, addItemToCart, removeItemToCart } =
		useContext(CartContext);
	const addProductToCart = () => addItemToCart(cartItem);
	const clearItemHandler = () => clearItemFromCart(cartItem);
	const addItemHandler = () => addItemToCart(cartItem);
	const removeItemHandler = () => removeItemToCart(cartItem);
	//const totalItems = cartItem.map((item) => console.log(item));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={"$name"} />
			</ImageContainer>
			<NameQuantPrice as="span">{name}</NameQuantPrice>
			<NameQuantPrice as="span">
				<QArrow onClick={removeItemHandler}>&#10094;</QArrow>
				<QValue>{quantity}</QValue>
				<QArrow onClick={addItemHandler}>&#10095;</QArrow>
			</NameQuantPrice>
			<NameQuantPrice as="span">{price}</NameQuantPrice>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
