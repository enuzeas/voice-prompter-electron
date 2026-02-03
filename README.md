# Voice Prompter

AI-powered voice recognition teleprompter for presentations and public speaking.

## Features

- ✅ **Voice Recognition Mode**: Real-time speech-to-text synchronization
- ✅ **Manual Scroll Mode**: Adjustable auto-scroll for controlled reading
- ✅ **Markdown Support**: Format text with **bold**, *italic*, ~~strikethrough~~
- ✅ **Multi-language**: Korean, English, Japanese, Chinese speech recognition
- ✅ **Keyboard Shortcuts**: Quick controls for efficient operation
- ✅ **Presentation Mode**: Dual-monitor support (presenter + audience views)
- ✅ **Offline Storage**: IndexedDB for persistent local data
- ✅ **Customizable**: Font size, spacing, and style adjustments

## Installation

```bash
# Install dependencies
npm install

# Development mode
npm run electron:dev

# Build for production
npm run electron:build
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` / `Cmd+R` | Reset prompter |
| `Space` | Play/Pause toggle |
| `Ctrl+E` / `Cmd+E` | Open script editor |
| `Ctrl+,` / `Cmd+,` | Open settings |
| `F11` | Toggle fullscreen |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Presentation mode |
| `Escape` | Close modal |

## Technology Stack

- **Frontend**: React 18, Tailwind CSS
- **Desktop**: Electron 28
- **Storage**: IndexedDB (idb)
- **Speech**: Web Speech API
- **Build**: Vite, electron-builder

## Development

```bash
# Start development server
npm run dev

# Start Electron in development
npm run electron:dev

# Build for production
npm run build
npm run electron:build
```

## License

MIT
