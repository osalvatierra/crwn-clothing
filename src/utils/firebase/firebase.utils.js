import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBzAgiRQ5ebpEe5JJsht5EJSpWiUtF-vDw",
	authDomain: "crwn-clothing-db-73685.firebaseapp.com",
	projectId: "crwn-clothing-db-73685",
	storageBucket: "crwn-clothing-db-73685.appspot.com",
	messagingSenderId: "678131804073",
	appId: "1:678131804073:web:f9f952362adb04597cc6b8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
