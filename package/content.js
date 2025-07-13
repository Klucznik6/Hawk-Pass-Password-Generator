async function getInfoAboutPassword() {
    try {
        return new Promise((resolve) => {
            chrome.storage.local.get(["length","bigLetters","smallLetters","numbers","specialChars"], (results) => {
                const parametrs = [
                    results.length ?? 16,
                    results.bigLetters ?? true,
                    results.smallLetters ?? true,
                    results.numbers ?? true,
                    results.specialChars ?? true
                ];
                resolve(parametrs);
            });
        });
    } catch(err) {
        console.log("Loading memory...");
        return [16, true, true, true, true]; // Return default values instead of null
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
    
    // Focus first to ensure the field is active
    passwordField.focus();
    
    // Clear the field first
    passwordField.value = '';
    
    // Set the value using multiple methods for better compatibility
    passwordField.value = generatedPassword;
    passwordField.setAttribute('value', generatedPassword);
    
    // Create and dispatch more comprehensive events
    const events = [
        new Event('focus', { bubbles: true }),
        new Event('input', { bubbles: true, cancelable: true }),
        new Event('keydown', { bubbles: true, cancelable: true }),
        new Event('keypress', { bubbles: true, cancelable: true }),
        new Event('keyup', { bubbles: true, cancelable: true }),
        new Event('change', { bubbles: true, cancelable: true }),
        new Event('blur', { bubbles: true })
    ];
    
    // Dispatch events with small delays to mimic real user input
    events.forEach((event, index) => {
        setTimeout(() => {
            passwordField.dispatchEvent(event);
        }, index * 10);
    });
    
    // Try to trigger React/Vue change detection if present
    if (passwordField._valueTracker) {
        passwordField._valueTracker.setValue('');
    }
    
    // Additional method for React apps
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(passwordField, generatedPassword);
    
    const inputEvent = new Event('input', { bubbles: true });
    passwordField.dispatchEvent(inputEvent);
    
    console.log('Password injected:', generatedPassword);
    
    // Verify the injection worked
    setTimeout(() => {
        if (passwordField.value === generatedPassword) {
            console.log('Password injection successful');
        } else {
            console.log('Password injection may have failed, field value:', passwordField.value);
        }
    }, 100);
}

function copyToClipBoard(pass){
    navigator.clipboard.writeText(pass);
    alert("Password copied to clipboard!");
}

const observer = new MutationObserver(() => {
  // Look for password fields with Google-specific attributes
  const passwordFields = document.querySelectorAll(`
    input[type="password"],
    input[autocomplete*="password"],
    input[name*="password"],
    input[id*="password"],
    input[aria-label*="password"],
    input[aria-label*="Password"],
    input[aria-label*="hasło"],
    input[aria-label*="Hasło"]
  `);

  // Only work with the first password field found
  const firstPasswordField = passwordFields[0];
  
  if (firstPasswordField) {
    // Check if any button already exists on the page
    const existingButton = document.querySelector('[id*="generatePasswordUnical2142"]');
    
    if (!existingButton && firstPasswordField.offsetParent !== null) {
      const passwordField = firstPasswordField;
      const genButton = document.createElement("button");
      genButton.type = "button";
      genButton.textContent = "Generate";
      genButton.id = "generatePasswordUnical2142_" + Math.random().toString(36).substr(2, 9);
      genButton.style.cssText = `
        margin-left: 8px;
        padding: 4px 8px;
        background: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        z-index: 9999;
        position: relative;
      `;
      
      // Try different insertion methods for better compatibility
      try {
        if (passwordField.parentNode) {
          // Try to insert after the password field or its container
          const container = passwordField.closest('div') || passwordField.parentNode;
          container.appendChild(genButton);
        }
      } catch (error) {
        console.log('Failed to insert button:', error);
        try {
          passwordField.insertAdjacentElement('afterend', genButton);
        } catch {
          passwordField.parentNode.insertBefore(genButton, passwordField.nextSibling);
        }
      }

      genButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        injectPassword(passwordField);
      });
      
      // Add hover effect
      genButton.addEventListener("mouseenter", () => {
        genButton.style.background = "#1557b0";
      });
      genButton.addEventListener("mouseleave", () => {
        genButton.style.background = "#1a73e8";
      });
    }
  }
});

// Start observing immediately
observer.observe(document.body, { childList: true, subtree: true });

// Also run once when the script loads
setTimeout(() => {
  observer.disconnect();
  observer.observe(document.body, { childList: true, subtree: true });
}, 1000);
