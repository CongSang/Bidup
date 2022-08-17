
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCx8_tP8idRcZAPI_g2qSKnM4YKS9wfZYg",
    authDomain: "sharing-hope.firebaseapp.com",
    projectId: "sharing-hope",
    storageBucket: "sharing-hope.appspot.com",
    messagingSenderId: "753475301856",
    appId: "1:753475301856:web:2258022cf7014bfd9f3b85",
    databaseURL: "https://sharing-hope-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
