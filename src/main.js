import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATe26L9cFlYPCMOaRxgpI6x5k39LpiXJs",
  authDomain: "login-dc8ef.firebaseapp.com",
  projectId: "login-dc8ef",
  storageBucket: "login-dc8ef.firebasestorage.app",
  messagingSenderId: "892209910503",
  appId: "1:892209910503:web:2d1ccd5ea698f70dd04842"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const app = createApp(App);
app.use(router)
app.mount('#app')
