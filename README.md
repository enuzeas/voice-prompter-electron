# Focus Prompter (Web & Extension)

**Focus Prompter** is a distraction-free, AI-powered teleprompter designed for professional presentations and content creation. It listens to your voice and automatically scrolls the script as you speak.

![Focus Prompter](https://img.shields.io/badge/Status-Stable-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Key Features

### 🎙️ AI Voice Recognition
- **Real-time Sync**: The prompter listens to you and highlights the word you are currently speaking.
- **Smart Scrolling**: Automatically scrolls to keep your current line at eye level.
- **Click-to-Jump**: Click any word in the script to instantly jump to that position and resume recognition.
- **Multi-language**: Supports Korean, English, Japanese, Chinese, and more.

### 🖥️ Professional Display
- **Mirror Mode**: Horizontally flips the text for use with teleprompter hardware/glass.
    - *Dual Window Support*: The operator sees normal text, while the talent sees mirrored text in a separate window.
- **Eye Level Guide**: A visual guide ensures you are always looking directly at the camera.
- **Customizable**: Adjust font size, line height, letter spacing, and fonts (Serif/Sans).

### 🚀 Modern Web & Extension
- **Web App**: Runs in any modern browser.
- **Chrome Extension**: Can be installed as a Chrome Extension for a dedicated window experience.
- **Offline Capable**: Helper settings and scripts are saved locally using IndexedDB.
- **SEO Optimized**: Dynamic titles and social sharing tags.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Space` | Play/Pause | Toggle auto-scroll or voice recognition |
| `Ctrl + R` | Reset | Reset script to the beginning |
| `Ctrl + E` | Editor | Open/Close script editor |
| `Ctrl + ,` | Settings | Open/Close settings panel |
| `Ctrl + Shift + P` | Presentation | Open dedicated presentation window |
| `Ctrl + S` | Save File | Download current script as .txt |
| `Ctrl + O` | Open File | Open local .txt file |
| `F11` | Fullscreen | Toggle fullscreen mode |
| `Esc` | Close | Close active modal or settings |

## 🛠️ Installation & Development

### Web Application

```bash
# 1. Clone the repository
git clone https://github.com/enujes/voice-prompter-web.git

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Chrome Extension (Load Unpacked)

1.  Run `npm run build` to generate the `dist` folder.
2.  Open Chrome and go to `chrome://extensions/`.
3.  Enable "Developer mode" (top right).
4.  Click "Load unpacked" and select the `dist` folder.
5.  Click the extension icon to launch the dedicated window.

## 🏗️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: React Hooks, Context
- **Persistence**: IndexedDB (`idb`)
- **Speech**: Web Speech API (Native Browser Support)
- **SEO**: React Helmet Async
- **Packaging**: Chrome Extension Manifest V3

## 📝 License

This project is licensed under the MIT License.
