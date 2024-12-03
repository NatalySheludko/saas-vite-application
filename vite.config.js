import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'path';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      pngquant: { quality: [0.8, 0.9] },
      mozjpeg: { quality: 86 },
      webp: { quality: 86 },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'css/style.css';
          return 'assets/[name].[ext]';
        },
      },
    },
  },
});
