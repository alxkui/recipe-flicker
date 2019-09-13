import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDoqhXR2hsnLgyEqJ49aGT9q56GtRy7bMo",
    authDomain: "recipe-app-ae4f7.firebaseapp.com",
    databaseURL: "https://recipe-app-ae4f7.firebaseio.com",
    projectId: "recipe-app-ae4f7",
    storageBucket: "recipe-app-ae4f7.appspot.com",
    messagingSenderId: "262606172211",
    appId: "1:262606172211:web:232887a225a9e058"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;