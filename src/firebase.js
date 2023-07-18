import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDn9YbK_E7NxHrrqQoT_wkFjXNpjV4Tws0",
  authDomain: "wordpocket-dbe0b.firebaseapp.com",
  projectId: "wordpocket-dbe0b",
  storageBucket: "wordpocket-dbe0b.appspot.com",
  messagingSenderId: "905909799572",
  appId: "1:905909799572:web:204221886fe95323e28281",
  measurementId: "G-8WMKQGNMYZ"
};

// Firebase 설정 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;