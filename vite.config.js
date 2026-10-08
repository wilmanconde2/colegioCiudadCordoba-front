import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/test/**',
        'src/**/*.test.*',
        'src/constants/**',
        'src/shared/institutional-data.js',
        'src/components/Chatbot.jsx',
        'src/components/modal-info-curso/modalInfoCursoData.js',
        'dist/**',
        'coverage/**',
      ],
      reporter: ['text', 'html', 'json-summary'],
    },
    environment: 'jsdom',
    fileParallelism: false,
    include: ['src/**/*.test.jsx'],
    maxWorkers: 1,
    setupFiles: './src/test/setup.js',
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function',
        ],
      },
    },
  },
})
