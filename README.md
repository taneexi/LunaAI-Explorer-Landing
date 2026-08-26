# LunaAI Explorer Landing Page

A standalone marketing website for **LunaAI Explorer**, a Chrome extension that turns selected web content into a deeper AI-powered exploration.

This project is intentionally separate from the Chrome extension. It has no build step, package manager, framework, or extension runtime dependencies.

## Preview Locally

Open [index.html](index.html) in a modern browser.

For the most reliable browser behavior, serve the directory through a static web server. For example, with Node.js installed:

```powershell
npx serve .
```

Then open the local URL printed by the server.

## Project Structure

```text
lunaai-explorer-landing/
├── index.html              # Page structure and external font/icon/video references
├── styles.css              # Responsive visual design and animations
├── main.js                 # Navigation, reveal effects, counters, and interactive demos
├── assets/
│   └── logo.webp           # LunaAI Explorer logo asset
└── fonts/
    └── GeistPixel-Circle.woff2
```

## Included Experiences

- Full-screen video hero with primary calls to action and animated product statistics
- Responsive navigation, including a keyboard-accessible mobile menu
- Product and workflow sections that explain the extension experience
- Interactive exploration-question demo that updates the displayed explanation
- Visual AI model selector
- Feature, developer, contact, and closing-call-to-action sections
- Scroll reveal effects and reduced-motion support

## External Resources

The page loads the following resources from external providers:

- Inter from Google Fonts
- Bubbledot ICG FinePos from OnlineWebFonts
- Font Awesome icons from cdnjs
- Hero video from CloudFront

The hero video and external fonts require an internet connection. The page remains structurally usable without them, with browser fallback fonts and the defined background treatment.

## Customization

- Update copy and section content in [index.html](index.html).
- Adjust colors, typography, layout, and breakpoints in [styles.css](styles.css).
- Change interactive question content or model options through the data attributes in [index.html](index.html); their behavior is wired in [main.js](main.js).
- Replace [assets/logo.webp](assets/logo.webp) with the final LunaAI Explorer logo when it is available.

## Deployment

Deploy the entire directory to any static hosting provider, such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages. No compilation or environment variables are required.

## Validation

To check the JavaScript syntax:

```powershell
node --check main.js
```

## License

No license has been specified for this project.
