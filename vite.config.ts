import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    preview: {
        port: 3001,
    },
    server: {
        port: 3000,
    },
    plugins: [react(), tsconfigPaths()]
});