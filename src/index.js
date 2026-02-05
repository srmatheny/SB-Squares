// src/index.js

import "./styles.css";
import { initializeApp } from "firebase/app";
import { greeting } from "./greeting.js";
import { loadOdin } from "./image-load.js";
import { saveArrayToLocalStorage, getArrayFromLocalStorage, saveArrayToWebStorage, getArrayFromWebStorage, saveArrayToFBDatabase, getValueFromFBDatabase } from "./storage.js";
import { saveAFCToFBDatabase, saveNFCToFBDatabase } from "./storage.js";
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
const saveAFCButton = document.getElementById('save-afc-button');
const loadAFCButton = document.getElementById('load-afc-button');
const saveNFCButton = document.getElementById('save-nfc-button');
const loadNFCButton = document.getElementById('load-nfc-button');
const noButton = document.getElementById('no-button');
//console.log(saveButton);
//console.log(loadButton);
//console.log(saveAFCButton);
//console.log(loadAFCButton);
//console.log(saveNFCButton);
//console.log(loadNFCButton);
//console.log(resetButton);


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
        let charVar = String.fromCharCode(i+65);

        div.innerText = charVar;

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

}

function loadAFCFromWeb() {
    const db = getDatabase();
    const gridItems = document.querySelectorAll('#afc-team .number-cell');
    const valuesToLoad = [];

    for (let i = 0; i < 10; i++) {
        const valueReference = ref(db, 'afc-numbers/' + i + '/tvalue');

        onValue(valueReference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        valuesToLoad[i] = data;
        console.log(valuesToLoad[99]);
        gridItems[i].innerHTML = data;

        });

    };
    
    console.log(valuesToLoad[0]);

}

function loadNFCFromWeb() {
    const db = getDatabase();
    const gridItems = document.querySelectorAll('#nfc-team .number-cell');
    const valuesToLoad = [];

    for (let i = 0; i < 10; i++) {
        const valueReference = ref(db, 'nfc-numbers/' + i + '/tvalue');

        onValue(valueReference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        valuesToLoad[i] = data;
        console.log(valuesToLoad[99]);
        gridItems[i].innerHTML = data;

        });

    };
    
    console.log(valuesToLoad[0]);

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
saveAFCButton.addEventListener('click', saveAFCToWeb);
saveNFCButton.addEventListener('click', saveNFCToWeb);
loadAFCButton.addEventListener('click', loadAFCFromWeb);
loadNFCButton.addEventListener('click', loadNFCFromWeb);
noButton.addEventListener('click', showDetails);


function saveNFCToWeb () {
    console.log("enter nfc save to web");

    const gridItems = document.querySelectorAll("#nfc-team .number-cell");
    console.log(gridItems);

    const gridItemsArray = [];
        console.log(gridItemsArray)

    for (let i = 0; i < 10; i++) {
        gridItemsArray[i] = gridItems[i].textContent;
    };
    console.log(gridItemsArray)
    saveNFCToFBDatabase(gridItemsArray);
}

function saveAFCToWeb () {
    console.log("enter afc save to web");

    const gridItems = document.querySelectorAll("#afc-team .number-cell");
    console.log(gridItems);

    const gridItemsArray = [];
        console.log(gridItemsArray)

    for (let i = 0; i < 10; i++) {
        gridItemsArray[i] = gridItems[i].textContent;
    };
    console.log(gridItemsArray)
    saveAFCToFBDatabase(gridItemsArray);
}

function showDetails() {
    alert("Superbowl Squares v2.2 | SrM Copyright \u00A9 2026");
}


// let newArray = [0, 1, 2, 'srm', 'sam', 'drm']
//let anotherArray = []
//console.log(anotherArray);


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

