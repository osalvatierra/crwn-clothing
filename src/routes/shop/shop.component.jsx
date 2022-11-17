import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { ProductsContainer } from "./shop.styles";

// products contains all products from Json. Uses useContext w/ ProductsContext import
// Then ProductCard import, used to add selected products to cart area
const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
