import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCr66lbtClfz_1Z1YsWuFxzS-Y65hPzUO8",
    authDomain: "swp-final-project.firebaseapp.com",
    databaseURL: "https://swp-final-project.firebaseio.com",
    projectId: "swp-final-project",
    storageBucket: "swp-final-project.appspot.com",
    messagingSenderId: "1069952185507",
    appId: "1:1069952185507:web:9f2ee910359a5dda"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase