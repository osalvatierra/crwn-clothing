import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setcategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			console.log(categoryMap);
			setcategoriesMap(categoryMap);
		};

		getCategoriesMap();
	}, []);

	const value = { categoriesMap };

	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChangedListener((user) => {
	// 		if (user) {
	// 			createUserDocumentFromAuth(user);
	// 		}
	// 		setCurrentUser(user);
	// 	});
	// 	return unsubscribe;
	// }, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};