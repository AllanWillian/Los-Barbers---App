
import { initializeApp } from 'firebase/app';
import { getDatabase } from '@firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyC_9ScZ9ZS2zXhexCaaGymdITH3C_BhiLA",
  authDomain: "losbarbers-bfd86.firebaseapp.com",
  projectId: "losbarbers-bfd86",
  storageBucket: "losbarbers-bfd86.appspot.com",
  messagingSenderId: "904807992052",
  appId: "1:904807992052:web:fc8a05dc393e7172366ca1"
};



const app = initializeApp(firebaseConfig);
const database = getDatabase ();

export default database;

