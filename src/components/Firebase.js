// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCzWJefsPzW0HSBvh-VWB-AKtZjiJ8WkfY",
    authDomain: "chatzapp-333.firebaseapp.com",
    databaseURL: "https://chatzapp-333.firebaseio.com",
    projectId: "chatzapp-333",
    storageBucket: "chatzapp-333.appspot.com",
    messagingSenderId: "514064936009",
    appId: "1:514064936009:web:a564f1c1fdd1c9b6c66398",
    measurementId: "G-CXR8KNR6TG",
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore(); 
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider(); 
export {auth, provider}
export default db;
