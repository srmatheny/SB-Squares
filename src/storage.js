

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
