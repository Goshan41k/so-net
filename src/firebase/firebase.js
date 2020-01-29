import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9UpVdiT-4RKoe6T7o0WLadDdu7gJk_3A",
  authDomain: "sonet-6509f.firebaseapp.com",
  databaseURL: "https://sonet-6509f.firebaseio.com",
  projectId: "sonet-6509f",
  storageBucket: "sonet-6509f.appspot.com",
  messagingSenderId: "511390141594",
  appId: "1:511390141594:web:33fbcf579239b12d19e323",
  measurementId: "G-7Z6D4JFG91"
};
const firebaseAPI = firebase.initializeApp(firebaseConfig);

export default firebaseAPI;
