// // 파이어스토어의 사용설정을 위한 구문이다
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9YbK_E7NxHrrqQoT_wkFjXNpjV4Tws0",
  authDomain: "wordpocket-dbe0b.firebaseapp.com",
  projectId: "wordpocket-dbe0b",
  storageBucket: "wordpocket-dbe0b.appspot.com",
  messagingSenderId: "905909799572",
  appId: "1:905909799572:web:204221886fe95323e28281",
  measurementId: "G-8WMKQGNMYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);