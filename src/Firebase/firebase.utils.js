import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const Config = {
  apiKey: "AIzaSyDOSD6bWHVjAH-n5yYUqMqBJmzMd79wp3w",
  authDomain: "project-itl-lab.firebaseapp.com",
  databaseURL: "https://project-itl-lab-default-rtdb.firebaseio.com",
  projectId: "project-itl-lab",
  storageBucket: "project-itl-lab.appspot.com",
  messagingSenderId: "190382557096",
  appId: "1:190382557096:web:ba5dda7dd58ece68be7f9d",
  measurementId: "G-HYN5312HJN"
};


export const CreateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(`${error} User Can't be registered`);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
