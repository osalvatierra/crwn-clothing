import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ checkoutItem }) => {
	const { name, imageUrl, price, quantity } = checkoutItem;
	const { addItemToCart } = useContext(CartContext);
	const addProductToCart = () => addItemToCart(checkoutItem);
	let total = quantity * price; //{total}
	return (
		<div className="cart-item-container">
			<img src={imageUrl} alt={'$name'} />
			<div className='item-details'>
				<span className={'name'}>{name}</span>
				<span className='quantity'>{quantity}</span>
				<span className='price'>{quantity} <span onClick={addProductToCart}>>></span> </span>
			</div>
		</div>
	);
};

export default CheckoutItem;
