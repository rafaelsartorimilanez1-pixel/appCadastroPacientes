import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-_6qhSbSfNdP1h1kwl9RVVuI0M4KbiHM",
    authDomain: "app-pacientes-f9355.firebaseapp.com",
    projectId: "app-pacientes-f9355",
    storageBucket: "app-pacientes-f9355.firebasestorage.app",
    messagingSenderId: "414697857997",
    appId: "1:414697857997:web:5b5baca12bb93dbdf6da84"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o banco
const database = getDatabase(app);

// Referência raiz
const dbRef = ref(database);

export { database, dbRef };