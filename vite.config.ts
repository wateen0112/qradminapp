import { fileURLToPath, URL } from 'url'
import postCssRtl from 'postcss-rtlcss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwidCss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@config': fileURLToPath(new URL('./AppConfig', import.meta.url)),
      '@vars': fileURLToPath(new URL('./src/core/scss/_variables.scss', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/core/components', import.meta.url)),
    }
  },

  css: {
    postcss: {
      plugins: [
        postCssRtl(),
        tailwidCss({
          config: './tailwind.config.js'
        })
      ]
    }
  }

})
