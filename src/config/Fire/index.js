
import { database, auth } from './Config';

const credentials = {
     apiKey: "AIzaSyCz-sPIoAODoG3CA500SUlrlHemqHzYGY0",
    authDomain: "ramah-9ef47.firebaseapp.com",
    databaseURL: "https://ramah-9ef47.firebaseio.com",
    projectId: "ramah-9ef47",
    storageBucket: "ramah-9ef47.appspot.com",
    messagingSenderId: "653483800435",
    appId: "1:653483800435:web:9f87f092204f56d178f706"

};

const config = {
    name: "Alo Care Admin"
}

const Fire = { database, auth, credentials, config }

export default Fire;
