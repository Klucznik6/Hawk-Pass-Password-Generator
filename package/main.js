document.getElementById("passButton").addEventListener("click", generatePassword); // generate password
document.getElementById("saveSettings").addEventListener("click",savePasswordSettings); // save settings
document.getElementById("openMenu").addEventListener("click",setSettingsInHTML); // menu opening
document.getElementById("GeneratePassword").addEventListener("click",generateListOfPasswords); // generate password
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
async function getInfoAboutPassword() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["length","bigLetters","smallLetters","numbers","specialChars"], (results) => {
            resolve([
                results.length ?? 16,
                results.bigLetters ?? true,
                results.smallLetters ?? true,
                results.numbers ?? true,
                results.specialChars ?? true
            ]);
        });
    });
}

async function setSettingsInHTML() {
    const parametrs = await getInfoAboutPassword();
    console.log(parametrs);
    document.querySelector("#passwordLenght").setAttribute('value', parametrs[0]);
    document.querySelector("#passwordLenghtValue").value = parametrs[0];
    document.querySelector("#bigLetters").checked = parametrs[1];
    document.querySelector("#smallLetters").checked = parametrs[2];
    document.querySelector("#numbers").checked = parametrs[3];
    document.querySelector("#specialChars").checked = parametrs[4];
}

async function passwordStrength() {
    const parametrs = await getInfoAboutPassword();
    let checkedPoints = 0;
    console.log("lenght, bigLetters, smallLetters, numbers, specialChars");
    console.log(parametrs);
    if (parametrs[0] >= 10) {
        checkedPoints++;
    }
    if (parametrs[1]) {
        checkedPoints++;
    }
    if (parametrs[2]) {
        checkedPoints++;
    }
    if (parametrs[3]) {
        checkedPoints++;
    }
    if (parametrs[4]) {
        checkedPoints++;
    }
    let strongnessLabel = document.getElementById("PasswordStrongness");
    switch (checkedPoints) {
        case 1:
            strongnessLabel.innerHTML = "Very weak";
            strongnessLabel.style.color = "#911111";
            break;
        case 2:
            strongnessLabel.innerHTML = "Weak";
            strongnessLabel.style.color = "#732525";
            break;
        case 3:
            strongnessLabel.innerHTML = "Good";
            strongnessLabel.style.color = "#2dadab";
            break;
        case 4:
            strongnessLabel.innerHTML = "Strong";
            strongnessLabel.style.color = "#26c990";
            break;
        case 5:
            strongnessLabel.innerHTML = "Very strong";
            strongnessLabel.style.color = "#2358eb";
            break;
        default:
            strongnessLabel.innerHTML = "ㅤ";
            strongnessLabel.style.color = "var(--grey)";
    }
}

function dictionaryW(parametrs) {
    const arrayOfBigLetters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const arrayOfSmallLetters = [..."abcdefghijklmnopqrstuvwxyz"];
    const arrayOfNumbers = [..."0123456789"];
    const arrayOfspecialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', '.', '?', '/', '|'];
    let dictionary = [];
    if(parametrs[1]) dictionary = dictionary.concat(arrayOfBigLetters);
    if(parametrs[2]) dictionary = dictionary.concat(arrayOfSmallLetters);
    if(parametrs[3]) dictionary = dictionary.concat(arrayOfNumbers);
    if(parametrs[4]) dictionary = dictionary.concat(arrayOfspecialChars);
    return dictionary;
}

function copyToClipBoard(pass){
    navigator.clipboard.writeText(pass);
}

async function generatePasswordString() {
    const parametrs = await getInfoAboutPassword();
    const length = parametrs[0];
    const dictionary = dictionaryW(parametrs);
    const arrayOfChars = [];
    for (let index = 0; index < length; index++) {
        let generatedCharForPassword = Math.floor(Math.random() * dictionary.length);
        generatedCharForPassword = dictionary[generatedCharForPassword];
        arrayOfChars[index] = generatedCharForPassword;
    }
    let readyPassword = arrayOfChars.join('');
    copyToClipBoard(readyPassword);
    return readyPassword;
}

// should do it differently
async function passwordStrength() {
    const parametrs = await getInfoAboutPassword();
    let checkedPoints = 0;
    console.log("lenght, bigLetters, smallLetters, numbers, specialChars");
    console.log(parametrs);
    if (parametrs[0] >= 10) {
        checkedPoints++;
    }
    if (parametrs[1]) {
        checkedPoints++;
    }
    if (parametrs[2]) {
        checkedPoints++;
    }
    if (parametrs[3]) {
        checkedPoints++;
    }
    if (parametrs[4]) {
        checkedPoints++;
    }
    let strongnessLabel = document.getElementById("PasswordStrongness");
    switch (checkedPoints) {
        case 1:
            strongnessLabel.innerHTML = "Very weak";
            strongnessLabel.style.color = "#911111";
            break;
        case 2:
            strongnessLabel.innerHTML = "Weak";
            strongnessLabel.style.color = "#732525";
            break;
        case 3:
            strongnessLabel.innerHTML = "Good";
            strongnessLabel.style.color = "#2dadab";
            break;
        case 4:
            strongnessLabel.innerHTML = "Strong";
            strongnessLabel.style.color = "#26c990";
            break;
        case 5:
            strongnessLabel.innerHTML = "Very strong";
            strongnessLabel.style.color = "#2358eb";
            break;
        default:
            strongnessLabel.innerHTML = "ㅤ";
            strongnessLabel.style.color = "var(--grey)";
    }
}
async function generatePassword() {
    let readyPassword = await generatePasswordString();
    document.getElementById("genPass").value = readyPassword;
    passwordStrength();
}

async function generateListOfPasswords() {
    let ammount = document.getElementById("howManyPasswords").value;
    let e = document.getElementById("howManyPasswordsError");
    if (ammount <= 0) {
        e.innerHTML = "Please enter a number greater than 0 !";
        e.style.color = "#911111";
        return;
    }
    if (isNaN(ammount)) {
        e.innerHTML = "Please enter a number!";
        e.style.color = "#911111";
        return;
    } else {
        e.innerHTML = "ㅤ";
        e.style.color = "var(--grey)";
    }
    console.log(ammount);

    // Generate passwords asynchronously
    let passwords = [];
    for (let index = 0; index < ammount; index++) {
        let readyPassword = await generatePasswordString();
        passwords.push(readyPassword);
    }

    console.log(passwords);
    document.getElementById("howManyPasswords").value = null;
    e.innerHTML = "Passwords were generated succesfully!"
    e.style.color = "green"
    // array to csv file
    const csvContent = passwords.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize default settings if not set
chrome.storage.local.get(["length", "bigLetters", "smallLetters", "numbers", "specialChars"], (results) => {
    if (
        typeof results.length === "undefined" ||
        typeof results.bigLetters === "undefined" ||
        typeof results.smallLetters === "undefined" ||
        typeof results.numbers === "undefined" ||
        typeof results.specialChars === "undefined"
    ) {
        chrome.storage.local.set({
            length: 16,
            bigLetters: true,
            smallLetters: true,
            numbers: true,
            specialChars: true
        });
    }
});