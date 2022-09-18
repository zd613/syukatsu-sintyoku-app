import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  // gh pagesでは、 https://アカウント名.github.io/repo名/になるので、baseにrepo名を設定する
  base: 'syukatsu-sintyoku-app'
})
