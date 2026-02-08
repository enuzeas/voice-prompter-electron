# Deployment Guide - Voice Prompter Web

## Overview

Voice Prompter has been converted from an Electron desktop application to a pure web application that can be deployed to any web server or static hosting service.

## Building for Production

```bash
npm run build
```

This will create a `dist/` directory containing all the static files needed for deployment.

## Local Testing

To test the production build locally:

```bash
npm run preview
```

This will start a local server serving the built files at `http://localhost:4173`.

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides zero-configuration deployment with automatic HTTPS.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd voice-prompter-electron
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments on push.

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd voice-prompter-electron/dist
netlify deploy
```

### 3. GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` directory to a GitHub repository
3. Enable GitHub Pages in repository settings
4. Set source to `dist/` folder

### 4. Static Web Server

For simple deployment to any web server:

```bash
# Upload the contents of dist/ to your web server
```

## HTTPS Requirement

**Important:** The Web Speech API (used for voice recognition) requires HTTPS to work in production browsers. The only exception is `localhost` for development.

All deployment platforms listed above provide HTTPS automatically.

## Browser Compatibility

| Browser | Version | Notes |
|----------|----------|--------|
| Chrome | 25+ | Full support |
| Edge | 25+ | Full support |
| Safari | 14.1+ | Full support |
| Firefox | 44+ | Requires `media.webspeech.recognition.enable` in `about:config` |

## Features

### Voice Recognition
- Uses Web Speech API
- Requires HTTPS in production
- Works in Chrome, Edge, Safari, and Firefox (with config)

### Presentation Mode
- Opens in new browser window/tab
- Uses BroadcastChannel API for real-time sync
- Automatically requests fullscreen

### File Operations
- **Upload:** Uses File API (TXT files)
- **Download:** Creates downloadable TXT file
- No server-side processing required

### Data Persistence
- IndexedDB for local settings and scripts
- No server or database required
- Data persists across browser sessions

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` / `Cmd+R` | Reset prompter |
| `Space` | Play/Pause (Voice/Manual mode) |
| `Ctrl+E` / `Cmd+E` | Toggle script editor |
| `Ctrl+,` / `Cmd+,` | Toggle settings |
| `F11` | Toggle fullscreen |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Toggle presentation mode |
| `Ctrl+S` / `Cmd+S` | Download script as file |
| `Escape` | Close modals |

## Environment Variables

No environment variables are required. The application runs entirely client-side.

## Performance Optimization

The build is already optimized with:
- Code splitting
- Tree shaking
- Asset minification
- Gzip compression (via hosting platform)

## Troubleshooting

### Microphone Not Working

1. Ensure the site is served over HTTPS
2. Check browser permissions for microphone access
3. Try Chrome or Edge for best compatibility

### Presentation Mode Not Opening

1. Check if popup blocker is blocking the new window
2. Ensure BroadcastChannel API is supported (IE not supported)
3. Check browser console for errors

### Settings Not Saving

1. Ensure IndexedDB is enabled in browser
2. Check if browser is in private/incognito mode
3. Clear browser cache and try again

## Security Considerations

- All data is stored locally in the user's browser
- No data is sent to any server
- File operations are sandboxed to user-selected files
- Microphone access requires explicit user permission

## License

MIT License - See LICENSE file for details.

## Support

For issues or questions:
- Check browser compatibility
- Ensure HTTPS is enabled
- Review browser console for errors
