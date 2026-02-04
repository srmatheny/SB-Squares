// src/index.js

import "./styles.css";
import { initializeApp } from "firebase/app";
import { greeting } from "./greeting.js";
import { loadOdin } from "./image-load.js";
import { saveArrayToLocalStorage, getArrayFromLocalStorage, saveArrayToWebStorage, getArrayFromWebStorage, saveArrayToFBDatabase, getValueFromFBDatabase } from "./storage.js";
import { isFirebaseInitialized } from '../firebase-config.js';
import { getDatabase, onValue, ref, set } from "firebase/database";



//check initialize firebase app
const App = () => {
  if (!isFirebaseInitialized()) {
    console.log('Firebase is not initialized with a valid projectId.');
    return null;
  }

};


//const app = initailizeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
    
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    set(reference, {
        username: name,
        email: email,
        profile_picture : imageUrl
    });

};

function getDistance(userId) {

    const db = getDatabase();
    const distanceRef = ref(db, 'users/' + userId + '/distance');
    console.log(distanceRef);
    onValue(distanceRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        updateDistance("postElement", data);
    });

}
function updateDistance( post, data ) {
    console.log(post);
    console.log(data);

}

function getTValue(arrayId) {
    const db = getDatabase();
    const valReference = ref(db, 'values/' + arrayId + '/tvalue');
    console.log(valReference);
    onValue(valReference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        updateDistance("postElement", data);
    });
}

// const commentsRef = ref(db, 'post-comments/' + postId);
// onValue(commentsRef, (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//         const childKey = childSnapshot.key;
//         const childData = childSnapshot.val();
//     });
// }, {
//     onlyOnce: true
// });


getDistance("shadmatheny");

getTValue(3);


//writeUserData("shadmatheny", "srmatheny", "updatedemail@me.com", "myimageurl");



/*import odinImage from "./odin.png";

const image = document.createElement("img");
image.src = odinImage;
image.style.opacity = '0.5';
image.style.objectFit = 'cover';
document.body.appendChild(image);*/

console.log(greeting);
loadOdin();


const container = document.querySelector('container');
const totalSquares = 100;

const MY_DATA_KEY = 'values';
let storedValues = [];
//let storedValues = getArrayFromLocalStorage(MY_DATA_KEY);
//console.log('Retrieved values from file');
//console.log(storedValues);


const grid = document.getElementById('grid');
const nfcGrid = document.getElementById('nfc-team');
const afcGrid = document.getElementById('afc-team');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const resetButton = document.getElementById('reset-button');
const test = document.getElementById('dead-corner');
console.log(saveButton);
console.log(loadButton);
console.log(resetButton);


function initialPageLoad () {

    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.className = 'cell';
        //div.innerText = storedValues[i];
        div.innerText = i + 1;

        div.onclick = () => {
            const name = prompt("Enter name:");
            if (name) div.textContent = name;
            //saveState();
        };

        grid.appendChild(div);
    }

    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.className = 'number-cell';
        div.innerText = i;

        div.onclick = () => {
            const number = prompt("Enter number:");
            if (number) div.textContent = number;
        };

        nfcGrid.appendChild(div);
    }

    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.className = 'number-cell';
        div.innerText = i;

        div.onclick = () => {
            const number = prompt("Enter number:");
            if (number) div.textContent = number;
        };

        afcGrid.appendChild(div);
    }
}

function loadState() {
    console.log("In load state now...");
    const gridItems = document.querySelectorAll('.cell');
    storedValues = getArrayFromLocalStorage(MY_DATA_KEY);
    console.log(storedValues);
    console.log(storedValues[2])
    for (let i = 0; i < 100; i++) {
        gridItems[i].textContent = storedValues[i];
    }
}

function loadStateFromWeb() {
    const db = getDatabase();
    let arrID = 99;
    const gridItems = document.querySelectorAll('.cell');
    const valuesToLoad = [];

    for (let i = 0; i < 100; i++) {
        const valueReference = ref(db, 'values/' + i + '/tvalue');

        onValue(valueReference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        valuesToLoad[i] = data;
        console.log(valuesToLoad[99]);
        gridItems[i].innerHTML = data;

        });


    };
    

    
    console.log(valuesToLoad[99]);

    
    // for (let i = 0; i < 100; i++) {
    //     let temp = getValueFromFBDatabase(i);
    //     console.log(temp);
    //     valuesToLoad[i] = temp;
    // };

}

function saveStateToWeb () {
    const gridItems = document.querySelectorAll('.cell');
    const gridItemsArray = [];
    for (let i = 0; i < 100; i++) {
        gridItemsArray[i] = gridItems[i].textContent;
    };
    saveArrayToFBDatabase(gridItemsArray);
}

function saveState () {
    const gridItems = document.querySelectorAll('.cell');
    const gridItemsArray = []; //Array.from(gridItems);
    for (let i = 0; i < 100; i++ ) {
        gridItemsArray[i] = gridItems[i].textContent;
    };

    let indexNum = 2;
    console.log(gridItemsArray[indexNum]);
    //console.log(gridItemsArray[indexNum].textContent);
    saveArrayToLocalStorage(MY_DATA_KEY, gridItemsArray);
}

function resetState () {
    grid.innerHTML = '';
    nfcGrid.innerHTML = '';
    afcGrid.innerHTML = '';
    initialPageLoad ();
}

initialPageLoad();

saveButton.addEventListener('click', saveStateToWeb);
loadButton.addEventListener('click', loadStateFromWeb);
resetButton.addEventListener('click', resetState);
test.addEventListener('click', loadStateFromWeb);


// let newArray = [0, 1, 2, 'srm', 'sam', 'drm']
let anotherArray = []
// console.log(newArray);
console.log(anotherArray);

//saveToWeb(db);

//saveArrayToWebStorage(db, 0, newArray[0]);
//let retrievedValue = 'x';
//console.log(retrievedValue);




function saveToWeb(db) {
    for (let i = 0; i < (newArray.length); i++) {
        saveArrayToWebStorage(db, i, newArray[i]);
    };
}

function getFromWeb(db) {

    const dbRef = ref(db, 'values/');
    //console.log(anotherArray);
    
    for (let i = 0; i < (newArray.length); i++) {
        
        let newVal;
        
        onValue(dbRef, (snapshot) => {
            const key = snapshot.key;
            const childData = snapshot.val();
            console.log(`The key is ${key}`);
            console.log(`The value object is:`, childData);

            newVal = childData[i].tvalue;
            console.log(newVal);
            anotherArray[i] = newVal;
            console.log(anotherArray);
        });

    };

    const gridItems = document.querySelectorAll('.cell');

    for (let i = 0; i < 6; i++) {
        gridItems[i].textContent = anotherArray[i];
    };

}

function getValuesFromWebStorage (db) {
    let newVal;
    const arrayID = 3;
    const dbRef = ref(db, 'values/');
    console.log(db);
    console.log(dbRef);

    onValue(dbRef, (snapshot) => {
        const key = snapshot.key;
        const childData = snapshot.val();
        console.log(`The key is ${key}`);
        console.log(`The value object is:`, childData);

        newVal = childData[3].tvalue;
        console.log(newVal);

    });

    return newVal;

}


