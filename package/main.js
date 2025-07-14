document.getElementById("passButton").addEventListener("click", generatePassword); // generate password
document.getElementById("saveSettings").addEventListener("click",savePasswordSettings); // save settings
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
        length: parseInt(passwordLenght.value),
        bigLetters: document.getElementById("bigLetters").checked,
        smallLetters: document.getElementById("smallLetters").checked,
        numbers: document.getElementById("numbers").checked,
        specialChars: document.getElementById("specialChars").checked
    }, () => {
        // Close modal and show confirmation
        document.getElementById("settingsModal").classList.remove("show");
        showToast("Settings saved successfully!");
        // Update password strength with new settings
        passwordStrength();
    });
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
    document.querySelector("#passwordLenght").value = parametrs[0];
    document.querySelector("#passwordLenghtValue").textContent = parametrs[0];
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
async function generatePassword() {
    let readyPassword = await generatePasswordString();
    document.getElementById("genPass").value = readyPassword;
    await passwordStrength();
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

// Modern UI Event Listeners
document.getElementById("openMenu").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.add("show");
    setSettingsInHTML();
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.remove("show");
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const passwordField = document.getElementById("genPass");
    if (passwordField.value) {
        copyToClipBoard(passwordField.value);
        showToast("Password copied to clipboard!");
    }
});

document.getElementById("resetSettings").addEventListener("click", () => {
    chrome.storage.local.set({
        length: 16,
        bigLetters: true,
        smallLetters: true,
        numbers: true,
        specialChars: true
    });
    setSettingsInHTML();
    showToast("Settings reset to default");
});

// Click outside modal to close
document.getElementById("settingsModal").addEventListener("click", (e) => {
    if (e.target.id === "settingsModal") {
        document.getElementById("settingsModal").classList.remove("show");
    }
});

// Toast notification function
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Enhanced password strength function with modern styling
async function passwordStrength() {
    const parametrs = await getInfoAboutPassword();
    let checkedPoints = 0;
    
    if (parametrs[0] >= 10) checkedPoints++;
    if (parametrs[1]) checkedPoints++;
    if (parametrs[2]) checkedPoints++;
    if (parametrs[3]) checkedPoints++;
    if (parametrs[4]) checkedPoints++;
    
    const strongnessLabel = document.getElementById("PasswordStrongness");
    
    // Remove all strength classes
    strongnessLabel.className = 'strength-indicator';
    
    switch (checkedPoints) {
        case 1:
            strongnessLabel.textContent = "Very Weak";
            strongnessLabel.classList.add("strength-very-weak");
            break;
        case 2:
            strongnessLabel.textContent = "Weak";
            strongnessLabel.classList.add("strength-weak");
            break;
        case 3:
            strongnessLabel.textContent = "Good";
            strongnessLabel.classList.add("strength-good");
            break;
        case 4:
            strongnessLabel.textContent = "Strong";
            strongnessLabel.classList.add("strength-strong");
            break;
        case 5:
            strongnessLabel.textContent = "Very Strong";
            strongnessLabel.classList.add("strength-very-strong");
            break;
        default:
            strongnessLabel.textContent = "Generate a password first";
            break;
    }
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
    // Load current settings into the UI
    setSettingsInHTML();
});