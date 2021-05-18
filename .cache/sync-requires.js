
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/adam.k.kniec/Desktop/bmw/.cache/dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("/Users/adam.k.kniec/Desktop/bmw/src/pages/404.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/adam.k.kniec/Desktop/bmw/src/pages/index.tsx")),
  "component---src-pages-page-2-tsx": preferDefault(require("/Users/adam.k.kniec/Desktop/bmw/src/pages/page-2.tsx")),
  "component---src-pages-using-typescript-tsx": preferDefault(require("/Users/adam.k.kniec/Desktop/bmw/src/pages/using-typescript.tsx"))
}

