import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { addDoc, collection } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBiwza7uR5DDUpFzCfBhY-aJ6mtarP4Vuc",
  authDomain: "litcode-ba82a.firebaseapp.com",
  projectId: "litcode-ba82a",
  storageBucket: "litcode-ba82a.appspot.com",
  messagingSenderId: "1040689522717",
  appId: "1:1040689522717:web:ecce4fd2a8be41fb11bef4",
  measurementId: "G-NGFM2FXV6P"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

const provider = new GoogleAuthProvider()
export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider).then(async(result)=>{
    console.log(result);
  })
  .catch(error=>{
    console.log(error);
  })
}

export default app
export { db, storage, auth }
