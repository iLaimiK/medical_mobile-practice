import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// vant
import { VantResolver } from "@vant/auto-import-resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    checker({
      typescript: true,
      vueTsc: true,
    }),
    AutoImport({
      dts: true,
      resolvers: [
        VantResolver({
          // Disable style import
          importStyle: false,
        }),
      ],
    }),
    Components({
      dts: true,
      resolvers: [
        VantResolver({
          // Disable style import
          importStyle: false,
        }),
      ],
    }),
  ],
  base: "",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
