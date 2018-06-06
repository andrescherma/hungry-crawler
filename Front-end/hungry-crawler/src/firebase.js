import firebase from 'firebase/app';
import 'firebase/database';


var config = {
	apiKey: "AIzaSyD0b_Xv48LrEt2lS5G35sQbxd0iFMjAITY",
	authDomain: "hungry-crawler-ascherma.firebaseapp.com",
	databaseURL: "https://hungry-crawler-ascherma.firebaseio.com",
	projectId: "hungry-crawler-ascherma",
	storageBucket: "hungry-crawler-ascherma.appspot.com",
	messagingSenderId: "67666815664"
};

export default firebase.initializeApp(config);