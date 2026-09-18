import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages serves project sites from https://<user>.github.io/<repo>/
 * so assets need that sub-path as their base. The deploy workflow sets
 * VITE_BASE automatically. Local dev, Vercel and Netlify all use '/'.
 */
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    hmr: { clientPort: 443 },
  },
  preview: { host: '0.0.0.0', port: 5173, allowedHosts: true },
})
