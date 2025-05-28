# Hawk Pass - Password Generator Chrome Extension

![Hawk Pass Logo](.package/images/iconDarkMotive.png)

## Overview

**Hawk Pass** is a modern, open-source Chrome extension for generating strong, customizable passwords. It features a user-friendly interface, dark mode, website integration, and advanced settings for password generation.

---

## Features

- **Single Password Generation:** Instantly generate a secure password with one click.
- **Bulk Password Generation:** Generate multiple passwords at once and export them as a CSV file.
- **Password Strength Indicator:** Visual feedback on password strength based on length and character types.
- **Customizable Settings:** Choose password length and which character types to include (uppercase, lowercase, numbers, special characters).
- **Website Integration:** Automatically adds a "Generate" button next to password fields on websites for quick password insertion.
- **Dark Mode:** Consistent, modern dark theme throughout the extension and guide.
- **Clipboard Copy:** Generated passwords are automatically copied to your clipboard.
- **Open Source:** MIT licensed and available on [GitHub](https://github.com/Klucznik6/Password-Generator.git).

---

## Installation

1. **From Chrome Web Store:**  
   (Coming soon!)

2. **Manual Installation:**
   1. Clone or download this repository.
   2. Go to `chrome://extensions` in your browser.
   3. Enable "Developer mode" (top right).
   4. Click "Load unpacked" and select the `package` folder from this repository.

---

## Usage

- Click the Hawk Pass icon in your Chrome toolbar to open the popup.
- Adjust password settings as needed:
  - **Length:** Set from 6 to 64 characters.
  - **Big letters:** Include uppercase letters (A-Z).
  - **Small letters:** Include lowercase letters (a-z).
  - **Numbers:** Include digits (0-9).
  - **Special chars:** Include symbols (!@#$...).
- Click **Generate Password** to create a password.
- Use **Generate Lists** to create multiple passwords and download as CSV.
- On any website, look for the **Generate** button next to password fields to auto-fill a strong password.

---

## Settings Explained

| Setting         | Description                                      |
|-----------------|--------------------------------------------------|
| Length          | Number of characters in the password (6-64)      |
| Big letters     | Use uppercase letters (A-Z)                      |
| Small letters   | Use lowercase letters (a-z)                      |
| Numbers         | Use digits (0-9)                                 |
| Special chars   | Use special characters (!@#$...)                 |

---

## Password Strength Indicator

- **Very weak:** Only one character type or short length
- **Weak:** Two character types
- **Good:** Three character types
- **Strong:** Four character types
- **Very strong:** Four types and length at least 10

---

## Development

- All main code is in the `package` folder.
- Styles are in `style.css` and `content.css`.
- The user guide is in `pages/guide.html`.
- Uses [Bootstrap](https://getbootstrap.com/) for UI components.

---

## Troubleshooting

- If the extension does not work on a website, try refreshing the page.
- Make sure you have granted the extension permissions in Chrome.
- For more help, visit the [GitHub repository](https://github.com/Klucznik6/Password-Generator.git).

---

## License

This project is licensed under the MIT License.

---

## Contact

For feedback, bug reports, or feature requests, please open an issue on [GitHub](https://github.com/Klucznik6/Password-Generator.git).