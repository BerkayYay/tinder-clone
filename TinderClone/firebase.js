// Import the functions you need from the SDKs you need
import {initializeApp} from '@react-native-firebase/app';
import getAuth from '@react-native-firebase/auth';
import getFirestore from '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVxrS-aLglBAgcON4YsxbGFP_iFcEFmDc',
  authDomain: 'tinder-clone-d965a.firebaseapp.com',
  projectId: 'tinder-clone-d965a',
  storageBucket: 'tinder-clone-d965a.appspot.com',
  messagingSenderId: '293747589265',
  appId: '1:293747589265:web:020a3dfd8c9db110937f30',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};
