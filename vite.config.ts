import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(), tsconfigPaths(), VitePWA({
        devOptions: {
            enabled: true
        },
        registerType: 'autoUpdate', manifest: {
            name: 'Bazar PWA',
            short_name: 'Bazar',
            description: 'Bazar progressive web aplication',
            theme_color: '#f0f0f0',
            start_url: '/',
            id: '/',
            icons: [
                {
                    src: 'pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'apple-touch-icon.png',
                    sizes: '180x180',
                    type: 'image/png',
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    src: 'maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            sourcemap: true,
        }
    })],
    build: {
        outDir: 'dist',
    }
});
