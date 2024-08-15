
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = { 
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chatapp-db73d.firebaseapp.com",
  projectId: "react-chatapp-db73d",
  storageBucket: "react-chatapp-db73d.appspot.com",
  messagingSenderId: "206711496894",
  appId: "1:206711496894:web:242aaee0a8002509d7beef"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth() 
export const db = getFirestore() 
export const storage = getStorage() 