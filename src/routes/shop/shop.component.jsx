import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

// products contains all products from Json. Uses useContext w/ ProductsContext import
// Then ProductCard import, used to add selected products to cart area
const Shop = () => {
	const { products } = useContext(ProductsContext);
	return (
		<div className="products-container">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default Shop;
