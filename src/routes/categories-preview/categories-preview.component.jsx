import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

// products contains all products from Json. Uses useContext w/ ProductsContext import
// Then ProductCard import, used to add selected products to cart area
const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={products}
					/>
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
