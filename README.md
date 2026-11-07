# EdgeWARN-Extension
A Chrome extension for EdgeWARN that delivers real-time severe weather notifications and customizable alert tones in the background. Built with WXT, React, TypeScript, and Manifest V3.

## Development

```sh
npm install      # install deps (also runs `wxt prepare` to generate .wxt types)
npm run dev      # dev mode with HMR; loads the unpacked extension from a browser tab
npm run build    # production build to .output/chrome-mv3/
npm run zip      # production build + zip, ready for the Chrome Web Store
npm run compile  # typecheck
```

