import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDaQVPMLwz67AHA-oB0c0ECm70IegI0fHo",
    authDomain: "testing-chat-10f25.firebaseapp.com",
    databaseURL: "https://testing-chat-10f25.firebaseio.com",
    projectId: "testing-chat-10f25",
    storageBucket: "testing-chat-10f25.appspot.com",
    messagingSenderId: "727121066265",
    appId: "1:727121066265:web:23e5ac8456733f7306ed88"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;


