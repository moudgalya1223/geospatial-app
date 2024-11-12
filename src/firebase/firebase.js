import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = { apiKey: "AIzaSyCw-Uzcit-SIAWLy9Re_zuBjO7rLnnnPwM",
    authDomain: "planeverything-63290.firebaseapp.com",
    databaseURL: "https://planeverything-63290.firebaseio.com",
    projectId: "planeverything-63290",
    storageBucket: "planeverything-63290.firebasestorage.app",
    messagingSenderId: "634038135973",
    appId: "1:634038135973:web:b901ac9e3f4d8d543db14c",
    measurementId: "G-G9G78GKCZ9" };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
