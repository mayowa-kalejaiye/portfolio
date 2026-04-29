Image optimization helper

This repo includes a small Node.js helper to convert PNG/JPG images to WebP for faster delivery.

Requirements:
- Node.js 18+ (or compatible)

Install dependencies:

```bash
npm install
```

Run conversion (this will create `.webp` files next to originals):

```bash
npm run convert-images
```

After conversion, ensure the generated `.webp` files are uploaded to your hosting (Vercel will serve them).

Notes:
- The script converts all PNG/JPG files in the `images/` folder.
- Adjust quality in `scripts/convert-images.js` if needed.
