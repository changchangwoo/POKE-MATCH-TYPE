import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({server: {
  watch: {
    usePolling: true
  },
},
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@const': path.resolve(__dirname, 'src/const'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@ads': path.resolve(__dirname, 'src/ads'),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
})
