import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from "path";

export default ({mode}: any) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        base: "/TodoList-Vue/",
        plugins: [
            vue(),
            VueI18nPlugin({
                include: path.resolve(__dirname, "src/shared/i18n/locales/**"),
            }),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        define: {"process.env": {}},
        server: {
            port: 3000,
            open: true,
        },
        build: {
            chunkSizeWarningLimit: 1100,
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ["vue", "vue-router"],
                    },
                },
            },
        },
    })
}
