document.getElementById("passButton").addEventListener("click", generatePassword);

const passwordLenght = document.querySelector("#passwordLenght");
const value = document.querySelector("#passwordLenghtValue");
value.textContent = passwordLenght.value;
passwordLenght.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

function getPasswordPlace(){


}

function getInfoAboutPassword(){
    let lenght = passwordLenght.value;
    let bigLetters = document.getElementById("bigLetters").checked;
    let smallLetters = document.getElementById("smallLetters").checked;
    let numbers = document.getElementById("numbers").checked;
    let specialChars = document.getElementById("specialChars").checked;
    let parametrs = [lenght, bigLetters, smallLetters, numbers, specialChars];
    
    return parametrs;
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

function copyToClipBoard(){
    pass = document.getElementById("genPass")
    pass.select();
    pass.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(pass.value);
}

function generatePassword(){
    let parametrs  = getInfoAboutPassword();
    length = parametrs[0];
    const arrayOfChars = [];
    let dictionary = [];
    dictionary = dictionaryW();
    for (let index = 0; index < length; index++) {
        let generatedPassword = Math.floor(Math.random() * dictionary.length);
        generatedPassword = dictionary[generatedPassword];
        arrayOfChars[index] = generatedPassword;
        
    }
    let readyPassword = arrayOfChars.join('');
    console.log(readyPassword);
    document.getElementById("genPass").value = readyPassword;
    // moduł kopiujący hasło do schowka
    copyToClipBoard();
}

