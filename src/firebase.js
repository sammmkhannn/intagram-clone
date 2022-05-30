import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getStorage } from "firebase/storage";
import 'firebase/storage';  
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBXPLVvGdFfsbR1uib3Rd4ayJ3lhDAiFiw",
  authDomain: "instagram-clone-487f1.firebaseapp.com",
  projectId: "instagram-clone-487f1",
  storageBucket: "instagram-clone-487f1.appspot.com",
  messagingSenderId: "314181188112",
  appId: "1:314181188112:web:578dba5dde8241fa48a895"
});
const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = getStorage(firebaseApp);

export default db;