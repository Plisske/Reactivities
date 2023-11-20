import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        fs: {
            allow: ['C:/Users/Bigus Dickus/node_modules/semantic-ui-css/themes/default/assets/fonts',
            '..'],
        },
     },
    plugins: [react()],
    esbuild: {
        loader: 'jsx',
    },
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser',
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
})
