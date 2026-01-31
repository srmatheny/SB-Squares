// src/index.js

import "./styles.css";
import { greeting } from "./greeting.js";
import { loadOdin } from "./image-load.js";


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

const grid = document.getElementById('grid');
const nfcGrid = document.getElementById('nfc-team');
const afcGrid = document.getElementById('afc-team');

for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.className = 'cell';
    div.innerText = i + 1;

    div.onclick = () => {
        const name = prompt("Enter name:");
        if (name) div.textContent = name;
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
