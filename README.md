# Voice Prompter

AI-powered voice recognition teleprompter for presentations and public speaking.

## Features

- ✅ **Voice Recognition Mode**: Real-time speech-to-text synchronization
- ✅ **Manual Scroll Mode**: Adjustable auto-scroll for controlled reading
- ✅ **Markdown Support**: Format text with **bold**, *italic*, ~~strikethrough~~
- ✅ **Multi-language**: Korean, English, Japanese, Chinese speech recognition
- ✅ **Keyboard Shortcuts**: Quick controls for efficient operation
- ✅ **Presentation Mode**: Dual-window support (presenter + audience views)
- ✅ **File Operations**: Upload and download scripts as TXT files
- ✅ **Offline Storage**: IndexedDB for persistent local data
- ✅ **Customizable**: Font size, spacing, and style adjustments
- ✅ **Web-based**: Runs in any modern browser, no installation required

## Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Vercel, Netlify, GitHub Pages, or any static hosting.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` / `Cmd+R` | Reset prompter |
| `Space` | Play/Pause toggle |
| `Ctrl+E` / `Cmd+E` | Open script editor |
| `Ctrl+,` / `Cmd+,` | Open settings |
| `F11` | Toggle fullscreen |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Presentation mode |
| `Ctrl+S` / `Cmd+S` | Download script as file |
| `Escape` | Close modal |

## Technology Stack

- **Frontend**: React 18, Tailwind CSS
- **Storage**: IndexedDB (idb)
- **Speech**: Web Speech API
- **Build**: Vite
- **Presentation Sync**: BroadcastChannel API

## Browser Compatibility

| Browser | Version | Notes |
|----------|----------|--------|
| Chrome | 25+ | Full support |
| Edge | 25+ | Full support |
| Safari | 14.1+ | Full support |
| Firefox | 44+ | Requires configuration |

**Note:** HTTPS is required for speech recognition in production (localhost works without HTTPS).

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
