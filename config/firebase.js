import { initializeApp, getApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_STORAGE_BUCKET),
  messagingSenderId: String(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID),
  appId: String(process.env.NEXT_PUBLIC_APP_ID),
  databaseURL: String(process.env.NEXT_PUBLIC_DATABASE_URL),
};

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    return initializeApp(firebaseConfig);
  }
}
// Initialize Firebase
const app = initializeAppIfNecessary();

// commands
const db = getDatabase(app);
const auth = getAuth(app);
const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

export { auth, db, ref, set, get, onValue, signUp, signIn, signOut };
