# Chrome Extension Publishing Guide

This guide details the steps to publish **Focus Prompter** to the Chrome Web Store.

## 1. Prerequisites

- **Google Account**: You need a Google Account to sign up as a developer.
- **Developer Account**: Register at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/dev/dashboard).
    - *Note*: There is a one-time registration fee (currently $5 USD).
- **Extension Assets**:
    - **Icon**: 128x128 px icon (already in `public/icons/icon-128.png`).
    - **Screenshots**: At least one screenshot of your app (1280x800 or 640x400).
    - **Promotional Tiles**:
        - Small: 440x280 px
        - Marquee: 1400x560 px

## 2. Prepare the Package

1.  **Build the Project**:
    Ensure you have the latest code built.
    ```bash
    npm run build
    ```
    This creates the `dist` folder.

2.  **Test the Build**:
    - Open `chrome://extensions`.
    - Enable "Developer mode".
    - Click "Load unpacked" and select the `dist` folder.
    - Verify everything works as expected (Mirror Mode, Voice Recognition, etc.).

3.  **Zip the `dist` Folder**:
    - **Mac/Linux**:
      ```bash
      cd dist
      zip -r ../focus-prompter.zip .
      cd ..
      ```
    - **Windows**: Right-click the `dist` folder -> Send to -> Compressed (zipped) folder, then rename it to `focus-prompter.zip`.

    *Important*: The `manifest.json` file must be at the root of the zip archive. Do not zip the `dist` folder itself, zip the *contents* of the `dist` folder.

## 3. Upload to Web Store

1.  Go to the [Developer Dashboard](https://chrome.google.com/webstore/dev/dashboard).
2.  Click **"New Item"**.
3.  Upload the `focus-prompter.zip` file you created.

## 4. Store Listing

Fill in the required fields:

- **Description**: Detailed description of the extension. (You can copy from `README.md`)
- **Category**: Productivity / Tools.
- **Language**: Korean (or English, depending on your primary target).
- **Graphic Assets**: Upload the icons, screenshots, and promo tiles prepared in Step 1.

## 5. Privacy Practices

Since we use the **Web Speech API** and **Microphone**, you must declare permissions:

- **Permissions**:
    - `audioCapture`: For voice recognition.
    - `storage`: For saving settings locally.
- **Data Usage**:
    - Declare that **User Data (Audio)** is *not* collected or transmitted to any server by the developer. It is processed locally by the browser's Web Speech API.
    - Check "The extension does not collect or transmit any user data" if strictly true (Voice Prompter uses local IndexedDB and ephemeral Browser API processing).

## 6. Submit for Review

1.  Click **"Submit for Review"**.
2.  The review process typically takes 1-3 business days.
3.  Once approved, your extension will be live on the Chrome Web Store!

## 7. Updates

To update your extension in the future:
1.  Increment the `version` in `public/manifest.json`.
2.  Run `npm run build` again.
3.  Zip the `dist` folder contents.
4.  Go to the Dashboard, select your item, and upload the new package.
