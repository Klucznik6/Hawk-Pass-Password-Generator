# Hawk Pass - Password Generator Chrome Extension

---

## Overview

**Hawk Pass** is a modern, open-source Chrome extension for generating strong, customizable passwords. It features a sleek modern UI, advanced website integration, robust async functionality, and comprehensive password generation capabilities.

---

## Features

### Core Features
- **Single Password Generation:** Instantly generate secure passwords with visual strength indicators
- **Bulk Password Generation:** Generate multiple passwords and export as CSV files
- **Real-time Password Strength Analysis:** Dynamic feedback on password security level
- **Advanced Customization:** Fully configurable password length (6-64 characters) and character types
- **Smart Website Integration:** Automatically detects password fields and adds generate buttons (optimized for Google and other dynamic sites)

### User Experience
- **Modern Dark UI:** Clean, professional interface with Inter font and smooth animations
- **Responsive Design:** 600px width for optimal viewing and usability
- **One-Click Copy:** Generated passwords automatically copied to clipboard with visual feedback
- **Persistent Settings:** Your preferences are saved and restored between sessions
- **Error Handling:** Comprehensive validation and user-friendly error messages

### Technical Features
- **Async/Await Architecture:** Modern JavaScript with proper error handling
- **Chrome Storage API:** Reliable settings persistence across browser sessions
- **Content Script Optimization:** Efficient password field detection with MutationObserver
- **Cross-Site Compatibility:** Works on all websites including complex SPAs like Google

---

## Installation

### Option 1: Chrome Web Store (Recommended)
*Coming soon to Chrome Web Store*

### Option 2: Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the root folder of this project
5. The extension will appear in your toolbar

---

## Usage Guide

### Basic Password Generation
1. Click the Hawk Pass icon in your Chrome toolbar
2. Customize settings using the gear icon:
   - **Password Length:** Adjust slider from 6-64 characters
   - **Character Types:** Toggle uppercase, lowercase, numbers, and special characters
3. Click "Generate Password" to create a secure password
4. Password is automatically copied to clipboard

### Bulk Generation
1. Enter the number of passwords needed (1-1000)
2. Click "Export CSV" to generate and download multiple passwords
3. CSV file includes passwords with timestamps

### Website Integration
- Navigate to any website with password fields
- Look for the "Generate" button that appears next to password inputs
- Click to auto-fill with a secure password based on your settings
- Works on registration forms, password change pages, and login forms

---

## Settings Configuration

| Setting | Options | Description |
|---------|---------|-------------|
| **Length** | 6-64 characters | Total password length |
| **Uppercase Letters** | A-Z | Include capital letters |
| **Lowercase Letters** | a-z | Include small letters |
| **Numbers** | 0-9 | Include digits |
| **Special Characters** | !@#$%^&*()_+-=[]{};\:'",./<>? | Include symbols |

### Default Settings
- Length: 16 characters
- All character types enabled
- Settings persist between browser sessions

---

## Password Strength Analysis

The extension provides real-time strength analysis:

| Strength Level | Criteria | Color Indicator |
|----------------|----------|-----------------|
| **Very Weak** | < 8 chars or only 1 char type | Red |
| **Weak** | 8-11 chars with 2 char types | Orange |
| **Good** | 8-11 chars with 3+ char types | Yellow |
| **Strong** | 12-15 chars with 3+ char types | Green |
| **Very Strong** | 16+ chars with all char types | Purple |

---

## Technical Details

### Architecture
- **Manifest V3:** Latest Chrome extension standard
- **Modern JavaScript:** ES6+ with async/await patterns
- **Custom CSS:** Modern design system with CSS variables
- **Storage API:** Chrome's native storage for settings persistence

### File Structure
```
├── manifest.json           # Extension configuration
├── package/
│   ├── index_modern.html   # Main popup interface
│   ├── style_modern.css    # Modern UI styling
│   ├── main.js            # Core extension logic
│   ├── content.js         # Website integration
│   └── images/            # Extension icons
├── README.md              # This file
└── PRIVACY.md            # Privacy policy
```

### Browser Compatibility
- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

---

## Privacy & Security

- **100% Local:** No data sent to external servers
- **No Tracking:** No analytics or user monitoring
- **Open Source:** Full code transparency
- **Minimal Permissions:** Only requests necessary Chrome APIs

See [PRIVACY.md](PRIVACY.md) for complete privacy policy.

---

## Development

### Setup
```bash
git clone https://github.com/Klucznik6/Hawk-Pass-Password-Generator.git
cd Hawk-Pass-Password-Generator
```

### Key Files
- `package/main.js` - Core password generation and UI logic
- `package/content.js` - Website integration and field detection
- `package/style_modern.css` - Modern UI styling
- `manifest.json` - Extension configuration

### Recent Updates
- ✅ Fixed async/await implementation for reliable first-time use
- ✅ Improved Google and dynamic website compatibility
- ✅ Modernized UI with 600px width and clean design
- ✅ Enhanced CSV export functionality
- ✅ Added comprehensive error handling

---

## Troubleshooting

### Common Issues
- **Extension not working on a site:** Refresh the page after installation
- **Generate button not appearing:** Check if the site has password fields and wait for page load
- **Settings not saving:** Ensure Chrome has storage permissions for the extension

### Support
- Open an issue on [GitHub](https://github.com/Klucznik6/Hawk-Pass-Password-Generator)
- Check existing issues for solutions
- Provide browser version and site URL for website-specific issues

---

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Changelog

### v1.0.0 (Current)
- Modern UI redesign with 600px width
- Fixed async/await implementation
- Improved website compatibility
- Enhanced CSV export
- Added comprehensive error handling
- Optimized for Google and dynamic sites

---

## Contact

- **GitHub:** [Klucznik6/Hawk-Pass-Password-Generator](https://github.com/Klucznik6/Hawk-Pass-Password-Generator)
- **Issues:** [Report bugs or request features](https://github.com/Klucznik6/Hawk-Pass-Password-Generator/issues)

*Made with ❤️ for better password security*
