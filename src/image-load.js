/*image-load.js*/


import odinImage from "./odin.png";
import nflImage from "./nfl.png";
import nfcImage from "./sea.png";
import afcImage from "./ne.png"

function loadOdin () {

    // const image = document.createElement("img");
    // image.src = odinImage;
    // image.style.opacity = '0.5';
    // image.style.objectFit = 'cover';
    // document.body.appendChild(image);

    const cell = document.getElementById('dead-corner');
    console.log(cell);
    const nfl = document.createElement("img");
    nfl.src = nflImage;
    nfl.style.objectFit = 'cover';
    nfl.style.width = '49px';
    nfl.style.height = '49px';
    cell.appendChild(nfl);

    /*const nfcCell = document.getElementById('nfc-team');
    console.log(nfcCell);
    const nfc = document.createElement("img");
    nfc.src = nfcImage;
    nfc.style.opacity = '0.5';
    nfc.style.height = '50px';
    nfc.style.width = '200px';
    nfc.style.rotate = '90deg';
    
    nfcCell.appendChild(nfc);*/
}



export { loadOdin };


