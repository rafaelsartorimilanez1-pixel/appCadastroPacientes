import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "SUA_KEY",
    authDomain: "app-pacientes-f9355.firebaseapp.com",
    projectId: "app-pacientes-f9355",
    storageBucket: "app-pacientes-f9355.firebasestorage.app",
    messagingSenderId: "414697857997",
    appId: "1:414697857997:web:5b5baca12bb93dbdf6da84"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };