# Komerza Builder – Static Website Template

This repository contains the base template used by the **Komerza Builder**, our AI-powered tool that generates fully customized static websites for Komerza users. While this repository itself is not the live Builder, it is the foundation from which all Builder-created sites start.

---

## What This Is

- A Next.js project configured for static export (`next export`)
- Fully responsive, mobile-friendly design
- Prebuilt features for online storefronts and dashboards
- Customizable by the Komerza Builder for each user’s needs

The Komerza Builder clones this project, updates it with the user’s branding, products, and content, and then deploys it as a ready-to-use static site.

---

## Komerza Commerce Script

This template loads the [Komerza Commerce Script](https://cdn.komerza.com/komerza.min.js) in the global layout and initializes it with a store ID. Update `lib/komerza.ts` with your store's identifier. For static exports, list each product slug in `lib/product-slugs.ts`. All product listing, cart, and checkout interactions are handled through `globalThis.komerza` methods.

---

## Building for Production

To build the static files:

```bash
npm run build
```

This will generate static HTML, CSS, and JavaScript files in the `/out` directory.

---

## Deployment

After building, you can deploy the contents of the `/out` directory to any static web server:

1. Upload all files from `/out` to your web server
2. Ensure your web server is configured to serve `index.html` for directory requests
3. Configure your web server to handle client-side routing (serve `index.html` for 404s)

---

## Features

- ✅ Static HTML/CSS/JS export
- ✅ Client-side routing
- ✅ Responsive design
- ✅ Theme switching (localStorage)
- ✅ Shopping cart functionality
- ✅ Product pages
- ✅ Dashboard interface
- ✅ No server dependencies

---

## File Structure

- `/out` - Generated static files (after build)
- `/app` - Source code
- `/components` - Reusable UI components
- `/public` - Static assets

---

## Browser Compatibility

- Modern browsers with ES6+ support
- JavaScript must be enabled
- LocalStorage support required for theme and cart persistence

---

## About the Komerza Builder

The **Komerza Builder** is our automated tool that creates customized e-commerce websites in minutes. This repository is the starting point for every Builder-created site.

For more about Komerza and the Builder, visit: [https://komerza.com](https://komerza.com)
