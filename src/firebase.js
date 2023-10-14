// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore,doc,setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC1_VIQPoeboo9ezQJek1H-y0a5yT62-QU",
  authDomain: "financly-46989.firebaseapp.com",
  projectId: "financly-46989",
  storageBucket: "financly-46989.appspot.com",
  messagingSenderId: "335271376546",
  appId: "1:335271376546:web:421c91a0609c265fbdc9fb",
  measurementId: "G-8KSJPMZGPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};