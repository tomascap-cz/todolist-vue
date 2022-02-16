// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCESOY0oXWJoyFjP-mbV_BUO856QOAgPqI",
  authDomain: "todolist-vue-a4f75.firebaseapp.com",
  databaseURL:
    "https://todolist-vue-a4f75-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-vue-a4f75",
  storageBucket: "todolist-vue-a4f75.appspot.com",
  messagingSenderId: "214305522464",
  appId: "1:214305522464:web:ec5f074f9ef050123fcd45",
};

const app = initializeApp(firebaseConfig);
export default getDatabase(app);
