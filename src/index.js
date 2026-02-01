// src/index.js

import "./styles.css";
import { greeting } from "./greeting.js";
import { loadOdin } from "./image-load.js";
import { saveArrayToLocalStorage, getArrayFromLocalStorage } from "./storage.js";


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


initialPageLoad();

saveButton.addEventListener('click', saveState);
loadButton.addEventListener('click', loadState);
resetButton.addEventListener('click', initialPageLoad);

