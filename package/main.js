document.getElementById("passButton").addEventListener("click", generatePassword); // generate password
document.getElementById("saveSettings").addEventListener("click",savePasswordSettings); // save settings
document.getElementById("openMenu").addEventListener("click",setSettingsInHTML); // menu opening
document.getElementById("testBtn").addEventListener("click",checkPasswordStrongness);
getInfoAboutPassword(); // must be here 💀 (i need to fix that)

const passwordLenght = document.querySelector("#passwordLenght");
const value = document.querySelector("#passwordLenghtValue");
value.textContent = passwordLenght.value;
passwordLenght.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

function savePasswordSettings(){
    chrome.storage.local.set({
        length:passwordLenght.value,
        bigLetters:document.getElementById("bigLetters").checked,
        smallLetters:document.getElementById("smallLetters").checked,
        numbers:document.getElementById("numbers").checked,
        specialChars:document.getElementById("specialChars").checked
    })
    getInfoAboutPassword();//should fix that
}
//fix this function !!!
function getInfoAboutPassword(){
    try{
        chrome.storage.local.get(["length","bigLetters","smallLetters","numbers","specialChars"],(results)=> {
            lenght = results.length
            bigLetters = results.bigLetters
            smallLetters = results.smallLetters
            numbers = results.numbers
            specialChars =results.specialChars
        });
        let parametrs = [lenght, bigLetters, smallLetters, numbers, specialChars];
        return parametrs;
    }
    catch(err){
       console.log("Loading memory...")
    }
}

function setSettingsInHTML(){
    parametrs = getInfoAboutPassword()
    console.log(parametrs)
    document.querySelector("#passwordLenght").setAttribute('value',parametrs[0])
    document.querySelector("#passwordLenghtValue").value = parametrs[0]
    document.querySelector("#bigLetters").checked = parametrs[1]
    document.querySelector("#smallLetters").checked = parametrs[2]
    document.querySelector("#numbers").checked = parametrs[3]
    document.querySelector("#specialChars").checked = parametrs[4]
}


function dictionaryW(){
    const arrayOfBigLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const arrayOfSmallLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9];
    const arrayOfspecialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '|'];
    let dictionary = [];
    let parametrs = getInfoAboutPassword();

    if(parametrs[1]) {
        dictionary = dictionary.concat(arrayOfBigLetters);
    }
    if(parametrs[2]){
        dictionary = dictionary.concat(arrayOfSmallLetters);
    }
    if(parametrs[3]){
        dictionary = dictionary.concat(arrayOfNumbers);
    }
    if(parametrs[4]){
        dictionary = dictionary.concat(arrayOfspecialChars);
    }
    return dictionary;
}

function copyToClipBoard(pass){
    navigator.clipboard.writeText(pass);
}

function generatePasswordString(){
    let parametrs = getInfoAboutPassword();
    //console.log(parametrs)
    let length = parametrs[0];
    const arrayOfChars = [];
    let dictionary = [];
    dictionary = dictionaryW();
    for (let index = 0; index < length; index++) {
        let generatedCharForPassword = Math.floor(Math.random() * dictionary.length);
        generatedCharForPassword = dictionary[generatedCharForPassword];

        arrayOfChars[index] = generatedCharForPassword;
        
    }
    let readyPassword = arrayOfChars.join('');
    copyToClipBoard(readyPassword);
    return readyPassword
}
// should do it differently
function checkPasswordStrongness(){
    let parametrs = getInfoAboutPassword();
    let checkedPoints = 0;
    console.log("lenght, bigLetters, smallLetters, numbers, specialChars");
    console.log(parametrs);
    if(parametrs[0]>=10){
        checkedPoints++;
    }
    if(parametrs[1]){
        checkedPoints++;
    }
    if(parametrs[2]){
        checkedPoints++;
    }
    if(parametrs[3]){
        checkedPoints++;
    }
    if(parametrs[4]){
        checkedPoints++;
    }
    switch(checkedPoints){
        case 1:
            return "very weak"
        case 2:
            return "weak"
        case 3:
            return "normal"
        case 4:
            return "strong"
        case 5:
            return "very strong"
    }
}
function generatePassword(){
    let readyPassword = generatePasswordString()
    document.getElementById("genPass").value = readyPassword;
    console.log(checkPasswordStrongness()) // called in console
}

function generatePasswordInInput(){
    let piwo = document.querySelector("input[type='password']")
    piwo.value = generatePassword()
}