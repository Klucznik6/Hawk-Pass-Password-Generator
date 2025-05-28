async function getInfoAboutPassword() {
    try {
        return new Promise((resolve) => {
            chrome.storage.local.get(["length","bigLetters","smallLetters","numbers","specialChars"], (results) => {
                const parametrs = [
                    results.length,
                    results.bigLetters,
                    results.smallLetters,
                    results.numbers,
                    results.specialChars
                ];
                resolve(parametrs);
            });
        });
    } catch(err) {
        console.log("Loading memory...");
        return null;
    }
}

async function dictionaryW() {
    const arrayOfBigLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const arrayOfSmallLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9];
    const arrayOfspecialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', '.', '?', '/', '|'];
    
    let dictionary = [];
    const parametrs = await getInfoAboutPassword();

    if(parametrs[1]) dictionary = dictionary.concat(arrayOfBigLetters);
    if(parametrs[2]) dictionary = dictionary.concat(arrayOfSmallLetters);
    if(parametrs[3]) dictionary = dictionary.concat(arrayOfNumbers);
    if(parametrs[4]) dictionary = dictionary.concat(arrayOfspecialChars);
    
    return dictionary;
}

async function generatePasswordString() {
    const parametrs = await getInfoAboutPassword();
    const length = parametrs[0];
    const arrayOfChars = [];
    const dictionary = await dictionaryW();
    
    for (let index = 0; index < length; index++) {
        let generatedCharForPassword = Math.floor(Math.random() * dictionary.length);
        generatedCharForPassword = dictionary[generatedCharForPassword];
        arrayOfChars[index] = generatedCharForPassword;
    }
    
    let readyPassword = arrayOfChars.join('');
    copyToClipBoard(readyPassword);
    return readyPassword;
}

async function injectPassword(passwordField) {
    const generatedPassword = await generatePasswordString();
    passwordField.value = generatedPassword;
    passwordField.dispatchEvent(new Event('input', { bubbles: true }));
    passwordField.dispatchEvent(new Event('change', { bubbles: true }));
    console.log('Wstawiono hasło:', generatedPassword);
}

function copyToClipBoard(pass){
    navigator.clipboard.writeText(pass);
    alert("Password copied to clipboard!");
}

const observer = new MutationObserver(() => {
  const passwordField = document.querySelector('input[type="password"]');

  if (passwordField && !document.getElementById("generatePasswordUnical2142")) {
    const br = document.createElement("br");
    passwordField.insertAdjacentElement('afterend', br);
    const genButton = document.createElement("input");
    genButton.type = "button";
    genButton.value = "Generate";
    genButton.id = "generatePasswordUnical2142";
    genButton.classList.add("button-unical2315");
    
    passwordField.insertAdjacentElement('afterend',genButton);



    genButton.addEventListener("click", () =>{ 
      injectPassword(passwordField);
    });
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
