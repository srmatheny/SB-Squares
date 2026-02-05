import { getDatabase, ref, set, child, get, onValue } from "firebase/database";


export function saveArrayToLocalStorage(key, arrayData) {
    
    console.log(arrayData);
    console.log(arrayData[2]);
    const jsonString = JSON.stringify(arrayData);
    localStorage.setItem(key, jsonString);
    console.log(`Array saved successfully under key: ${key}`);

}

export function getArrayFromLocalStorage(key) {
    const storedString = localStorage.getItem(key);
    console.log(storedString[2]);
    return storedString ? JSON.parse(storedString) : [];

}

export function saveArrayToFBDatabase (arrayToSave) {
    const db = getDatabase();
    for ( let arrID = 0; arrID < 100; arrID++) {
        const reference = ref(db, 'values/' + arrID);
        let valToSave = arrayToSave[arrID];
        console.log(valToSave);

        set (reference, {
            tvalue: arrayToSave[arrID]
        });
    };
}

export function saveAFCToFBDatabase (arrayToSave) {
    const db = getDatabase();
    for ( let arrID = 0; arrID < 10; arrID++) {
        const reference = ref(db, 'afc-numbers/' + arrID);
        let valToSave = arrayToSave[arrID];
        console.log(valToSave);

        set (reference, {
            tvalue: arrayToSave[arrID]
        });
    };
}

export function saveNFCToFBDatabase (arrayToSave) {
    const db = getDatabase();
    for ( let arrID = 0; arrID < 10; arrID++) {
        const reference = ref(db, 'nfc-numbers/' + arrID);
        let valToSave = arrayToSave[arrID];
        console.log(valToSave);

        set (reference, {
            tvalue: arrayToSave[arrID]
        });
    };
}

export function getValueFromFBDatabase (arrID, valuesToLoad) {
    const db = getDatabase();
    const valueReference = ref(db, 'values/' + arrID + '/tvalue');
    console.log(valueReference);
    onValue(valueReference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        valuesToLoad[99] = data;
        console.log(valuesToLoad[99]);
        return valuesToLoad;
    });
}

export function saveArrayToWebStorage(db, arrayID, value) {
    //const db = getDatabase();
    const dbRef = ref(db);
    console.log(dbRef);
    console.log(db);
    console.log(arrayID);
    console.log(value);
    set(ref(db, 'values/' + arrayID), {
        tvalue: value
    });

}



export function getArrayFromWebStorage (db) {
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





export function listenArrayFromWebStorage() {
    const db = getDatabase();
    const valuesRef = ref(db, 'values/');
    onValue(valuesRef, (snapshot) => {
        const data = snapshot.val();
        //updateValCount(postElement, data);
    });

}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
}



